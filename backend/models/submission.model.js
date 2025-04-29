import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  responses: [
    {
      questionId: String,
      answer: mongoose.Schema.Types.Mixed,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
