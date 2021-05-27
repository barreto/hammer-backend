import { NextFunction, Request, Response } from 'express';

import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import ImagesServiceClass from '../services/ImagesService';

class ImagesController {
    constructor(
        private NAMESPACE = NAMESPACES.ImagesController,
        private imagesService = ImagesServiceClass.getInstance()
    ) {}

    show = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'Images Controller route called with method show');

        const { data } = await this.imagesService.getImages();

        return res.json(data);
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'Images Controller route called with method create');

        const { fromImage, fromSrc, repo, tag, commitMessage, platform } = req.query;

        const { message, status } = await this.imagesService.createImage(
            fromImage as string,
            fromSrc as string,
            repo as string,
            tag as string,
            commitMessage as string,
            platform as string
        );

        return res.status(status).json({ message });
    };

    prune = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'Images Controller route called with method deleteUnused');

        const { data } = await this.imagesService.prune();

        return res.json({ data });
    };
}

export default new ImagesController();
