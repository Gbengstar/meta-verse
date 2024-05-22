import { Socket } from 'socket.io';
import { SocketRoomEnum } from '../enum/roomEnum';

export const joinRooms = (socket: Socket) => {
  // iterate on the rooms and join each
  for (const room in SocketRoomEnum) {
    socket.join(room);
  }
};
