import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  headerText: {
    ...typography.AltoneVariable20,
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
  },
  descText: {
    ...typography.AltoneVariable14,
    color: colors.textGrey8,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24
  },
  buttonModal: {
    minWidth: '100%',
    padding: 16,
    flexGrow: 0,
  },
  buttonImport: {
    marginBottom: getCustomSize(2),
  },
  publicKeyHashContainer: {
    alignSelf: 'flex-end'
  },
});
