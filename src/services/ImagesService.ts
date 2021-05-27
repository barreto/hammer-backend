import { AxiosRequestConfig } from 'axios';

import dockerAPI from '../api/dockerAPI';
import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';

export default class ImagesService {
    // Singleton
    private static _instance: ImagesService = new ImagesService();

    constructor(private NAMESPACE = NAMESPACES.ImagesService) {
        if (ImagesService._instance) {
            throw new Error(
                'Error: Instantiation failed: Use ImagesService.getInstance() instead of new.'
            );
        }
        ImagesService._instance = this;
    }

    public static getInstance(): ImagesService {
        return ImagesService._instance;
    }

    async getImages() {
        logging.info(this.NAMESPACE, 'has been called with method getImages');
        return await dockerAPI.get('images/json');
    }

    /**
     *
     * @param fromImage Name of the image to pull. The name may include a tag or digest. This parameter may only be used when pulling an image. The pull is cancelled if the HTTP connection is closed.
     * @param fromSrc Source to import. The value may be a URL from which the image can be retrieved or - to read the image from the request body. This parameter may only be used when importing an image.
     * @param repo 	Repository name given to an image when it is imported. The repo may include a tag. This parameter may only be used when importing an image.
     * @param tag Tag or digest. If empty when pulling an image, this causes all tags for the given image to be pulled.
     * @param message Set commit message for imported image.
     * @param platform Platform in the format os[/arch[/variant]]
     * @returns
     */
    async createImage(
        fromImage: string,
        fromSrc?: string,
        repo?: string,
        tag?: string,
        message?: string,
        platform: string = ''
    ) {
        logging.info(this.NAMESPACE, 'has been called with method createImage');

        const options: AxiosRequestConfig = {
            params: { fromImage, fromSrc, repo, tag, message, platform },
            headers: {
                'Content-Type': 'application/tar',
                'X-Registry-Auth': process.env.DOCKER_TOKEN
            }
        };

        try {
            const response = await dockerAPI.post('images/create', null, options);
            logging.info(this.NAMESPACE, 'createImage - response', response);

            return { message: 'Image created with success.', status: response.status };
        } catch (error) {
            return { message: error.response.data.message, status: error.response.status };
        }
    }

    async prune() {
        logging.info(this.NAMESPACE, 'has been called with method deleteUnused');
        return await dockerAPI.post('images/prune');
    }
}
