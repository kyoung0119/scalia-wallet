import React, { FC } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';

import { Row } from '../../../../../components/row/row';
import { Icon } from '../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../components/icon/icon-name.enum';

import { styles } from './context-menu.styles';
import { ViewStyleProps } from 'src/interfaces/style.interface';

interface ContextMenuProps {
    visible: boolean;
    deleteDisabled: boolean;
    position: { x: number; y: number };
    onClose: () => void;
    onReset: () => void;
    onRemove: () => void;
}

export const ContextMenu: FC<ContextMenuProps> = ({ visible, deleteDisabled, position, onClose, onReset, onRemove }) => {
    if (!visible) return null;

    return (
        <Modal transparent={true} animationType="fade">
            <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
                <TouchableOpacity style={[styles.contextMenu, { top: position.y, left: position.x }]} activeOpacity={1}>
                    <TouchableOpacity onPress={onReset}>
                        <Row style={styles.menuItem}>
                            <Icon name={IconNameEnum.Rotate} size={16} />
                            <Text style={styles.resetText as ViewStyleProps}>Reset</Text>
                        </Row>
                    </TouchableOpacity>
                    {!deleteDisabled && <View style={{ height: 8 }}></View>}
                    <TouchableOpacity onPress={onRemove} >
                        <Row style={[styles.menuItem, deleteDisabled && styles.notVisible]}>
                            <Icon name={IconNameEnum.Delete} size={16} />
                            <Text style={styles.removeText as ViewStyleProps}>Remove</Text>
                        </Row>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};
