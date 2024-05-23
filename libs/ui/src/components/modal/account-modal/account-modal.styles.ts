import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  accountContainer: {
    maxWidth: getCustomSize(29),
    // flexGrow: 1,
    // flexShrink: 1,
    paddingRight: getCustomSize(2)
  },
  accountName: {
    ...typography.captionInterSemiBold13,
    marginLeft: getCustomSize(0.5),
    // flexGrow: 1,
    // flexShrink: 1
  },
  // modal
  container: {
    // 
  },
  modalView: {
    width: '100%',
    backgroundColor: colors.bgDarkDeep,
    borderWidth: 1,
    borderColor: '#202027',
    borderRadius: 8,
    padding: 16,
    paddingBottom: 24,
    // gap: 24,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});
