import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start'
  },
  tokenInfoRow: {
    justifyContent: 'space-between'
  },
  tokenInfoRight: {
    margin: 16
  },
  divider: {
    width: '100%',
    height: getCustomSize(0.5),
    backgroundColor: colors.bgGrey1
  }
});
