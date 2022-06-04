import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  public service = new MatchesService();

  public getMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const progressOption = req.query.inProgress;
      if (progressOption === 'true' || progressOption === 'false') {
        const { status, matchesData } = await this.service.getByProgress(progressOption);
        return res.status(status).json(matchesData);
      }
      const { status, matchesData } = await this.service.getAll();
      return res.status(status).json(matchesData);
    } catch (error) {
      next(error);
    }
  };
}
