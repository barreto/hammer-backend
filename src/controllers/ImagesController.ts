import { NextFunction, Request, Response } from 'express';

import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import Image from '../models/image';
import ImagesServiceClass from '../services/ImagesService';

class ImagesController {
    constructor(
        private NAMESPACE = NAMESPACES.ImagesController,
        private imagesService = ImagesServiceClass.getInstance()
    ) {}

    show = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'Images Controller route called with method show');

        try {
            const result = await this.imagesService.listImages();
            logging.info(this.NAMESPACE, 'success at method show', result);
            return res.status(200).json({ images: result, count: result.length });
        } catch (error) {
            logging.error(this.NAMESPACE, error.message, error);
            return res.status(500).json({ error: error.message });
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'create was called', req.body);
        const { fromImage, fromSrc, repo, tag, commitMessage, platform } = req.body;

        const hasValidParams = fromImage && tag && fromImage?.trim() && tag?.trim();

        if (!hasValidParams) {
            const params = { fromImage, tag };
            logging.error(this.NAMESPACE, 'Invalid required values on createImage', params);
            return res.status(400).json({ message: 'values of fromImage and tag are required.' });
        }

        try {
            const newImage = new Image(fromImage, tag, commitMessage, fromSrc, repo, platform);
            const { message, status, state } = await this.imagesService.createImage(newImage);
            return res.status(status).json({ message, state });
        } catch (error) {
            logging.error(this.NAMESPACE, error.message, error);
            return res.status(500).json({ message: error.message });
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'Images Controller route called with method delete');

        const { data } = await this.imagesService.prune();

        return res.json({ data });
    };
}

export default new ImagesController();
