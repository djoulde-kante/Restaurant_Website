import express from 'express';
import upload from '../config/multer.js';
import { uploadImage } from '../middleware/uploadImage.js';

const router = express.Router();

router.post('/upload', upload.single('image'), uploadImage, (req, res) => {
  if (!req.body.imageUrl) {
    return res.status(400).json({ message: 'Aucune image n\'a été uploadée' });
  }
  
  res.status(200).json({ 
    message: 'Image uploadée avec succès',
    imageUrl: req.body.imageUrl,
    cloudinaryId: req.body.cloudinaryId
  });
});

export const uploadRouter = router;
