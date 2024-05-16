import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ScreensEnum } from '../../../../../enums/sreens.enum';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector
} from '../../../../../store/wallet/wallet.selectors';
import { Icon } from '../../../../icon/icon';
import { IconNameEnum } from '../../../../icon/icon-name.enum';
import { IconWithBorder } from '../../../../icon-with-border/icon-with-border';
import { RobotIcon } from '../../../../robot-icon/robot-icon';
import { Row } from '../../../../row/row';
import { Text } from '../../../../text/text';

import { styles } from './header-selectors.styles';
import { HeaderSelectorsTestIDs } from './header-selectors.test-ids';

export const HeaderSelectors: FC = () => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { name } = useSelectedAccountSelector();
  const { navigate } = useNavigation();

  const selectAccount = () => navigate(ScreensEnum.AccountsSelector);
  const selectSettings = () => navigate(ScreensEnum.Settings);

  return (
    <Row style={styles.root}>
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
