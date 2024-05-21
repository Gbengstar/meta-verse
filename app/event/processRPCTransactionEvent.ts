import { TransactionDto } from './../dto/transactionDto';
import Event from 'events';

class MetaVerseEvents extends Event {
  constructor() {
    super();

    this.on('MetaVerseEvents', this.process);
  }

  process(transactions: TransactionDto[]) {}
}
