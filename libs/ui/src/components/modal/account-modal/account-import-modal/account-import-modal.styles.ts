import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
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
});
