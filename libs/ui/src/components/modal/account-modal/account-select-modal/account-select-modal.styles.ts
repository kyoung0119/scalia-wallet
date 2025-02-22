import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  iconClose: {
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
  scrollContainer: {
    width: '100%',
    maxHeight: 300,
    flex: 1,
    paddingBottom: 16,
  },
  buttonModal: {
    minWidth: '100%',
    padding: 12,
    flexGrow: 0,
  },
  buttonImport: {
    marginBottom: getCustomSize(2),
  },
  publicKeyHashContainer: {
    // alignSelf: 'flex-end'
  },
  publicKeyHashText: {
    ...typography.Monospace14,
    fontWeight: '600',
  }
});
