import { Router } from 'express';  

import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp);

authRouter.post('/sign-in', signIn);

authRouter.post('/sign-out', signOut);

authRouter.post("/guest", (req, res) => {
    res.status(200).json({
      message: "access granted as a guest",
      guest: true
    });
  });
  

export default authRouter;