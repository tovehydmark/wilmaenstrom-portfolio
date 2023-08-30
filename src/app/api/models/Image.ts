import { model, models, Schema, Document } from 'mongoose';
import { ModelName } from './modelnames';

const ImageSchema = new Schema({
  image: { type: String, required: true },
});

export type ImageDocument = Document & {
  image: string;
};

export default models[ModelName.Image] || model<ImageDocument>(ModelName.Image, ImageSchema);
