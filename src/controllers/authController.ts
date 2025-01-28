import { Request, Response } from 'express';
import { createToken } from '../config/jwt';
import { LOGIN_PASSWORD, LOGIN_USERNAME } from '../utils/constants';

const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === LOGIN_USERNAME && password === LOGIN_PASSWORD) {
    const payload = { username };
    const token = createToken(payload);
    res.status(200).json({ token });
    return;
  }

  res.status(401).json({ message: 'Incorrect username or password' });
};

export { login };
