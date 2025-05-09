import { useCallback } from 'react';
import { useAuthContext } from './AuthProvider';
import { useNotificationContext } from '@repo/ui';

const API_BASE_URL = '/api';

export const useApi = () => {
  const { getAuthToken } = useAuthContext();
  const { addNotification } = useNotificationContext();

  const request = useCallback(async (endpoint, options = {}) => {
    try {
      const token = getAuthToken();
      const url = `${API_BASE_URL}${endpoint}`;
      
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      return data;
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Une erreur est survenue lors de la requête'
      });
      throw error;
    }
  }, [getAuthToken, addNotification]);

  const get = useCallback((endpoint, options = {}) => {
    return request(endpoint, { ...options, method: 'GET' });
  }, [request]);

  const post = useCallback((endpoint, data, options = {}) => {
    return request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }, [request]);

  const put = useCallback((endpoint, data, options = {}) => {
    return request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }, [request]);

  const del = useCallback((endpoint, options = {}) => {
    return request(endpoint, { ...options, method: 'DELETE' });
  }, [request]);

  return {
    get,
    post,
    put,
    delete: del
  };
};