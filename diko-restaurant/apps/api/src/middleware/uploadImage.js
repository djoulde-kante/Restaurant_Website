import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    // Convertir le buffer de l'image en base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload sur Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: 'restaurant',
    });

    // Ajouter l'URL de l'image à req.body
    req.body.imageUrl = result.secure_url;
    req.body.cloudinaryId = result.public_id;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image', error: error.message });
  }
};

export const deleteImage = async (publicId) => {
  try {
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
  }
};
