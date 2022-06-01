import UserModel from '../database/models/UsersModel';

export default class ValidationsService {
  static buildUserDataAndTokenObject(userData: UserModel, token: string) {
    return {
      user: {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        email: userData.email,
      },
      token,
    };
  }
}
