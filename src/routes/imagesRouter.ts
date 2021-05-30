import * as express from 'express';

import ImagesController from '../controllers/ImagesController';

const imagesRouter = express.Router();

imagesRouter.get('/', ImagesController.show);
imagesRouter.post('/create', ImagesController.create);

export default imagesRouter;
