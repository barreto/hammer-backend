import { AxiosRequestConfig } from 'axios';

import dockerAPI from '../api/dockerAPI';
import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import InstatiationError from '../erros/InstantiationError';
import Container from '../models/Container';

export default class ContainersService {
    // Singleton
    private static _instance: ContainersService = new ContainersService();

    constructor(private NAMESPACE = NAMESPACES.ContainersService) {
        if (ContainersService._instance) throw new InstatiationError(this.NAMESPACE);
        else ContainersService._instance = this;
    }

    public static getInstance(): ContainersService {
        return ContainersService._instance;
    }

    async listContainers(
        all: boolean = false,
        limit?: number,
        size: boolean = false,
        digests: boolean = false
    ) {
        logging.info(this.NAMESPACE, 'listContainers method was called');
        const config: AxiosRequestConfig = { params: { all, limit, size, digests } };
        const { data } = await dockerAPI.get('containers/json', config);
        return data;
    }

    async inspectContainer(imageId: string, size: boolean = false) {
        logging.info(this.NAMESPACE, 'inspectImage method was called');
        const config: AxiosRequestConfig = { params: { size } };
        const { data } = await dockerAPI.get(`containers/${imageId}/json`, config);
        return data;
    }

    async createContainer(container: Container) {
        logging.info(this.NAMESPACE, 'createContainer method was called', container);

        try {
            const body = container.getDTO();
            const config: AxiosRequestConfig = {
                params: container.Name,
                headers: { 'Content-Type': 'application/json' }
            };
            logging.info(this.NAMESPACE, 'createContainer - config', config);

            const response = await dockerAPI.post('containers/create', body, config);
            logging.info(this.NAMESPACE, 'createContainer - response', response);

            const { status, data } = response;
            return { data, status };
        } catch (error) {
            logging.error(this.NAMESPACE, 'Image creation failed - error', error);
            throw { message: error.response.data.message, status: error.response.status };
        }
    }

    async delete(name: string, v: boolean = false, force: boolean = false, link: boolean = false) {
        logging.info(this.NAMESPACE, 'delete method was called');
        const config: AxiosRequestConfig = { params: { v, force, link } };
        const response = await dockerAPI.delete(`containers/${name}`, config);
        return response.data;
    }
}
