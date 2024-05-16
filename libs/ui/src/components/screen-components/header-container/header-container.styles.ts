import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    paddingTop: isWeb ? 12 : getCustomSize(5.5),
    paddingHorizontal: 12,
    paddingBottom: 18,
    backgroundColor: colors.bgDarkLight,
    zIndex: 2
  },
  paddingTop: {
    paddingTop: isWeb ? getCustomSize(0.375) : getCustomSize(4.625)
  },
  children: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});
