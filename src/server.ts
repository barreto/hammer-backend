import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as mongoose from 'mongoose';

import config from './config/config';
import logging from './config/logging';
import NAMESPACES from './enums/namespaces';
import errorHandling from './middlewares/errorHandling';
import requestLogger from './middlewares/requestLogger';
import authRouter from './routes/authRouter';
import containersRouter from './routes/containerRouter';
import imagesRouter from './routes/imagesRouter';
import userRouter from './routes/userRouter';
import serverRunning from './utils/serverRunning';

const router = express();

router.use(cors());

router.use(requestLogger);

/** Parse the request */
router.use(bodyParser.urlencoded({ extended: false }));

/** Takes care of json treatment */
router.use(bodyParser.json());

/** Routes */
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/images', imagesRouter);
router.use('/containers', containersRouter);

/** Error Handling */
router.use(errorHandling);

/** Create the server */
const httpServer = http.createServer(router);

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((_result) => {
        logging.info(NAMESPACES.SERVER, 'Connected to MongoDB');
        httpServer.listen(config.server.port, () =>
            serverRunning(config.server.hostname, config.server.port)
        );
    })
    .catch((error) => logging.error(NAMESPACES.SERVER, error.message, error));
