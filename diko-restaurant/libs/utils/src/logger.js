// Niveaux de log
export const LogLevel = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

class ErrorLogger {
  constructor() {
    this.logs = [];
    this.maxLogs = 100; // Garder les 100 derniers logs en mémoire
  }

  log(level, message, error = null, context = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : null,
      context: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        ...context,
      },
    };

    this.logs.unshift(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // Log dans la console en développement
    if (process.env.NODE_ENV === 'development') {
      console[level](message, error, context);
    }

    // Ici on pourrait envoyer les logs à un service externe
    this.sendToServer(logEntry);
  }

  // Méthodes pratiques
  info(message, context = {}) {
    this.log(LogLevel.INFO, message, null, context);
  }

  warn(message, error = null, context = {}) {
    this.log(LogLevel.WARN, message, error, context);
  }

  error(message, error = null, context = {}) {
    this.log(LogLevel.ERROR, message, error, context);
  }

  // Méthode pour envoyer les logs au serveur
  async sendToServer(logEntry) {
    if (process.env.NODE_ENV === 'production') {
      try {
        const response = await fetch('/api/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(logEntry),
        });
        if (!response.ok) {
          console.error('Erreur lors de l\'envoi des logs au serveur');
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi des logs au serveur:', error);
      }
    }
  }

  // Récupérer les logs en mémoire
  getLogs() {
    return [...this.logs];
  }

  // Vider les logs en mémoire
  clearLogs() {
    this.logs = [];
  }
}

export const logger = new ErrorLogger();
