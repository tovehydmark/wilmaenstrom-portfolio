import mongoose, { Document, Model } from 'mongoose';

const ImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true, unique: true },
  fileName: { type: String, required: true },
  _id: { type: String, required: false },
});

export interface ImageDocument extends Document {
  imageUrl: string;
  fileName: string;
  _id?: string;
}

const ImageModel: Model<ImageDocument> = mongoose.models.Image || mongoose.model<ImageDocument>('Image', ImageSchema);

export default ImageModel;
