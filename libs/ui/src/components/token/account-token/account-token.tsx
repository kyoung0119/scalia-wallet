import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC, useEffect, useCallback, useState } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { Token } from '../../../interfaces/token.interface';
import { getImageSource } from '../../../screens/wallet/components/assets-widget/utils/get-image-source.util';
import { changeTokenVisibilityAction, loadAccountTokenBalanceAction, loadGasTokenBalanceAction } from '../../../store/wallet/wallet.actions';
import { checkIsGasToken } from '../../../utils/check-is-gas-token.util';
import { getFiatBalanceToDisplay } from '../../../utils/get-dollar-value-to-display.util';
import { getFormattedBalance } from '../../../utils/units.utils';
import { Switch } from '../../switch/switch';
import { TokenItemThemesEnum } from '../token-item/enums';
import { TokenItem } from '../token-item/token-item';

interface Props {
  token: Token;
  showButton?: boolean;
  theme?: TokenItemThemesEnum;
  onPress?: OnEventFn<GestureResponderEvent>;
  onPressSwitch?: OnEventFn<void>;
  isNewToken?: boolean;
}

export const AccountToken: FC<Props> = ({ token, showButton, theme, onPress, onPressSwitch, isNewToken = false }) => {
  const dispatch = useDispatch();
  const { thumbnailUri, symbol, name, tokenAddress } = token;

  const isGasToken = checkIsGasToken(tokenAddress);

  const [fiatBalanceToDisplay, setFiatBalanceToDisplay] = useState(getFiatBalanceToDisplay(token.balance.data, token.fiatBalance ?? 0));
  const [formattedBalance, setFormattedBalance] = useState(getFormattedBalance(token.balance.data, token.decimals));
  const imageSource = getImageSource(thumbnailUri);

  // Memoize the fetch function to prevent unnecessary re-creation
  const fetchBalances = useCallback(() => {
    if (isGasToken) {
      dispatch(loadGasTokenBalanceAction.submit());
    } else {
      dispatch(loadAccountTokenBalanceAction.submit({ token }));
    }
  }, [dispatch, token, isGasToken]);

  // Update currentToken and balances every 5 seconds
  useEffect(() => {
    const updateBalances = () => {
      setFiatBalanceToDisplay(getFiatBalanceToDisplay(token.balance.data, token.fiatBalance ?? 0));
      setFormattedBalance(getFormattedBalance(token.balance.data, token.decimals));
    };

    updateBalances(); // Initial update
    const intervalId = setInterval(() => {
      fetchBalances();
      updateBalances();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [fetchBalances, token]);

  const handleSwitch = () => {
    if (!isNewToken) {
      dispatch(changeTokenVisibilityAction(token));
    }
    onPressSwitch?.();
  };

  return (
    <Pressable onPress={onPress}>
      <TokenItem
        imageSource={imageSource}
        balance={formattedBalance}
        symbol={symbol}
        theme={theme}
        name={name}
        fiatBalance={fiatBalanceToDisplay}
        isGasToken={isGasToken}
      >
        {isDefined(showButton) && showButton && !isGasToken ? (
          <Switch onPress={handleSwitch} isActive={token.isVisible} />
        ) : undefined}
      </TokenItem>
    </Pressable>
  );
};
