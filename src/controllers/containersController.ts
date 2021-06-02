import { NextFunction, Request, Response } from 'express';

import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import Container from '../models/Container';
import ContainersService from '../services/ContainersService';

class ContainersController {
    constructor(
        private NAMESPACE = NAMESPACES.ContainersController,
        private containersService = ContainersService.getInstance()
    ) {}

    index = async (_req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'index method was called');

        try {
            const result = await this.containersService.listContainers(true);
            logging.info(this.NAMESPACE, 'method index - result', result);
            const containers = result.map((item) => {
                return {
                    id: item.Id,
                    names: item.Names,
                    image: item.Image,
                    command: item.Command,
                    created: item.Created,
                    ports: item.Ports,
                    state: item.State,
                    status: item.Status,
                    hostConfig: item.HostConfig
                };
            });
            return res.status(200).json({ containers, count: containers.length });
        } catch (error) {
            logging.error(this.NAMESPACE, error.message, error);
            return res.status(500).json({ error: error.message });
        }
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        const { params, query } = req;
        logging.info(this.NAMESPACE, 'show method was called', { params, query });
        const { containerId } = params;
        const { size } = query;

        try {
            const boolSize = size === 'true';
            const result = await this.containersService.inspectContainer(containerId, boolSize);
            logging.info(this.NAMESPACE, 'method show - result', result);
            return res.status(200).json(result);
        } catch (error) {
            logging.error(this.NAMESPACE, error.message, error);
            return res.status(500).json({ error: error.message });
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        const { query, body } = req;
        logging.info(this.NAMESPACE, 'create method was called', { query, body });

        const { name } = query;

        const hasValidParams = name && (name as string)?.trim();

        if (!hasValidParams) {
            logging.error(this.NAMESPACE, 'invalid received data - name.', { name });
            return res.status(400).json({ message: 'value of name is required.' });
        }

        const {
            Hostname,
            Domainname,
            User,
            AttachStdin,
            AttachStdout,
            AttachStderr,
            ExposedPorts,
            Env,
            Image,
            Entrypoint,
            NetworkDisabled
        } = body;

        try {
            const newContainer = new Container(
                name as string,
                Hostname,
                Domainname,
                User,
                AttachStdin,
                AttachStdout,
                AttachStderr,
                ExposedPorts,
                Env,
                Image,
                Entrypoint,
                NetworkDisabled
            );
            const response = await this.containersService.createContainer(newContainer);
            const { data, status } = response;
            return res.status(status).json(data);
        } catch (error) {
            logging.error(this.NAMESPACE, error.message, error);
            return res.status(500).json({ message: error.message });
        }
    };

    start = async (req: Request, res: Response, next: NextFunction) => {
        const { params } = req;
        logging.info(this.NAMESPACE, 'create method was called', { params });

        try {
            const response = await this.containersService.start(params.containerId);
            const { data, status } = response;
            return res.status(status).json(data);
        } catch (error) {
            logging.error(this.NAMESPACE, error.message, error);
            return res.status(500).json({ message: error.message });
        }
    };

    stop = async (req: Request, res: Response, next: NextFunction) => {
        const { params } = req;
        logging.info(this.NAMESPACE, 'stop method was called', { params });

        try {
            const response = await this.containersService.stop(params.containerId);
            const { data, status } = response;
            return res.status(status).json(data);
        } catch (error) {
            logging.error(this.NAMESPACE, error.message, error);
            return res.status(500).json({ message: error.message });
        }
    };

    restart = async (req: Request, res: Response, next: NextFunction) => {
        const { params } = req;
        logging.info(this.NAMESPACE, 'restart method was called', { params });

        try {
            const response = await this.containersService.restart(params.containerId);
            const { data, status } = response;
            return res.status(status).json(data);
        } catch (error) {
            logging.error(this.NAMESPACE, error.message, error);
            return res.status(500).json({ message: error.message });
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const { params, query } = req;
        logging.info(this.NAMESPACE, 'delete method was called', { query, params });

        const { containerId } = params;
        const { v, force = true, link } = query;

        if (!containerId)
            return res.status(400).json({ message: 'value containerId is required.' });

        try {
            const result = await this.containersService.delete(
                containerId,
                v == 'true',
                force == 'true',
                link == 'true'
            );
            logging.info(this.NAMESPACE, 'delete method - result', result);
            return res
                .status(200)
                .json({ message: 'container deleted with success.', deletedId: containerId });
        } catch (error) {
            logging.error(this.NAMESPACE, 'failed at method delete', error);
            return res.status(500).json({ message: error.message });
        }
    };

    deleteAll = async (_req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'deleteAll method was called');
        try {
            const allContainers = await this.containersService.listContainers(true);
            const containersIds = allContainers.map((container) => container.Id);
            logging.info(this.NAMESPACE, 'deleteAll method - ids to delete', { containersIds });

            const promisses = [];
            containersIds.forEach((containerId) => {
                promisses.push(this.containersService.delete(containerId, false, true));
            });

            await Promise.all(promisses);

            const data = {
                message: 'all containers deleted with success.',
                deletedCount: containersIds.length
            };
            return res.status(200).json(data);
        } catch (error) {
            logging.error(this.NAMESPACE, 'failed at method deleteAll', error);
            return res.status(error.status || 500).json({ message: error.message });
        }
    };
}

export default new ContainersController();
