import IMatch from '../interfaces/IMatch';
import Matches from '../database/models/MatchesModel';
// import ITeamBoard from '../interfaces/ITeamBoard';
import MatchesService from './matchesService';
import ITeamBoard from '../interfaces/ITeamBoard';

export default class LeaderboardService {
  public service = new MatchesService();

  public getTeamName = (teamNumber: number, matchesData: Array<Matches>) => {
    const foundObj = matchesData.find((match) => teamNumber === match.homeTeam) as IMatch;
    return foundObj.teamHome.teamName as string;
  };

  public getTeamGoalsFavor = (teamNumber: number, matchesData: Array<Matches>) => {
    const homeTeamGoalsList: Array<number> = [];
    matchesData.forEach((match) => {
      if (match.homeTeam === teamNumber) homeTeamGoalsList.push(match.homeTeamGoals);
    });
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber) homeTeamGoalsList.push(match.awayTeamGoals);
    });
    const totalTeamGoalsFavor = homeTeamGoalsList.reduce((prev, curr) => prev + curr);
    return totalTeamGoalsFavor;
  };

  public getTeamGoalsOwn = (teamNumber: number, matchesData: Array<Matches>) => {
    const homeTeamGoalsList: Array<number> = [];
    matchesData.forEach((match) => {
      if (match.homeTeam === teamNumber) homeTeamGoalsList.push(match.awayTeamGoals);
    });
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber) homeTeamGoalsList.push(match.homeTeamGoals);
    });
    const totalHomeTeamOwn = homeTeamGoalsList.reduce((prev, curr) => prev + curr);
    return totalHomeTeamOwn;
  };

  public getTotalGames = (teamNumber: number, matchesData: Array<Matches>) => {
    let totalGames = 0;
    matchesData.forEach((match) => {
      if (match.homeTeam === teamNumber) totalGames += 1;
    });
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber) totalGames += 1;
    });
    return totalGames;
  };

  public getTotalVictories = (teamNumber: number, matchesData: Array<Matches>) => {
    let totalVictories = 0;
    matchesData.forEach((match) => {
      if (match.homeTeam === teamNumber
        && match.homeTeamGoals > match.awayTeamGoals) totalVictories += 1;
    });
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber
        && match.awayTeamGoals > match.homeTeamGoals) totalVictories += 1;
    });
    return totalVictories;
  };

  public getTotalDraws = (teamNumber: number, matchesData: Array<Matches>) => {
    let totalDraws = 0;
    matchesData.forEach((match) => {
      if (match.homeTeam === teamNumber
        && match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
    });
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber
        && match.awayTeamGoals === match.homeTeamGoals) totalDraws += 1;
    });
    return totalDraws;
  };

  public getTotalLosses = (teamNumber: number, matchesData: Array<Matches>) => {
    let totalLosses = 0;
    matchesData.forEach((match) => {
      if (match.homeTeam === teamNumber
        && match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
    });
    matchesData.forEach((match) => {
      if (match.awayTeam === teamNumber
        && match.awayTeamGoals < match.homeTeamGoals) totalLosses += 1;
    });
    return totalLosses;
  };

  public buildTeamData = (teamNumber: number, matchesData: Array<Matches>): ITeamBoard => {
    const totalVictories = this.getTotalVictories(teamNumber, matchesData);
    const totalDraws = this.getTotalDraws(teamNumber, matchesData);
    const goalsFavor = this.getTeamGoalsFavor(12, matchesData);
    const goalsOwn = this.getTeamGoalsOwn(12, matchesData);
    const totalPoints = (totalVictories * 3) + (totalDraws * 1);
    const totalGames = this.getTotalGames(teamNumber, matchesData);

    return {
      name: this.getTeamName(teamNumber, matchesData),
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: this.getTotalLosses(teamNumber, matchesData),
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
    };
  };

  public leaderboardService = async () => {
    const { matchesData } = await this.service.getAll();

    const listOfTeamNumbes: Array<number> = [];
    matchesData.map((match) => !listOfTeamNumbes
      .includes(match.homeTeam) && listOfTeamNumbes.push(match.homeTeam)) as Array<number>;

    const leaderboard = listOfTeamNumbes.map((teamNumber) => (this
      .buildTeamData(teamNumber, matchesData) as ITeamBoard));

    return leaderboard;
  };
}
