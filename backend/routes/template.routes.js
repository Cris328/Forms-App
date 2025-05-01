import express from 'express';
import {
  createTemplate,
  getAllTemplates,
  getPopularTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  toggleLikeTemplate,
  commentTemplate,
  searchTemplates,
} from '../controllers/template.controller.js';

import optionalAuth from '../middlewares/optionalAuth.js';
import authorize from '../middlewares/auth.middleware.js';
import authorizeOwnerOrAdmin from '../middlewares/authorizeOwnerOrAdmin.js';

const templateRouter = express.Router();

templateRouter.get('/search', optionalAuth, searchTemplates);

templateRouter.get('/:id', optionalAuth, getTemplateById);

templateRouter.get('/', authorize, getAllTemplates);

templateRouter.get('/popular', authorize, getPopularTemplates);

templateRouter.post('/', authorize, createTemplate);

templateRouter.post('/:id/like', authorize, toggleLikeTemplate);

templateRouter.post('/:id/comment', authorize, commentTemplate);

templateRouter.patch(
  '/:id',
  authorize,
  authorizeOwnerOrAdmin((req) => req.params.id),
  updateTemplate
);

templateRouter.delete(
  '/:id',
  authorize,
  authorizeOwnerOrAdmin((req) => req.params.id),
  deleteTemplate
);

export default templateRouter;
