import React, { FC, ReactElement } from 'react';
import { GestureResponderEvent } from 'react-native';
import { OnEventFn } from '@rnw-community/shared';

import { Row } from '../../../components/row/row';
import { RenderItem } from '../../../components/selector/components/render-item/render-item';
import { Text } from '../../../components/text/text';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { TestIDProps } from '../../../interfaces/test-id.props';
import { ModalHeaderInterface } from '../../interfaces/modal-header.interface';

import { styles } from './modal-render-item.styles';
import { AccountTabsTestIDs } from './modal-render-item.test-ids';

interface Props extends ModalHeaderInterface, TestIDProps {
  isActive?: boolean;
  onSelectItem: OnEventFn<GestureResponderEvent>;
  rightTopComponent?: ReactElement;
  style?: ViewStyleProps;
}

export const ModalRenderItem: FC<Props> = ({
  name,
  isActive,
  icon,
  onSelectItem,
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
        <Text style={styles.name} numberOfLines={1} testID={AccountTabsTestIDs.AccountsNames}>
          {name}
        </Text>
      </Row>
    }
    rightTopComponent={rightTopComponent}
    style={style}
  />
);
