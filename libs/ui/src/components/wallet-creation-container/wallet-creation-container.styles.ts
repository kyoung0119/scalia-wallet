import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  title: {
    ...typography.bodyInterRegular17
  },
  content: {
    flex: 1,
    width: '100%',
    marginTop: 32,
    paddingHorizontal: getCustomSize(2)
  },
  stepContainer: {
    alignSelf: 'flex-end',
    marginRight: 16
  }
});
