import { Request, Response } from 'express';

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response
) => {
  res.status(500).json('error occur');
};
