import Submission from '../models/submission.model.js';
import Template from '../models/template.model.js';

export async function createSubmission(req, res) {
  try {
    const { templateId, responses } = req.body;

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const submission = new Submission({
      template: template._id,
      user: req.user?._id || null,
      responses,
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating submission' });
  }
}

export async function getSubmissionsByTemplate(req, res) {
  try {
    const { templateId } = req.params;

    const submissions = await Submission.find({ template: templateId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error getting submissions' });
  }
}

export async function getMySubmissions(req, res) {
  try {
    const submissions = await Submission.find({ user: req.user._id })
      .populate('template', 'title')
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error getting my submissions' });
  }
}
