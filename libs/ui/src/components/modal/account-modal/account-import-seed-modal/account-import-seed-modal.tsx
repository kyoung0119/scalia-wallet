import React, { FC, useEffect, useMemo } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { RouteProp, useRoute } from '@react-navigation/native';
import { isNotEmptyString } from '@rnw-community/shared';
import { derivationPathByNetworkType, generateHdAccount } from 'shelter';

import { Row } from '../../../row/row';
import { Column } from '../../../column/column';
import { Text } from '../../../text/text';
import { TextInput as CustomTextInput } from '../../../text-input/text-input';
import { Button } from '../../../button/button';
import { ButtonThemesEnum } from '../../../button/enums';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';
import { Pressable } from '../../../pressable/pressable';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Paste } from '../../../paste/paste';

import { setAccountModalStep } from '../../../../hooks/use-modal-step.store';
import { useImportSeedPhrase } from '../../../../hooks/use-import-seed-phrase.hook';
import { useCreateImportedAccount } from '../../../../shelter/hooks/use-create-imported-account.hook';
import { useAllAccountsSelector, useSelectedNetworkTypeSelector } from '../../../../store/wallet/wallet.selectors';
import { useAccountFieldRules } from '../../../../modals/hooks/use-validate-account-field.hook';

import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';

import { styles } from './account-import-seed-modal.styles';
import { AddBySeedPhraseTestIDs } from './seed-phrase.test-ids';

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export const AccountImportSeedModal: FC<Props> = ({ isModalVisible, setModalVisible }) => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.AddAccount>>();

  const networkType = useSelectedNetworkTypeSelector();
  const accounts = useAllAccountsSelector();
  const createImportedAccount = useCreateImportedAccount();
  const {
    mnemonic,
    isEmptyFieldsExist,
    error,
    scrollViewRef,
    wordsAmount,
    selectedInputIndex,
    isShowProtectLayout,
    isSubmitted,
    setIsSubmitted,
    checkErrors,
    navigateToWordsAmountSelector,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    handleShowLayout,
    scrollToOffset,
    handlePasteMnemonicFromClipboard
  } = useImportSeedPhrase(routeParams?.wordsAmount);

  const lastAccountIndex = accounts.length + 1;
  const defaultValue = `Account ${lastAccountIndex}`;
  const { nameRules, derivationPathRules } = useAccountFieldRules();

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setError,
    formState: { errors, isSubmitSuccessful }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: defaultValue,
      derivationPath: derivationPathByNetworkType[networkType](0)
    },
    shouldFocusError: false
  });

  const accountName = watch('name');

  useEffect(() => {
    clearErrors();
  }, [accountName, mnemonic]);

  const onSubmit = async ({ name, derivationPath }: { name: string; derivationPath: string }) => {
    setIsSubmitted(true);

    const isError = checkErrors();

    if (!isError && !Object.keys(errors).length) {
      const hdAccount = await generateHdAccount(
        mnemonic.filter(word => isNotEmptyString(word)).join(' '),
        derivationPath
      );

      for (const account of accounts) {
        if (account.networksKeys[networkType]?.publicKey === hdAccount.publicKey) {
          scrollToOffset();

          return setError('derivationPath', { message: 'This account already imported!' }, { shouldFocus: false });
        }
      }

      createImportedAccount({ name: name.trim().length ? name.trim() : defaultValue, hdAccount, networkType });
    }
  };

  const containerError = useMemo(() => error === 'Wrong combination. Try again.', [error]);

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

      <ScrollView ref={scrollViewRef} style={styles.root}>
        <Controller
          control={control}
          name="name"
          rules={nameRules}
          render={({ field }) => (
            <CustomTextInput
              field={field}
              label="Account name"
              placeholder={defaultValue}
              error={errors?.name?.message}
              required={false}
              containerStyle={styles.inputNameContainer}
            />
          )}
        />

        {/* <Row style={styles.wordsAmount}>
          <Text style={styles.amountWordsText}>Mnemonic Length</Text>

          <Pressable onPress={navigateToWordsAmountSelector}>
            <Row style={styles.wordsSelector}>
              <Text style={styles.amountWords}>{wordsAmount}</Text>
              <Icon name={IconNameEnum.Dropdown} size={16} />
            </Row>
          </Pressable>
        </Row> */}

        <Column style={[styles.mnemonicContainer, containerError && styles.containerError]}>
          <Row style={styles.wordsWrapper}>
            <Row style={[styles.wordsColumn, styles.marginRight]}>
              {mnemonic.slice(0, wordsAmount).map((word, index) => {
                const value = word;
                const isSelectedInput = index === selectedInputIndex;

                return (
                  <View key={index} style={styles.inputContainer}>
                    <TextInput
                      ref={el => (index === selectedInputIndex ? el?.focus() : null)}
                      value={value}
                      onFocus={el => handleInputFocus(index, el)}
                      onBlur={handleInputBlur}
                      onChangeText={newValue => handleInputChange(newValue, index)}
                      style={[styles.mnemonicInput, isSubmitted && !isNotEmptyString(value) && styles.error]}
                      testID={AddBySeedPhraseTestIDs.SeedPhraseInput}
                    />
                    <Text selectable={false} style={styles.wordIndex}>{`${index + 1}`}</Text>
                    {isNotEmptyString(value) && isShowProtectLayout && !isSelectedInput && (
                      <Pressable onPress={() => handleShowLayout(index)} style={styles.layout}>
                        <Text style={styles.layoutText}>Tap to reveal</Text>
                      </Pressable>
                    )}
                  </View>
                );
              })}
            </Row>
          </Row>

          <Row style={styles.mnemonicButtons}>
            <Paste handlePaste={handlePasteMnemonicFromClipboard} />
          </Row>

          {isNotEmptyString(error) && <Text style={styles.errorText}>{error}</Text>}
        </Column>

        {/* <Controller
          control={control}
          name="derivationPath"
          rules={derivationPathRules}
          render={({ field }) => (
            <CustomTextInput
              field={field}
              label="Derivation Path"
              prompt="Enter your Derivation Path"
              placeholder={networkType === NetworkTypeEnum.EVM ? "m/44'/60'/0'/0/0" : "m/44'/1729'/0'/0'"}
              error={errors?.derivationPath?.message}
              containerStyle={styles.inputDerivationPathContainer}
            />
          )}
        />

        <Announcement>
          <Column style={styles.warningList}>
            <Row style={styles.listItem}>
              <Text style={styles.listDote}>●</Text>
              <Text numberOfLines={2} style={styles.listText}>
                We don't save your derivation path and Mnemonic
              </Text>
            </Row>
            <Row style={styles.listItem}>
              <Text style={styles.listDote}>●</Text>
              <Text numberOfLines={2} style={styles.listText}>
                Only one account will be imported
              </Text>
            </Row>
          </Column>
        </Announcement> */}
      </ScrollView>

      <Button
        title="Import"
        theme={ButtonThemesEnum.Secondary}
        style={[styles.buttonModal]}
        onPress={handleSubmit(onSubmit)}
        disabled={Boolean(Object.keys(errors).length) || (isSubmitSuccessful && isEmptyFieldsExist) || !!error}
      />
    </View>
  );
};
