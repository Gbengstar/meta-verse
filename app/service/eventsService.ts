import { Socket } from 'socket.io';
import Container, { Inject, Service } from 'typedi';
import { SocketMapService } from './socketMapService';
import { RoomEnum } from '../enum/roomEnum';

@Service()
export class EventService {
  private readonly socket: Socket = Container.get('socket');
  constructor(@Inject() private readonly socketMapService: SocketMapService) {
    console.debug(EventService.name, 'is initiated');
  }

  allEventRoom(data: string) {
    this.socket.to(RoomEnum.ALL_ROOM).emit(data);

    console.debug(`event sent to ${RoomEnum.ALL_ROOM}`);
  }

  sendToEvent(username: string) {
    console.debug(`socket of user ${username} deleted from map`);
  }
}
