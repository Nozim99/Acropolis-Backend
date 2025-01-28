import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authentication is required' });
    return
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }

  (req as any).user = decoded;
  next();
};

export default authMiddleware;
