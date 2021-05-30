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

    index = async (_req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'index method was called');

        try {
            const result = await this.imagesService.listImages();
            logging.info(this.NAMESPACE, 'method index - result', result);
            return res.status(200).json({ images: result, count: result.length });
        } catch (error) {
            logging.error(this.NAMESPACE, error.message, error);
            return res.status(500).json({ error: error.message });
        }
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'show method was called', req.params);
        const { imageId } = req.params;

        try {
            const result = await this.imagesService.inspectImage(imageId);
            logging.info(this.NAMESPACE, 'method index - result', result);
            return res.status(200).json(result);
        } catch (error) {
            logging.error(this.NAMESPACE, error.message, error);
            return res.status(500).json({ error: error.message });
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'create method was called', req.body);
        const { fromImage, fromSrc, repo, tag, commitMessage, platform } = req.body;

        const hasValidParams = fromImage && tag && fromImage?.trim() && tag?.trim();

        if (!hasValidParams) {
            const params = { fromImage, tag };
            logging.error(this.NAMESPACE, 'invalid required values on createImage', params);
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
        logging.info(this.NAMESPACE, 'delete method was called', req.params);

        const { imageId } = req.params;
        if (!imageId) return res.status(400).json({ message: 'value imageId is required.' });

        try {
            const result = await this.imagesService.delete(imageId);
            logging.info(this.NAMESPACE, 'delete method - result', result);
            return res
                .status(200)
                .json({ message: 'image deleted with success.', deletedId: imageId });
        } catch (error) {
            logging.error(this.NAMESPACE, 'failed at method delete', error);
            return res.status(500).json({ message: error.message });
        }
    };

    deleteAll = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'deleteAll method was called', req.params);
        try {
            const allImages = await this.imagesService.listImages();
            const imagesIds = allImages.map((image) => image.Id);
            logging.info(this.NAMESPACE, 'deleteAll method - ids to delete', { imagesIds });

            const promisses = [];
            imagesIds.forEach((imageId) => {
                promisses.push(this.imagesService.delete(imageId, true));
            });
            const result = await Promise.all(promisses);

            logging.info(this.NAMESPACE, 'deleteAll method - result', result);
            const data = {
                message: 'all images deleted with success.',
                deletedCount: imagesIds.length
            };
            return res.status(200).json(data);
        } catch (error) {
            logging.error(this.NAMESPACE, 'failed at method deleteAll', error);
            return res.status(error.status || 500).json({ message: error.message });
        }
    };
}

export default new ImagesController();
