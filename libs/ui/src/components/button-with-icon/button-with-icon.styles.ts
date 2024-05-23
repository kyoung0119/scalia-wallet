import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexBasis: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getCustomSize(3),
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  // primary
  buttonPrimary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.theme
  },
  textPrimary: {
    color: colors.theme,
    fontWeight: '600',
    ...typography.AltoneVariableBold14
  },
  // secondary
  buttonSecondary: {
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: colors.theme
  },
  textSecondary: {
    color: colors.textGrey1
  },
  // tertiary
  buttonTertiary: {
    paddingVertical: getCustomSize(1.5),
    backgroundColor: colors.navGrey1
  },
  textTertiary: {
    color: colors.textGrey1,
    ...typography.taglineInterSemiBoldUppercase13
  },
  // disabled
  buttonDisabled: {
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  textDisabled: {
    color: colors.bgGrey5
  },
  // size
  large: {
    ...typography.taglineInterSemiBoldUppercase15
  },
  medium: {
    ...typography.taglineInterSemiBoldUppercase13
  },
  small: {
    ...typography.taglineInterSemiBoldUppercase11
  },
  rightIcon: {
    marginLeft: getCustomSize(0.5)
  },
  leftIcon: {
    marginRight: getCustomSize(0.5)
  }
});
