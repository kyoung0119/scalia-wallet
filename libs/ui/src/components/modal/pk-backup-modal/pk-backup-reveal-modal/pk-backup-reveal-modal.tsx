import React, { FC } from 'react';
import { View } from 'react-native';

import { Text } from '../../../text/text';
import { Button } from '../../../button/button';
import { ButtonThemesEnum } from '../../../button/enums';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';

import { setpkBackupModalStep } from '../../../../hooks/use-modal-step.store';

import { styles } from './pk-backup-reveal-modal.styles';

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export const PKBackupRevealModal: FC<Props> = ({ isModalVisible, setModalVisible }) => {
  const toggleModal = () => {
    setpkBackupModalStep("reveal")
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <TouchableIcon
        onPress={toggleModal}
        name={IconNameEnum.Close}
        style={styles.iconClose}
        color='#ffffff'
        width={24}
        height={24}
      />

      <Text style={styles.headerText}>Back up your key</Text>
      <Text style={styles.descText}>Your Private key provides full access to your wallet and funds. Do not share this with anyone.</Text>

      <Button
        title="Reveal private key"
        theme={ButtonThemesEnum.Secondary}
        style={[styles.buttonModal]}
        onPress={() => setpkBackupModalStep("copy")}
      // disabled={ }
      />
    </View >
  );
};
