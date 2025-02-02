import { Request, Response, NextFunction } from 'express';
import { NODE_ENV } from './constants';

/**
 * Global error handling middleware for Express.
 * Handles errors and sends appropriate responses.
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', err);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    stack: NODE_ENV === 'production' ? null : err.stack
  });
};

export default errorHandler;
