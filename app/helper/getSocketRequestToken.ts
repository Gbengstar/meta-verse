import { Request } from 'express';
import { JWTService } from '../service/jwtService';
import { Socket } from 'socket.io';
import Container from 'typedi';

const jwtService: JWTService = Container.get(JWTService);

export const getUserToken = (socket: Socket) => {
  try {
    console.log('authenticateSocketRequest');

    const token = jwtService.getToken(socket.request as Request);

    const payload = jwtService.decode(token);

    if (!payload) socket.disconnect();

    console.log('getUserToken', payload);

    return payload;
  } catch (error) {
    socket.disconnect();
  }
};
