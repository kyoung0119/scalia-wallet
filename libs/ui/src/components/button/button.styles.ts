import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getCustomSize(3),
    borderWidth: 1,
    flexGrow: 1
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.textGrey1
  },
  // primary
  buttonPrimary: {
    backgroundColor: 'transparent',
    borderColor: colors.theme
  },
  textPrimary: {
    color: colors.theme,
    fontWeight: '600',
    ...typography.AltoneVariableBold14
  },
  // secondary
  buttonSecondary: {
    borderColor: 'transparent',
    backgroundColor: colors.theme,
  },
  textSecondary: {
    color: colors.black,
    fontWeight: '600',
    ...typography.AltoneVariableBold14,
  },
  buttonTernary: {
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  textTernary: {
    color: colors.orange,
    ...typography.taglineInterSemiBoldUppercase11
  },
  // disabled
  disabledButton: {
    borderColor: 'transparent',
    backgroundColor: colors.bgGrey5
  },
  disabledText: {
    color: colors.textGrey2,
    ...typography.taglineInterSemiBoldUppercase15
  },
  // size
  fluid: {
    width: '100%'
  },
  auto: {
    width: 'auto',
    height: 'auto'
  },
  large: {
    height: getCustomSize(5)
  },
  medium: {
    height: getCustomSize(4)
  },
  small: {
    height: getCustomSize(3.25)
  }
});
