import * as bcryptjs from 'bcryptjs';
import ILogin from '../interfaces/loginInterface';
import UserModel from '../database/models/UsersModel';
import auth from './auth';
import ERR from './errors';

export default class LoginService {
  public login = async (data: ILogin) => {
    const { email, password } = data;

    const userData = await UserModel.findOne({ where: { email } });
    if (!userData) throw ERR.incorrectEmailOrPassword;

    const bcryptVerify = await bcryptjs.compare(password, userData.password);
    if (!bcryptVerify) throw ERR.allFieldsMustBeFilled;

    const { token } = auth.generateToken(email, password);
    return {
      user: {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        email: userData.email,
      },
      token,
    };
  };

  public validate = async (authorization: string) => {
    const role = await auth.checkToken(authorization);
    if (!role) throw ERR.jwtCheckError;
    return { role };
  };
}
