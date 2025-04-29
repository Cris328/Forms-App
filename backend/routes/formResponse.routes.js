import express from 'express';
import { createFormResponse, getUserFormResponses, getResponsesByTemplate } from '../controllers/formResponse.controller.js';
import authorize from '../middlewares/authorize.js';
import optionalAuth from '../middlewares/optionalAuth.js';

const formsResponseRouter = express.Router();

formsResponseRouter.post('/', optionalAuth, createFormResponse);

formsResponseRouter.get('/me', authorize, getUserFormResponses);

formsResponseRouter.get('/template/:templateId', optionalAuth, getResponsesByTemplate);

export default formsResponseRouter;
