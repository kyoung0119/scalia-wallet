import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { colors } from '../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    height: getCustomSize(3),
    justifyContent: 'space-between',
    marginBottom: 16
  },
  title: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  maxWidth: {
    maxWidth: getCustomSize(20),
    flexShrink: 1,
    overflow: 'hidden',
    ...(isWeb && { whiteSpace: 'nowrap' })
  },
  altone14Text: {
    ...typography.AltoneVariable14,
    fontWeight: 500,
  },
  gasAmountDollarText: {
    color: colors.theme,
    marginLeft: 8
  },
  symbol: {
    color: colors.textGrey2,
    marginLeft: getCustomSize(0.25)
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8
  }
});
