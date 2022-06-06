import { NextFunction, Request, Response } from 'express';
import ERR from '../services/errors';
import auth from '../services/auth';

const validateToken = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || authorization === 'null') throw ERR.emptyAuthorization;
    const isValid = await auth.checkToken(authorization);
    if (!isValid) throw ERR.jwtCheckError;
    next();
  } catch (error) {
    next(error);
  }
};

export default validateToken;
