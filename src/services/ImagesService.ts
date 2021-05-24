import dockerAPI from '../api/dockerAPI';
import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';

export default class ImagesServiceClass {
    // Singleton
    private static _instance: ImagesServiceClass = new ImagesServiceClass();

    constructor() {
        if (ImagesServiceClass._instance) {
            throw new Error(
                'Error: Instantiation failed: Use ImagesServiceClass.getInstance() instead of new.'
            );
        }
        ImagesServiceClass._instance = this;
    }

    public static getInstance(): ImagesServiceClass {
        return ImagesServiceClass._instance;
    }

    async getImages() {
        logging.info(NAMESPACES.ImagesService, 'Images service has been called');
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
        fromSrc: string,
        repo: string,
        tag: string,
        message: string,
        platform: string = ''
    ) {
        logging.info(NAMESPACES.ImagesService, 'Images service has been called');
        return await dockerAPI.get('images/json');
    }
}
