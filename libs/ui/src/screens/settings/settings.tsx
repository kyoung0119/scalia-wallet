import React, { FC } from 'react';
import { Linking, View } from 'react-native';
import { isIOS, isWeb } from 'shared';

import { Divider } from '../../components/divider/divider';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { IconWithBorderEnum } from '../../components/icon-with-border/enums';
import { IconWithBorder } from '../../components/icon-with-border/icon-with-border';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Pressable } from '../../components/pressable/pressable';
import { RobotIcon } from '../../components/robot-icon/robot-icon';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Text } from '../../components/text/text';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useSelectedAccountPublicKeyHashSelector } from '../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../styles/format-size';
import { isFullpage } from '../../utils/location.utils';
import { openFullViewPage } from '../../utils/open-maximise-screen.util';

import EasterEgg from './assets/easter-egg.svg';
import { Item } from './components/item/item';
import { ItemContainer } from './components/item-container/item-container';
import { Separator } from './components/separator/separator';
import { socialMediaLinks } from './constants';
import { styles } from './settings.styles';
import { SettingsTestIDs } from './settings.test-ids';

const dividerSize = getCustomSize(2);
const socialIconSize = getCustomSize(4);

export const Settings: FC = () => {
  const { navigate, goBack } = useNavigation();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  const navigateToAccountsSettings = () => navigate(ScreensEnum.AccountsSettings);
  const navigateToConfirmAccess = () =>
    navigate(ScreensEnum.ConfirmAccess, {
      destination: {
        screen: ScreensEnum.RevealSeedPhrase
      },
      descriptionText: 'Enter your password to reveal seed phrase',
      submitButtonText: 'reveal seed phrase'
    });
  const navigateToSettingsSecurity = () => navigate(ScreensEnum.SettingsSecurity);
  const navigateToSettingsAboutUs = () => navigate(ScreensEnum.SettingsAboutUs);
  const navigateToSettingsResetWalletConfirm = () => navigate(ScreensEnum.SettingsResetWalletConfirm);
  const navigateToAuthorizedDapps = () => navigate(ScreensEnum.AuthorizedDApps);
  const navigateToNetworkSelector = () => navigate(ScreensEnum.NetworksSelector, { isSelector: false });
  const goToTelegram = () => Linking.openURL(socialMediaLinks.telegram);
  const goToTwitter = () => Linking.openURL(socialMediaLinks.twitter);

  return (
    <ScreenContainer>
      <ScreenTitle title="Settings" onBackButtonPress={goBack} />

      <ScreenScrollView style={styles.root} contentContainerStyle={styles.rootContentContainer}>
        {isIOS && (
          <EasterEgg
            style={styles.easterEgg}
            width="100%"
            height={getCustomSize(23)}
            preserveAspectRatio="xMaxYMax slice"
          />
        )}

        <View style={styles.content}>
          <View>
            <ItemContainer>
              <Item title="Wallet settings" icon={IconNameEnum.Wallet} onPress={navigateToAccountsSettings} />
            </ItemContainer>

            <Divider size={dividerSize} />

            <ItemContainer>
              <Item title="Security" icon={IconNameEnum.Security} onPress={navigateToSettingsSecurity} />
            </ItemContainer>

            <Divider size={dividerSize} />

            <ItemContainer>
              <Item title="Privacy" icon={IconNameEnum.Privacy} />
            </ItemContainer>

            <Divider size={dividerSize} />

            <ItemContainer>
              <Item title="Network" icon={IconNameEnum.Network} onPress={navigateToNetworkSelector} />
            </ItemContainer>

            {/* <ItemContainer>
              <Item
                iconComponent={
                  <IconWithBorder type={IconWithBorderEnum.Ternary} style={styles.robot}>
                    <RobotIcon seed={publicKeyHash} size={getCustomSize(1.8)} />
                  </IconWithBorder>
                }
                title="Accounts Settings"
                onPress={navigateToAccountsSettings}
                testID={SettingsTestIDs.AccountsSettingsButton}
              />
              <Separator />
              <Item
                title="Reveal Seed Phrase"
                icon={IconNameEnum.RevealSeedPhrase}
                onPress={navigateToConfirmAccess}
                testID={SettingsTestIDs.RevealSeedPhraseButton}
              />
            </ItemContainer>
 */}


            {/* <Divider size={dividerSize} /> */}

            {/* <ItemContainer>
              <Item title="Authorized DApps" icon={IconNameEnum.DappConnect} onPress={navigateToAuthorizedDapps} />
            </ItemContainer> */}

            {/* <Divider size={dividerSize} /> */}
            {/* 
            <ItemContainer>
              <Item title="About us" icon={IconNameEnum.InfoRed} onPress={navigateToSettingsAboutUs} />
              <Separator />
              <Row style={styles.socialMedia}>
                <Pressable onPress={goToTelegram} style={[styles.socialMediaBlock, styles.telegramBlock]}>
                  <Row>
                    <Icon size={socialIconSize} name={IconNameEnum.Telegram} />
                    <Text style={styles.telegram}>Telegram</Text>
                  </Row>
                </Pressable>
                <Pressable onPress={goToTwitter} style={styles.socialMediaBlock}>
                  <Row>
                    <Icon size={socialIconSize} name={IconNameEnum.Twitter} />
                    <Text style={styles.twitter}>Twitter</Text>
                  </Row>
                </Pressable>
              </Row>
            </ItemContainer> */}

            <View style={styles.resetContainer}>
              <Pressable onPress={navigateToSettingsResetWalletConfirm}>
                <Row>
                  <Text style={styles.resetText}>Reset wallet</Text>
                  {/* <Icon name={IconNameEnum.Out} iconStyle={styles.outIcon} /> */}
                </Row>
              </Pressable>
            </View>
          </View>

        </View>
      </ScreenScrollView>

    </ScreenContainer>
  );
};
