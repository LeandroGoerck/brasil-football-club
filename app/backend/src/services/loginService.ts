import * as bcryptjs from 'bcryptjs';
import ILogin from '../interfaces/loginInterface';
import UserModel from '../database/models/UsersModel';
import ValidationsService from './validationService';
import auth from './auth';
import ERR from './errors';

export default class LoginService {
  public login = async (data: ILogin) => {
    const { email, password } = data;

    if (!email || !password) throw ERR.allFieldsMustBeFilled;

    const userData = await UserModel.findOne({ where: { email } });
    if (!userData) throw ERR.incorrectEmailOrPassword;

    const bcryptVerify = await bcryptjs.compare(password, userData.password);
    if (!bcryptVerify) throw ERR.allFieldsMustBeFilled;

    const { token } = auth.generateToken(email, password);
    const userDataAndToken = ValidationsService.buildUserDataAndTokenObject(userData, token);
    return { status: 200, userDataAndToken };
  };

  public validate = async (authorization: string) => {
    const role = await auth.checkToken(authorization);
    if (!role) throw ERR.jwtCheckError;
    return { status: 200, role };
  };
}
