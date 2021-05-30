import * as express from 'express';

import ImagesController from '../controllers/ImagesController';

const imagesRouter = express.Router();

imagesRouter.get('/', ImagesController.index);
imagesRouter.get('/:imageId', ImagesController.show);
imagesRouter.post('/create', ImagesController.create);
imagesRouter.delete('/:imageId', ImagesController.delete);
imagesRouter.post('/clear', ImagesController.deleteAll);

export default imagesRouter;
