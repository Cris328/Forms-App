import express from 'express';
import { getProfileByUserId } from '../controllers/profile.controller.js'; 

const profileRouter = express.Router();

profileRouter.get('/:userId', getProfileByUserId);

export default profileRouter;
