import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  public getAll = async () => {
    const teamsData = await TeamsModel.findAll();

    return { teamsData };
  };

  public findById = async (id: string) => {
    const teamData = await TeamsModel.findByPk(id);

    return { teamData };
  };
}
