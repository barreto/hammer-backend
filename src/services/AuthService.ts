import dockerAPI from '../api/dockerAPI';
import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import InstatiationError from '../erros/InstantiationError';
import UserSchema from '../schemas/user.schema';
import { btoa } from '../utils/btoa';
import checkIfHasValidEmailStructure from '../utils/checkIfHasValidEmailStructure';

export default class AuthService {
    // Singleton
    private static _instance: AuthService = new AuthService();

    constructor(private NAMESPACE = NAMESPACES.AuthService) {
        if (AuthService._instance) throw new InstatiationError(this.NAMESPACE);
        else AuthService._instance = this;
    }

    public static getInstance(): AuthService {
        return AuthService._instance;
    }

    async validate(username: string, email: string, password: string) {
        logging.info(this.NAMESPACE, 'validate method was called');

        let validations = [];

        if (!checkIfHasValidEmailStructure(email)) {
            validations.push({
                attribute: 'email',
                error: 'the structure of the e-mail is incorrect.'
            });
        }

        // password is required by schema but not
        const newUser = new UserSchema({ username, email, password });
        await newUser.validate().catch((error) => {
            const errorsEntries = Object.entries(error.errors);

            const mongoValidations = errorsEntries.map(([errorKey, errorValue]: any) => ({
                attribute: errorKey,
                error: errorValue.message
            }));
            validations = validations.concat(mongoValidations);
        });

        if (validations.length) {
            const errorDetails = { error: 'validation error', validations };
            logging.error(this.NAMESPACE, 'validation(s) problem(s)', errorDetails);
            throw errorDetails;
        }

        return { success: true };
    }

    async auth(username: string, password: string) {
        logging.info(this.NAMESPACE, 'auth method has been called');

        const serveraddress = 'https://index.docker.io/v1/'; // default docker server address in LOWERCASE
        const body = JSON.stringify({ username, password, serveraddress });

        const { data } = await dockerAPI.post('auth', body);

        const IdentityToken = btoa(body);
        return { ...data, IdentityToken };
    }
}
