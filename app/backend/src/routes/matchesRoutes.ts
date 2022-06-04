import * as express from 'express';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/matchesController';

const matchesController = new MatchesController();

const router = express.Router();

router.patch('/:id/finish', validateToken, matchesController.update);
router.post('/', validateToken, matchesController.create);
router.get('/', matchesController.getMatches);

export default router;
