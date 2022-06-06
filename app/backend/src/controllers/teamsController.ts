import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  public service = new TeamsService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { teamsData } = await this.service.getAll();
      return res.status(200).json(teamsData);
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(200).json({});
      const { teamData } = await this.service.findById(id as string);
      return res.status(200).json(teamData);
    } catch (error) {
      next(error);
    }
  };
}
