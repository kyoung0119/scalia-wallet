import { isDefined } from '@rnw-community/shared';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { Text } from '../../components/text/text';

import { styles } from './network-selector-dropdown.styles';
import { colors } from '../../styles/colors';

interface Props {
  activeItemId?: number;
}

export const NetworkSelectorDropdown: FC<Props> = ({ activeItemId }) => {
  const [activeElementId, setActiveElementId] = useState(isDefined(activeItemId) ? activeItemId : 0);

  interface chainIcon {
    title: string;
    icon: string;
  }

  const chainIcons: chainIcon[] = [
    { title: 'BSC', icon: 'emoticon-happy-outline' },
    { title: 'ETH', icon: 'emoticon-cool-outline' },
    { title: 'ARB', icon: 'emoticon-lol-outline' }
  ];

  const chains: string[] = [
    'BSC Network',
    'Ethereum Network',
    'Scalia Network'
  ];
  return (
    <SelectDropdown
      data={chains}
      defaultValueByIndex={0}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpen) => (
        <View style={styles.dropdownButtonStyle}>
          <Text style={styles.dropdownButtonTxtStyle}>
            {selectedItem}
          </Text>
        </View>
      )}
      renderItem={(item, index, isSelected) => (
        <View
          style={{
            ...styles.dropdownItemStyle,
            ...((Boolean(isSelected)) && { backgroundColor: colors.bgDarkLight })
          }}>
          <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};
