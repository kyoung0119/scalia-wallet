import React, { FC, useCallback, useMemo, useState } from 'react';
import { ListRenderItemInfo, GestureResponderEvent } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { Selector } from '../../../../components/selector/selector';

import { EMPTY_STRING } from '../../../../constants/defaults';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { useCreateHdAccountForNewNetworkType } from '../../../../shelter/hooks/use-create-hd-account-for-new-network-type.hook';
import { changeNetworkAction } from '../../../../store/wallet/wallet.actions';
import {
  useAccountsGasTokensSelector,
  useAllNetworksSelector,
  useSelectedAccountSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { getAccountTokensSlug } from '../../../../utils/address.util';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';

import { ModalGasToken } from '../../../components/modal-gas-token/modal-gas-token';
import { ModalRenderItem } from '../../../components/modal-render-item/modal-render-item';
import { useListSearch } from '../../../hooks/use-list-search.hook';

import { ContextMenu } from './context-menu/context-menu';
import { confirmRemoveAction } from '../../network/utils/confirmation.util';
import { removeNetworkAction } from '../../../../store/wallet/wallet.actions';
import { MainnetRpcEnum } from '../../../../constants/rpc';

const keyExtractor = (item: NetworkInterface) => item.rpcUrl;

interface Props {
  isSelector: boolean;
}

export const NetworksList: FC<Props> = ({ isSelector }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const createHdAccountForNewNetworkType = useCreateHdAccountForNewNetworkType();

  const networks = useAllNetworksSelector();
  const selectedNetwork = useSelectedNetworkSelector();
  const selectedAccount = useSelectedAccountSelector();
  const accountsGasTokens = useAccountsGasTokensSelector();

  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedNetworkForMenu, setSelectedNetworkForMenu] = useState<NetworkInterface | null>(null);

  const filteredList = useListSearch(searchValue, networks);

  const selectedIndex = useMemo(
    () => filteredList.findIndex(account => account.rpcUrl === selectedNetwork.rpcUrl),
    [filteredList, selectedNetwork.rpcUrl]
  );

  const handleChangeNetwork = useCallback(
    ({ networkType, rpcUrl }: NetworkInterface) => {
      dispatch(changeNetworkAction(rpcUrl));

      if (!checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
        createHdAccountForNewNetworkType(selectedAccount, networkType);
      }

      navigate(ScreensEnum.Wallet);
    },
    [selectedAccount]
  );

  const handleContextMenu = (network: NetworkInterface, event: GestureResponderEvent) => {
    if (networks.length === 1 || network.rpcUrl === MainnetRpcEnum.Scalia)
      setDeleteDisabled(true);
    else
      setDeleteDisabled(false);

    setSelectedNetworkForMenu(network);
    setContextMenuPosition({ x: event.nativeEvent.pageX - 100, y: event.nativeEvent.pageY });
    setContextMenuVisible(true);
  };

  const navigateToEditNetwork = (network: NetworkInterface, isNetworkSelected: boolean) =>
    navigate(ScreensEnum.EditNetwork, { network, isNetworkSelected });

  const handleRemoveNetwork = (selectedNetworkForMenu: NetworkInterface) => {
    const networksWithoutCurrent = networks.filter(network => network.rpcUrl !== selectedNetworkForMenu.rpcUrl);

    if (!checkIsNetworkTypeKeyExist(selectedAccount, networksWithoutCurrent[0].networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networksWithoutCurrent[0].networkType, () => {
        dispatch(removeNetworkAction({ network: selectedNetworkForMenu, isNetworkSelected: true }));
      });
    } else {
      dispatch(removeNetworkAction({ network: selectedNetworkForMenu, isNetworkSelected: true }));
    }
  };

  const handleReset = () => {
    // Implement reset logic
    navigateToEditNetwork(selectedNetworkForMenu as NetworkInterface, true)
    setContextMenuVisible(false);
  };

  const handleRemove = () => {
    // Implement remove logic
    confirmRemoveAction(() => handleRemoveNetwork(selectedNetworkForMenu as NetworkInterface));
    setContextMenuVisible(false);
  };


  const renderItem = ({ item, index }: ListRenderItemInfo<NetworkInterface>) => {
    const isNetworkSelected = selectedIndex === index;
    const selectedAccountPublicKeyHash = getPublicKeyHash(selectedAccount, item.networkType);
    const accountGasTokenSlug = getAccountTokensSlug(item.chainId, selectedAccountPublicKeyHash);

    return (
      isSelector ?
        <ModalRenderItem
          name={item.name}
          icon={<Icon name={item.iconName ?? IconNameEnum.NetworkFallback} size={32} />}
          isActive={isNetworkSelected}
          balanceTitle="Gas balance"
          balance={
            <ModalGasToken balance={accountsGasTokens[accountGasTokenSlug]?.data} metadata={item.gasTokenMetadata} />
          }
          onSelectItem={() => handleChangeNetwork(item)}
        /> :
        <ModalRenderItem
          name={item.name}
          icon={<Icon name={item.iconName ?? IconNameEnum.NetworkFallback} size={32} />}
          // isActive={isNetworkSelected}
          balanceTitle="Gas balance"
          balance={
            <ModalGasToken balance={accountsGasTokens[accountGasTokenSlug]?.data} metadata={item.gasTokenMetadata} />
          }
          onSelectItem={() => { }}
          rightTopComponent={
            <TouchableIcon name={IconNameEnum.More} onPress={(event) => handleContextMenu(item, event)} />
          }
        />
    );
  };

  return (
    <>
      <Selector
        data={filteredList}
        renderItem={renderItem}
        setSearchValue={setSearchValue}
        selectedItemName={selectedNetwork.name}
        keyExtractor={keyExtractor}
        selectedIndex={selectedIndex}
      />
      <ContextMenu
        visible={contextMenuVisible}
        deleteDisabled={deleteDisabled}
        position={contextMenuPosition}
        onClose={() => setContextMenuVisible(false)}
        onReset={handleReset}
        onRemove={handleRemove}
      />
    </>
  );
};
