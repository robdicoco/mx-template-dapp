import { useState, useEffect } from 'react';
import { TransactionsTableSDK } from 'components/sdkDappCoreUI';
import { ServerTransactionType } from 'types/sdkDappCore.types';
import { ITransactionsTableRow } from 'types/sdkDappCoreUI.types';
import {
  useGetAccount,
  useGetNetworkConfig,
  TransactionsTableController
} from 'utils/sdkDappCore';

interface TransactionsTablePropsType {
  transactions?: ServerTransactionType[];
}

export const TransactionsTable = ({
  transactions = []
}: TransactionsTablePropsType) => {
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const [processedTransaction, setProcessedTransactions] = useState<
    ITransactionsTableRow[]
  >([]);

  useEffect(() => {
    processTransactions();
  }, []);

  const processTransactions = async () => {
    const transactionsData =
      await TransactionsTableController.processTransactions({
        address,
        egldLabel: network.egldLabel,
        explorerAddress: network.explorerAddress,
        transactions
      });

    setProcessedTransactions(
      transactionsData as unknown as ITransactionsTableRow[]
    );
  };

  return <TransactionsTableSDK transactions={processedTransaction} />;
};
