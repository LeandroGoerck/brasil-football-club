import * as express from 'express';
import validateLoginMiddleware from '../middlewares/validateLoginMiddleware';
import LoginController from '../controllers/loginController';

const loginController = new LoginController();

const router = express.Router();

router.post('/', validateLoginMiddleware, loginController.login);

export default router;
