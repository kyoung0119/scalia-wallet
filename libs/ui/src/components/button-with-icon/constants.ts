import { styles } from './button-with-icon.styles';
import { ButtonWithIconSizeEnum, ButtonWithIconThemesEnum } from './enums';

export const themeClasses = {
  [ButtonWithIconThemesEnum.Primary]: {
    button: styles.buttonPrimary,
    text: styles.textPrimary
  },
  [ButtonWithIconThemesEnum.Secondary]: {
    button: styles.buttonSecondary,
    text: styles.textSecondary
  },
  [ButtonWithIconThemesEnum.Tertiary]: {
    button: styles.buttonTertiary,
    text: styles.textTertiary
  }
};

export const sizeClasses = {
  [ButtonWithIconSizeEnum.Large]: styles.large,
  [ButtonWithIconSizeEnum.Medium]: styles.medium,
  [ButtonWithIconSizeEnum.Small]: styles.small
};
