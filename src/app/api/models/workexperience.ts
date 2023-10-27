import mongoose, { Document, Model } from 'mongoose';

const WorkexperienceSchema = new mongoose.Schema({
  workplace: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
});

export interface WorkexperienceDocument extends Document {
  workplace: string;
  city: string;
  description: string;
}

const WorkexperienceModel: Model<WorkexperienceDocument> =
  mongoose.models.Workexperience || mongoose.model<WorkexperienceDocument>('Workexperience', WorkexperienceSchema);

export default WorkexperienceModel;
