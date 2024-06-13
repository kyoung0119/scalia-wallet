import React, { FC } from 'react';
import { View } from 'react-native';

import { styles } from './send-summary.styles';

import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from '../../../..//components/text/text';
import { Field } from '../confirmation/components/field/field';
import { Button } from '../../../../components/button/button';
import { ButtonThemesEnum } from '../../../../components/button/enums';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';

type SendSummaryScreenRouteProp = RouteProp<ScreensParamList, ScreensEnum.SendSummary>;

type SendSummaryProps = {
  route: SendSummaryScreenRouteProp;
};

export const SendSummary: FC<SendSummaryProps> = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendSummary>>();
  const { sendTokenSymbol,
    sendTokenIcon = undefined,
    sendTokenAmount,
    sendTokenAmountInDollar,
    gasTokenSymbol,
    gasTokenIcon = undefined,
    gasTokenAmount,
    gasTokenAmountInDollar,
    totalAmountInDollar } = params;

  const { navigate } = useNavigation();

  const onDonePress = () => {
    navigate(ScreensEnum.Wallet);
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <TouchableIcon
          onPress={onDonePress}
          name={IconNameEnum.Close}
          style={styles.iconClose}
          color='#ffffff'
          width={24}
          height={24}
        />
        <View style={styles.iconSection}>
          <Icon iconStyle={styles.sentIcon} name={IconNameEnum.Sent} size={110} />
          <Text style={styles.bannerText}>Sent</Text>
        </View>
        <View style={[styles.root]}>
          <Field
            title="Token:"
            amount={sendTokenAmount}
            symbol={gasTokenSymbol}
            uri={gasTokenIcon}
            amountInDollar={sendTokenAmountInDollar}
          />
          <Field
            title="Gas Cost:"
            amount={gasTokenAmount}
            symbol={gasTokenSymbol}
            uri={gasTokenIcon}
            amountInDollar={gasTokenAmountInDollar}
          />
          <Field
            title="Total Cost:"
            amountInDollar={totalAmountInDollar}
          />
        </View>
        <Button
          theme={ButtonThemesEnum.Secondary}
          title="Done"
          onPress={onDonePress}
          style={[styles.buttonModal, styles.confirmButton]}
        // testID={testID}
        />
      </View>
    </ScreenContainer>
  );
};
