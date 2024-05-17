import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 12
  },
  loader: {
    paddingTop: getCustomSize(2)
  }
});
