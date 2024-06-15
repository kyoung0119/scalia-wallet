import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  name: {
    marginLeft: 12,
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey1
  },
  nameContainer: {
    maxWidth: getCustomSize(30)
  },
  textContainer: {
    flex: 1
  }
});
