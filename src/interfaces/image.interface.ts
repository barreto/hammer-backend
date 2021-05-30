import { Document } from 'mongoose';

export default interface IImage extends Document {
    imageName: string;
    version: string;
    status: string;
    createdAt: string;
    destroyedAt: string;
}
