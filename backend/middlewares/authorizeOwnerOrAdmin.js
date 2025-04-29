export default function authorizeOwnerOrAdmin(getResourceUserId) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      const ownerId = getResourceUserId(req);
      const isOwner = req.user._id.equals(ownerId);
      const isAdmin = req.user.role === 'admin';
      if (!isOwner && !isAdmin) {
        return res.status(403).json({ message: 'Not allowed' });
      }
      next();
    };
  }
  