import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { isNotEmptyString } from '@rnw-community/shared';

import { Row } from '../../../row/row';
import { Text } from '../../../text/text';
import { TextInput as CustomTextInput } from '../../../text-input/text-input';
import { Button } from '../../../button/button';
import { ButtonThemesEnum } from '../../../button/enums';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';
import { Pressable } from '../../../pressable/pressable';
import { IconNameEnum } from '../../../icon/icon-name.enum';

import { setAccountModalStep } from '../../../../hooks/use-account-modal-step.store';
import { useCreateImportedAccount } from '../../../../shelter/hooks/use-create-imported-account.hook';
import { useAllAccountsSelector, useSelectedNetworkTypeSelector } from '../../../../store/wallet/wallet.selectors';
import { handleSetValueToClipboard } from '../../../../utils/copy-to-clipboard.util';
import { generateHdAccountFromPrivateKey } from '../../../../utils/generate-hd-account-from-private-key.util';
import { useAccountFieldRules } from '../../../../modals/hooks/use-validate-account-field.hook';

import { styles } from './account-import-pk-modal.styles';


interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

interface FormTypes {
  name: string;
  privateKey: string;
}

export const AccountImportPKModal: FC<Props> = ({ isModalVisible, setModalVisible }) => {
  const createImportedAccount = useCreateImportedAccount();
  const networkType = useSelectedNetworkTypeSelector();
  const accounts = useAllAccountsSelector();
  const { nameRules, privateKeyRules } = useAccountFieldRules();

  const lastAccountIndex = accounts.length + 1;

  const defaultName = `Account ${lastAccountIndex}`;
  const defaultValues: FormTypes = {
    name: defaultName,
    privateKey: ''
  };

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setError,
    setValue,
    setFocus,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const accountName = watch('name');
  const privateKey = watch('privateKey');

  useEffect(() => {
    if (privateKey.length > 60) {
      handleSetValueToClipboard('');
    }
  }, [privateKey]);

  useEffect(() => {
    clearErrors();
  }, [accountName]);

  useEffect(() => {
    setFocus('name');
  }, [errors.name]);

  const handlePaste = () =>
    Clipboard.getString().then(value => {
      handleSetValueToClipboard('');

      setValue('privateKey', value);
      clearErrors('privateKey');
    });

  const onSubmit = async (formValue: FormTypes) => {
    if (!Object.keys(errors).length) {
      const hdAccount = await generateHdAccountFromPrivateKey(formValue.privateKey, networkType).catch(() => ({
        publicKey: '',
        address: '',
        privateKey: ''
      }));

      if (!isNotEmptyString(hdAccount.address)) {
        return setError('privateKey', { message: 'Wrong type of private key' });
      }

      for (const account of accounts) {
        if (account.networksKeys[networkType]?.publicKey === hdAccount.publicKey) {
          return setError('privateKey', { message: 'This account already imported!' });
        }
      }

      createImportedAccount({
        name: formValue.name.trim().length ? formValue.name.trim() : defaultName,
        hdAccount,
        networkType
      });
    }
  };

  const toggleModal = () => {
    setAccountModalStep("select")
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <Row style={styles.modalHeader}>
        <TouchableIcon
          onPress={() => setAccountModalStep("import")}
          name={IconNameEnum.ArrowLeft}
        />
        <TouchableIcon
          onPress={toggleModal}
          name={IconNameEnum.Close}
          color='#ffffff'
          width={24}
          height={24}
        />
      </Row>

      <Text style={styles.headerText}>Import wallet</Text>

      <Controller
        control={control}
        name="name"
        rules={nameRules}
        render={({ field }) => (
          <CustomTextInput
            field={field}
            label="Account name"
            placeholder={defaultName}
            error={errors?.name?.message}
            required={false}
            containerStyle={styles.inputNameContainer}
          />
        )}
      />
      <View style={styles.container}>
        <Controller
          control={control}
          name="privateKey"
          rules={privateKeyRules}
          render={({ field }) => (
            <CustomTextInput
              field={field}
              label="Enter your private key string here:"
              placeholder="e.g. b782aa.."
              // multiline
              error={errors?.privateKey?.message}
              containerStyle={styles.inputContainer}
              inputInnerContainerStyle={styles.inputInnerContainer}
              inputStyle={styles.textarea}
              clearIconStyles={styles.clearIcon}
            />
          )}
        />
        <Pressable onPress={handlePaste} style={styles.pasteButtonContainer}>
          <Text style={styles.pasteButtonText}>Paste</Text>
        </Pressable>
      </View>

      <Button
        title="Import"
        theme={ButtonThemesEnum.Secondary}
        style={[styles.buttonModal]}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
