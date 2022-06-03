import * as express from 'express';
import TeamsController from '../controllers/teamsController';

const teamsController = new TeamsController();

const router = express.Router();

router.get('/:id', teamsController.findById);
router.get('/', teamsController.getAll);

export default router;
