import { log } from 'console';
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log('error:', err);
  res.status(500).json({
    error: true,
    message: err.message,
  });
};

export default errorMiddleware;
