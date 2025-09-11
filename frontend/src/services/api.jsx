import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://teamup-backend-q0sh.onrender.com';

const api = axios.create({
  baseURL: API_URL + '/api',
});

// Intercepteur pour ajouter le token JWT si présent
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

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion spécifique des erreurs réseau
    if (!error.response) {
      // Erreur réseau (pas de réponse du serveur)
      error.code = 'NETWORK_ERROR';
      error.message = 'Erreur de connexion au serveur';
      console.warn('Erreur réseau détectée:', error.message);
    } else if (error.response.status >= 500) {
      // Erreur serveur
      error.message = 'Erreur du serveur, veuillez réessayer plus tard';
    } else if (error.response.status === 401) {
      // Token expiré ou invalide
      error.message = 'Session expirée, veuillez vous reconnecter';
    }
   
    return Promise.reject(error);
  }
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