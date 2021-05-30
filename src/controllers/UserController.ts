import { NextFunction, Request, Response } from 'express';

import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import User from '../models/user';
import UserService from '../services/UserService';
import checkIfHasValidEmailStructure from '../utils/checkIfHasValidEmailStructure';

class UserController {
    constructor(
        private NAMESPACE = NAMESPACES.UserController,
        private userService = UserService.getInstance()
    ) {}

    show = async (_req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'User controller has been called at method show');

        try {
            logging.info(this.NAMESPACE, 'User controller has been called at method show');
            const result = await this.userService.show();
            const data = { users: result, count: result.length };
            return res.status(200).json(data);
        } catch (error) {
            logging.error(this.NAMESPACE, 'User controller failed at method show with:', error);
            return res.status(500).json({ error: error.message });
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(
            this.NAMESPACE,
            'User controller has been called at method registry',
            req.body
        );
        const { username, email, password, nickname } = req.body;

        const hasRequiredValues =
            username && email && password && username?.trim() && email?.trim() && password?.trim();

        if (!hasRequiredValues) {
            const data = { message: 'the values username, email and password are required.' };
            logging.error(this.NAMESPACE, data.message, req.body);
            return res.status(400).json(data);
        }

        if (!checkIfHasValidEmailStructure(email)) {
            const data = { message: 'the structure of the email is incorrect.' };
            logging.error(this.NAMESPACE, data.message, req.body);
            return res.status(400).json(data);
        }

        try {
            const newUser = new User(username, email, password, nickname);
            const result = await this.userService.create(newUser);
            return res.status(201).json(result);
        } catch (error) {
            if (error.validations) {
                logging.error(this.NAMESPACE, 'Validations problems at create method', error);
                return res.status(400).json(error);
            }

            logging.error(this.NAMESPACE, 'Error at create method', error);
            return res.status(500).json({ error: error.message });
        }
    };
}

export default new UserController();
