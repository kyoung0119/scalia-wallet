import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC, ReactElement } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';

import { Row } from '../../../../../components/row/row';
import { Icon } from '../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../components/icon/icon-name.enum';

import { ViewStyleProps } from '../../../../../interfaces/style.interface';
import { TestIDProps } from '../../../../../interfaces/test-id.props';

import { styles } from './render-item.styles';

interface Props extends TestIDProps {
  isActive: boolean;
  onSelectItem: OnEventFn<GestureResponderEvent>;
  rightBottomComponent?: ReactElement;
  rightTopComponent?: ReactElement;
  leftBottomComponent: ReactElement;
  leftTopComponent: ReactElement;
  style?: ViewStyleProps;
}

export const RenderItem: FC<Props> = ({
  isActive,
  onSelectItem,
  leftBottomComponent,
  rightTopComponent,
  leftTopComponent,
  rightBottomComponent = null,
  style,
  testID
}) => (
  <Pressable style={[styles.root, isActive && styles.active, style]} onPress={onSelectItem} testID={testID}>
    <Row style={styles.wrapper}>
      {leftTopComponent}
      {isDefined(rightTopComponent) ? (
        rightTopComponent
      ) : isActive ? (
        <Icon name={IconNameEnum.SelectedCheckbox} />
      ) : (
        <Icon name={IconNameEnum.EmptyCheckbox} />
      )}
    </Row>

    {/* <Row style={styles.wrapper}>
      {leftBottomComponent}
      {rightBottomComponent}
    </Row> */}
  </Pressable>
);
