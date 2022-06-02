import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  public service = new LoginService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { status, userDataAndToken, error } = await this.service.login({ email, password });
      if (error) return res.status(status).json({ message: error.message });
      return res.status(status).json(userDataAndToken);
    } catch (error) {
      next(error);
    }
  };

  public validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization || authorization === 'null') {
        return res.status(401).json({ message: 'empty authorization' });
      }

      const { status, role, error } = await this.service.validate(authorization as string);
      if (error) return res.status(status).json({ message: error.message });
      return res.status(status).json(role);
    } catch (error) {
      next(error);
    }
  };
}
