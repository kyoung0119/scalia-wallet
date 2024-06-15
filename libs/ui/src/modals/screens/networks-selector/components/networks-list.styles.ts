import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  overlay: {
    // flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  contextMenu: {
    position: 'absolute',
    backgroundColor: colors.bgDarkDeep,
    borderWidth: 1,
    borderColor: '#28282F',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
  },
  menuItem: {
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  resetText: {
    marginLeft: 8,
    ...typography.AltoneVariable14,
    color: colors.white,
    fontWeight: 600
  },
  removeText: {
    marginLeft: 8,
    ...typography.AltoneVariable14,
    color: colors.red,
    fontWeight: 600
  },

});
