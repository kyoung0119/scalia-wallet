import React, { FC, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { isMobile } from 'shared';

import { Text } from '../../components/text/text';
import { Column } from '../../components/column/column';
import { ButtonWithIcon } from '../../components/button-with-icon/button-with-icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { ButtonWithIconThemesEnum } from '../../components/button-with-icon/enums';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';

import { useDelayedEffect } from '../../hooks/use-delayed-effect.hook';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { ScreensEnum } from '../../enums/sreens.enum';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../store/wallet/wallet.selectors';
import { handleSetValueToClipboard } from '../../utils/copy-to-clipboard.util';
import { share } from '../../utils/share.util';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { ViewStyleProps } from 'src/interfaces/style.interface';

import { styles } from './receive.styles';

export const Receive: FC = () => {
  const { navigate } = useNavigation();
  const [isCopied, setIsCopied] = useState(false);
  const network = useSelectedNetworkSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);
  const copyAddress = () => handleSetValueToClipboard(publicKeyHash);
  const shareAddress = () => share({ message: publicKeyHash });

  useDelayedEffect(() => setIsCopied(false), [isCopied]);

  return (
    <ScreenContainer>
      <ScreenTitle title="Receive" onBackButtonPress={navigateToWallet} />

      <ScreenScrollView style={styles.root}>
        <Column style={styles.container}>
          <View style={styles.qrCodeWrapper}>
            <QRCode
              value={publicKeyHash !== '' ? publicKeyHash : 'Not generated'}
              size={getCustomSize(20)}
              backgroundColor="transparent"
              color={colors.textGrey1}
            />
          </View>

          <Text style={styles.text}>{`Wallet Address on the ${network.name} Network`}</Text>
          <TouchableOpacity onPress={copyAddress} style={styles.addressWrapper}>
            <Text numberOfLines={2} style={styles.address as ViewStyleProps}>
              {publicKeyHash}
            </Text>
          </TouchableOpacity>
        </Column>

        {isMobile &&
          <ButtonWithIcon
            title="Copy address"
            theme={ButtonWithIconThemesEnum.Secondary}
            rightIcon={IconNameEnum.Share}
            iconSize={16}
            onPress={shareAddress}
            style={[styles.buttonCopy]}
          />
        }

        <ButtonWithIcon
          title="Copy address"
          theme={ButtonWithIconThemesEnum.Secondary}
          rightIcon={IconNameEnum.CopyDark}
          iconSize={16}
          onPress={copyAddress}
          style={[styles.buttonCopy]}
        />
      </ScreenScrollView>
    </ScreenContainer>
  );
};
