import * as cors from 'cors';
import { Request, Response } from 'express';

import config from './config/config';
import errorHandling from './middlewares/errorHandling';
import requestLogger from './middlewares/requestLogger';
import authRouter from './routes/authRouter';
import imagesRouter from './routes/imagesRouter';
import decryptDataSha256 from './utils/decryptDataSha256';
import encryptDataSha256 from './utils/encryptDataSha256';
import serverRunning from './utils/serverRunning';

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');

const router = express();

router.use(cors());

router.use(requestLogger);

/** Parse the request */
router.use(bodyParser.urlencoded({ extended: false }));

/** Takes care of json treatment */
router.use(bodyParser.json());

/** Routes */
router.use('/auth', authRouter);
router.use('/images', imagesRouter);
router.use('/encrypt', (req: Request, res: Response) => {
    const { data } = req.body;
    const encrypt = encryptDataSha256(data, 'test');
    res.json({ encrypt });
});

router.use('/decrypt', (req: Request, res: Response) => {
    const { data } = req.body;
    const decrypt = decryptDataSha256(data, 'test');
    res.json({ decrypt });
});

/** Error Handling */
router.use(errorHandling);

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () =>
    serverRunning(config.server.hostname, config.server.port)
);
