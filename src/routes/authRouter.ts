import * as express from 'express';

import ImagesController from '../controllers/ImagesController';

const authRouter = express.Router();

authRouter.get('/', ImagesController.show);

export default authRouter;
