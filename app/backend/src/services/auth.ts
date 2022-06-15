import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import * as fs from 'fs';
import UserModel from '../database/models/UsersModel';

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

const generateToken = (email: string, password: string): { token : string } => {
  const jwtConfig = { expiresIn: '1d' };
  const token = jwt.sign({ email, password }, JWT_SECRET, jwtConfig);
  return ({ token });
};

const checkToken = async (authorization: string) : Promise<string | false> => {
  const verifyToken = jwt.verify(authorization, JWT_SECRET) as jwt.JwtPayload;
  const userEmailFound = await UserModel.findOne({ where: { email: verifyToken.email } });
  if (!userEmailFound) return false;
  const { role } = userEmailFound;
  if (role) return role;
  return false;
};

export default {
  generateToken,
  checkToken,
};
