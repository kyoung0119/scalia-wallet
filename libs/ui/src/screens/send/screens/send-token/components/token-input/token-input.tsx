import React from 'react';
import { View } from 'react-native';
import { ControllerRenderProps } from 'react-hook-form';
import { FieldPath } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { isDefined, OnEventFn } from '@rnw-community/shared';

import { Text } from '../../../../../../components/text/text';
import { TextInput } from '../../../../../../components/text-input/text-input';
import { TouchableIcon } from '../../../../../../components/touchable-icon/touchable-icon';
import { IconNameEnum } from '../../../../../../components/icon/icon-name.enum';

import { Token as TokenType } from '../../../../../../interfaces/token.interface';
import { DollarAmount } from './components/dollar-amount/dollar-amount';
import { ViewStyleProps } from 'src/interfaces/style.interface';

import { styles } from './token-input.styles';

interface Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
  label?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  error?: string;
  token?: TokenType;
  amountInDollar: string;
  navigationKey?: string;
  amountInToken: string;
  maxButtonTitle?: string;
  onFocus?: OnEventFn;
  isTokenInput: boolean;
  setIsTokenInput: (value: boolean) => void;
}

export const TokenInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  error,
  token,
  amountInDollar,
  amountInToken,
  navigationKey,
  label,
  onFocus,
  isTokenInput,
  setIsTokenInput
}: Props<TFieldValues, TName>) => {

  const toggleInputMode = () => {
    setIsTokenInput(!isTokenInput);
  }

  return (
    <View>
      <TextInput
        field={field}
        label={label}
        placeholder="0.00"
        inputContainerStyle={styles.assetContainer}
        inputStyle={styles.amountInput}
        decimals={token?.decimals}
        error={error}
        keyboardType="numeric"
        showClearIcon={false}
        editable={isDefined(token)}
        onFocus={onFocus}
      >
        <View>
          <DollarAmount amount={field.value} amountInDollar={amountInDollar} isUSDAmount={isTokenInput} token={token} />
        </View>
      </TextInput>

      <Text style={styles.inputCurrency as ViewStyleProps}>
        {isTokenInput ? token?.symbol : `USD`}
      </Text>

      < TouchableIcon name={IconNameEnum.Toggle} onPress={toggleInputMode} style={styles.toggleIcon} />
    </View>
  );
};
