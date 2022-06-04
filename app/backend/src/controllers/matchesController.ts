import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  public service = new MatchesService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, matchesData } = await this.service.getAll();
      return res.status(status).json(matchesData);
    } catch (error) {
      next(error);
    }
  };
}
