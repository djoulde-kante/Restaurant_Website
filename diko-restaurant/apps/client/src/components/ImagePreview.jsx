import React, { useState } from 'react';

const ImagePreview = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/images/placeholder.jpg',
  aspectRatio = '16/9'
}) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        onError={handleError}
        className="w-full h-full object-cover"
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">Image non disponible</span>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;