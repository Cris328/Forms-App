
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

export default async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization?.split(' ')[1];
  if (!authHeader) return next();

  try {
    const { userId } = jwt.verify(authHeader, JWT_SECRET);
    req.user = await User.findById(userId); 
  } catch (err) {

  }
  next();
}
