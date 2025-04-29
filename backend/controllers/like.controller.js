import Like from '../models/like.model.js';
import Template from '../models/template.model.js';

export async function likeTemplate(req, res) {
  try {
    const { templateId } = req.body;

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const like = new Like({
      template: template._id,
      user: req.user._id,
    });

    await like.save();
    res.status(201).json({ message: 'Template liked' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Already liked' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error liking template' });
  }
}

export async function unlikeTemplate(req, res) {
  try {
    const { templateId } = req.body;

    const result = await Like.findOneAndDelete({
      template: templateId,
      user: req.user._id,
    });

    if (!result) {
      return res.status(404).json({ message: 'Like not found' });
    }

    res.json({ message: 'Template unliked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error unliking template' });
  }
}

export async function countLikes(req, res) {
  try {
    const { templateId } = req.params;

    const likeCount = await Like.countDocuments({ template: templateId });

    res.json({ likes: likeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error counting likes' });
  }
}

export async function listLikesByTemplate(req, res, next) {
  try {
    const likes = await Like.find({ template: req.params.templateId });
    res.json({ success: true, data: likes });
  } catch (err) {
    next(err);
  }
}