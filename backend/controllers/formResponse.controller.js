import FormResponse from '../models/formResponse.model.js';
import Template from '../models/template.model.js';

export async function createFormResponse(req, res, next) {
  try {
    const { templateId, answers } = req.body;

    if (!templateId || !answers) {
      return res.status(400).json({ success: false, message: 'Template ID and answers are required' });
    }

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    const response = new FormResponse({
      template: templateId,
      user: req.user?._id || null,
      answers,
    });

    await response.save();
    res.status(201).json({ success: true, data: response });
  } catch (err) {
    next(err);
  }
}

export async function getUserFormResponses(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const responses = await FormResponse.find({ user: req.user._id }).populate('template', 'title');
    res.json({ success: true, data: responses });
  } catch (err) {
    next(err);
  }
}

export async function getResponsesByTemplate(req, res, next) {
  try {
    const { templateId } = req.params;

    const responses = await FormResponse.find({ template: templateId }).populate('user', 'username email');
    res.json({ success: true, data: responses });
  } catch (err) {
    next(err);
  }
}
