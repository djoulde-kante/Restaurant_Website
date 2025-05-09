import express from 'express';
import { upload, fileService } from '../services/upload.service.js';

const router = express.Router();

// Route pour uploader une image
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier fourni' });
    }

    const fileUrl = fileService.getPublicUrl(req.file.filename);
    res.json({
      message: 'Fichier uploadé avec succès',
      file: {
        filename: req.file.filename,
        url: fileUrl
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'upload du fichier' });
  }
});

// Route pour supprimer une image
router.delete('/:filename', async (req, res) => {
  try {
    const success = await fileService.deleteFile(req.params.filename);
    if (success) {
      res.json({ message: 'Fichier supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Fichier non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du fichier' });
  }
});

export default router;