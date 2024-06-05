import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
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
    marginVertical: 24
  },
  buttonModal: {
    minWidth: '100%',
    padding: 12,
    flexGrow: 0,
  },
  buttonCopy: {
    marginBottom: 16,
  },
  pkSection: {
    justifyContent: "space-between",
    backgroundColor: 'rgba(195, 255, 25, 0.10);',
    marginBottom: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.theme,
    borderRadius: 8,
  },
  pkText: {
    width: '100%',
    ...typography.AltoneVariable14,
    fontWeight: 600,
  },
});
