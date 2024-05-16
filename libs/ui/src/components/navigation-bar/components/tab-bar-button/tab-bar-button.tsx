import { emptyFn, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';

import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { TestIDProps } from '../../../../interfaces/test-id.props';
import { colors } from '../../../../styles/colors';
import { Icon } from '../../../icon/icon';
import { IconProps } from '../../../icon/icon.interface';

import { styles } from './tab-bar-button.styles';
import { ViewStyleProps } from 'src/interfaces/style.interface';

type TabBarScreens =
  | ScreensEnum.Wallet
  | ScreensEnum.Receive
  | ScreensEnum.Swap
  | ScreensEnum.SendToken
  | ScreensEnum.Settings;

interface Props extends IconProps, TestIDProps {
  routeName: TabBarScreens;
  focused: boolean;
  disabled?: boolean;
  onDisabledPress?: OnEventFn<void>;
}

export const TabBarButton: FC<Props> = ({
  routeName,
  disabled = false,
  name,
  testID,
  focused,
  onDisabledPress = emptyFn
}) => {
  const { navigate } = useNavigation();
  const color = disabled ? colors.bgGrey5 : focused ? colors.orange : colors.textGrey3;

  const navigateToScreen = () => {
    if (!disabled) {
      return navigate(routeName);
    }

    onDisabledPress();
  };

  return (
    <TouchableOpacity onPress={navigateToScreen} style={styles.root} testID={testID}>
      <Row>
        <Icon name={name} color={color} iconStyle={styles.icon} />
        <Text style={styles.text as ViewStyleProps}>{name}</Text>
      </Row>
    </TouchableOpacity>

  );
};
