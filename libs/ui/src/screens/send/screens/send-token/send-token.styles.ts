import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  screenTitle: {
    maxWidth: getCustomSize(20),
    textAlign: 'center',
    alignSelf: 'center'
  },
  rowMarginVertical: {
    marginBottom: 24
  },
  captionRowContainer: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(),
  },
  balanceContainer: {
    alignItems: 'center',
  },
  modalText: {
    ...typography.AltoneVariable14,
    color: colors.textGrey9,
    fontWeight: 500,
  },
  balanceText: {
    ...typography.AltoneVariable14,
    color: colors.textGrey7,
    fontWeight: 500
  },
  balanceValue: {
    ...typography.AltoneVariable14,
    color: colors.textGrey9,
    fontWeight: 600
  },
  themeText: {
    ...typography.AltoneVariable14,
    color: colors.theme,
    fontWeight: 600
  },
  gasCostText: {
    ...typography.AltoneVariable14,
    color: colors.textGrey7,
    fontWeight: 600
  },
  undefinedText: {
    ...typography.AltoneVariable14,
    color: colors.textGrey7,
    fontWeight: 500,
  },
  buttonModal: {
    // minWidth: '100%',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    // flexGrow: 0,
  },
  senderContainer: {
    flex: 1,
  },
  receiverContainer: {
    flex: 1,
    textAlign: 'right'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10, // Adjust as needed for spacing
  },
});
