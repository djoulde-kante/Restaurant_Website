import { useApi } from '../hooks/useApi';

export const useMenuApi = () => {
  const api = useApi();

  const getMenu = async () => {
    return api.get('/menu');
  };

  const createMenuItem = async (data) => {
    return api.post('/menu', data);
  };

  const updateMenuItem = async (id, data) => {
    return api.put(`/menu/${id}`, data);
  };

  const deleteMenuItem = async (id) => {
    return api.delete(`/menu/${id}`);
  };

  return {
    getMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
  };
};

export const updateMenuItem = async (id, data) => {
  const response = await fetch(`${BASE_URL}/menu/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update menu item');
  return response.json();
};

export const deleteMenuItem = async (id) => {
  const response = await fetch(`${BASE_URL}/menu/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete menu item');
  return response.json();
};
