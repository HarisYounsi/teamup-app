import axios from 'axios';

// Utilise VITE_API_URL et supprime le slash final s’il existe
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
};

// Event API
export const eventsAPI = {
  getAll: () => api.get('/events'),
  create: (eventData) => api.post('/events', eventData),
  getMyEvents: () => api.get('/events/mes-events'),
  joinEvent: (eventId) => api.post(`/events/${eventId}/join`),
};

export default api;
