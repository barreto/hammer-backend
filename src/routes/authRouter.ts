import * as express from 'express';

import AuthController from '../controllers/AuthController';

const authRouter = express.Router();

authRouter.post('/', AuthController.auth);
authRouter.post('/validate', AuthController.validate);

export default authRouter;
