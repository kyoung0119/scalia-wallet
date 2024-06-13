import React, { FC, useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import isEmpty from 'lodash/isEmpty';

import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Button } from '../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../components/button/enums';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { getValueWithMaxNumberOfDecimals } from '../../../../components/text-input/utils/get-value-with-max-number-of-decimals.util';

import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useTokenFiatBalance } from '../../../../hooks/use-token-fiat-balance.hook';
import {
  useGasTokenSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { getString } from '../../../../utils/get-string.utils';
import { shortizeStart } from '../../../../utils/shortize.util';

import { SendButton } from '../../components/send-button/send-button';
import { TransferBetweenMyAccounts } from '../../components/transfer-between-my-accounts/transfer-between-my-accounts';
import { useSendForm } from '../../hooks/use-send-form.hook';
import { useValidateAmountField } from '../../hooks/use-validate-amount-field.hook';
import { FormTypes } from '../../types';

import { TokenInput } from './components/token-input/token-input';
import { SelectToken } from './components/token-input/components/select-token/select-token';
import { ViewStyleProps } from 'src/interfaces/style.interface';
import { AccountInterface } from '../../../../../../shared/src/interfaces/account.interface';

import { styles } from './send-token.styles';

export const SendToken: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendToken>>();
  const { goBack } = useNavigation();
  const gasToken = useGasTokenSelector();

  const defaultValues: FormTypes = {
    token: gasToken,
    amount: '',
    receiverPublicKeyHash: '',
    account: undefined,
    isTransferBetweenAccounts: false
  };

  const methods = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
    clearErrors
  } = methods;
  const token = watch('token');
  const account = watch('account');
  const amount = watch('amount');

  const onSubmit = useSendForm({ params, account, setValue, trigger, clearErrors, token });

  const [isTokenInput, setIsTokenInput] = useState(true); // State to track input mode

  const { availableBalance, availableUsdBalance, availableFormattedBalance, amountInDollar } = useTokenFiatBalance(
    amount,
    token
  );
  const isTokenSelected = isDefined(token);
  const isSendButtonDisabled = !isEmpty(errors);

  const amountRules = useValidateAmountField(availableBalance);

  const senderPublickeyHash = useSelectedAccountPublicKeyHashSelector();
  const networkType = useSelectedNetworkTypeSelector()
  const receiverPubkeyHash = params && params.account ? getPublicKeyHash(params?.account as AccountInterface, networkType) : undefined;

  useEffect(() => {
    if (isTokenSelected && isNotEmptyString(amount)) {
      setValue('amount', getValueWithMaxNumberOfDecimals(amount, token?.decimals ?? 0));
    }
  }, [token]);

  useEffect(() => {
    if (account) {
      const publicKeyHash = getPublicKeyHash(account as AccountInterface, networkType);
      setValue('receiverPublicKeyHash', publicKeyHash);
      trigger('receiverPublicKeyHash');
    }
  }, [account]);

  const onSelectMaxPress = async () => {
    const maxValue = getValueWithMaxNumberOfDecimals(availableBalance, 5)
    setValue("amount", maxValue)
    await trigger('amount');
  };

  return (
    <ScreenContainer>
      <ScreenTitle
        title={`Send`}
        onBackButtonPress={goBack}
        numberOfLines={1}
        titleStyle={styles.screenTitle}
      />

      <ScreenScrollView>
        <FormProvider {...methods}>
          <TransferBetweenMyAccounts />
        </FormProvider>

        <View style={styles.rowMarginVertical}>
          <Row style={styles.captionRowContainer}>
            <Text style={styles.modalText as ViewStyleProps}>Asset</Text>
            <Row style={styles.balanceContainer}>
              <Text style={styles.balanceText as ViewStyleProps}>Balance: </Text>
              <Text style={styles.balanceValue as ViewStyleProps}>{availableFormattedBalance} </Text>
              <Text style={styles.balanceText as ViewStyleProps}>{getString(token?.symbol)} = $</Text>
              <Text style={styles.balanceValue as ViewStyleProps}>{availableUsdBalance}</Text>
            </Row>
          </Row>
          <SelectToken token={token} navigationKey="token" />
        </View>

        <Row style={styles.captionRowContainer}>
          <Text style={styles.modalText as ViewStyleProps}>Amount</Text>
          <Pressable onPress={onSelectMaxPress} disabled={false}>
            <Text style={styles.themeText as ViewStyleProps}>Select max</Text>
          </Pressable>
        </Row>

        <View style={styles.rowMarginVertical}>
          <Controller
            control={control}
            name="amount"
            rules={amountRules}
            render={({ field }) => (
              <TokenInput
                field={field}
                token={token}
                amountInDollar={amountInDollar}
                // amountInToken={amountInToken}
                navigationKey="token"
                error={errors?.amount?.message}
                isTokenInput={isTokenInput}
                setIsTokenInput={setIsTokenInput}
              />
            )}
          />
        </View>

        {/* <Row style={styles.captionRowContainer}>
          <Text style={styles.gasCostText as ViewStyleProps}>Gas Cost:</Text>
          <Text style={styles.modalText as ViewStyleProps}>$0.0</Text>
        </Row> */}

        <Row style={styles.captionRowContainer}>
          <View style={styles.senderContainer}>
            <Text style={styles.modalText as ViewStyleProps}>{shortizeStart(senderPublickeyHash)}</Text>
          </View>
          <Icon name={IconNameEnum.ArrowRight} iconStyle={styles.iconContainer} />
          <View style={styles.receiverContainer}>
            {
              receiverPubkeyHash == undefined ?
                <Text style={styles.undefinedText as ViewStyleProps}>receiver</Text> :
                <Text style={styles.modalText as ViewStyleProps}>{shortizeStart(receiverPubkeyHash)}</Text>
            }
          </View>
        </Row>
      </ScreenScrollView>

      <SendButton onPress={handleSubmit(onSubmit)} isDisabled={isSendButtonDisabled} />
      <Button
        title="Cancel"
        theme={ButtonThemesEnum.Primary}
        style={styles.buttonModal}
        onPress={goBack}
      />
    </ScreenContainer >
  );
};
