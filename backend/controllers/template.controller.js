import Template from '../models/template.model.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const createTemplate = async (req, res) => {
  try {
    console.log('REQ.USER:', req.user); 
    const newTemplate = await Template.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: newTemplate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllTemplates = async (req, res) => {
  try {
    const search = req.query.search || '';
    const topic = req.query.topic;

    const regex = new RegExp(search, 'i');

    const filters = {
      visibility: 'public',
      $or: [
        { title: regex },
        { description: regex },
        { tags: regex },
      ],
    };

    if (topic && mongoose.Types.ObjectId.isValid(topic)) {
      filters.topic = topic;
    }

    const templates = await Template.find(filters)
      .sort({ createdAt: -1 })
      .populate('author', 'name')
      .lean();

    res.status(200).json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



export const getPopularTemplates = async (req, res, next) => {
  try {
    const templates = await Template.find({ isPublic: true })
      .sort({ likes: -1 })
      .limit(5)
      .populate('createdBy', 'name');

    res.status(200).json({ success: true, data: templates });
  } catch (error) {
    next(error);
  }
};

export const getTemplateById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid template ID format' });
  }

  try {
    const template = await Template.findById(id)
      .populate('createdBy', 'username')
      .populate('comments.user', 'username');

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    console.error('Error fetching template by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const toggleLikeTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const userId = req.user._id;
    const alreadyLiked = template.likes.includes(userId);

    if (alreadyLiked) {
      template.likes.pull(userId);
    } else {
      template.likes.push(userId);
    }

    await template.save();

    res.status(200).json({ success: true, data: template });
  } catch (error) {
    next(error);
  }
};

export const commentTemplate = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const comment = {
      user: req.user._id,
      text,
    };

    template.comments.push(comment);

    await template.save();

    res.status(201).json({ success: true, data: template.comments });
  } catch (error) {
    next(error);
  }
};

export const updateTemplate = async (req, res, next) => {
  try {
    const updates = req.body;
    const template = await Template.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.status(200).json({ success: true, data: template });
  } catch (error) {
    next(error);
  }
};

export const deleteTemplate = async (req, res, next) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.status(200).json({ success: true, message: 'Template deleted' });
  } catch (error) {
    next(error);
  }
};

export const searchTemplates = async (req, res) => {
  try {
    const { search } = req.query
    if (!search) {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    const templates = await Template.find({
      $text: { $search: search },
    }).exec();

    res.status(200).json({ data: templates });
  } catch (error) {
    console.error('Error searching templates:', error);
    res.status(500).json({ message: 'Server error while searching templates' });
  }
};