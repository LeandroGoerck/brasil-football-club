import Teams from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';

export default class MatchesService {
  public getAll = async () => {
    const teamHomeOption = { model: Teams, as: 'teamHome', attributes: ['teamName'] };
    const teamAwayOption = { model: Teams, as: 'teamAway', attributes: ['teamName'] };

    const matchesData = await MatchesModel
      .findAll({ include: [teamHomeOption, teamAwayOption] });

    return { matchesData };
  };

  public getByProgress = async (progressOption: string) => {
    const teamHomeOption = { model: Teams, as: 'teamHome', attributes: ['teamName'] };
    const teamAwayOption = { model: Teams, as: 'teamAway', attributes: ['teamName'] };
    const inProgress = progressOption === 'true' ? 1 : 0;

    const matchesData = await MatchesModel
      .findAll({ where: { inProgress }, include: [teamHomeOption, teamAwayOption] });

    return { matchesData };
  };

  public create = async (match: IMatch) => {
    const createdMatch = await MatchesModel
      .create(match);
    return createdMatch;
  };

  public update = async (id: string) => {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
  };
}
