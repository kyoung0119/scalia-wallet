import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.bgGrey7,
    borderWidth: getCustomSize(0.125),
    borderColor: colors.bgGrey8,
    borderRadius: getCustomSize(),
    padding: 9,
  },
  errorContainer: {
    borderColor: colors.red
  },
  focusedContainer: {
    borderColor: colors.border2
  },
  innerContainer: {
    position: 'relative',
    justifyContent: 'space-between'
  },
  input: {
    width: '94%',
    height: 24,
    // height: getCustomSize(5.75),
    color: colors.textGrey7,
    ...typography.bodyInterRegular15,
    ...(isWeb && { outlineStyle: 'none' }),
    ...(isWeb && { caretColor: colors.theme }),
    lineHeight: undefined,
    overflow: 'hidden'
  },
  labelText: {
    color: '#DDD'
  }
});
