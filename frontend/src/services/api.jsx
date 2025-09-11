import axios from 'axios';

// Protection pour les variables d'environnement
let API_URL;
try {
  API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://teamup-backend-q0sh.onrender.com';
} catch (error) {
  console.warn('Erreur lecture variable d\'environnement, utilisation URL par défaut:', error);
  API_URL = 'https://teamup-backend-q0sh.onrender.com';
}

// Protection pour la création de l'instance axios
let api;
try {
  api = axios.create({
    baseURL: API_URL + '/api',
    timeout: 10000, // Timeout de 10 secondes
  });
} catch (error) {
  console.error('Erreur création instance axios:', error);
  // Fallback vers axios par défaut
  api = axios;
}

// Intercepteur pour ajouter le token JWT si présent
try {
  api.interceptors.request.use(
    (config) => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        console.warn('Erreur ajout token:', error);
        return config;
      }
    },
    (error) => Promise.reject(error)
  );
} catch (error) {
  console.error('Erreur configuration intercepteur request:', error);
}

// Intercepteur pour gérer les erreurs de réponse
try {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      try {
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
      } catch (interceptorError) {
        console.error('Erreur dans intercepteur response:', interceptorError);
      }
      
      return Promise.reject(error);
    }
  );
} catch (error) {
  console.error('Erreur configuration intercepteur response:', error);
}

// Auth API avec protection
export const authAPI = {
  register: (userData) => {
    try {
      return api.post('/auth/register', userData);
    } catch (error) {
      console.error('Erreur API register:', error);
      return Promise.reject(error);
    }
  },
  login: (credentials) => {
    try {
      return api.post('/auth/login', credentials);
    } catch (error) {
      console.error('Erreur API login:', error);
      return Promise.reject(error);
    }
  },
  getProfile: () => {
    try {
      return api.get('/auth/me');
    } catch (error) {
      console.error('Erreur API getProfile:', error);
      return Promise.reject(error);
    }
  },
};

// Event API avec protection
export const eventsAPI = {
  getAll: () => {
    try {
      return api.get('/events');
    } catch (error) {
      console.error('Erreur API getAll:', error);
      return Promise.reject(error);
    }
  },
  create: (eventData) => {
    try {
      return api.post('/events', eventData);
    } catch (error) {
      console.error('Erreur API create:', error);
      return Promise.reject(error);
    }
  },
  getMyEvents: () => {
    try {
      return api.get('/events/mes-events');
    } catch (error) {
      console.error('Erreur API getMyEvents:', error);
      return Promise.reject(error);
    }
  },
  joinEvent: (eventId) => {
    try {
      return api.post(`/events/${eventId}/join`);
    } catch (error) {
      console.error('Erreur API joinEvent:', error);
      return Promise.reject(error);
    }
  },
};

export default api;