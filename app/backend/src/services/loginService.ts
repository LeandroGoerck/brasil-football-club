import ILogin from '../interfaces/loginInterface';
import UserModel from '../database/models/UsersModel';
import auth from './auth';
import MESSAGES from './messages';

export default class LoginService {
  public login = async (data: ILogin) => {
    const { email, password } = data;

    const user = await UserModel.findOne({
      // where: { email, password }, raw: true, attributes: { exclude: ['password'] } });
      where: { email }, raw: true, attributes: { exclude: ['password'] } });

    if (user === null) {
      return { status: 401, error: { message: MESSAGES.incorrectEmailOrPassword } };
    }

    const { token } = auth.generateToken(email, password);

    const userDataAndToken = {
      user,
      token,
    };

    return { status: 200, userDataAndToken };
  };
}
