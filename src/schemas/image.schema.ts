import { model, Schema } from 'mongoose';

import IImage from '../interfaces/image.interface';

const ImageSchema: Schema = new Schema(
    {
        imageName: { type: String, required: true },
        version: { type: String, required: true },
        status: { type: String, required: true },
        destroyedAt: { type: String, required: false }
    },
    {
        timestamps: true
    }
);

export default model<IImage>('Image', ImageSchema);
