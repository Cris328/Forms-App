import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';
import { v4 as uuidv4 } from 'uuid';

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRouter.post('/', upload.single('image'), async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { public_id: `template_${uuidv4()}` },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to upload image' });
        }
        return res.json({ imageUrl: result.secure_url });
      }
    );
    stream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Image upload failed' });
  }
});

export default uploadRouter;
