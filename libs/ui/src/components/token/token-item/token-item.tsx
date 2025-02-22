import { isDefined } from '@rnw-community/shared';
import React, { FC, PropsWithChildren } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

import { Icon } from '../../icon/icon';
import { IconNameEnum } from '../../icon/icon-name.enum';
import { Row } from '../../row/row';
import { Text } from '../../text/text';
import { TokenAmount } from '../../token-amount/token-amount';

import { themeClasses } from './constants';
import { TokenItemThemesEnum } from './enums';
import { styles } from './token-item.styles';
import { ViewStyleProps } from 'src/interfaces/style.interface';

import ScaliaPNG from '../../../components/icon/networks/scalia.png'

type Props = PropsWithChildren<{
  symbol: string;
  imageSource: ImageSourcePropType;
  balance: string;
  name: string;
  fiatBalance: string;
  isGasToken?: boolean;
  theme?: TokenItemThemesEnum;
}>;

export const TokenItem: FC<Props> = ({
  imageSource,
  symbol,
  balance,
  isGasToken = false,
  name,
  fiatBalance,
  children,
  theme = TokenItemThemesEnum.Primary
}) => (
  <Row style={[styles.root, themeClasses[theme].root]}>
    {
      symbol == "SCAL" ?
        <Image style={[styles.image, themeClasses[theme].image]} source={ScaliaPNG} /> :
        <Image style={[styles.image, themeClasses[theme].image]} source={imageSource} />
    }
    <View style={styles.token}>
      <Row style={styles.token}>
        <TokenAmount value={balance} style={themeClasses[theme].text as ViewStyleProps} /><Text> </Text>
        <Text style={[styles.text, themeClasses[theme].text as ViewStyleProps]} numberOfLines={1}>
          {symbol}
        </Text>
        {/* {isGasToken && <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />} */}
      </Row>
      {theme === TokenItemThemesEnum.Secondary && (
        <Text style={styles.tokenName as ViewStyleProps} numberOfLines={1}>
          {name}
        </Text>
      )}
    </View>

    <View style={styles.rightSideContainer}>
      {isDefined(children) ? (
        children
      ) : (
        <View style={styles.text}>
          <Text style={styles.fiatBalance as ViewStyleProps}>
            <Text style={styles.usdSymbol}>$</Text>{fiatBalance}
          </Text>
        </View>
      )}
    </View>
  </Row>
);
