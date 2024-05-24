import { Socket } from 'socket.io';
import { TransactionDto } from '../dto/transactionDto';
import { Inject, Service } from 'typedi';
import { SocketRoomEnum } from '../enum/roomEnum';
import { SocketEventsEnum } from '../enum/socketEventsEnum';
import { socket } from '../..';

@Service()
export class SocketEventService {
  private readonly socket = socket;
  constructor() {
    console.debug(SocketEventService.name, 'is initiated');
  }

  sendToAllEventRoom(data: TransactionDto) {
    this.socket
      .to(SocketRoomEnum.ALL_ROOM)
      .emit(SocketEventsEnum.ALL_EVENT, data);
    console.debug(`Event sent to ${SocketRoomEnum.ALL_ROOM}`);
  }

  sendToSenderEventRoom(data: TransactionDto, sender: string) {
    this.socket.to(SocketRoomEnum.SENDER_ONLY_ROOM).emit(sender, data);
    console.debug(`Event sent to SENDER ROOM`);
  }

  sendToReceiverEventRoom(data: TransactionDto, receiver: string) {
    this.socket.to(SocketRoomEnum.RECEIVER_ONLY_ROOM).emit(receiver, data);
    console.debug(`Event sent to RECEIVER ROOM`);
  }

  sendToSenderAndReceiverEventRoom(
    data: TransactionDto,
    receiver: string,
    sender: string
  ) {
    this.sendToSenderEventRoom(data, sender);
    this.sendToReceiverEventRoom(data, receiver);
    console.debug(`Event sent to SENDER AND RECEIVER ROOM`);
  }

  sendToFiveThousandAndAboveEventRoom(data: TransactionDto) {
    this.socket
      .to(SocketRoomEnum.FIVE_THOUSAND_AND_ABOVE_DOLLAR_ROOM)
      .emit(SocketEventsEnum.FIVE_THOUSAND_AND_ABOVE_DOLLAR_EVENT, data);
    console.debug(
      `Event sent to  ${SocketRoomEnum.FIVE_THOUSAND_AND_ABOVE_DOLLAR_ROOM}`
    );
  }

  sendToTwoThousandToFiveThousandEventRoom(data: TransactionDto) {
    this.socket
      .to(SocketRoomEnum.TWO_THOUSAND_TO_FIVE_THOUSAND_DOLLAR_ROOM)
      .emit(SocketEventsEnum.TWO_THOUSAND_TO_FIVE_THOUSAND_DOLLAR_EVENT, data);
    console.debug(
      `Event sent to  ${SocketRoomEnum.TWO_THOUSAND_TO_FIVE_THOUSAND_DOLLAR_ROOM}`
    );
  }

  sendToFiveHundredToTwoThousandEventRoom(data: TransactionDto) {
    this.socket
      .to(SocketRoomEnum.FIVE_HUNDRED_TO_TWO_THOUSAND_DOLLAR_ROOM)
      .emit(SocketEventsEnum.FIVE_HUNDRED_TO_TWO_THOUSAND_DOLLAR_EVENT, data);
    console.debug(
      `Event sent to  ${SocketRoomEnum.FIVE_HUNDRED_TO_TWO_THOUSAND_DOLLAR_ROOM}`
    );
  }

  sendToOneHundredToFiveHundredEventRoom(data: TransactionDto) {
    this.socket
      .to(SocketRoomEnum.ONE_HUNDRED_TO_FIVE_HUNDRED_DOLLAR_ROOM)
      .emit(SocketEventsEnum.ONE_HUNDRED_TO_FIVE_HUNDRED_DOLLAR_EVENT, data);
    console.debug(
      `Event sent to  ${SocketRoomEnum.ONE_HUNDRED_TO_FIVE_HUNDRED_DOLLAR_ROOM}`
    );
  }

  sendToZeroToHundredEventRoom(data: TransactionDto) {
    this.socket
      .to(SocketRoomEnum.ZERO_TO_HUNDRED_DOLLAR_ROOM)
      .emit(SocketEventsEnum.ZERO_TO_HUNDRED_DOLLAR_EVENT, data);
    console.debug(
      `Event sent to  ${SocketRoomEnum.ZERO_TO_HUNDRED_DOLLAR_ROOM}`
    );
  }
}
