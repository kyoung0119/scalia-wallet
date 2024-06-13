import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    margin: 16,
    padding: 0
  },
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
  qrCodeWrapper: {
    marginVertical: isWeb ? getCustomSize(4) : getCustomSize(8),
    borderRadius: getCustomSize(0.25),
    overflow: 'hidden'
  },
  text: {
    marginBottom: 16,
    ...typography.captionInterRegular11,
    color: colors.textGrey2,
    textAlign: 'center'
  },
  addressWrapper: {
    width: '100%'
  },
  address: {
    overflow: 'hidden',
    justifyContent: "space-between",
    backgroundColor: colors.bgTransparentTheme,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.theme,
    borderRadius: 8,
    ...typography.numbersIBMPlexSansMedium13,
    textAlign: 'center',
    fontWeight: 600
  },
  buttonCopy: {
    minWidth: '100%',
    padding: 12,
    flexGrow: 0,
  }
});
