import React, { FC } from 'react';
import { View } from 'react-native';

import { Row } from '../../../row/row';
import { Text } from '../../../text/text';
import { Button } from '../../../button/button';
import { ButtonThemesEnum } from '../../../button/enums';
import { ButtonWithIcon } from '../../..//button-with-icon/button-with-icon';
import { ButtonWithIconThemesEnum } from '../../../button-with-icon/enums';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';

import { setAccountModalStep } from '../../../../hooks/use-account-modal-step.store';

import { styles } from './account-import-modal.styles';

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export const AccountImportModal: FC<Props> = ({ isModalVisible, setModalVisible }) => {

  const toggleModal = () => {
    setAccountModalStep("select")
    setModalVisible(!isModalVisible);
  };

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

      <Text style={styles.headerText}>Import wallet</Text>

      <Button
        title="Import via Seedphrase"
        theme={ButtonThemesEnum.Primary}
        style={[styles.buttonModal]}
      // onPress={}
      />
      <ButtonWithIcon
        title="Import via Private key"
        theme={ButtonWithIconThemesEnum.Primary}
        rightIcon={IconNameEnum.Key}
        iconSize={16}
        onPress={() => setAccountModalStep("importpk")}
        style={styles.buttonModal}
      />
    </View>
  );
};
