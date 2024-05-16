import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: isWeb ? 18 : 9,
    backgroundColor: colors.bgDarkDeep,
    gap: 8
  }
});
