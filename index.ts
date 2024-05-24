import 'reflect-metadata';
import { config } from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import './app/helper/database-connection';
import './app/helper/repositorySetter';
import './app/service/userService';
import './app/middleware/errorMiddleware';
import './app/service/userService';
import './app/service/jwtService';
import { useExpressServer } from 'routing-controllers';
import { AuthController } from './app/controller/authController';
import { joinRooms } from './app/helper/joinRoom';
import './app/service/dataPollingService';
import { authenticateSocketRequest } from './app/middleware/socketMiddleware';
import { mapSocketInstance } from './app/helper/mapSocketInstance';
import { getUserToken } from './app/helper/getSocketRequestToken';

import { ErrorMiddleware } from './app/middleware/errorMiddleware';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useExpressServer(app, {
  controllers: [AuthController],
  middlewares: [ErrorMiddleware],
  defaultErrorHandler: false,
});

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
});

export const socket = io;
