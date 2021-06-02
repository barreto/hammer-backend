import * as express from 'express';

import ContainersController from '../controllers/ContainersController';

const containersRouter = express.Router();

containersRouter.get('/', ContainersController.index);
containersRouter.get('/:containerId', ContainersController.show);
containersRouter.post('/create', ContainersController.create);
containersRouter.post('/:containerId/start', ContainersController.start);
containersRouter.post('/:containerId/stop', ContainersController.stop);
containersRouter.post('/:containerId/restart', ContainersController.restart);
containersRouter.delete('/:containerId', ContainersController.delete);
containersRouter.post('/clear', ContainersController.deleteAll);

export default containersRouter;
