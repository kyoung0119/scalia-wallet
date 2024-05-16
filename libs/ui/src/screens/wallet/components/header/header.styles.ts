import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { colors } from '../../../../styles/colors';

export const styles = StyleSheet.create({
  root: {
    paddingTop: getCustomSize(2.625),
    width: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  icon: {
    marginRight: getCustomSize(2)
  },
  accountBalance: {
    // marginLeft: 'auto'
  },
  accountAddress: {
    // justifyContent: 'center',
    marginTop: 6
  },
  network: {
    marginTop: 12
  },
  shareIcon: {
    marginRight: getCustomSize(3)
  },
  button: {
    // padding: getCustomSize(0.5),
    // backgroundColor: colors.navGrey1,
    // borderRadius: getCustomSize(1.75)
  }
});
