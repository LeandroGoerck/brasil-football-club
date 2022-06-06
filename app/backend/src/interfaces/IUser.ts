import { Model } from 'sequelize/types';

export default interface IUser extends Model{
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}
