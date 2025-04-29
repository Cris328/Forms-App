import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['string', 'text', 'integer', 'checkbox'],
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  showInSummary: { type: Boolean, default: false },
  options: [String] 
});

const templateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  tags: [{ type: String }],
  access: {
    type: String,
    enum: ['public', 'restricted'],
    default: 'public'
  },
  allowedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  questions: [questionSchema],
  views: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

const template = mongoose.model('Template', templateSchema);

export default template;
