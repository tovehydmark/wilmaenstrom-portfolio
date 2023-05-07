import { Model, model, models, Schema } from 'mongoose';
import { ModelName } from './modelnames';
import { normalize } from './normalize';

/** Schema for the "image" database model and document type */
const ImageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: true },
  //   slug: { type: String, required: false },
});
ImageSchema.plugin(normalize);

export type ImageDocument = PlainDocument<typeof ImageSchema>;

/** LessonModel to read and write documents to the "lessons" collection in the database. */
export default (models[ModelName.Image] || model(ModelName.Image, ImageSchema)) as Model<ImageDocument>;
