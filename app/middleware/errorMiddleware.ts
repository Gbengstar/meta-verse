import { NextFunction, Request, Response } from 'express';
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from 'routing-controllers';
import { CustomError } from '../helper/customError';
import Container, { Service } from 'typedi';

@Middleware({ type: 'after' })
@Service()
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (error instanceof CustomError) {
      return response.status(error.status).json({ message: error.message });
    }

    if (error instanceof HttpError) {
      return response
        .status(error?.httpCode ?? 500)
        .json({ message: error.message });
    }

    if (error instanceof Error) {
      return response
        .status(500)
        .json({ message: error.message || 'internal server error' });
    }

    response.status(500).json({ message: 'internal server error' });

    next(error);
  }
}

// Container.set(ErrorMiddleware, ErrorMiddleware);

// export const globalErrorHandler = (
//   error: Error,
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   if (error instanceof CustomError) {
//     return response.status(error.status).json({ message: error.message });
//   }

//   if (error instanceof Error) {
//     return response
//       .status(500)
//       .json({ message: error.message || 'internal server error' });
//   }

//   response.status(500).json({ message: 'internal server error' });

//   next(error);
// };
