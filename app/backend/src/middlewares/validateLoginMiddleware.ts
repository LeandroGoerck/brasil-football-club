import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import checkStatus from './checkStatus';

const loginSchema = Joi.object({
  email: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
});

const validateLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  const errorType = error?.details[0].type;
  if (checkStatus.code400(errorType)) return res.status(400).json({ message: error?.message });
  if (checkStatus.code422(errorType)) return res.status(422).json({ message: error?.message });

  next();
};

export default validateLoginMiddleware;
