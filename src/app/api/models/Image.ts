import { model, models, Schema, Document } from 'mongoose';
import { ModelName } from './modelnames';

const ImageSchema = new Schema({
  title: { type: String, required: true },
  src: { type: String, required: false },
  image: { type: String, required: true },
});

export type ImageDocument = Document & {
  filename: string;
  contentType: string;
  data: string;
};

export default models[ModelName.Image] || model<ImageDocument>(ModelName.Image, ImageSchema);
