import { useCallback } from 'react';
import { logger } from '../logger';

const useLogger = () => {
  const logInfo = useCallback((message, context = {}) => {
    logger.info(message, context);
  }, []);

  const logWarning = useCallback((message, error = null, context = {}) => {
    logger.warn(message, error, context);
  }, []);

  const logError = useCallback((message, error = null, context = {}) => {
    logger.error(message, error, context);
  }, []);

  return {
    logInfo,
    logWarning,
    logError,
    getLogs: logger.getLogs.bind(logger),
    clearLogs: logger.clearLogs.bind(logger),
  };
};

export default useLogger;
