import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC, ReactElement } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { TestIDProps } from '../../../../interfaces/test-id.props';
import { Icon } from '../../../icon/icon';
import { IconNameEnum } from '../../../icon/icon-name.enum';
import { Row } from '../../../row/row';

import { styles } from './render-item.styles';

interface Props extends TestIDProps {
  isActive?: boolean;
  onSelectItem: OnEventFn<GestureResponderEvent>;
  leftTopComponent: ReactElement;
  rightTopComponent?: ReactElement;
  style?: ViewStyleProps;
}

export const RenderItem: FC<Props> = ({
  isActive,
  onSelectItem,
  leftTopComponent,
  rightTopComponent,
  style,
  testID
}) => (
  <Pressable style={[styles.root, isActive && styles.active, style]} onPress={onSelectItem} testID={testID}>
    <Row style={styles.wrapper}>
      {leftTopComponent}
      {isDefined(rightTopComponent) ? (
        rightTopComponent
      ) :
        isActive ? (
          <Icon name={IconNameEnum.SelectedCheckbox} />
        ) : (
          <Icon name={IconNameEnum.EmptyCheckbox} />
        )}
    </Row>
  </Pressable>
);
