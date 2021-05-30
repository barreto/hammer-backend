import * as mongoose from 'mongoose';

import logging from '../config/logging';
import NAMESPACES from '../enums/namespaces';
import InstatiationError from '../erros/InstantiationError';
import User from '../models/user';
import UserSchema from '../schemas/user.schema';
import encrypt from '../utils/encrypt';

export default class UserService {
    // Singleton
    private static _instance = new UserService();

    constructor(private NAMESPACE = NAMESPACES.UserService) {
        if (UserService._instance) throw new InstatiationError(this.NAMESPACE);
        else UserService._instance = this;
    }

    public static getInstance(): UserService {
        return UserService._instance;
    }

    async create(user: User) {
        const newUser = new UserSchema({
            _id: new mongoose.Types.ObjectId(),
            username: user.Username,
            email: user.Email,
            password: encrypt(user.Password, user.Username),
            nickname: user.Nickname
        });

        await newUser.validate().catch((error) => {
            const errorsEntries = Object.entries(error.errors);
            const validations = errorsEntries.map(([errorKey, errorValue]: any) => ({
                attribute: errorKey,
                error: errorValue.message
            }));
            const errorDetails = { error: error.name, validations };
            throw errorDetails;
        });

        logging.info(this.NAMESPACE, 'User service has been called at method create', user);
        // return newUser.save();
        return {
            _id: '60b2a1ef88835750b4595195',
            username: 'mocked-test',
            email: 'test@host.com',
            password: '5a7e9b31bc7e153a5c0e04c01422c0e2d529f2a3a73e75dfe53acbc3b9e17a8a',
            nickname: 'Mister Test',
            createdAt: '2021-05-29T20:19:59.738Z',
            updatedAt: '2021-05-29T20:19:59.738Z',
            __v: 0
        };
    }

    async show() {
        return await UserSchema.find().select({
            username: true,
            email: true,
            nickname: true,
            createdAt: true
        });
    }
}
