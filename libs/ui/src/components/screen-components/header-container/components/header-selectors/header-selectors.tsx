import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon } from '../../../../icon/icon';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { RobotIcon } from '../../../../robot-icon/robot-icon';
import { Row } from '../../../../row/row';
import { Text } from '../../../../text/text';

import { AccountModal } from '../../../../../components/modal/account-modal/account-modal';
import { ScreensEnum } from '../../../../../enums/sreens.enum';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector
} from '../../../../../store/wallet/wallet.selectors';

import { HeaderSelectorsTestIDs } from './header-selectors.test-ids';

import { styles } from './header-selectors.styles';

export const HeaderSelectors: FC = () => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { name } = useSelectedAccountSelector();
  const { navigate } = useNavigation();

  const selectAccount = () => navigate(ScreensEnum.AccountsSelector);
  const selectSettings = () => navigate(ScreensEnum.Settings);

  return (
    <Row style={styles.root}>
      <AccountModal />

      <TouchableOpacity
        onPress={selectAccount}
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
      <Row>
        <TouchableOpacity
          onPress={selectSettings}
          testID={HeaderSelectorsTestIDs.NetworkSelectorButton}
        >
          <Icon name={IconNameEnum.Settings} />
        </TouchableOpacity>
      </Row>
    </Row>
  );
};
