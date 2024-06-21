import { typography } from './../../../../styles/typography';
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
  },
  networkSelector: {
    backgroundColor: colors.bgDarkDeep,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 40
  },
  networkText: {
    marginLeft: 4,
    ...typography.AltoneVariable14,
    color: colors.textGrey9,
    fontWeight: 600,
  }
});
