import React, { FC, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { Row } from '../../row/row';
import { Column } from '../../column/column';
import { Text } from '../../text/text';
import { Icon } from '../../icon/icon';
import { TouchableIcon } from '../../touchable-icon/touchable-icon';
import { IconNameEnum } from '../../icon/icon-name.enum';

import { PKBackupRevealModal } from './pk-backup-reveal-modal/pk-backup-reveal-modal';
import { PKBackupCopyModal } from './pk-backup-copy-modal/pk-backup-copy-modal';

import { useModalStep } from '../../../hooks/use-modal-step.store';
import { useNewWallet } from '../../../hooks/use-new-wallet.hook';

import { styles } from './pk-backup-modal.styles';
import { ViewStyleProps } from 'src/interfaces/style.interface';

interface Props {
  activeItemId?: number;
}

export const PKBackupModal: FC<Props> = ({ activeItemId }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [pkBackupModalStep] = useModalStep("pkBackupModalStep");
  const { isNewWallet, setIsNewWallet } = useNewWallet();

  const handleBackupClick = () => {
    setModalVisible(true);
  };

  const closeBackupSection = () => {
    setIsNewWallet(false)
  }

  return (
    <>
      {isNewWallet && (
        <TouchableOpacity onPress={handleBackupClick}>
          <Row style={styles.backupSection}>
            <Column style={{ alignSelf: 'flex-start' }}>
              <Icon name={IconNameEnum.IconWarning} size={20.5} />
            </Column>
            <Column>
              <Text style={styles.backupText as ViewStyleProps}>Back up this wallet</Text>
              <Text style={styles.backupSubText as ViewStyleProps}>To keep wallet safe, backup private key now!</Text>
            </Column>
            <Column style={{ alignSelf: 'flex-start' }}>
              <TouchableIcon
                onPress={closeBackupSection}
                name={IconNameEnum.Close}
                width={16}
                height={16}
              />
            </Column>
          </Row>
        </TouchableOpacity>
      )}

      <Modal
        isVisible={isModalVisible}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        style={{ justifyContent: 'flex-start', margin: 16 }}
      >
        <View style={styles.modalView}>
          {
            pkBackupModalStep === 'reveal' &&
            <PKBackupRevealModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          }
          {
            pkBackupModalStep === 'copy' &&
            <PKBackupCopyModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          }
        </View>
      </Modal>
    </>
  );
};
