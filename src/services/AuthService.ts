import dockerAPI from '../api/dockerAPI';
import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import { btoa } from '../utils/btoa';

export default class AuthService {
    // Singleton
    private static _instance: AuthService = new AuthService();

    constructor(private NAMESPACE = NAMESPACES.AuthService) {
        if (AuthService._instance) {
            throw new Error(
                'Error: Instantiation failed: Use AuthService.getInstance() instead of new.'
            );
        }
        AuthService._instance = this;
    }

    public static getInstance(): AuthService {
        return AuthService._instance;
    }

    async auth(username: string, password: string) {
        logging.info(this.NAMESPACE, 'Auth service has been called');

        const serveraddress = 'https://index.docker.io/v1/'; // default docker server address in LOWERCASE
        const body = JSON.stringify({ username, password, serveraddress });

        const { data } = await dockerAPI.post('auth', body);

        const IdentityToken = btoa(body);
        return { ...data, IdentityToken };
    }
}
