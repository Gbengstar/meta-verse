import 'reflect-metadata';
import { config } from 'dotenv';
import express, { Response, Request } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import './app/helper/database-connection';
import './app/helper/repositorySetter';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './app/controller/userController';
import Container from 'typedi';
import { getSocketRequestToken } from './app/helper/socketAuthentication';
import { SocketMapService } from './app/service/socketMapService';
import { joinRooms } from './app/helper/joinRoom';
import { getBlock, getBlockNumber } from './app/service/axiosService';
config();
const app = createExpressServer({
  controllers: [UserController],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on('connection', async (socket: Socket) => {
  try {
    // process user token and ensure it is a valid request
    const userToken = await getSocketRequestToken(socket.request as Request);

    if (!userToken) socket.disconnect();
    const socketMap: SocketMapService = Container.get(SocketMapService);
    socketMap.addSocket(userToken.username, socket);

    // create event to delete mapped socket when user disconnect
    socket.on('disconnect', () => {
      socketMap.deleteSocket(userToken.username);
    });

    // join rooms available to all users
    joinRooms(socket);
  } catch (error) {
    console.log(error);
    socket.disconnect();
  }
});

Container.set('socket', io);

httpServer.listen(3000);

httpServer.on('listening', () => {
  console.log('server running', httpServer.address());
  getBlockNumber();
  // setTimeout(getBlock, 2000);
});
