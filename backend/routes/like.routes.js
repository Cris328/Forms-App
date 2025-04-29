import { Router } from 'express';
import { likeTemplate, unlikeTemplate, countLikes } from '../controllers/like.controller.js';
import optionalAuth from '../middlewares/optionalAuth.js';
import authorize from '../middlewares/authorize.js';
import { listLikesByTemplate } from '../controllers/like.controller.js';


const likeRouter = Router();

likeRouter.post('/', optionalAuth, authorize, likeTemplate);

likeRouter.delete('/', optionalAuth, authorize, unlikeTemplate);

likeRouter.get('/template/:templateId', optionalAuth, countLikes);

likeRouter.get('/template/:templateId', listLikesByTemplate);

export default likeRouter;
