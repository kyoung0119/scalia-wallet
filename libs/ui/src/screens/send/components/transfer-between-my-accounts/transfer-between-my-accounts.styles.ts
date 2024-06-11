import { StyleSheet } from 'react-native';
import { isMobile, isAndroid, isWeb } from 'shared';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginBottom: 24
  },
  transferBetweenAccountsContainer: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize()
  },
  modalText: {
    ...typography.AltoneVariable14,
    color: colors.textGrey9,
    fontWeight: 500
  },
  themeText: {
    ...typography.AltoneVariable14,
    color: colors.theme,
    fontWeight: 600
  },
  publicKeyHashContainer: {
    // marginBottom: getCustomSize(2)
  },
  publicKeyHashInputContainer: {
    // paddingTop: getCustomSize(1.75),
    justifyContent: 'space-between',
    // paddingBottom: isMobile ? getCustomSize(1) : getCustomSize(1.75),
    // height: isMobile ? getCustomSize(14.75) : getCustomSize(9)
  },
  publicKeyHashInput: {
    ...typography.AltoneVariable14,
    color: colors.textGrey9,
    fontWeight: 500,
    // textAlignVertical: 'top'
    // height: isMobile ? getCustomSize(7.75) : getCustomSize(4.875),
  },
  publicKeyHashClearIcon: {
    alignSelf: 'flex-start',
    ...(isAndroid && { marginTop: getCustomSize(0.75) }),
    // ...(isWeb && { marginTop: -getCustomSize(0.5) })
  },
  publicKeyHashFooter: {
    justifyContent: 'space-between',
    paddingRight: getCustomSize(0.25)
  },
});
