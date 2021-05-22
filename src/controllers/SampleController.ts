import { NextFunction, Request, Response } from 'express';

import logging from '../config/logging';
import NAMESPACES from '../constants/namespaces';

export class SampleController {
    sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
        logging.info(NAMESPACES.SampleController, 'Sample health check route called');

        return res.status(200).json({ message: 'pong' });
    };
}
