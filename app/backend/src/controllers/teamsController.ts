import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  public service = new TeamsService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, teamsData } = await this.service.getAll();
      return res.status(status).json(teamsData);
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(200).json({});
      const { status, teamData } = await this.service.findById(id);
      return res.status(status).json(teamData);
    } catch (error) {
      next(error);
    }
  };
}
