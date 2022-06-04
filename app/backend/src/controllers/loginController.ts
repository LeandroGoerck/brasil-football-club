import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/loginService';
import ERR from '../services/errors';

export default class LoginController {
  public service = new LoginService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userDataAndToken = await this.service.login({ email, password });
      return res.status(200).json(userDataAndToken);
    } catch (error) {
      next(error);
    }
  };

  public validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization || authorization === 'null') throw ERR.emptyAuthorization;

      const { role } = await this.service.validate(authorization as string);
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };
}
