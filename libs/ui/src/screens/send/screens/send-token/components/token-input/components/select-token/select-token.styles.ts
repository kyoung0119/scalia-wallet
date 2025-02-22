import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../../../styles/format-size';
import { typography } from '../../../../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: colors.bgGrey7,
    borderWidth: 1,
    borderColor: colors.bgGrey8,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'space-between',
    // marginBottom: getCustomSize(2)
  },
  container: {
    width: '100%'
  },
  rowContainer: {
    width: '100%',
    justifyContent: 'space-between'
  },
  readOnlyBlock: {
    marginBottom: getCustomSize()
  },
  selectAsset: {
    maxWidth: getCustomSize(14)
  },
  availableBalanceBlock: {
    alignItems: 'flex-end',
    maxWidth: getCustomSize(15)
  },
  availableBalanceText: {
    ...typography.numbersIBMPlexSansRegular11,
    color: colors.textGrey2,
    marginBottom: getCustomSize(0.25)
  },
  availableBalanceNumber: {
    ...typography.numbersIBMPlexSansMedium11,
    color: colors.textGrey4,
    marginRight: getCustomSize(0.25)
  },
  availableBalanceSymbol: {
    ...typography.numbersIBMPlexSansMedium11,
    color: colors.textGrey2
  }
});
