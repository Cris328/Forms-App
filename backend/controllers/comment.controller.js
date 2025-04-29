import Comment from '../models/comment.model.js';
import Template from '../models/template.model.js';

export async function createComment(req, res) {
  try {
    const { templateId, text } = req.body;

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const comment = new Comment({
      template: template._id,
      user: req.user?._id || null,
      text,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating comment' });
  }
}

export async function getCommentsByTemplate(req, res) {
  try {
    const { templateId } = req.params;

    const comments = await Comment.find({ template: templateId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error getting comments' });
  }
}

export async function listCommentsByTemplate(req, res, next) {
  try {
    const comments = await Comment.find({ template: req.params.templateId })
      .sort('-createdAt');
    res.json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
}