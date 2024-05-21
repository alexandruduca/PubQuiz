import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ResponseCodes } from '../types/constants';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt;
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      next();
    } catch (err) {
      res.status(401).send(ResponseCodes.CREDENTIALS_REQUIRED);
    }
  } else {
    res.status(401).send(ResponseCodes.CREDENTIALS_REQUIRED);
  }
};

export default auth;
