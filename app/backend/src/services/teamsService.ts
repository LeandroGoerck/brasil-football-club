import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  public getAll = async () => {
    const teamsData = await TeamsModel.findAll();

    return { status: 200, teamsData };
  };
}
