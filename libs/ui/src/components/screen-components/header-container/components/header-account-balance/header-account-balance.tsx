import React, { FC, useState } from 'react';

import { useFiatBalance } from '../../../../../hooks/use-fiat-balance.hook';
import { ViewStyleProps } from '../../../../../interfaces/style.interface';
import { Row } from '../../../../row/row';
import { Text } from '../../../../text/text';

import { styles } from './header-account-balance.styles';

interface Props {
  style?: ViewStyleProps;
}

export const HeaderAccountBalance: FC<Props> = ({ style }) => {
  const totalBalanceOfSelectedNetwork = useFiatBalance();

  return (
    <Row style={style}>
      <Text style={[styles.currency, styles.text]}>$</Text>
      <Text style={[styles.balance, styles.text]}>{totalBalanceOfSelectedNetwork}</Text>
    </Row>
  );
};
