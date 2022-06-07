import * as express from 'express';
import LeaderBoardController from '../controllers/leaderboardController';

const leaderboardController = new LeaderBoardController();

const router = express.Router();

router.get('/', leaderboardController.getLeaderboard);
router.get('/home', leaderboardController.getLeaderboardhome);
router.get('/away', leaderboardController.getLeaderboardaway);

export default router;
