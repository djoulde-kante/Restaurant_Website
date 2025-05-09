import { config } from '../config/index.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Si l'erreur a déjà un status code, on l'utilise, sinon 500
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Une erreur est survenue';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(config.nodeEnv === 'development' && { stack: err.stack })
    }
  });
};

// Classe d'erreur personnalisée pour l'API
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

// Middleware pour gérer les routes non trouvées
export const notFound = (req, res, next) => {
  const error = new ApiError(404, `Route non trouvée - ${req.originalUrl}`);
  next(error);
};