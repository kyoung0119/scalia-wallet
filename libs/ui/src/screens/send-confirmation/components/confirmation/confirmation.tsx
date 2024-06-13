import { OnEventFn } from '@rnw-community/shared';
import isEmpty from 'lodash/isEmpty';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { NetworkTypeEnum } from 'shared';
import BigNumber from 'bignumber.js';

import { Row } from '../../../../components/row/row';
import { Column } from '../../../../components/column/column';
import { Text } from '../../../../components/text/text';
import { TextInput } from '../../../../components/text-input/text-input';
import { Button } from '../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../components/button/enums';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { IconWithBorder } from '../../../../components/icon-with-border/icon-with-border';
import { IconWithBorderEnum } from '../../../../components/icon-with-border/enums';
import { Image } from '../../../../components/image/image';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useTokenFiatBalance } from '../../../../hooks/use-token-fiat-balance.hook';
import {
  useGasTokenSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { formatUnitsToString, parseUnits } from '../../../../utils/units.utils';
import { shortizeStart } from '../../../../utils/shortize.util';
import { ScreensEnum } from '../../../../enums/sreens.enum';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { Token } from 'src/interfaces/token.interface';

import { useTransactionSpeed } from '../../hooks/use-transaction-speed.hook';
import { ConfirmOperationParams } from '../evm-confirmation/types';

import { Field } from './components/field/field';
import { TransactionSpeed } from './components/transaction-speed/transaction-speed';
import { styles } from './confirmation.styles';
import { ownGasFeeRules, requiredFieldRule } from './constants';

type Props = PropsWithChildren<{
  receiverPublicKeyHash: string;
  amount: string;
  symbol: string;
  token: Token;
}> &
  ConfirmOperationParams;

const defaultValues = {
  ownGasFee: '',
  ownStorageFee: ''
};

export const Confirmation: FC<Props> = ({
  receiverPublicKeyHash,
  symbol,
  amount,
  token,
  children,
  confirmOperationParams: {
    initialTransactionFee,
    onSend,
    isFeeLoading,
    isTransactionLoading,
    onDecline,
    storageFee = 0
  }
}) => {
  const gasToken = useGasTokenSelector();
  const networkType = useSelectedNetworkTypeSelector();

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onChange',
    defaultValues
  });

  const isConfirmButtonDisabled = !isEmpty(errors) || isTransactionLoading || isFeeLoading;

  const ownGasFee = watch('ownGasFee');
  const ownsStorageFee = watch('ownStorageFee');

  const {
    isOwnSpeedSelected,
    correctedTransactionFee,
    gasPriceCoefficient,
    isKlaytnNetwork,
    initialTransactionFeeWithDecimals,
    handleSpeedChange,
    speed
  } = useTransactionSpeed(ownGasFee, initialTransactionFee, clearErrors as OnEventFn<void>);

  const correctedStorageFee = isOwnSpeedSelected ? Number(ownsStorageFee) : storageFee;

  const isTezosNetwork = networkType === NetworkTypeEnum.Tezos;
  const isEvmNetwork = networkType === NetworkTypeEnum.EVM;

  const { navigate, goBack } = useNavigation();

  const senderPublickeyHash = useSelectedAccountPublicKeyHashSelector();

  const { amountInDollar: transferAmountInDollar } = useTokenFiatBalance(amount, token);
  const { amountInDollar: gasAmountInDollar } = useTokenFiatBalance(correctedTransactionFee.toString(), gasToken);

  const amountInDollarNumber = new BigNumber(transferAmountInDollar);
  const gasAmountInDollarNumber = new BigNumber(gasAmountInDollar);
  const totalAmountInDollar = amountInDollarNumber.plus(gasAmountInDollarNumber).toString();

  const [isLoadingError, setIsLoadingError] = useState(false);
  const onError = () => setIsLoadingError(true);

  useEffect(() => {
    setIsLoadingError(false);
  }, [token]);

  useEffect(() => {
    setValue('ownGasFee', formatUnitsToString(initialTransactionFee, gasToken.decimals));

    if (isTezosNetwork) {
      setValue('ownStorageFee', storageFee.toString());
    }
  }, [initialTransactionFee, storageFee, isTezosNetwork, gasToken.decimals]);

  const onConfirmPress = () => {
    if (isTezosNetwork) {
      const gasFeeToSend = parseUnits(correctedTransactionFee, gasToken.decimals).toNumber();

      onSend({ storageFee: correctedStorageFee, gasFee: gasFeeToSend });
    } else {
      onSend(gasPriceCoefficient);

      const sendTokenAmount = new BigNumber(amount).toNumber()

      navigate(ScreensEnum.SendSummary, {
        sendTokenSymbol: token.symbol,
        sendTokenIcon: token.thumbnailUri,
        sendTokenAmount,
        sendTokenAmountInDollar: transferAmountInDollar,
        gasTokenSymbol: gasToken.symbol,
        gasTokenIcon: gasToken.thumbnailUri,
        gasTokenAmount: correctedTransactionFee,
        gasTokenAmountInDollar: gasAmountInDollar,
        totalAmountInDollar: totalAmountInDollar
      });
    }
  };


  return (
    <ScreenContainer>
      <ScreenTitle
        title={`Confirm Transaction`}
        onBackButtonPress={goBack}
        numberOfLines={1}
        titleStyle={styles.screenTitle}
      />

      <View style={styles.container}>
        {children}
        <Row style={styles.captionRowContainer}>
          <View style={styles.senderContainer}>
            <Text style={styles.modalText as ViewStyleProps}>{shortizeStart(senderPublickeyHash)}</Text>
          </View>
          <Icon name={IconNameEnum.ArrowRight} iconStyle={styles.iconContainer} />
          <View style={styles.receiverContainer}>
            <Text style={styles.modalText as ViewStyleProps}>{shortizeStart(receiverPublicKeyHash)}</Text>
          </View>
        </Row>

        <Column style={styles.operationContainer}>
          <IconWithBorder type={IconWithBorderEnum.Quinary} style={styles.icon} >
            <Image uri={token.thumbnailUri} isLoadingError={isLoadingError} onError={onError} />
          </IconWithBorder>
          <Text style={styles.amountText as ViewStyleProps}>{amount}</Text>
          <Text style={styles.amountDollarText as ViewStyleProps}>~ ${transferAmountInDollar}</Text>
        </Column>

        <View>
          {isEvmNetwork && (
            <Field
              title="Gas Cost:"
              loading={isFeeLoading}
              amount={correctedTransactionFee}
              symbol={gasToken.symbol}
              uri={gasToken.thumbnailUri}
              amountInDollar={gasAmountInDollar}
            />
          )}
          {!isKlaytnNetwork && (
            <TransactionSpeed
              speed={speed}
              handleSpeedChange={handleSpeedChange}
              initialTransactionFeeWithDecimals={initialTransactionFeeWithDecimals}
              ownGasFee={ownGasFee}
            />
          )}
          {isEvmNetwork && (
            <Field
              title="Total Cost:"
              loading={isFeeLoading}
              // amount={correctedTransactionFee}
              // symbol={gasToken.symbol}
              // uri={gasToken.thumbnailUri}
              amountInDollar={totalAmountInDollar}
            />
          )}
          {isTezosNetwork && (
            <Field title="Gas fee" loading={isFeeLoading} amount={correctedTransactionFee} symbol={gasToken.symbol} />
          )}

          {isOwnSpeedSelected && (
            <Controller
              control={control}
              name="ownGasFee"
              rules={ownGasFeeRules}
              render={({ field }) => (
                <TextInput
                  field={field}
                  placeholder={`${initialTransactionFeeWithDecimals ?? 0}`}
                  keyboardType="numeric"
                  error={errors?.ownGasFee?.message}
                  decimals={gasToken.decimals}
                  {...(isEvmNetwork && { containerStyle: styles.footerMargin })}
                />
              )}
            />
          )}
          {isTezosNetwork && (
            <View style={[isOwnSpeedSelected && styles.storageFeeInputContainer]}>
              <Field title="Storage fee" loading={isFeeLoading} amount={correctedStorageFee} symbol={symbol} />

              {isOwnSpeedSelected && (
                <Controller
                  control={control}
                  name="ownStorageFee"
                  rules={requiredFieldRule}
                  render={({ field }) => (
                    <TextInput
                      field={field}
                      placeholder={`${storageFee}`}
                      keyboardType="numeric"
                      decimals={gasToken.decimals}
                      error={errors?.ownStorageFee?.message}
                      containerStyle={styles.footerMargin}
                    />
                  )}
                />
              )}
            </View>
          )}
        </View>

        <View style={[styles.root]}>
          <Button
            disabled={isConfirmButtonDisabled}
            theme={ButtonThemesEnum.Secondary}
            title="Confirm Transaction"
            onPress={handleSubmit(onConfirmPress)}
            style={[styles.buttonModal, styles.confirmButton]}
          // testID={testID}
          />
          <Button
            disabled={isTransactionLoading}
            theme={ButtonThemesEnum.Primary}
            title="Reject Transaction"
            onPress={goBack}
            style={[styles.buttonModal, styles.cancelButton]}
          />

        </View>
      </View>
    </ScreenContainer>
  );
};
