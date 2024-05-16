import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { GestureResponderEvent, View, TouchableOpacity } from 'react-native';
import { isMobile } from 'shared';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { IconWithBorder } from '../../../../components/icon-with-border/icon-with-border';
import { Row } from '../../../../components/row/row';
import { HeaderAccountBalance } from '../../../../components/screen-components/header-container/components/header-account-balance/header-account-balance';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { NetworkSelectorDropdown } from '../../../../components/network-selector-dropdown/network-selector-dropdown';
import { CopyText } from '../../../../components/copy-text/copy-text';

import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';

import { handleSetValueToClipboard } from '../../../../utils/copy-to-clipboard.util';
import { share } from '../../../..//utils/share.util';

import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';

import { styles } from './header.styles';

interface Props {
  changeQrCodeVisibility: OnEventFn<GestureResponderEvent>;
}

export const Header: FC<Props> = ({ changeQrCodeVisibility }) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { iconName } = useSelectedNetworkSelector();
  const copyAddress = () => handleSetValueToClipboard(publicKeyHash);
  const shareAddress = () => share({ message: publicKeyHash });
  const { navigate } = useNavigation();
  const selectNetwork = () => navigate(ScreensEnum.NetworksSelector);

  return (
    <HeaderContainer isSelectors>
      <View style={styles.container}>
        {/* <Row style={styles.root}>
          {isMobile && <TouchableIcon name={IconNameEnum.Qrscan} onPress={openCameraToScanQrCode} style={styles.icon} />}
          <TouchableIcon name={IconNameEnum.Qrcode} onPress={changeQrCodeVisibility} />
        </Row> */}
        <HeaderAccountBalance style={styles.accountBalance} />

        <Row style={styles.accountAddress}>
          <CopyText text={publicKeyHash} />
          {isMobile && <TouchableIcon name={IconNameEnum.Share} onPress={shareAddress} style={styles.shareIcon} />}
          <TouchableIcon name={IconNameEnum.Copy} onPress={copyAddress} width={16} height={16} />
        </Row>

        <Row style={styles.network}>
          <NetworkSelectorDropdown activeItemId={0} />
          <TouchableOpacity
            onPress={selectNetwork}
            style={styles.button}
          >
            <IconWithBorder>
              <Icon name={iconName ?? IconNameEnum.NetworkFallback} />
            </IconWithBorder>
          </TouchableOpacity>
        </Row>

      </View>
    </HeaderContainer>
  );
};
