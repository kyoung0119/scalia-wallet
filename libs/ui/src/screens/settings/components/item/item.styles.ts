import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    // height: getCustomSize(6),
    padding: 16
  },
  content: {
    justifyContent: 'space-between'
  },
  title: {
    ...typography.AltoneVariable14,
    fontWeight: 600
  },
  icon: {
    backgroundColor: colors.bgTransparentTheme, // Semi-transparent background
    borderRadius: 40,
    padding: 6,
    marginRight: 16,
  }
});
