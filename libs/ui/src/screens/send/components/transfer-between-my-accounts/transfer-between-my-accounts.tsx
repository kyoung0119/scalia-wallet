import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import Clipboard from '@react-native-clipboard/clipboard';
import { AccountInterface, NetworkTypeEnum, isMobile } from 'shared';
import { isNotEmptyString } from '@rnw-community/shared';

import { Button } from '../../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../../components/button/enums';
import { Icon } from '../../../../components/icon/icon';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { TextInput } from '../../../../components/text-input/text-input';

import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useToast } from '../../../../hooks/use-toast.hook';
import {
  useAllAccountsWithoutSelectedSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { useValidateAddressField } from '../../hooks/use-validate-address-field.hook';
import { FormTypes } from '../../types';
import { ViewStyleProps } from 'src/interfaces/style.interface';

import { styles } from './transfer-between-my-accounts.styles';

const MAXIMUM_ADDRESS_LENGTH = 64;

export const TransferBetweenMyAccounts: FC = () => {
  const { showWarningToast } = useToast();
  const allAccountsWithoutSelected = useAllAccountsWithoutSelectedSelector();
  const isTransferBetweenAccountsDisabled = allAccountsWithoutSelected.length === 0;
  const networkType = useSelectedNetworkTypeSelector();
  const receiverPublicKeyHashRules = useValidateAddressField(networkType);
  const { navigate } = useNavigation();
  const {
    control,
    setValue,
    formState: { errors },
    clearErrors,
    trigger,
    watch
  } = useFormContext<FormTypes>();
  const account = watch('account');

  const addressPlaceholder = networkType === NetworkTypeEnum.EVM ? '0xde...' : 'tz...';

  const navigateToScanQrCode = () => navigate(ScreensEnum.ScanQrCode);

  const onPastePress = async () => {
    const copiedText = await Clipboard.getString();

    if (isNotEmptyString(copiedText) && copiedText.length < MAXIMUM_ADDRESS_LENGTH && copiedText !== 'null') {
      setValue('receiverPublicKeyHash', copiedText);
      await trigger('receiverPublicKeyHash');
    }
  };

  const onChangeAccountPress = async () => {
    if (isTransferBetweenAccountsDisabled) {
      return showWarningToast({ message: 'Please, add one more account' });
    }
    const selectedAccount = account ?? allAccountsWithoutSelected[0];
    navigate(ScreensEnum.SendAccountsSelector, { account: selectedAccount as AccountInterface });
  };

  return (
    <View style={styles.root}>
      <Row style={styles.transferBetweenAccountsContainer}>
        <Text style={styles.modalText as ViewStyleProps}>Address</Text>

        <Pressable onPress={onChangeAccountPress} disabled={false}>
          <Row>
            <Text style={styles.themeText as ViewStyleProps}>Select wallet  </Text>
            <Icon name={IconNameEnum.Wallet} size={16} />
          </Row>
        </Pressable>
      </Row>

      <Controller
        control={control}
        name="receiverPublicKeyHash"
        rules={receiverPublicKeyHashRules}
        render={({ field }) => (
          <TextInput
            field={field}
            placeholder={addressPlaceholder}
            containerStyle={styles.publicKeyHashContainer}
            inputContainerStyle={styles.publicKeyHashInputContainer}
            inputStyle={styles.publicKeyHashInput as ViewStyleProps}
            // multiline
            clearIconStyles={styles.publicKeyHashClearIcon}
            error={errors?.receiverPublicKeyHash?.message}
          >
            {isMobile && (
              <View>
                <Row style={styles.publicKeyHashFooter}>
                  <TouchableIcon onPress={navigateToScanQrCode} name={IconNameEnum.Qrscan} />
                  <View>
                    <Button
                      title="Paste"
                      onPress={onPastePress}
                      theme={ButtonThemesEnum.Ternary}
                      size={ButtonSizeEnum.Fluid}
                    />
                  </View>
                </Row>
              </View>
            )}
          </TextInput>
        )}
      />

    </View>
  );
};
