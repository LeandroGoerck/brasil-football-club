import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';
import ERR from './errors';
import IUpdateMatch from '../interfaces/IUpdateMatch';

export default class MatchesService {
  public getAll = async () => {
    const teamHomeOption = { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] };
    const teamAwayOption = { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] };

    const matchesData = await MatchesModel
      .findAll({ include: [teamHomeOption, teamAwayOption] });

    return { matchesData };
  };

  public getByProgress = async (progressOption: string) => {
    const teamHomeOption = { model: TeamsModel, as: 'teamHome', attributes: ['teamName'] };
    const teamAwayOption = { model: TeamsModel, as: 'teamAway', attributes: ['teamName'] };
    const inProgress = progressOption === 'true' ? 1 : 0;

    const matchesData = await MatchesModel
      .findAll({ where: { inProgress }, include: [teamHomeOption, teamAwayOption] });

    return { matchesData };
  };

  public validateNewMatch = async (match: IMatch) => {
    if (match.awayTeam === match.homeTeam) throw ERR.twoEqualTeams;
    const teamsData = await TeamsModel.findAll();
    const teamsIdList = await teamsData.map((teams) => teams.id);
    const awayIdFound = teamsIdList.find((id: number) => id === match.awayTeam);
    const homeIdFound = teamsIdList.find((id: number) => id === match.homeTeam);
    if (!awayIdFound || !homeIdFound) throw ERR.thisIdDoesNotExist;
  };

  public create = async (match: IMatch) => {
    await this.validateNewMatch(match);
    const createdMatch = await MatchesModel.create(match);
    return createdMatch;
  };

  public update = async (id: string) => {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
  };

  public updateCurrentMatch = async (id: string, matchData: IUpdateMatch) => {
    await MatchesModel.update(matchData, { where: { id } });
    console.log(id, matchData);
  };
}
