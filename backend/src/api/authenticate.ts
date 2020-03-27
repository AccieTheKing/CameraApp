import {Request, Response} from 'express';
import {generateUserToken, pseudoEncodeToken} from './userValidation';

export const authenticate = (req: Request, res: Response) => {
  if (!req.body || !req.body.identity) {
    res.statusMessage = 'You should specify identity in body';
    res.status(400).end();
    return;
  }

  const token = generateUserToken();
  pseudoEncodeToken(req.body.identity, token);
  res.json({authToken: token});
};
