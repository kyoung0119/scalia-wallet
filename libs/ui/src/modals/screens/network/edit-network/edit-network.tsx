import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NetworkTypeEnum } from 'shared';

import { Button } from '../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../components/button/enums';
import { NETWORK_CHAIN_IDS_BY_NETWORK_TYPE } from '../../../../constants/networks';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { useCreateHdAccountForNewNetworkType } from '../../../../shelter/hooks/use-create-hd-account-for-new-network-type.hook';

import { editNetworkAction } from '../../../../store/wallet/wallet.actions';
import { useAllNetworksSelector, useSelectedAccountSelector } from '../../../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../../../utils/check-is-network-type-key-exist';
import { useNetworkFieldsRules } from '../../../hooks/use-validate-network-fields.hook';
import { NetworkContainer } from '../components/network-container/network-container';
import { FormTypes } from '../types/form-types.interface';

import { styles } from './edit-network.styles';

export const EditNetwork: FC = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const createHdAccountForNewNetworkType = useCreateHdAccountForNewNetworkType();
  const selectedAccount = useSelectedAccountSelector();
  const networks = useAllNetworksSelector();
  const {
    params: { network: selectedNetwork, isNetworkSelected }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditNetwork>>();

  const defaultValues = {
    name: selectedNetwork.name,
    rpcUrl: selectedNetwork.rpcUrl,
    chainId: selectedNetwork.chainId,
    blockExplorerUrl: selectedNetwork.explorerUrl,
    tokenSymbol: selectedNetwork.gasTokenMetadata.symbol
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const rules = useNetworkFieldsRules({
    networks,
    defaultValues
  });

  const onSubmit = (data: FormTypes) => {
    if (JSON.stringify(defaultValues) === JSON.stringify(data)) {
      return goBack();
    }

    let networkType = NetworkTypeEnum.EVM;

    if (NETWORK_CHAIN_IDS_BY_NETWORK_TYPE[NetworkTypeEnum.Tezos].includes(data.chainId)) {
      networkType = NetworkTypeEnum.Tezos;
    }

    const editedNetwork: NetworkInterface = {
      ...selectedNetwork,
      name: data.name.trim(),
      gasTokenMetadata: {
        ...selectedNetwork.gasTokenMetadata,
        symbol: data.tokenSymbol.trim()
      },
      explorerUrl: data.blockExplorerUrl?.trim(),
      networkType,
      ...(selectedNetwork.iconName && { iconName: selectedNetwork.iconName })
    };

    if (isNetworkSelected && !checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networkType, () => {
        dispatch(editNetworkAction({ network: editedNetwork, isNetworkSelected }));
      });
    } else {
      dispatch(editNetworkAction({ network: editedNetwork, isNetworkSelected, prevRpcUrl: defaultValues.rpcUrl }));
    }

    goBack();
  };


  return (
    <NetworkContainer
      screenTitle="Edit network"
      submitTitle="Save"
      onSubmitPress={handleSubmit(onSubmit)}
      control={control}
      rules={rules}
      errors={errors}
      setValue={setValue}
      editable={false}
    >
      <Button
        disabled={Boolean(Object.keys(errors).length)}
        theme={ButtonThemesEnum.Secondary}
        title='Confirm'
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      />
      <Button
        theme={ButtonThemesEnum.Primary}
        title='Cancel'
        onPress={goBack}
        style={styles.button}
      />
    </NetworkContainer>
  );
};
