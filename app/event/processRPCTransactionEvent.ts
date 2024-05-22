import Container, { Service } from 'typedi';
import { TransactionDto } from './../dto/transactionDto';
import Event from 'events';
import { processRpcResponseTransactions } from '../helper/processRPCResult';
import { MetaVerseEventsEnum } from '../enum/metaVerseEventsEnum';
import { SocketEventService } from '../service/socketEventsService';
import { sendSocketEventsHandler } from '../helper/sendSocketEvents';

@Service()
export class MetaVerseEvents extends Event {
  private readonly socketEventService = Container.get(SocketEventService);
  constructor() {
    super();

    this.on(
      MetaVerseEventsEnum.PROCESS_TRANSACTION_META_VERSE_EVENT,
      processRpcResponseTransactions
    );

    this.on(MetaVerseEventsEnum.SEND_SOCKET_EVENTS, sendSocketEventsHandler);
  }

  emitProcessRpcResponseTransactionEvent(transactions: TransactionDto[]) {
    this.emit(
      MetaVerseEventsEnum.PROCESS_TRANSACTION_META_VERSE_EVENT,
      transactions
    );
  }

  emitSendSocketEvent(transaction: TransactionDto) {
    this.emit(MetaVerseEventsEnum.SEND_SOCKET_EVENTS, transaction);
  }
}
