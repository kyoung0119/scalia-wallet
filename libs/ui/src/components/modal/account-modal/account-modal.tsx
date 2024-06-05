import React, { FC, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { Row } from '../../row/row';
import { Text } from '../../text/text';
import { RobotIcon } from '../../robot-icon/robot-icon';
import { HeaderSelectorsTestIDs } from '../../screen-components/header-container/components/header-selectors/header-selectors.test-ids';

import { AccountSelectModal } from './account-select-modal/account-select-modal';
import { AccountCreateModal } from './account-create-modal/account-create-modal';
import { AccountImportModal } from './account-import-modal/account-import-modal';
import { AccountImportPKModal } from './account-import-pk-modal/account-import-pk-modal';
import { AccountImportSeedModal } from './account-import-seed-modal/account-import-seed-modal';

import { useModalStep } from '../../../hooks/use-modal-step.store';
import {
  useSelectedAccountSelector,
  useSelectedAccountPublicKeyHashSelector
} from '../../../store/wallet/wallet.selectors';

import { styles } from './account-modal.styles';

interface Props {
  activeItemId?: number;
}

export const AccountModal: FC<Props> = ({ activeItemId }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { name } = useSelectedAccountSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const [accountModalStep] = useModalStep("accountModalStep");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleModal}
        style={styles.accountContainer}
        testID={HeaderSelectorsTestIDs.AccountSelectorButton}
      >
        <Row>
          <View style={styles.button}>
            <RobotIcon seed={publicKeyHash} />
          </View>

          <Text numberOfLines={1} style={styles.accountName}>
            {name}
          </Text>
        </Row>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        animationIn={'fadeInDown'}
        animationOut={'fadeOutUp'}
        style={{ justifyContent: 'flex-start', margin: 16 }}
      >
        <View style={styles.modalView}>
          {
            accountModalStep === 'select' &&
            <AccountSelectModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          }
          {
            accountModalStep === 'import' &&
            <AccountImportModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          }
          {
            accountModalStep === 'create' &&
            <AccountCreateModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          }
          {
            accountModalStep === 'importpk' &&
            <AccountImportPKModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          }
          {
            accountModalStep === 'importseed' &&
            <AccountImportSeedModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          }
        </View>
      </Modal>
    </>
  );
};
