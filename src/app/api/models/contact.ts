import mongoose, { Document, Model } from 'mongoose';

const ContactSchema = new mongoose.Schema({
  description: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: false },
});

export interface ContactDocument extends Document {
  description: string;
  phone: string;
  email: string;
}

const ContactModel: Model<ContactDocument> =
  mongoose.models.Contact || mongoose.model<ContactDocument>('Contact', ContactSchema);

export default ContactModel;
