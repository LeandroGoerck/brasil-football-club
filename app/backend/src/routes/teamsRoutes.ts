import * as express from 'express';
import TeamsController from '../controllers/teamsController';

const teamsController = new TeamsController();

const router = express.Router();

router.get('/', teamsController.getAll);

export default router;
