import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';
import { typography } from '../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    padding: 16
  },
  icon: {
    marginBottom: getCustomSize()
  },
  title: {
    maxWidth: getCustomSize(33),
    ...typography.AltoneVariable20,
    fontWeight: 700,
    color: colors.white
  }
});
