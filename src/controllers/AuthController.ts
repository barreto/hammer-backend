import { NextFunction, Request, Response } from 'express';

import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import AuthService from '../services/AuthService';

class AuthController {
    constructor(
        private NAMESPACE = NAMESPACES.AuthController,
        private authService = AuthService.getInstance()
    ) {}

    auth = async (req: Request, res: Response, next: NextFunction) => {
        logging.info(this.NAMESPACE, 'Auth Controller route called with method auth');

        const { username, password } = req.body;

        const isValidBody = String(username).trim() && String(password).trim();

        if (!isValidBody) return res.status(400).json({ message: 'bad request' });

        const data = await this.authService.auth(username as string, password as string);
        logging.info(this.NAMESPACE, 'Auth Controller - response', data);

        return res.json(data);
    };
}

export default new AuthController();
