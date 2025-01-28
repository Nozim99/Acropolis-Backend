import { Request, Response, NextFunction } from 'express';
import { NODE_ENV } from './constants';

/**
 * Global error handling middleware for Express.
 * Handles errors and sends appropriate responses.
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', err); // Log the error for debugging

  const statusCode = err.status || 500; // Default status code is 500 (Internal Server Error)
  const message = err.message || 'Internal Server Error'; // Default error message

  res.status(statusCode).json({
    success: false,
    message,
    stack: NODE_ENV === 'production' ? null : err.stack, // Show stack only in development
  });
};

export default errorHandler;
