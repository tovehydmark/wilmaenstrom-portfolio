import mongoose, { Document, Model } from 'mongoose';

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true, unique: true },
  school: { type: String, required: true },
  description: { type: String, required: true },
});

export interface EducationDocument extends Document {
  degree: string;
  school: string;
  description: string;
}

const EducationModel: Model<EducationDocument> =
  mongoose.models.Education || mongoose.model<EducationDocument>('Education', EducationSchema);

export default EducationModel;
