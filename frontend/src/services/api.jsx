import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'https://teamup-backend-q0sh.onrender.com';

const api = axios.create({
  baseURL: API_URL + '/api',
});

// Intercepteur pour ajouter le token JWT si présent
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateLocation: (locationData) => api.put('/auth/location', locationData),
};

// Event API mis à jour
export const eventsAPI = {
  // Récupérer tous les événements avec géolocalisation optionnelle
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.latitude && params.longitude) {
      queryParams.append('latitude', params.latitude);
      queryParams.append('longitude', params.longitude);
    }
    if (params.rayon) {
      queryParams.append('rayon', params.rayon);
    }
    if (params.sport) {
      queryParams.append('sport', params.sport);
    }
    if (params.niveau) {
      queryParams.append('niveau', params.niveau);
    }
    
    const queryString = queryParams.toString();
    return api.get(`/events${queryString ? `?${queryString}` : ''}`);
  },

  // Récupérer les événements à proximité
  getNearby: (latitude, longitude, rayon = 10) => 
    api.get(`/events/nearby?latitude=${latitude}&longitude=${longitude}&rayon=${rayon}`),

  // Créer un événement
  create: (eventData) => api.post('/events', eventData),

  // Récupérer les événements de l'organisateur
  getMyEvents: () => api.get('/events/mes-events'),

  // Rejoindre un événement
  joinEvent: (eventId) => api.post(`/events/${eventId}/join`),

  // Système de réservation
  reserveSlot: (eventId, reservationData) => 
    api.post(`/events/${eventId}/reserver`, reservationData),

  // Annuler une réservation
  cancelReservation: (eventId) => 
    api.delete(`/events/${eventId}/reserver`),

  // Récupérer les détails d'un événement
  getEventDetails: (eventId) => api.get(`/events/${eventId}`),

  // Mettre à jour un événement (pour les organisateurs)
  updateEvent: (eventId, eventData) => 
    api.put(`/events/${eventId}`, eventData),

  // Supprimer un événement (pour les organisateurs)
  deleteEvent: (eventId) => 
    api.delete(`/events/${eventId}`),
};

// Services de géolocalisation
export const locationAPI = {
  // Obtenir la position actuelle de l'utilisateur
  getCurrentPosition: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Géolocalisation non supportée'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  },

  // Géocoder une adresse (convertir adresse en coordonnées)
  geocodeAddress: async (address, city = '', country = 'France') => {
    try {
      const fullAddress = `${address}, ${city}, ${country}`;
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: fullAddress,
          format: 'json',
          limit: 1,
          addressdetails: 1
        }
      });

      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        return {
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
          display_name: result.display_name,
          address: result.address
        };
      } else {
        throw new Error('Adresse non trouvée');
      }
    } catch (error) {
      console.error('Erreur géocodage:', error);
      throw error;
    }
  },

  // Géocodage inverse (convertir coordonnées en adresse)
  reverseGeocode: async (latitude, longitude) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
          addressdetails: 1
        }
      });

      if (response.data) {
        return {
          display_name: response.data.display_name,
          address: response.data.address,
          city: response.data.address?.city || response.data.address?.town || response.data.address?.village,
          country: response.data.address?.country,
          postcode: response.data.address?.postcode
        };
      } else {
        throw new Error('Coordonnées non trouvées');
      }
    } catch (error) {
      console.error('Erreur géocodage inverse:', error);
      throw error;
    }
  },

  // Calculer la distance entre deux points
  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 100) / 100; // Arrondi à 2 décimales
  }
};

// Utilities pour les événements
export const eventUtils = {
  // Formatter une date
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Formatter une heure
  formatTime: (timeString) => {
    return timeString; // Déjà au format HH:MM
  },

  // Vérifier si un événement est dans le futur
  isFutureEvent: (date, time) => {
    const eventDateTime = new Date(`${date}T${time}`);
    return eventDateTime > new Date();
  },

  // Obtenir le statut d'un événement
  getEventStatus: (event) => {
    if (!eventUtils.isFutureEvent(event.date, event.heure)) {
      return 'passé';
    }
    if (event.participants?.length >= event.nombreParticipants) {
      return 'complet';
    }
    return 'ouvert';
  },

  // Filtrer les événements
  filterEvents: (events, filters = {}) => {
    return events.filter(event => {
      // Filtre par sport
      if (filters.sport && filters.sport !== 'Tous types' && event.sport !== filters.sport) {
        return false;
      }

      // Filtre par niveau
      if (filters.niveau && filters.niveau !== 'tous' && event.niveau !== filters.niveau) {
        return false;
      }

      // Filtre par ville
      if (filters.ville && !event.ville.toLowerCase().includes(filters.ville.toLowerCase())) {
        return false;
      }

      // Filtre par date
      if (filters.dateDebut) {
        const eventDate = new Date(event.date);
        const filterDate = new Date(filters.dateDebut);
        if (eventDate < filterDate) {
          return false;
        }
      }

      // Filtre par distance (si position utilisateur disponible)
      if (filters.maxDistance && filters.userLocation && event.coordonnees) {
        const distance = locationAPI.calculateDistance(
          filters.userLocation.latitude,
          filters.userLocation.longitude,
          event.coordonnees.latitude,
          event.coordonnees.longitude
        );
        if (distance > filters.maxDistance) {
          return false;
        }
      }

      return true;
    });
  },

  // Trier les événements
  sortEvents: (events, sortBy = 'date', userLocation = null) => {
    return [...events].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        
        case 'distance':
          if (!userLocation || !a.coordonnees || !b.coordonnees) {
            return 0;
          }
          const distanceA = locationAPI.calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            a.coordonnees.latitude,
            a.coordonnees.longitude
          );
          const distanceB = locationAPI.calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            b.coordonnees.latitude,
            b.coordonnees.longitude
          );
          return distanceA - distanceB;
        
        case 'participants':
          return (b.participants?.length || 0) - (a.participants?.length || 0);
        
        case 'sport':
          return a.sport.localeCompare(b.sport);
        
        default:
          return 0;
      }
    });
  }
};

export default api;