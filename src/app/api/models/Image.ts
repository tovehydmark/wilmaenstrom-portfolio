import { Model, model, models, Schema } from 'mongoose';
import { ModelName } from './modelnames';

const ImageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: true },
});

export type ImageDocument = typeof ImageSchema;

export default (models[ModelName.Image] || model(ModelName.Image, ImageSchema)) as Model<ImageDocument>;
