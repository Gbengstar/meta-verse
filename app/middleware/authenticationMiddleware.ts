import { JWTService } from './../service/jwtService';
import { NextFunction, Response, Request } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';

@Middleware({ type: 'before' })
@Service()
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  constructor(private readonly jwtService: JWTService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware');

    const token = this.jwtService.getToken(req);

    const tokenData = this.jwtService.decode(token);

    res.locals.token = tokenData;

    next();
  }
}
