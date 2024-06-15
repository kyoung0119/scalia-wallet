import React, { FC } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Button } from '../../../components/button/button';
import { ButtonThemesEnum } from '../../../components/button/enums';
import { ScreenContainer } from '../../../components/screen-components/screen-container/screen-container';
import { ScreenTitle } from '../../../components/screen-components/header-container/components/screen-title/screen-title';

import { useNavigation } from '../../../hooks/use-navigation.hook';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';

import { NetworksList } from './components/networks-list';
import { styles } from './networks-selector.styles';

type NetworkSelectorScreenRouteProp = RouteProp<ScreensParamList, ScreensEnum.NetworksSelector>;

type NetworkSelectorProps = {
  route: NetworkSelectorScreenRouteProp;
};

export const NetworksSelector: FC<NetworkSelectorProps> = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.NetworksSelector>>();
  const { isSelector } = params;
  const { navigate, goBack } = useNavigation();

  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);

  return (
    <ScreenContainer>
      <ScreenTitle title="Networks" onBackButtonPress={goBack} />

      <NetworksList isSelector={isSelector} />

      {!isSelector &&
        <Button
          title="Add a network"
          theme={ButtonThemesEnum.Secondary}
          style={styles.buttonModal}
          onPress={navigateToAddNetwork}
        />
      }

    </ScreenContainer>
  );
};
