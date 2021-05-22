import config from './config/config';
import { errorHandling } from './middlewares/errorHandling';
import { requestLogger } from './middlewares/requestLogger';
import sampleRouter from './routes/sampleRouter';
import { serverRunning } from './utils/serverRunning';

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');

const router = express();

router.use(requestLogger);

/** Parse the request */
router.use(bodyParser.urlencoded({ extended: false }));

/** Takes care of json treatment */
router.use(bodyParser.json());

/** Routes */
router.use('/sample', sampleRouter);

/** Error Handling */
router.use(errorHandling);

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () =>
    serverRunning(config.server.hostname, config.server.port)
);
