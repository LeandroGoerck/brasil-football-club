import CustomError from './CustomError';

const incorrectEmailOrPassword = new CustomError('Incorrect email or password', 401);
const allFieldsMustBeFilled = new CustomError('All fields must be filled', 400);
const jwtCheckError = new CustomError('Jwt Check Error', 400);
const emptyAuthorization = new CustomError('empty authorization', 401);
const testError = new CustomError('testError', 999);

export default {
  incorrectEmailOrPassword,
  allFieldsMustBeFilled,
  jwtCheckError,
  emptyAuthorization,
  testError,
};
