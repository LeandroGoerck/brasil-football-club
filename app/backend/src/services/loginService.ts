import * as bcryptjs from 'bcryptjs';
import ILogin from '../interfaces/loginInterface';
import UserModel from '../database/models/UsersModel';
import ValidationsService from './validationService';
import auth from './auth';
import MESSAGES from './messages';

export default class LoginService {
  public login = async (data: ILogin) => {
    const { email, password } = data;

    if (!email) return { status: 400, error: { message: MESSAGES.allFieldsMustBeFilled } };
    if (!password) return { status: 400, error: { message: MESSAGES.allFieldsMustBeFilled } };

    const userData = await UserModel.findOne({ where: { email } });
    if (!userData) return { status: 401, error: { message: MESSAGES.incorrectEmailOrPassword } };

    const bcryptVerify = await bcryptjs.compare(password, userData.password);
    if (!bcryptVerify) {
      return { status: 401, error: { message: MESSAGES.incorrectEmailOrPassword } };
    }
    const { token } = auth.generateToken(email, password);
    const userDataAndToken = ValidationsService.buildUserDataAndTokenObject(userData, token);
    return { status: 200, userDataAndToken };
  };

  public validate = async (authorization: string) => {
    const role = await auth.checkToken(authorization);
    if (!role) return { status: 400, error: { message: 'Jwt Check Error' } };
    return { status: 200, role };
  };
}
