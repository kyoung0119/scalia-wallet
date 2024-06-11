import { StyleSheet } from 'react-native';
import { isAndroid } from 'shared';

import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';
import { colors } from './../../../../../../styles/colors';

export const styles = StyleSheet.create({
  assetContainer: {
    flexDirection: 'column-reverse',
    paddingTop: 12,
    ...(!isAndroid && { paddingBottom: 12 })
  },
  amountInput: {
    ...typography.numbersIBMPlexSansMedium20,
    ...(!isAndroid && { height: getCustomSize(3.125) })
  },
  inputCurrency: {
    position: 'absolute',
    bottom: getCustomSize(2),
    right: 48,
    ...typography.AltoneVariable16,
    fontWeight: 600,
    color: colors.textGrey8
  },
  toggleIcon: {
    position: 'absolute',
    bottom: 14,
    right: getCustomSize(1.5)
  }
});
