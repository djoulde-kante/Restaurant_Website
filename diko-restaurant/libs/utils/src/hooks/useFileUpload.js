import { useState } from 'react';

const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'upload');
      }

      return data.file;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (filename) => {
    try {
      const response = await fetch(`${API_URL}/upload/${filename}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la suppression');
      }

      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    uploadFile,
    deleteFile,
    isUploading,
    error
  };
};