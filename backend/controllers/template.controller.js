import Template from '../models/template.model.js';
import { validationResult } from 'express-validator';

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
  
      const templates = await Template.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } },
          { topic: { $regex: search, $options: 'i' } },
        ],
        visibility: 'public',
      })
        .sort({ createdAt: -1 })
        .populate('author', 'name')
        .lean();
  
      res.status(200).json(templates);
    } catch (err) {
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

export const getTemplateById = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id).populate('createdBy', 'name');

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    if (!template.isPublic && (!req.user || (!req.user._id.equals(template.createdBy) && !template.allowedUsers.includes(req.user.email)))) {
      return res.status(403).json({ message: 'Not allowed to view this template' });
    }

    res.status(200).json({ success: true, data: template });
  } catch (error) {
    next(error);
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

export async function searchTemplates(req, res, next) {
    try {
      const { query } = req.query;
  
      if (!query || query.trim() === '') {
        return res.status(400).json({ success: false, message: 'Search query is required' });
      }
  
      const regex = new RegExp(query, 'i');
  
      const templates = await Template.find({
        $or: [
          { title: regex },
          { description: regex }
        ]
      }).sort('-createdAt');
  
      res.json({ success: true, data: templates });
    } catch (err) {
      next(err);
    }
  }