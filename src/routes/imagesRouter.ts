import * as express from 'express';

import ImagesController from '../controllers/ImagesController';

const imagesRouter = express.Router();

imagesRouter.get('/', ImagesController.show);

export default imagesRouter;
