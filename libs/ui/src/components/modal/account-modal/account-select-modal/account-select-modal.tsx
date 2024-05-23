import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { AccountInterface } from 'shared';

import { Text } from '../../../text/text';
import { Button } from '../../../button/button';
import { ButtonThemesEnum } from '../../../button/enums';
import { ModalAccountBalance } from '../../../../modals/components/modal-account-balance/modal-account-balance';
import { TouchableIcon } from '../../../touchable-icon/touchable-icon';
import { CopyText } from '../../../copy-text/copy-text';
import { RobotIcon } from '../../../robot-icon/robot-icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { AccountType } from '../../../account-type/account-type';
import { ModalRenderItem } from '../components/modal-render-item/modal-render-item';

import { useFlatListRef } from '../../../selector/hooks/use-flat-list-ref.hook';
import { getItemLayout } from '../../../selector/utils/get-item-layout.util';
import { AccountsSelectorTestIDs } from '../../../../modals/screens/accounts-selector/accounts-selector.test-ids';
import { useCreateHdAccountForNewNetworkType } from '../../../../shelter/hooks/use-create-hd-account-for-new-network-type.hook';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';

import { setAccountModalStep } from '../../../../hooks/use-account-modal-step.store';
import { useFiatTotalBalance } from '../../../../hooks/use-fiat-total-balance.hook';
import { useFilteredAccounts } from '../../../../hooks/use-filtered-accounts.hook';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { changeAccountAction } from '../../../../store/wallet/wallet.actions';
import {
  useAllVisibleAccountsSelector,
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';

import { styles } from './account-select-modal.styles';

const keyExtractor = (item: AccountInterface) => item.accountId.toString();

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export const AccountSelectModal: FC<Props> = ({ isModalVisible, setModalVisible }) => {

  const accounts = useAllVisibleAccountsSelector();
  const selectedAccount = useSelectedAccountSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();
  const { accountsBalanceInUsd } = useFiatTotalBalance();
  const { filteredAccounts, selectedAccountIndex } = useFilteredAccounts(accounts, selectedAccount);
  const data = filteredAccounts;
  const selectedIndex = selectedAccountIndex;
  const { flatListRef } = useFlatListRef({ data, selectedIndex });

  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const createHdAccountForNewNetworkType = useCreateHdAccountForNewNetworkType();

  const toggleModal = () => {
    setAccountModalStep("select")
    setModalVisible(!isModalVisible);
  };

  const handleChangeAccount = (account: AccountInterface) => {

    if (checkIsNetworkTypeKeyExist(account, selectedNetworkType)) {
      dispatch(changeAccountAction(account));
      toggleModal()
    } else {
      createHdAccountForNewNetworkType(account, selectedNetworkType);
    }

    navigate(ScreensEnum.Wallet);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<AccountInterface>) => {
    const isAccountSelected = selectedAccountIndex === index;
    const publicKeyHash = getPublicKeyHash(item, selectedNetworkType);
    const isShowAccountType = true;

    return (
      <ModalRenderItem
        name={item.name}
        icon={<RobotIcon seed={publicKeyHash} />}
        isActive={isAccountSelected}
        balanceTitle="Total balance"
        balance={<ModalAccountBalance balance={accountsBalanceInUsd[item.accountId]} />}
        onSelectItem={() => handleChangeAccount(item)}
        rightBottomComponent={
          isShowAccountType ? (
            <AccountType type={item.type} />
          ) : (
            <View style={styles.publicKeyHashContainer}>
              <CopyText text={publicKeyHash} />
            </View>
          )
        }
        testID={AccountsSelectorTestIDs.AccountsTabs}
      />
    );
  };

  return (
    <View>
      <TouchableIcon
        onPress={toggleModal}
        name={IconNameEnum.Close}
        style={styles.buttonClose}
        color='#ffffff'
        width={24}
        height={24}
      />

      <Text style={styles.headerText}>Select a wallet</Text>
      <Text style={styles.descText}>Your list of wallets, add or create a new wallet.</Text>
      {/* 
          <AccountsList
            onSelectItem={handleChangeAccount}
            onPressAddIcon={onAddAccount}
            selectedAccount={selectedAccount}
            accounts={accounts}
            isShowAccountType
            testID={AccountsSelectorTestIDs.AccountsTabs}
          /> */}

      <FlatList
        ref={flatListRef}
        getItemLayout={getItemLayout}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

      {/* <AccountsSelector /> */}
      <Button
        title="Import Wallet"
        theme={ButtonThemesEnum.Secondary}
        style={[styles.buttonModal, styles.buttonImport]}
        onPress={() => setAccountModalStep("import")}
      // disabled={ }
      />
      <Button
        title="Create Wallet"
        theme={ButtonThemesEnum.Primary}
        style={styles.buttonModal}
      // onPress={}
      // disabled={}
      />
    </View>
  );
};
