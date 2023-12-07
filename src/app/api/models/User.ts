import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  headerImageUrl: { type: String, required: false, unique: true },
});

export default module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
