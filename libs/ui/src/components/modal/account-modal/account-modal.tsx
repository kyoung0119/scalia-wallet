import React, { FC, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { Row } from '../../row/row';
import { Text } from '../../text/text';
import { RobotIcon } from '../../robot-icon/robot-icon';
import { HeaderSelectorsTestIDs } from '../../screen-components/header-container/components/header-selectors/header-selectors.test-ids';

import { AccountSelectModal } from './account-select-modal/account-select-modal';
import { AccountImportModal } from './account-import-modal/account-import-modal';
import { AccountImportPKModal } from './account-import-pk-modal/account-import-pk-modal';

import { useAccountModalStep } from '../../../hooks/use-account-modal-step.store';

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

  const [accountModalStep] = useAccountModalStep("accountModalStep");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={styles.container}
    >
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
        style={{ justifyContent: 'flex-start' }}
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
            accountModalStep === 'importpk' &&
            <AccountImportPKModal
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
            />
          }
        </View>
      </Modal>

    </View >
  );
};
