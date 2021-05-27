import * as express from 'express';

import AuthController from '../controllers/AuthController';

const authRouter = express.Router();

authRouter.post('/', AuthController.auth);

export default authRouter;
