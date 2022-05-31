import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'super_senha';

const generateToken = (username: string, password: string): { token : string } => {
  const jwtConfig = {
    expiresIn: '1d',
  };
  const tokenNum = jwt.sign({ username, password }, JWT_SECRET, jwtConfig);
  return ({ token: tokenNum });
};

const checkJwt = async (authorization: string) => {
  const verifyToken = jwt.verify(authorization, JWT_SECRET) as jwt.JwtPayload;
  console.log('verifyToken= ', verifyToken);
  // const userEmailFound = await UserModel.findOne({ where: { email: verifyToken.email } });
  // const userId = userEmailFound.dataValues.id;
  if (verifyToken) return verifyToken;
  return false;
};

export default {
  generateToken,
  checkJwt,
};
