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
import { authenticateSocketRequest } from './app/middleware/socketMiddleware';
import { mapSocketInstance } from './app/helper/mapSocketInstance';
import { getUserToken } from './app/helper/getSocketRequestToken';
config();
const app = createExpressServer({
  controllers: [UserController],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.use(authenticateSocketRequest);

io.on('connection', (socket: Socket) => {
  //get user token
  const userToken = getUserToken(socket);

  //map socket instance for future reference
  mapSocketInstance(userToken, socket);

  // join general rooms
  joinRooms(socket);
});

httpServer.listen(process.env.PORT);

httpServer.on('listening', () => {
  console.log('server running', httpServer.address());
  getBlockNumber();
  // setTimeout(getBlock, 2000);
});
