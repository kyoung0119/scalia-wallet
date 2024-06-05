import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';

import { Row } from '../../../row/row';
import { Text } from '../../../text/text';
import { Button } from '../../../button/button';
import { ButtonWithIcon } from '../../../button-with-icon/button-with-icon';
import { ButtonThemesEnum } from '../../../button/enums';
import { ButtonWithIconThemesEnum } from '../../../button-with-icon/enums';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';

import { setpkBackupModalStep } from '../../../../hooks/use-modal-step.store';
import {
  useSelectedAccountPublicKeyHashSelector,
} from '../../../../store/wallet/wallet.selectors';
import { handleSetValueToClipboard } from '../../../../utils/copy-to-clipboard.util';
import { useRevealPrivateKey } from '../../../../shelter/hooks/use-reveal-private-key.hook';

import { styles } from './pk-backup-copy-modal.styles';
import { ViewStyleProps } from 'src/interfaces/style.interface';

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export const PKBackupCopyModal: FC<Props> = ({ isModalVisible, setModalVisible }) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const copyAddress = () => handleSetValueToClipboard(publicKeyHash);
  const [privateKey, setPrivateKey] = useState('');
  const revealPrivateKey = useRevealPrivateKey();

  useEffect(() => {
    revealPrivateKey({
      publicKeyHash,
      successCallback: privateKeyParam => {
        setPrivateKey(privateKeyParam)
      }
    });
  }, [publicKeyHash]);

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

      <Row style={styles.pkSection}>
        <Text style={styles.pkText as ViewStyleProps}>{privateKey}</Text>
      </Row>

      <ButtonWithIcon
        title="Copy"
        theme={ButtonWithIconThemesEnum.Secondary}
        rightIcon={IconNameEnum.CopyDark}
        iconSize={16}
        onPress={copyAddress}
        style={[styles.buttonModal, styles.buttonCopy]}
      />
      <Button
        title="Done"
        theme={ButtonThemesEnum.Primary}
        style={styles.buttonModal}
        onPress={toggleModal}
      />
    </View >
  );
};
