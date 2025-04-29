import Topic from '../models/topic.model.js';

export const listTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find().sort('name');
    res.status(200).json({ success: true, data: topics });
  } catch (err) {
    next(err);
  }
};
