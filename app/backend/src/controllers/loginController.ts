import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/loginService';
import ERR from '../services/errors';

export default class LoginController {
  public service = new LoginService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { status, userDataAndToken } = await this.service.login({ email, password });
      return res.status(status).json(userDataAndToken);
    } catch (error) {
      next(error);
    }
  };

  public validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization || authorization === 'null') throw ERR.emptyAuthorization;

      const { status, role } = await this.service.validate(authorization as string);
      return res.status(status).json(role);
    } catch (error) {
      next(error);
    }
  };
}
