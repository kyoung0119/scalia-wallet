import { isDefined, OnEventFn } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { AccountToken } from '../../../../components/token/account-token/account-token';
import { TokenItemThemesEnum } from '../../../../components/token/token-item/enums';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useSortAccountTokensByBalance } from '../../../../hooks/use-sort-tokens-by-balance.hook';
import { Token as TokenInterface } from '../../../../interfaces/token.interface';
import {
  useAccountTokensSelector,
  useAccountTokensAndGasTokenSelector,
  useVisibleAccountTokensAndGasTokenSelector
} from '../../../../store/wallet/wallet.selectors';
import { getTokensWithBalance } from '../../../../utils/get-tokens-with-balance.util';
import { useAddNewTokenToAccount } from '../../hooks/use-add-new-token-to-account.hook';
import { filterAccountTokensByValue } from '../../utils/filter-account-tokens-by-value.util';

import { styles } from './account-tokens.styles';

interface Props {
  searchValue: string;
  newToken: TokenInterface | null;
  setIsEmptyTokensList: OnEventFn<boolean>;
  keyExtractor: (token: TokenInterface) => string;
}

export const AccountTokens: FC<Props> = ({ searchValue, newToken, setIsEmptyTokensList, keyExtractor }) => {
  const { addNewTokenToAccount } = useAddNewTokenToAccount();
  const { navigate } = useNavigation();

  const allAccountTokens = useAccountTokensSelector();
  const allAccountTokensWithGasToken = useAccountTokensAndGasTokenSelector();
  const visibleAccountTokensWithGasToken = useVisibleAccountTokensAndGasTokenSelector();

  const [isHideZeroBalance, setIsHideZeroBalance] = useState(false);

  const allAccountTokensWithBalance = useMemo(
    () => getTokensWithBalance(visibleAccountTokensWithGasToken),
    [visibleAccountTokensWithGasToken]
  );

  const filteredAccountTokens = useMemo(() => {
    if (isDefined(newToken) && isAddress(searchValue)) {
      return [newToken];
    }

    if (searchValue && visibleAccountTokensWithGasToken.length) {
      return filterAccountTokensByValue(
        isHideZeroBalance ? allAccountTokensWithBalance : allAccountTokensWithGasToken,
        searchValue
      );
    }

    return isHideZeroBalance ? allAccountTokensWithBalance : visibleAccountTokensWithGasToken;
  }, [
    newToken,
    searchValue,
    allAccountTokens,
    visibleAccountTokensWithGasToken,
    isHideZeroBalance,
    allAccountTokensWithBalance
  ]);

  const sortedTokens = useSortAccountTokensByBalance(filteredAccountTokens);

  useEffect(() => void setIsEmptyTokensList(sortedTokens.length === 0), [sortedTokens]);

  const onPressHideZeroBalances = () => setIsHideZeroBalance(!isHideZeroBalance);

  const handleTokenPress = (token: TokenInterface, isNewToken: boolean) => {
    if (!isNewToken) {
      navigate(ScreensEnum.Token, { tokenAddress: token.tokenAddress, tokenId: token.tokenId });
    }
  };

  const renderItem = useCallback(
    ({ item: token }: ListRenderItemInfo<TokenInterface>) => {
      const isNewToken = token.tokenAddress === newToken?.tokenAddress;
      const showButton = isNewToken ? true : !token.isVisible;

      return (
        <AccountToken
          token={token}
          showButton={showButton}
          isNewToken={isNewToken}
          theme={TokenItemThemesEnum.Secondary}
          onPress={() => handleTokenPress(token, isNewToken)}
          onPressSwitch={() => addNewTokenToAccount(token, isNewToken)}
        />
      );
    },
    [searchValue, newToken]
  );

  return (
    <>
      {/* {!isDefined(newToken) && (
        <Pressable onPress={onPressHideZeroBalances} style={styles.checkboxContainer}>
          <Row>
            <Icon name={isHideZeroBalance ? IconNameEnum.SelectedSquareCheckbox : IconNameEnum.EmptySquareCheckbox} />
            <Text style={styles.checkboxText}>Hide 0 balances</Text>
          </Row>
        </Pressable>
      )} */}
      <FlatList
        data={sortedTokens}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </>
  );
};
