import Container from 'typedi';
import { JWTService } from '../service/jwtService';
import { Request } from 'express';

const jwtService: JWTService = Container.get(JWTService);

export const getSocketRequestToken = async (request: Request) => {
  const jwtToken = jwtService.getToken(request);

  const userToken = await jwtService.verifyToken(jwtToken);

  return userToken;
};
