import { Socket } from 'socket.io';
import { RoomEnum } from '../enum/roomEnum';

export const joinRooms = (socket: Socket) => {
  // iterate on the rooms and join each
  for (const room in RoomEnum) {
    socket.join(room);
  }
};
