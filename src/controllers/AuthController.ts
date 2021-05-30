import { NextFunction, Request, Response } from 'express';

import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import AuthService from '../services/AuthService';

class AuthController {
    constructor(
        private NAMESPACE = NAMESPACES.AuthController,
        private authService = AuthService.getInstance()
    ) {}

    validate = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'validate method was called');

        const { username, email, password } = req.body;

        try {
            const result = await this.authService.validate(
                username as string,
                email as string,
                password as string
            );
            logging.info(this.NAMESPACE, 'validate method - result', result);
            return res.status(200).json(result);
        } catch (error) {
            if (error.validations) return res.status(400).json(error);
            else return res.status(500).json(error);
        }
    };

    auth = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'auth method was called');

        const { username, password } = req.body;

        const isValidBody = String(username).trim() && String(password).trim();

        if (!isValidBody) return res.status(400).json({ message: 'bad request' });

        const data = await this.authService.auth(username as string, password as string);
        logging.info(this.NAMESPACE, 'Auth Controller - response', data);

        return res.json(data);
    };
}

export default new AuthController();
