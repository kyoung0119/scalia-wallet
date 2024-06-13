import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import { isDefined, OnEventFn } from '@rnw-community/shared';

import { Row } from '../../../../../../components/row/row';
import { Text } from '../../../../../../components/text/text';
import { TouchableIcon } from '../../../../../../components/touchable-icon/touchable-icon';
import { IconNameEnum } from '../../../../../../components/icon/icon-name.enum';
import { IconWithBorder } from '../../../../../../components/icon-with-border/icon-with-border';
import { IconWithBorderEnum } from '../../../../../../components/icon-with-border/enums';
import { Image } from '../../../../../../components/image/image';
import { Loader } from '../../../../../../components/loader/loader';
import { LoaderSizeEnum } from '../../../../../../components/loader/enums';

import { colors } from '../../../../../../styles/colors';
import { ViewStyleProps } from 'src/interfaces/style.interface';

import { styles } from './field.styles';

interface Props {
  loading?: boolean;
  amount?: number;
  amountInDollar?: string;
  title: string;
  symbol?: string;
  iconName?: IconNameEnum;
  uri?: string;
  onIconPress?: OnEventFn<GestureResponderEvent>;
}

export const Field: FC<Props> = ({ loading = false, title, amount, amountInDollar, symbol, uri, onIconPress, iconName }) => (
  <Row style={styles.root}>
    <Text style={styles.title}>{title}</Text>
    {loading ? (
      <Loader color={colors.textGrey1} size={LoaderSizeEnum.Small} />
    ) : (
      <Row>
        {isDefined(uri) &&
          <IconWithBorder type={IconWithBorderEnum.Quinary} style={styles.icon} >
            <Image uri={uri} />
          </IconWithBorder>
        }
        <Text numberOfLines={1} style={[styles.maxWidth, styles.altone14Text as ViewStyleProps]}>
          {amount} {symbol}
        </Text>
        {/* <Text style={[styles.number13Text, styles.symbol]}>{symbol}</Text> */}

        <Text style={[styles.maxWidth, styles.altone14Text as ViewStyleProps, styles.gasAmountDollarText]}>
          ~ ${amountInDollar}
        </Text>
        {isDefined(iconName) && <TouchableIcon name={iconName} onPress={onIconPress} style={styles.icon} />}
      </Row>
    )}
  </Row >
);
