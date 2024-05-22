import Container from 'typedi';
import { TransactionDto } from '../dto/transactionDto';
import { SocketEventService } from '../service/socketEventsService';

export const sendSocketEventsHandler = (transaction: TransactionDto) => {
  const eventService = Container.get(SocketEventService);

  const { to, from, value } = transaction;

  eventService.sendToAllEventRoom(transaction);

  eventService.sendToSenderEventRoom(transaction, to);

  eventService.sendToReceiverEventRoom(transaction, to);

  eventService.sendToSenderAndReceiverEventRoom(transaction, to, from);

  const valueInDollars = +(
    parseInt(`${value}`, 16) / 1000000000000000_000
  ).toFixed(2);
  console.debug({ valueInDollars });
  switch (true) {
    case 5000 <= valueInDollars:
      {
        eventService.sendToFiveThousandAndAboveEventRoom(transaction);
      }
      break;
    case 2000 <= valueInDollars:
      {
        eventService.sendToTwoThousandToFiveThousandEventRoom(transaction);
      }
      break;
    case 500 <= valueInDollars:
      {
        eventService.sendToFiveHundredToTwoThousandEventRoom(transaction);
      }
      break;
    case 100 <= valueInDollars:
      {
        eventService.sendToOneHundredToFiveHundredEventRoom(transaction);
      }
      break;
    case 0 <= valueInDollars:
      {
        eventService.sendToZeroToHundredEventRoom(transaction);
      }
      break;
  }
};
//
