import { DataTypes, Model } from 'sequelize';
import db from '.';
// import MatchesModel from './MatchesModel';

class Teams extends Model {
  public id: number;
  public teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Teams',
  tableName: 'teams',
  timestamps: false,
});

export default Teams;
