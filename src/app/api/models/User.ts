import crypto from 'crypto';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  // name: String,
  // email: String,
  password: String,
  hash: String,
  salt: String,
  // admin: Boolean,
});

// Method to set salt and hash the password for a user
UserSchema.methods.setPassword = function (password: string) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString('hex');

  // Hashing user's salt and password with 1000 iterations,

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password: string) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.hash === hash;
};

export default module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
