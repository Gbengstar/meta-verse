import Container from 'typedi';
import { TransactionDto } from '../dto/transactionDto';
import { MetaVerseEvents } from '../event/processRPCTransactionEvent';

export const processRpcResponseTransactions = (
  transactions: TransactionDto[]
) => {
  for (const transaction of transactions) {
    const { blockHash, blockNumber, from, to, gasPrice, hash, value } =
      transaction;

    const transactionObject = {
      blockHash,
      blockNumber,
      from,
      to,
      gasPrice: parseInt(`${gasPrice}`, 16),
      hash,
      value: parseInt(`${value}`, 16),
    };

    const metaVerseEvents = Container.get(MetaVerseEvents);
    metaVerseEvents.emitSendSocketEvent(transactionObject);
  }
};
//
