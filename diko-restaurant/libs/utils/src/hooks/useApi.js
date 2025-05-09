import { useCallback, useState } from 'react';
import { useAuthContext } from './AuthProvider';
import { useNotificationContext } from '@repo/ui';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Réponse invalide du serveur: ${text.substring(0, 100)}...`);
      }

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

export const useCrud = (endpoints) => {
  const api = useApi();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await endpoints.getAll();
      setItems(data);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [endpoints]);

  const create = useCallback(async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await endpoints.create(data);
      setItems(prev => [...prev, result]);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [endpoints]);

  const update = useCallback(async (id, data) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await endpoints.update(id, data);
      setItems(prev => prev.map(item => item._id === id ? result : item));
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [endpoints]);

  const remove = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      await endpoints.delete(id);
      setItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [endpoints]);

  return {
    items,
    isLoading,
    error,
    fetchAll,
    create,
    update,
    remove
  };
};