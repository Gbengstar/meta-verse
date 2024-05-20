import { Socket } from 'socket.io';
import { Service } from 'typedi';

@Service()
export class SocketMapService {
  private readonly map: Map<string, Socket>;
  constructor() {
    this.map = new Map();
    console.log(SocketMapService.name, 'is initiated');
  }

  addSocket(username: string, socket: Socket) {
    this.map.set(username, socket);
    console.debug(`socket of user ${username} added to map`);
  }

  deleteSocket(username: string) {
    this.map.delete(username);
    console.debug(`socket of user ${username} deleted from map`);
  }
}
