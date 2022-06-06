import { Model } from 'sequelize/types';

interface ICreatedMatch extends Model{
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default ICreatedMatch;
