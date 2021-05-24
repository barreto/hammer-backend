import { NextFunction, Request, Response } from 'express';

import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import ImagesServiceClass from '../services/ImagesService';

class ImagesController {
    imagesService = ImagesServiceClass.getInstance();

    async show(req: Request, res: Response, next: NextFunction) {
        logging.info(NAMESPACES.ImagesController, 'Images Controller route called');

        const imagesService = ImagesServiceClass.getInstance();
        const { data } = await imagesService.getImages();

        return res.json(data);
    }
}

export default new ImagesController();
