import Teams from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  public getAll = async () => {
    const teamHomeOption = { model: Teams, as: 'teamHome', attributes: ['teamName'] };
    const teamAwayOption = { model: Teams, as: 'teamAway', attributes: ['teamName'] };

    const matchesData = await MatchesModel
      .findAll({ include: [teamHomeOption, teamAwayOption] });

    return { status: 200, matchesData };
  };

  public getByProgress = async (progressOption: string) => {
    const teamHomeOption = { model: Teams, as: 'teamHome', attributes: ['teamName'] };
    const teamAwayOption = { model: Teams, as: 'teamAway', attributes: ['teamName'] };
    const inProgress = progressOption === 'true' ? 1 : 0;

    const matchesData = await MatchesModel
      .findAll({ where: { inProgress }, include: [teamHomeOption, teamAwayOption] });

    return { status: 200, matchesData };
  };
}
