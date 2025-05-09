import { useState } from 'react';

export function Button({ children, className, onClick }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await onClick?.(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {children}
    </button>
  );
}