import mongoose, { Schema } from 'mongoose';

const ImageSchema = new Schema(
  {
    title: { type: String, required: true },
    // description: { type: String, required: true },
    // image: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Image || mongoose.model('Image', ImageSchema);
