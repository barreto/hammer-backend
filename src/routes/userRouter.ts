import * as express from 'express';

import UserController from '../controllers/UserController';

const userRouter = express.Router();

userRouter.get('', UserController.show);
userRouter.post('', UserController.create);

export default userRouter;
