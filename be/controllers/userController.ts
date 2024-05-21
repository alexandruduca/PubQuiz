import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import { ResponseCodes } from '../types/constants';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      const expiresIn = 60 * 60;
      const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn });
      res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: expiresIn * 1000 });
      res.status(200).send({ role: user.role, id: user._id });
    } else {
      res.status(401).send(ResponseCodes.WRONG_CREDENTIALS);
    }
  } else {
    res.status(401).send(ResponseCodes.WRONG_CREDENTIALS);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const findUsername = await User.findOne({ username: req.body.username });
  const findEmail = await User.findOne({ email: req.body.email });
  if (findUsername) {
    return res.status(400).send(ResponseCodes.USERNAME_ALREADY_EXISTS);
  }
  if (findEmail) {
    return res.status(400).send(ResponseCodes.EMAIL_ALREADY_EXISTS);
  }
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(ResponseCodes.REGISTER_SUCCESS);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
