import React, { FC, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { AccountInterface } from 'shared';

import { Column } from '../../../../components/column/column';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { SearchPanel } from '../../../../components/search-panel/search-panel';
import { useNavigation } from '../../../../hooks/use-navigation.hook';

import { styles } from './account-settings.styles';
import { AccountsList } from './components/accounts-list/accounts-list';
import { useAccountsTransformer } from './hooks/use-accounts-transformer.hook';
import { AccountsSettingsTestIDs } from './tests/accounts-settings.test-ids';

export const AccountsSettings: FC = () => {
  const { goBack } = useNavigation();

  const { accounts, setSearchValue } = useAccountsTransformer();

  const isEmptyList = useMemo(
    () => Object.values(accounts).every((list: AccountInterface[]) => !list.length),
    [accounts]
  );

  return (
    <ScreenContainer>
      <ScreenTitle
        title="Accounts Settings"
        onBackButtonPress={goBack}
        testID={AccountsSettingsTestIDs.AccountsSettingsTitle}
      />

      <Column style={styles.root}>
        <SearchPanel setSearchValue={setSearchValue} isEmptyList={isEmptyList} />

        <ScrollView style={styles.container}>
          <AccountsList name="HD Accounts" accounts={accounts.hd} style={styles.list} />
          <AccountsList name="Imported Accounts" accounts={accounts.imported} style={styles.list} />
          <AccountsList name="Ledger Accounts" accounts={accounts.ledger} />
        </ScrollView>
      </Column>

    </ScreenContainer>
  );
};
