const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = async (endpoint, { body, ...customConfig } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  } catch (error) {
    return Promise.reject({
      message: 'Une erreur est survenue lors de la requête',
      error: error.message
    });
  }
};

export const getMenu = () => apiClient('/menu');
export const getMenuItem = (id) => apiClient(`/menu/${id}`);
export const createMenuItem = (data) => apiClient('/menu', { method: 'POST', body: data });
export const updateMenuItem = (id, data) => apiClient(`/menu/${id}`, { method: 'PATCH', body: data });
export const deleteMenuItem = (id) => apiClient(`/menu/${id}`, { method: 'DELETE' });