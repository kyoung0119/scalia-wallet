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

  sendBlock: {
    marginBottom: getCustomSize(1.125),
    justifyContent: 'space-between'
  },
  operationText: {
    ...typography.captionInterSemiBold13,
    color: colors.textGrey3
  },

  symbol: {
    ...typography.numbersIBMPlexSansMedium15
  },
  symbolColor: {
    color: colors.textGrey2,
    marginLeft: getCustomSize(0.25)
  },
  receiverBlock: {
    justifyContent: 'space-between'
  },
  footerMargin: {
    marginBottom: getCustomSize(3.625)
  },
  storageFeeInputContainer: {
    marginTop: getCustomSize(3.25)
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
  modalText: {
    ...typography.AltoneVariable14,
    color: colors.textGrey9,
    fontWeight: 500,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10, // Adjust as needed for spacing
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
  },
  iconSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 80
  },
  sentIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Semi-transparent background
    borderRadius: 120,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    padding: 32,
    marginBottom: 16
  },
  bannerText: {
    ...typography.AltoneVariable20,
    color: colors.white,
    fontWeight: '700'
  },
  iconClose: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 48
  },
});
