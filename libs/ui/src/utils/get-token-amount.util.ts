import { isEmptyString, isDefined } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';

import { TOKEN_DOLLAR_VALUE_PLUG } from '../constants/defaults';

import { formatUnits } from './units.utils';

interface GetTokenValueArgs {
  amount: string;
  decimals: number;
  price: number | undefined;
  errorValue?: string | BigNumber;
  toFixed?: boolean;
  isNeedToFormat?: boolean;
}

export function getTokenValue(arg: {
  amount: string;
  decimals: number;
  price: number | undefined;
  errorValue?: string;
  isNeedToFormat?: boolean;
}): string;

export function getTokenValue({
  amount,
  price,
  decimals,
  toFixed = true,
  isNeedToFormat = true,
  errorValue = TOKEN_DOLLAR_VALUE_PLUG
}: GetTokenValueArgs) {
  const bigNumAmount = isNeedToFormat ? formatUnits(amount, decimals) : new BigNumber(amount);

  if (isEmptyString(amount) || !isDefined(price) || bigNumAmount.isNaN()) {
    return errorValue;
  }

  const tokenValue = bigNumAmount.dividedBy(price);

  return toFixed ? tokenValue.toFixed(2) : tokenValue;
}
