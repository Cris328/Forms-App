import { Router } from 'express';
import { createSubmission, getSubmissionsByTemplate, getMySubmissions } from '../controllers/submission.controller.js';
import optionalAuth from '../middlewares/optionalAuth.js';
import authorize from '../middlewares/authorize.js';

const submissionRouter = Router();

submissionRouter.post('/', optionalAuth, createSubmission);

submissionRouter.get('/template/:templateId', optionalAuth, getSubmissionsByTemplate);

submissionRouter.get('/me', optionalAuth, authorize, getMySubmissions);

export default submissionRouter;
