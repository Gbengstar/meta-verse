import { JWTService } from './../service/jwtService';
import { NextFunction, Request } from 'express';
import { Socket } from 'socket.io';
import Container from 'typedi';

const jwtService: JWTService = Container.get(JWTService);

export const authenticateSocketRequest = async (
  socket: Socket,
  next: NextFunction
) => {
  try {
    console.log('authenticateSocketRequest');

    const token = jwtService.getToken(socket.request as Request);

    const tokenData = await jwtService.verifyToken(token);

    if (!tokenData) socket.disconnect();
  } catch (error) {
    socket.disconnect();
  }

  next();
};
