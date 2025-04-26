import Profile from '../models/profile.model.js';

export const getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', 'name email');

    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};


