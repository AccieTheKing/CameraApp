import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const usersStorage = new Map();

export const generateUserToken = () => crypto.randomBytes(32).toString('base64');
export const pseudoEncodeToken = (identity: string, token: string) => usersStorage.set(token, identity);
export const pseudoDecodeToken = (token: string) => usersStorage.get(token);
export const pseudoVerifyToken = (token: string) => usersStorage.has(token);


export const requireAuthHeader = (req: Request, res: Response, next: NextFunction) => {
  // 'Check if request is authorized with token from POST /authorize'
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
    res.statusMessage = "No Authorization header";
    res.status(401).send('Unauthorized');
    return;
  }

  const userToken = req.headers.authorization.split('Bearer ')[1];

  if (!pseudoVerifyToken(userToken)) res.status(401).send('Unauthorized');

  req.body = { identity: pseudoDecodeToken(userToken) };
  next();
}

