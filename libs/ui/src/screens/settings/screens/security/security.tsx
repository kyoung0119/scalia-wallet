import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { isMobile } from 'shared';
import { isDefined } from '@rnw-community/shared';

import { Column } from '../../../../components/column/column';
import { Text } from '../../../../components/text/text';
import { Button } from '../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../components/button/enums';
import { PasswordInput } from '../../../../components/text-input/components/password-input/password-input';
import { Divider } from '../../../../components/divider/divider';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Switch } from '../../../../components/switch/switch';

import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { usePasswordValidation } from '../../../../hooks/use-validation-messages.hook';
import { useToast } from '../../../../hooks/use-toast.hook';
import { useChangePassword } from '../../../../hooks/use-change-password-hook';
import { useScrollToOffset } from '../../../../hooks/use-scroll-to-element.hook';
import { useValidatePasswordForm } from '../../../../hooks/use-validate-password-form.hook';
import { setIsBiometricEnabled } from '../../../../store/settings/settings.actions';
import { useBiometricEnabledSelector, useLockTimePeriodSelector } from '../../../../store/settings/settings.selectors';
import { getCustomSize } from '../../../../styles/format-size';

import { Item } from '../../components/item/item';
import { ItemContainer } from '../../components/item-container/item-container';

import { styles } from './security-styles';

interface FormTypes {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const defaultValues = {
  password: '',
  confirmPassword: '',
  oldPassword: ''
};

export const Security: FC = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const [passwordMatchError, setPasswordMatchError] = useState<string>();
  const { showSuccessToast, showErrorToast } = useToast();
  const { scrollToOffset } = useScrollToOffset();

  const isBiometricEnabled = useBiometricEnabledSelector();

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    setFocus,
    formState: { errors, dirtyFields, isDirty, isSubmitted }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    shouldFocusError: false
  });

  const oldPassword = watch('oldPassword');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handleBiometricChange = () => dispatch(setIsBiometricEnabled(!isBiometricEnabled));

  const { passwordValidationMessages } = usePasswordValidation(password, dirtyFields);

  const passwordIsNoValid = useMemo(
    () =>
      (passwordValidationMessages.some(({ valid, optional }) => !valid && !isDefined(optional)) &&
        dirtyFields.password) ??
      false,
    [passwordValidationMessages, dirtyFields.password]
  );

  const onSuccessFullPasswordChange = useCallback(() => {
    if (password === oldPassword) {
      showErrorToast({ message: 'Old password cannot match the new one' });

      setFocus('password');
    } else {
      showSuccessToast({ message: 'Password was successfully changed' });
      goBack();
    }
  }, [password, oldPassword]);

  const onFailPasswordChange = useCallback(() => {
    if (isDirty && !passwordIsNoValid) {
      setPasswordMatchError('Wrong password');
    }
  }, [isDirty, passwordIsNoValid]);

  const changePassword = useChangePassword(onSuccessFullPasswordChange, onFailPasswordChange);

  const { commonRules, changePasswordRules } = useValidatePasswordForm({
    password,
    confirmPassword,
    trigger,
    confirmPasswordError: errors.confirmPassword?.message
  });

  useEffect(() => {
    if ('confirmPassword' in errors && Object.keys(errors).length === 1) {
      scrollToOffset();
    }
  }, [Object.keys(errors).length]);

  const handleChangePassword = (formValue: FormTypes) => {
    if (!passwordIsNoValid) {
      changePassword(formValue.password, formValue.oldPassword);
    }
  };

  const isValidationError = (Object.keys(errors).length > 0 || Boolean(passwordMatchError)) && isSubmitted;

  const onFocusOldPassword = () => setPasswordMatchError(undefined);

  return (
    <ScreenContainer>
      <ScreenTitle title="Security" onBackButtonPress={goBack} />

      <ScreenScrollView>
        {/* <ItemContainer>
          <Item title="Lock time(m)" onPress={navigateToLockTimeSelector} style={styles.itemWithDropDown}>
            <DropdownSelectedItem title={lockTimePeriod.toString()} onPress={navigateToLockTimeSelector} />
          </Item>
        </ItemContainer>

        <Divider size={getCustomSize(2)} />

        <ItemContainer>
          <Item title="Change Password" onPress={navigateToChangePassword} />
        </ItemContainer> */}

        <Column style={styles.oldPasswordContainer}>
          <Controller
            control={control}
            name="oldPassword"
            rules={commonRules}
            render={({ field }) => (
              <PasswordInput
                field={field}
                label="Old Password"
                // prompt="Current Password is used to protect the wallet"
                error={errors.oldPassword?.message ?? passwordMatchError}
                onFocus={onFocusOldPassword}
              />
            )}
          />
        </Column>

        <Controller
          control={control}
          name="password"
          rules={commonRules}
          render={({ field }) => (
            <PasswordInput
              field={field}
              label="New password"
              // prompt="Password is used to protect the wallet"
              inputContainerStyle={
                ((isDefined(passwordIsNoValid) && passwordIsNoValid) || isDefined(errors.password?.message)) &&
                styles.errorInput
              }
            />
          )}
        />
        <Column style={styles.passwordValidationContainer}>
          {passwordValidationMessages.map(({ id, message, valid, optional }) => (
            <Text
              key={id}
              style={[
                styles.passwordValidationText,
                (isDefined(dirtyFields.password) || isDefined(errors.password?.message)) &&
                (valid ? styles.valid : !isDefined(optional) && styles.noValid)
              ]}
            >{`${valid ? '✓' : '✗'} ${message}`}</Text>
          ))}
        </Column>

        <Column style={styles.controllerOffset}>
          <Controller
            control={control}
            name="confirmPassword"
            rules={changePasswordRules}
            render={({ field }) => (
              <PasswordInput
                field={field}
                label="Confirm New Password"
                // prompt="Repeat password"
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </Column>

        {isMobile && (
          <>
            <Divider size={getCustomSize(2)} />

            <ItemContainer>
              <Item title="Biometric ID" onPress={handleBiometricChange} style={styles.itemWithSwitch}>
                <Switch isActive={isBiometricEnabled} onPress={handleBiometricChange} triggerAnimation />
              </Item>
            </ItemContainer>
          </>
        )}
      </ScreenScrollView>

      <View style={styles.saveButtonContainer}>
        <Button
          title="SAVE"
          theme={ButtonThemesEnum.Secondary}
          onPress={handleSubmit(handleChangePassword)}
          disabled={isValidationError}
        />
      </View>

    </ScreenContainer>
  );
};
