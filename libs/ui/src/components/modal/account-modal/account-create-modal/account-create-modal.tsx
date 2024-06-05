import React, { FC } from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';

import { Row } from '../../../row/row';
import { Text } from '../../../text/text';
import { Button } from '../../../button/button';
import { ButtonThemesEnum } from '../../../button/enums';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { TextInput } from '../../../text-input/text-input';

import { setAccountModalStep } from '../../../../hooks/use-modal-step.store';
import { useNewWallet } from '../../../../hooks/use-new-wallet.hook';
import { useCreateHdAccount } from '../../../../shelter/hooks/use-create-hd-account.hook';
import { useAccountNameControl } from '../../../../modals/screens/add-account/hooks/use-account-name-control.hook';

import { styles } from './account-create-modal.styles';

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export const AccountCreateModal: FC<Props> = ({ isModalVisible, setModalVisible }) => {
  const createHdAccount = useCreateHdAccount();
  const { control, nameRules, defaultValue, handleSubmit, errors, isSubmitSuccessful } = useAccountNameControl();
  const { isNewWallet, setIsNewWallet } = useNewWallet();

  const toggleModal = () => {
    setAccountModalStep("select")
    setModalVisible(!isModalVisible);
  };

  const onSubmit = ({ name }: { name: string }) => {
    createHdAccount(name.trim().length ? name.trim() : defaultValue, toggleModal);
    setIsNewWallet(true);
  }

  return (
    <View>
      <Row style={styles.modalHeader}>
        <TouchableIcon
          onPress={() => setAccountModalStep("select")}
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

      <Text style={styles.headerText}>Create wallet</Text>

      <Controller
        control={control}
        name="name"
        rules={nameRules}
        render={({ field }) => (
          <TextInput
            field={field}
            label="Enter a name"
            placeholder={defaultValue}
            error={errors?.name?.message}
            // required={false}
            containerStyle={styles.inputContainer}
          />
        )}
      />

      <Button
        title="Create"
        theme={ButtonThemesEnum.Secondary}
        style={[styles.buttonModal]}
        onPress={handleSubmit(onSubmit)}
        disabled={Boolean(Object.keys(errors).length) || isSubmitSuccessful}
      />
      <Button
        title="Cancel"
        theme={ButtonThemesEnum.Primary}
        onPress={toggleModal}
        style={styles.buttonModal}
      />
    </View>
  );
};
