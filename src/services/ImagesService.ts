import { AxiosRequestConfig } from 'axios';

import dockerAPI from '../api/dockerAPI';
import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import InstatiationError from '../erros/InstantiationError';
import Image from '../models/image';

export default class ImagesService {
    // Singleton
    private static _instance: ImagesService = new ImagesService();

    constructor(private NAMESPACE = NAMESPACES.ImagesService) {
        if (ImagesService._instance) throw new InstatiationError(this.NAMESPACE);
        else ImagesService._instance = this;
    }

    public static getInstance(): ImagesService {
        return ImagesService._instance;
    }

    /**
     * Returns a list of images on the server. Note that it uses a different, smaller representation of an image than inspecting a single image.
     *
     * @param all Show all images. Only images from a final layer (no children) are shown by default.
     * @param digests Show digest information as a ```RepoDigests``` field on each image.
     * @returns
     */
    async listImages(all: boolean = false, digests: boolean = false) {
        logging.info(this.NAMESPACE, 'has been called with method getImages');
        const config: AxiosRequestConfig = { params: { all, digests } };
        const { data } = await dockerAPI.get('images/json', config);
        return data;
    }

    /**
     * Create an image by either pulling it from a registry or importing it.
     *
     * @param fromImage Name of the image to pull. The name may include a tag or digest. This parameter may only be used when pulling an image. The pull is cancelled if the HTTP connection is closed.
     * @param fromSrc Source to import. The value may be a URL from which the image can be retrieved or - to read the image from the request body. This parameter may only be used when importing an image.
     * @param repo 	Repository name given to an image when it is imported. The repo may include a tag. This parameter may only be used when importing an image.
     * @param tag Tag or digest. If empty when pulling an image, this causes all tags for the given image to be pulled.
     * @param message Set commit message for imported image.
     * @param platform Platform in the format os[/arch[/variant]]
     * @returns
     */
    async createImage(image: Image) {
        logging.info(this.NAMESPACE, 'createImage was called', image);

        try {
            const config: AxiosRequestConfig = {
                params: image.getDTO(),
                headers: { 'Content-Type': 'application/tar' }
            };
            logging.info(this.NAMESPACE, 'createImage - config', config);

            const response = await dockerAPI.post('images/create', null, config);
            logging.info(this.NAMESPACE, 'createImage - response', response);

            const { status, data } = response;
            const state = data.includes('Image is up to date') ? 'updated' : 'created';
            return { message: `Image ${state} with success.`, status, state };
        } catch (error) {
            logging.error(this.NAMESPACE, 'Image creation failed - error', error);
            throw { message: error.response.data.message, status: error.response.status };
        }
    }

    /**
     * Remove an image, along with any untagged parent images that were referenced by that image.
     *
     * Images can't be removed if they have descendant images, are being used by a running container or are being used by a build.
     *
     * @param name Image name or ID
     * @param force	Remove the image even if it is being used by stopped containers or has other tags
     * @param noprune Do not delete untagged parent images
     * @returns
     */
    async delete(name: string, force: boolean = false, noprune: boolean = false) {
        logging.info(this.NAMESPACE, 'has been called with method deleteUnused');

        const options: AxiosRequestConfig = { params: { force, noprune } };
        return await dockerAPI.delete(name, options);
    }

    async prune() {
        logging.info(this.NAMESPACE, 'has been called with method deleteUnused');
        return await dockerAPI.post('images/prune');
    }
}
