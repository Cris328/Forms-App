import Topic from '../models/topic.model.js';

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (error) {
    console.error("Error getting topics:", error);
    res.status(500).json({ message: "Error fetching topics" });
  }
};

