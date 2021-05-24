import { NextFunction, Request, Response } from 'express';

import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';

/** Logging the reques */
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    logging.info(
        NAMESPACES.SERVER,
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
        logging.info(
            NAMESPACES.SERVER,
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });

    next();
};

export default requestLogger;
