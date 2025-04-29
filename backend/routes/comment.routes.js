import { Router } from 'express';
import { createComment, getCommentsByTemplate } from '../controllers/comment.controller.js';
import optionalAuth from '../middlewares/optionalAuth.js';
import { listCommentsByTemplate } from '../controllers/comment.controller.js';

const commentRouter = Router();

commentRouter.post('/', optionalAuth, createComment);

commentRouter.get('/template/:templateId', optionalAuth, getCommentsByTemplate);

commentRouter.get('/template/:templateId', listCommentsByTemplate);

export default commentRouter;
