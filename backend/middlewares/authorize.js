export default function authorize(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    next();
  }
  