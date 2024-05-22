import Container from 'typedi';
import { TokenDto } from '../dto/tokenDto';
import { SocketMapService } from '../service/socketMapService';
import { Socket } from 'socket.io';

export const mapSocketInstance = (userToken: TokenDto, socket: Socket) => {
  console.log('mapSocketInstance');
  try {
    const socketMap: SocketMapService = Container.get(SocketMapService);
    socketMap.addSocket(userToken.username, socket);

    // create event to delete mapped socket when user disconnect
    socket.on('disconnect', async () => {
      // const socket = socketMap.getSocket(userToken.username);
      socketMap.map.get(userToken.username).rooms.forEach(async (room) => {
        console.log(`left room ${room}`);
        await socket.leave(room);
      });

      console.log(`left room `);

      socketMap.deleteSocket(userToken.username);
    });
  } catch (error) {
    socket.disconnect();
  }
};
