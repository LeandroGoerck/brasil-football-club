import * as bcryptjs from 'bcryptjs';
import ILogin from '../interfaces/loginInterface';
import UserModel from '../database/models/UsersModel';
import ValidationsService from './validationService';
import auth from './auth';
import MESSAGES from './messages';

export default class LoginService {
  public login = async (data: ILogin) => {
    const { email, password } = data;
    console.log('email= ', email);
    console.log('password= ', password);
    const userData = await UserModel.findOne({ where: { email } });
    console.log('userData= ', userData);
    if (userData === null) {
      return { status: 401, error: { message: MESSAGES.incorrectEmailOrPassword } };
    }
    const bcryptVerify = await bcryptjs.compare(password, userData.password);
    console.log('bcryptVerify= ', bcryptVerify);
    if (!bcryptVerify) {
      return { status: 401, error: { message: 'MESSAGES.incorrectEmailOrPassword' } };
    }
    const { token } = auth.generateToken(email, password);
    const userDataAndToken = ValidationsService.buildUserDataAndTokenObject(userData, token);
    return { status: 200, userDataAndToken };
  };
}
