import { model, models, Schema, Document } from 'mongoose';
import { ModelName } from './modelnames';

const ImageSchema = new Schema({
  title: { type: String, required: true },
  src: { type: String, required: false },
  image: { type: String, required: true },
});

export type ImageDocument = Document & {
  title: string;
  src: string;
  image: string;
};

export default models[ModelName.Image] || model<ImageDocument>(ModelName.Image, ImageSchema);
