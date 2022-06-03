import { Request, Response, NextFunction } from 'express';
import ERR from '../services/errors';

const validateLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) throw ERR.allFieldsMustBeFilled;
  next();
};

export default validateLoginMiddleware;
