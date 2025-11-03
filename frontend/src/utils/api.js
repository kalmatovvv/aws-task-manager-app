import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://task-app-lb-1192487844.us-east-1.elb.amazonaws.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  getAll: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (task) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  update: async (id, task) => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/tasks/${id}`);
  },
};

export default api;

