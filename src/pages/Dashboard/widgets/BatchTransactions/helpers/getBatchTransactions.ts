import { TransactionProps } from 'types/transaction.types';
import { TokenTransfer, Transaction, TransactionPayload } from 'utils/sdkCore';
import {
  EXTRA_GAS_LIMIT_GUARDED_TX,
  GAS_LIMIT,
  GAS_PRICE
} from 'utils/sdkDappCore';
import { DECIMALS } from 'utils/sdkDappUtils';
const NUMBER_OF_TRANSACTIONS = 5;

export const getBatchTransactions = ({
  address,
  nonce,
  chainID
}: TransactionProps): Transaction[] => {
  const transactions = Array.from(Array(NUMBER_OF_TRANSACTIONS).keys());

  return transactions.map((id) => {
    const amount = TokenTransfer.fungibleFromAmount(
      '',
      id + 1,
      DECIMALS
    ).toString();

    return new Transaction({
      value: amount,
      data: new TransactionPayload(`batch-tx-${id + 1}`),
      receiver: address,
      gasLimit: GAS_LIMIT + EXTRA_GAS_LIMIT_GUARDED_TX,
      gasPrice: GAS_PRICE,
      chainID,
      sender: address,
      version: 1,
      nonce: nonce ? nonce + id : undefined
    });
  });
};
