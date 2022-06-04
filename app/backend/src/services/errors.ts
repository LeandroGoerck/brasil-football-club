import CustomError from './CustomError';

const incorrectEmailOrPassword = new CustomError('Incorrect email or password', 401);
const allFieldsMustBeFilled = new CustomError('All fields must be filled', 400);
const jwtCheckError = new CustomError('Jwt Check Error', 400);
const emptyAuthorization = new CustomError('empty authorization', 401);
const testError = new CustomError('testError', 999);
const twoEqualTeams = new
CustomError('It is not possible to create a match with two equal teams', 401);
const thisTeamDoesNotExist = new CustomError('There is no team with such id!', 404);
const thisIdDoesNotExist = new CustomError('There is no team with such id!', 404);

export default {
  incorrectEmailOrPassword,
  allFieldsMustBeFilled,
  jwtCheckError,
  emptyAuthorization,
  testError,
  twoEqualTeams,
  thisTeamDoesNotExist,
  thisIdDoesNotExist,
};
