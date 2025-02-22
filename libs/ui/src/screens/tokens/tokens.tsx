import React, { FC, useState } from 'react';
import { View } from 'react-native';

import { LoaderSizeEnum } from '../../components/loader/enums';
import { Loader } from '../../components/loader/loader';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useSearchNewToken } from '../../hooks/use-search-new-token.hook';
import { Token } from '../../interfaces/token.interface';
import { getTokenSlug } from '../../utils/token.utils';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { ManageTokens } from './components/manage-tokens/manage-tokens';
import { styles } from './tokens.styles';

const keyExtractor = ({ tokenAddress, tokenId }: Token) => getTokenSlug(tokenAddress, tokenId);

export const Tokens: FC = () => {
  const { navigate } = useNavigation();

  const [isEmptyTokensList, setIsEmptyTokensList] = useState(false);
  const [isShowManageTokens, setIsShowManageTokens] = useState(false);

  const { newToken, isLoadingMetadata, searchValue, setSearchValue } = useSearchNewToken();

  const onPressActivityIcon = () => navigate(ScreensEnum.Activity);

  return (
    <View style={styles.root}>
      {isLoadingMetadata ? (
        <Loader size={LoaderSizeEnum.Large} style={styles.loader} />
      ) : isShowManageTokens ? (
        <ManageTokens
          searchValue={searchValue}
          newToken={newToken}
          setIsEmptyTokensList={setIsEmptyTokensList}
          keyExtractor={keyExtractor}
        />
      ) : (
        <AccountTokens
          searchValue={searchValue}
          newToken={newToken}
          setIsEmptyTokensList={setIsEmptyTokensList}
          keyExtractor={keyExtractor}
        />
      )}
    </View>

  );
};
