import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Pressable,
  TextInputKeyPressEventData,
  View
} from 'react-native';
import { isMobile, isIOS, isWeb } from 'shared';

import { Button } from '../../components/button/button';
import { ButtonThemesEnum } from '../../components/button/enums';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { Text } from '../../components/text/text';
import { PasswordInput } from '../../components/text-input/components/password-input/password-input';
import { NetworkSelectorDropdown } from '../../components/network-selector-dropdown/network-selector-dropdown';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { useBiometricEnabledSelector } from '../../store/settings/settings.selectors';
import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { MadFishLogo } from '../settings/components/mad-fish-logo/mad-fish-logo';

import { usePasswordLock } from './hooks/use-password-lock.hook';
import { styles } from './unlock.styles';

interface Password {
  password: string;
}

const defaultValues = { password: '' };

const behavior = isIOS ? 'padding' : 'height';

export const UnlockApp: FC = () => {
  const isBiometricEnabled = useBiometricEnabledSelector();
  const { unlock, isLocked } = useUnlock();
  const { navigate, goBack } = useNavigation();

  const {
    control,
    watch,
    handleSubmit,
    setFocus,
    formState: { isSubmitted }
  } = useForm<Password>({
    mode: 'onChange',
    defaultValues
  });
  const { error, isDisabled, onPasswordChange } = usePasswordLock(isSubmitted);

  useEffect(() => void (!isLocked && goBack()), [isLocked]);

  useEffect(() => void (isWeb && setFocus('password')), []);

  const password = watch('password');

  const onUnlock = () => !isDisabled && unlock(password);
  const onResetWallet = () => navigate(ScreensEnum.SettingsResetWalletConfirm);

  const onEnterPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
    isWeb ? event.nativeEvent.key === 'Enter' && onUnlock() : undefined;

  return (
    <KeyboardAvoidingView behavior={behavior} style={styles.root}>
      <View style={styles.logoContainer}>
        <div style={styles.logoSection}>
          <Icon iconStyle={styles.logoIcon} name={IconNameEnum.Logo} size={getCustomSize(6)} />
          <Text style={styles.bannerText}>Welcome!</Text>
          <Text style={styles.commonText} onPress={onResetWallet}>
            Scalia Decentralized Wallet
          </Text>
        </div>
      </View>
      <View style={styles.bottomBlock}>
        <NetworkSelectorDropdown activeItemId={0} />

        <Row style={styles.password}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                field={field}
                label='Enter your password to unlock wallet'
                prompt=''
                error={error}
                onKeyPress={onEnterPress}
                onSubmitEditing={onUnlock}
                onChange={onPasswordChange}
                style={styles.inputContainer}
              />
            )}
          />
          {isMobile && isBiometricEnabled && (
            <Pressable style={styles.iconContainer}>
              <Icon name={IconNameEnum.FaceId} iconStyle={styles.icon} size={getCustomSize(4)} />
            </Pressable>
          )}
        </Row>
        <Button
          title="Sign In"
          theme={ButtonThemesEnum.Secondary}
          style={styles.button}
          onPress={handleSubmit(onUnlock)}
          disabled={isDisabled}
        />
        <Row style={styles.textContainer}>
          <Text style={styles.linkText} onPress={onResetWallet}>
            Forgot password?
          </Text>
        </Row>
        {/* <MadFishLogo style={styles.madLogo} color={colors.bgGrey3} /> */}
        <View style={styles.madLogo} />
      </View>
    </KeyboardAvoidingView>
  );
};
