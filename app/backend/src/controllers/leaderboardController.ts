import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import LeaderboardhomeService from '../services/leaderboardhomeService';
import LeaderboardawayService from '../services/leaderboardawayService';

export default class LeaderboardController {
  public service = new LeaderboardService();

  public getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.service.leaderboardService();
      return res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };

  public homeService = new LeaderboardhomeService();

  public getLeaderboardhome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.homeService.leaderboardhomeService();
      return res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };

  public awayService = new LeaderboardawayService();

  public getLeaderboardaway = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.awayService.leaderboardawayService();
      return res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };
}
