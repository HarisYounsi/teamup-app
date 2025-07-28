import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL + '/api',  // met ici le préfixe commun à toutes tes routes backend
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

// Exemple d’appel pour vérifier
api.get('/events')
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.error(err);
  });

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
