import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { userDetailsHeight, userDetailsMarginBottom } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  root: {
    // height: userDetailsHeight,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.bgDarkLight
  },
  active: {
    borderWidth: getCustomSize(0.125),
    borderColor: colors.theme
  },
  wrapper: {
    justifyContent: 'space-between',
    flex: 1
  }
});
