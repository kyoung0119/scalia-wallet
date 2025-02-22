import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  screenTitle: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  container: {
    margin: 16
  },
  captionRowContainer: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(),
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
  operationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgDarkLight,
    borderWidth: 1,
    borderColor: '#323232',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 24
  },
  modalText: {
    ...typography.AltoneVariable14,
    color: colors.textGrey9,
    fontWeight: 500,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 16
  },
  amountText: {
    ...typography.AltoneVariable32,
    color: colors.theme,
    fontWeight: 600,
    marginBottom: 8
  },
  amountDollarText: {
    ...typography.AltoneVariable16,
    color: colors.white,
    fontWeight: 600,
  },
  title: {
    ...typography.captionInterRegular13,
    marginBottom: getCustomSize(0.75),
    color: colors.textGrey3
  },
  networkContainer: {
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize(),
    padding: getCustomSize(1.5)
  },
  networkName: {
    ...typography.bodyInterSemiBold15,
    marginLeft: getCustomSize(0.5)
  },
  footerMargin: {
    marginBottom: getCustomSize(3.625)
  },
  storageFeeInputContainer: {
    marginTop: getCustomSize(3.25)
  },
  root: {
    width: '100%',
    // paddingHorizontal: getCustomSize(2)
  },
  buttonModal: {
    padding: 12,
    marginBottom: 16,
  },
  confirmButton: {
    marginTop: 16
  },
  cancelButton: {
    marginBottom: 8
  }
});
