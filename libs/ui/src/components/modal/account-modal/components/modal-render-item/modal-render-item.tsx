import { OnEventFn } from '@rnw-community/shared';
import React, { FC, ReactElement } from 'react';
import { GestureResponderEvent } from 'react-native';

import { Row } from '../../../../../components/row/row';
import { Column } from '../../../../../components/column/column';
import { RenderItem } from '../render-item/render-item';
import { Text } from '../../../../../components/text/text';
import { ViewStyleProps } from '../../../../../interfaces/style.interface';
import { TestIDProps } from '../../../../../interfaces/test-id.props';
import { ModalHeaderInterface } from '../../../../../modals/interfaces/modal-header.interface';

import { AccountTabsTestIDs } from './modal-render-item.test-ids';

import { styles } from './modal-render-item.styles';

interface Props extends ModalHeaderInterface, TestIDProps {
  isActive: boolean;
  onSelectItem: OnEventFn<GestureResponderEvent>;
  rightBottomComponent?: ReactElement;
  rightTopComponent?: ReactElement;
  style?: ViewStyleProps;
}

export const ModalRenderItem: FC<Props> = ({
  name,
  isActive,
  icon,
  balanceTitle,
  balance,
  onSelectItem,
  rightBottomComponent,
  rightTopComponent,
  style,
  testID
}) => (
  <RenderItem
    testID={testID}
    onSelectItem={onSelectItem}
    isActive={isActive}
    leftTopComponent={
      <Row style={styles.nameContainer}>
        {icon}
        <Text style={styles.name as ViewStyleProps} numberOfLines={1} testID={AccountTabsTestIDs.AccountsNames}>
          {name}
        </Text>
      </Row>
    }
    leftBottomComponent={
      <Column style={styles.textContainer}>
        <Text style={styles.balanceTitle}>{balanceTitle}</Text>
        <Row style={styles.balanceContainer}>{balance}</Row>
      </Column>
    }
    rightBottomComponent={rightBottomComponent}
    rightTopComponent={rightTopComponent}
    style={style}
  />
);
