import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { extensionHeight, maximiseViewStyles } from '../../components/navigator/utils/maximise-view-options';
import { colors } from '../../styles/colors';
import { EXTENSION_FULL_SIZE, getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isFullpage } from '../../utils/location.utils';

export const styles = StyleSheet.create({
  root: {
    height: isMobile ? '100%' : isFullpage ? extensionHeight : EXTENSION_FULL_SIZE,
    justifyContent: 'space-between',
    backgroundColor: colors.bgGrey1,
    ...(isFullpage && {
      marginTop: maximiseViewStyles.marginTop,
      borderRadius: maximiseViewStyles.borderRadius
    })
  },
  logoContainer: {
    backgroundColor: colors.bgGrey2,
    backgroundImage: `radial-gradient(ellipse at 30% 10%, #81563c 1%, transparent 35%), radial-gradient(ellipse at 70% 10%, #315270 1%, #16161C 35%)`,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...(isFullpage && {
      borderRadius: maximiseViewStyles.borderRadius
    })
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  logoIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Semi-transparent background
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
    padding: 8,
    marginBottom: 16,
  },
  logoIcon: {
    width: 48,
    height: 48,
  },
  bottomBlock: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.bgDarkLight,
    paddingVertical: getCustomSize(3),
    paddingHorizontal: getCustomSize(4),
    ...(isFullpage && {
      borderRadius: maximiseViewStyles.borderRadius
    })
  },
  password: {
    position: 'relative',
    width: '100%'
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
    borderTopLeftRadius: getCustomSize(2),
    borderTopRightRadius: getCustomSize(2),
    marginVertical: 24
  },
  iconContainer: {
    backgroundColor: colors.bgGrey4,
    alignSelf: 'flex-end',
    marginBottom: getCustomSize(3.625),
    borderRadius: getCustomSize(),
    marginLeft: getCustomSize()
  },
  icon: {
    margin: getCustomSize()
  },
  button: {
    minWidth: '100%',
    marginBottom: 24
  },
  textContainer: {
    justifyContent: 'center'
  },
  bannerText: {
    ...typography.AltoneVariable32,
    color: colors.white,
    fontWeight: '600'
  },
  commonText: {
    ...typography.AltoneVariable16,
    color: colors.textGrey8
  },
  linkText: {
    ...typography.AltoneVariableSemiBold14,
    color: colors.theme,
    fontWeight: '500'
    // textDecorationLine: 'underline'
  },
  madLogo: {
    minHeight: getCustomSize(8),
    marginBottom: getCustomSize(4.25),
    marginTop: getCustomSize(5)
  }
});
