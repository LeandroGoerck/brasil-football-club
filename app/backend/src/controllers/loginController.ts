import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  public service = new LoginService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { status, userDataAndToken, error } = await this.service.login({ email, password });
      if (error) res.status(status).json({ message: error.message });
      return res.status(status).json(userDataAndToken);
    } catch (error) {
      next(error);
    }
  };
}
