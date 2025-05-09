import { useState, useCallback, useEffect } from 'react';

const AUTH_TOKEN_KEY = 'diko_auth_token';
const USER_DATA_KEY = 'diko_user_data';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'état initial de l'authentification
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(USER_DATA_KEY);

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      // TODO: Implémenter l'appel API pour l'authentification
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'authentification');
      }

      const data = await response.json();
      
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
      
      setIsAuthenticated(true);
      setUser(data.user);
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Une erreur est survenue lors de la connexion');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const updateUser = useCallback((userData) => {
    const updatedUser = { ...user, ...userData };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, [user]);

  const getAuthToken = useCallback(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }, []);

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    updateUser,
    getAuthToken
  };
};