import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  displayName: { type: String, required: true },
  bio: { type: String, default: '' },
  avatarUrl: { type: String, default: '' }, // puede ser URL a Cloudinary o similar
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Profile', profileSchema);
