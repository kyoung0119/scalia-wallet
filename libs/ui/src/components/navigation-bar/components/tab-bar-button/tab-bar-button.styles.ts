import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222229',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,

  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: colors.theme,
    fontWeight: 600,
    ...typography.AltoneVariable14,
  }
});
