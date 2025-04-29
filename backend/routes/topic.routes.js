import express from 'express';
import { listTopics } from '../controllers/topic.controller.js';

const topicRouter = express.Router();

topicRouter.get('/', listTopics);

export default topicRouter;
