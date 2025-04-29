import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
