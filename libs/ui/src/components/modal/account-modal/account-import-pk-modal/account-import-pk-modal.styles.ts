import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',   // Align children in a row
    justifyContent: 'space-between', // Distribute children across the space
    alignItems: 'center',  // Center children vertically in the container
  },
  headerText: {
    ...typography.AltoneVariable20,
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
  },
  buttonModal: {
    minWidth: '100%',
    padding: 12,
    flexGrow: 0,
    marginTop: 16
  },
  // pk import
  inputNameContainer: {
    width: '100%',
    marginTop: 24,
    marginBottom: 24
  },
  container: {
    position: 'relative'
  },
  inputContainer: {
    width: '100%'
  },
  inputInnerContainer: {
    // height: getCustomSize(14.75)
  },
  textarea: {
    // height: '100%',
    // paddingRight: getCustomSize(4.25),
    // paddingTop: getCustomSize(1.75),
    // paddingBottom: getCustomSize(1.75)
  },
  clearIcon: {
    position: 'absolute',
    top: isMobile ? getCustomSize(1.5) : getCustomSize(),
    right: 0
  },
  pasteButtonContainer: {
    position: 'absolute',
    bottom: getCustomSize(1.5),
    right: getCustomSize(1.5)
  },
  pasteButtonText: {
    color: colors.orange,
    ...typography.taglineInterSemiBoldUppercase11
  }
});
