import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { TokenDto } from '../dto/tokenDto';
import { config } from 'dotenv';
config();

@Service()
export class JWTService {
  private secret: string;

  constructor() {
    this.secret = process.env.TOKEN_SECRET;
  }

  signToken(tokenData: TokenDto): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(tokenData, this.secret, {}, (err: Error, encoded: string) => {
        if (err) reject('error occur while signing token');
        resolve(encoded);
      });
    });
  }

  verifyToken(token: string): Promise<TokenDto> {
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(token, this.secret, (err, decoded: any) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              throw new Error(
                'token expired'
                // {
                //   status: 451,
                //   message: 'token expired',
                // },
                // 451
              );
            }
            throw new Error(err.message);
          }
          resolve(decoded);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  decode(token: string) {
    const { payload } = jwt.decode(token, { complete: true });
    return payload as TokenDto;
  }

  getToken(req: Request) {
    let token: string;

    switch (true) {
      case !!req.headers.cookie:
        req.headers.cookie.split('; ').forEach((item) => {
          const data = item.split('=');
          if (data[0] === 'token') token = data[1];
        });
        break;
      case req.headers.authorization?.startsWith('Bearer'):
        token = req.headers.authorization.split(' ')[1];
        break;
      case !!req.signedCookies?.token:
        token = req.signedCookies?.token;
        break;
    }

    if (!token) {
      throw new Error(
        'please provide a valid token in your request authorization header'
      );
    }

    return token;
  }
}
