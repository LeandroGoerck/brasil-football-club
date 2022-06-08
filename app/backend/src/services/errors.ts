import CustomError from './CustomError';

const allFieldsMustBeFilled = new CustomError('All fields must be filled', 400);
const emptyAuthorization = new CustomError('empty authorization', 401);
const incorrectEmailOrPassword = new CustomError('Incorrect email or password', 401);
const jwtCheckError = new CustomError('Jwt Check Error', 400);
const thisIdDoesNotExist = new CustomError('There is no team with such id!', 404);
const thisTeamDoesNotExist = new CustomError('There is no team with such id!', 404);
const twoEqualTeams = new
CustomError('It is not possible to create a match with two equal teams', 401);

export default {
  allFieldsMustBeFilled,
  emptyAuthorization,
  incorrectEmailOrPassword,
  jwtCheckError,
  thisIdDoesNotExist,
  thisTeamDoesNotExist,
  twoEqualTeams,
};
