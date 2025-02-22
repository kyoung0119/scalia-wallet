import { OnEventFn } from '@rnw-community/shared';
import React, { FC, PropsWithChildren } from 'react';
import { Control, Controller, FieldErrors, UseControllerProps, UseFormSetValue } from 'react-hook-form';
import { GestureResponderEvent } from 'react-native';

import { TextInput } from '../../../../../components/text-input/text-input';
import { ScreenContainer } from '../../../../../components/screen-components/screen-container/screen-container';
import { ScreenTitle } from '../../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { ScreenScrollView } from '../../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import { FooterButtons } from '../../../../components/modal-footer-buttons/modal-footer-buttons.interface';
import { FormTypes } from '../../types/form-types.interface';

import { styles } from './network-container.styles';

type Props = PropsWithChildren<{
  screenTitle: string;
  onSubmitPress: OnEventFn<GestureResponderEvent>;
  control: Control<FormTypes, object>;
  rules: {
    commonRules: UseControllerProps['rules'];
    rpcUrlRules: UseControllerProps['rules'];
    chainIdRules: UseControllerProps['rules'];
  };
  errors: FieldErrors<FormTypes>;
  setValue: UseFormSetValue<FormTypes>;
  editable?: boolean;
}> &
  Pick<FooterButtons, 'submitTitle'>;

export const NetworkContainer: FC<Props> = ({
  screenTitle,
  onSubmitPress,
  submitTitle,
  control,
  children,
  rules: { commonRules, chainIdRules, rpcUrlRules },
  errors,
  editable = true
}) => {
  const { goBack } = useNavigation();

  return (
    <ScreenContainer>
      <ScreenTitle title={screenTitle} onBackButtonPress={goBack} />
      <ScreenScrollView style={styles.root}>
        <Controller
          control={control}
          name="name"
          rules={commonRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Network name"
              placeholder="Network"
              error={errors?.name?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="rpcUrl"
          rules={rpcUrlRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="RPC URL"
              placeholder="https://"
              error={errors?.rpcUrl?.message}
              editable={editable}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="chainId"
          rules={chainIdRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Chain ID"
              placeholder="Chain ID"
              error={errors?.chainId?.message}
              editable={editable}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="tokenSymbol"
          rules={commonRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Currency Symbol"
              placeholder="BTC"
              error={errors?.tokenSymbol?.message}
              containerStyle={styles.lastInputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="blockExplorerUrl"
          rules={{ ...commonRules, required: false }}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Block Explorer URL"
              placeholder="https://"
              required={false}
              prompt="Enter the Block Explorer URL"
              error={errors?.blockExplorerUrl?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        {children}
      </ScreenScrollView>
    </ScreenContainer>
  );
};
