import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    width: '100%'
  },
  rootPrimary: {
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(0.5),
    padding: getCustomSize(1),
    marginBottom: getCustomSize(0.25)
  },
  rootSecondary: {
    backgroundColor: 'transparent',
    // borderTopWidth: getCustomSize(0.0625),
    borderColor: colors.border2,
    paddingBottom: 18
  },
  token: {
    flex: 1
  },
  image: {
    borderColor: colors.bgGrey3,
    borderWidth: getCustomSize(0.25),
    borderRadius: getCustomSize(8),
    marginRight: getCustomSize(0.5)
  },
  imagePrimary: {
    width: getCustomSize(3),
    height: getCustomSize(3)
  },
  imageSecondary: {
    width: getCustomSize(4),
    height: getCustomSize(4)
  },
  text: {
    maxWidth: getCustomSize(16),
    alignItems: 'flex-end'
  },
  textPrimary: {
    ...typography.numbersIBMPlexSansMediumUppercase13
  },
  textSecondary: {
    fontWeight: 600,
    ...typography.AltoneVariable16
  },
  tokenName: {
    color: colors.textGrey8,
    fontWeight: 500,
    ...typography.AltoneVariable14
  },
  rightSideContainer: {
    // alignItems: 'flex-end',
    // flex: 1
  },
  fiatBalance: {
    fontWeight: 600,
    ...typography.AltoneVariable20
  },
  usdSymbol: {
    color: colors.textGrey3
  }
});
