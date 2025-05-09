import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from './Button';

const ImageUpload = ({
  value,
  onChange,
  maxSize = 5242880, // 5MB
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
  },
  multiple = false,
  error,
  label,
  helpText,
  className = ''
}) => {
  const [preview, setPreview] = useState(value);

  const onDrop = useCallback((acceptedFiles) => {
    const file = multiple ? acceptedFiles : acceptedFiles[0];
    
    if (multiple) {
      const previews = acceptedFiles.map(file => URL.createObjectURL(file));
      setPreview(previews);
    } else {
      setPreview(URL.createObjectURL(file));
    }
    
    onChange(file);
  }, [multiple, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple
  });

  const removeImage = (index = 0) => {
    if (multiple) {
      const newPreviews = preview.filter((_, i) => i !== index);
      setPreview(newPreviews);
      onChange(newPreviews);
    } else {
      setPreview(null);
      onChange(null);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div
        {...getRootProps()}
        className={`
          mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed
          rounded-md cursor-pointer transition-colors duration-200
          ${isDragActive ? 'border-restaurant bg-restaurant/5' : 'border-gray-300'}
          ${error ? 'border-red-300' : ''}
        `}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <input {...getInputProps()} />
            <p className="pl-1">
              Glissez-déposez des fichiers ici ou{' '}
              <Button variant="link" type="button">
                parcourez
              </Button>
            </p>
          </div>
          {helpText && (
            <p className="text-xs text-gray-500">{helpText}</p>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {preview && (
        <div className={`mt-4 ${multiple ? 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4' : ''}`}>
          {multiple ? (
            preview.map((src, index) => (
              <div key={src} className="relative">
                <img
                  src={src}
                  alt={`Aperçu ${index + 1}`}
                  className="h-24 w-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <span className="sr-only">Supprimer</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Aperçu"
                className="h-32 w-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage()}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <span className="sr-only">Supprimer</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;