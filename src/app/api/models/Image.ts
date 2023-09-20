import mongoose, { Document } from 'mongoose';

const ImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true, unique: true },
  fileName: { type: String, required: true },
});

export default module.exports = mongoose.models.Image || mongoose.model('Image', ImageSchema);
