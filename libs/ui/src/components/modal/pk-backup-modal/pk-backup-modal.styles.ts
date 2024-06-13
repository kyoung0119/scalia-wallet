import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    backgroundColor: colors.bgDarkDeep,
    borderWidth: 1,
    borderColor: '#202027',
    borderRadius: 8,
    padding: 16,
    paddingBottom: 24,
    // gap: 24,
    elevation: 5
  },
  // backup notify
  backupSection: {
    justifyContent: "space-between",
    backgroundColor: colors.bgTransparentTheme,
    marginHorizontal: 12,
    padding: 12,
    // marginTop: 20,
    borderWidth: 1,
    borderColor: colors.theme,
    borderRadius: 8,
    // gap: 16
  },
  backupText: {
    ...typography.AltoneVariable16,
    fontSize: 16,
    fontWeight: 600,
  },
  backupSubText: {
    marginTop: 8,
    ...typography.AltoneVariable12,
    fontWeight: 600,
    color: colors.textGrey8
  },
});
