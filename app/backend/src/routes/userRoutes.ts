import * as express from 'express';

const router = express.Router();

// router.route('/').post(userController.login);
router.route('/').post((req, res, _next) => {
  console.log(req.body);
  return (res.status(201).json(req.body));
});

export default router;
