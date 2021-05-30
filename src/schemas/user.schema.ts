import { model, Schema } from 'mongoose';

import IUser from '../interfaces/user.interface';

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: async function (value) {
                    const self = this;
                    try {
                        const user = await self.constructor.findOne({ username: value }).exec();
                        const isExistingUsername = Boolean(user);
                        const isValidUsername = !isExistingUsername;
                        return isValidUsername;
                    } catch (error) {
                        throw error;
                    }
                },
                message: 'the username is already taken.'
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: async function (value) {
                    const self = this;
                    try {
                        const user = await self.constructor.findOne({ email: value }).exec();
                        const isExistingEmail = Boolean(user);
                        const isValidEmail = !isExistingEmail;
                        return isValidEmail;
                    } catch (error) {
                        throw error;
                    }
                },
                message: 'the email address is already taken.'
            }
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: async function (value) {
                    const regexp = new RegExp(
                        /((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!|@|#|$|<|>])).{8,}/
                    );
                    return regexp.test(value);
                },
                message:
                    'password should may have more than 7 chars, max lenght of 32 chars numbers, letters in upper and lower case and at least special char (!@#$<>).'
            }
        },
        nickname: { type: String, required: false }
    },
    {
        timestamps: true
    }
);

export default model<IUser>('UserSchema', UserSchema);
