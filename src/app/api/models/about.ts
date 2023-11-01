import mongoose, { Document, Model } from 'mongoose';

const AboutSchema = new mongoose.Schema({
  description: { type: String, required: true },
});

export interface AboutDocument extends Document {
  description: string;
}

const AboutModel: Model<AboutDocument> = mongoose.models.About || mongoose.model<AboutDocument>('About', AboutSchema);

export default AboutModel;
