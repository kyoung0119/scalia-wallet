import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: getCustomSize(2),
  },
  active: {
    backgroundColor: colors.bgGrey2,
    borderWidth: 1,
    borderColor: colors.theme
  },
  wrapper: {
    justifyContent: 'space-between',
    flex: 1
  }
});
