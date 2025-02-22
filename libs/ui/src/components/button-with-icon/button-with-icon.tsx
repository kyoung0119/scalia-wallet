import React, { FC } from 'react';
import { Pressable, PressableProps, View } from 'react-native';

import { ViewStyleProps } from '../../interfaces/style.interface';
import { colors } from '../../styles/colors';
import { Icon } from '../icon/icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Text } from '../text/text';

import { styles } from './button-with-icon.styles';
import { sizeClasses, themeClasses } from './constants';
import { ButtonWithIconSizeEnum, ButtonWithIconThemesEnum } from './enums';

interface Props extends PressableProps {
  title: string;
  theme?: ButtonWithIconThemesEnum;
  size?: ButtonWithIconSizeEnum;
  rightIcon?: IconNameEnum;
  leftIcon?: IconNameEnum;
  iconSize?: number;
  style?: ViewStyleProps;
  disabled?: boolean;
  iconColor?: string;
}

export const ButtonWithIcon: FC<Props> = ({
  title,
  theme = ButtonWithIconThemesEnum.Primary,
  size = ButtonWithIconSizeEnum.Large,
  rightIcon,
  leftIcon,
  iconSize,
  style,
  disabled = false,
  iconColor,
  ...restProps
}) => (
  <Pressable
    {...restProps}
    disabled={disabled}
    style={({ pressed }) => [styles.root, themeClasses[theme].button, style, pressed && styles.buttonPressed]}
  >
    <View style={styles.wrapper}>
      {leftIcon && (
        <Icon
          name={leftIcon}
          size={iconSize}
          color={disabled ? colors.bgGrey5 : iconColor ?? colors.theme}
          iconStyle={styles.leftIcon}
        />
      )}
      <Text style={[themeClasses[theme].text, disabled && styles.textDisabled]}>{title}</Text>
      {rightIcon && (
        <Icon
          name={rightIcon}
          size={iconSize}
          color={disabled ? colors.bgGrey5 : colors.theme}
          iconStyle={styles.rightIcon}
        />
      )}
    </View>
  </Pressable>
);
