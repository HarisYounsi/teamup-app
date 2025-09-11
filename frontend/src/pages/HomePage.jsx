import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI, locationAPI, eventUtils } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('Tous types');
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [maxDistance, setMaxDistance] = useState(25);
  const [sortBy, setSortBy] = useState('date');

  // Sports pour les filtres
  const sportsFilter = [
    'Tous types', 'Football', 'Basketball', 'Tennis', 
    'Running', 'Volleyball', 'Badminton', 'Natation', 'Cyclisme', 
    'Fitness', 'Yoga', 'Escalade', 'Randonnée'
  ];

  useEffect(() => {
    getUserLocation();
    loadEvents();
  }, []);

  // Fonction pour calculer la distance entre deux points GPS
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getUserLocation = async () => {
    try {
      setLocationLoading(true);
      const position = await locationAPI.getCurrentPosition();
      setUserLocation(position);
      
      // Recharger les événements avec la géolocalisation
      loadEventsWithLocation(position);
    } catch (error) {
      console.log('Géolocalisation non autorisée:', error);
      // Utiliser une position par défaut (Paris)
      const defaultLocation = { latitude: 48.8566, longitude: 2.3522 };
      setUserLocation(defaultLocation);
      loadEvents();
    } finally {
      setLocationLoading(false);
    }
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      setEvents(response.data);
    } catch (error) {
      setError('Erreur lors du chargement des événements');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEventsWithLocation = async (location) => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      
      // Calculer la distance pour chaque événement qui a des coordonnées
      const eventsWithDistance = response.data.map(event => {
        if (event.latitude && event.longitude) {
          const distance = calculateDistance(
            location.latitude,
            location.longitude,
            event.latitude,
            event.longitude
          );
          return { ...event, distance: Math.round(distance * 10) / 10 };
        }
        return event;
      });

      // Filtrer par distance
      const filteredEvents = eventsWithDistance.filter(event => {
        if (!event.distance) return true; // Garder les événements sans coordonnées
        return event.distance <= maxDistance;
      });

      setEvents(filteredEvents);
    } catch (error) {
      setError('Erreur lors du chargement des événements');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = (eventId) => {
    if (!isAuthenticated) {
      alert('Vous devez vous connecter pour participer à un événement !');
      navigate('/login');
      return;
    }
    
    navigate('/dashboard');
  };

  const handleLocationUpdate = () => {
    getUserLocation();
  };

  const handleDistanceChange = (newDistance) => {
    setMaxDistance(newDistance);
    if (userLocation) {
      loadEventsWithLocation(userLocation);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSportEmoji = (sport) => {
    const sportEmojis = {
      'Football': '⚽',
      'Basketball': '🏀',
      'Tennis': '🎾',
      'Running': '🏃‍♂️',
      'Volleyball': '🏐',
      'Badminton': '🏸',
      'Natation': '🏊‍♂️',
      'Cyclisme': '🚴‍♂️',
      'Fitness': '💪',
      'Yoga': '🧘‍♀️'
    };
    return sportEmojis[sport] || '🏃‍♂️';
  };

  // Filtrer et trier les événements
  const filteredAndSortedEvents = React.useMemo(() => {
    let filtered = eventUtils.filterEvents(events, {
      sport: selectedSport,
      ville: searchQuery,
      maxDistance,
      userLocation
    });

    // Filtrage par recherche textuelle
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return eventUtils.sortEvents(filtered, sortBy, userLocation);
  }, [events, selectedSport, searchQuery, maxDistance, userLocation, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-emerald-600">🏃‍♀️ TeamUp</h1>
              <div className="hidden md:flex ml-8 space-x-6">
                <button className="text-gray-700 hover:text-emerald-600 font-medium">Sports</button>
                <button className="text-gray-700 hover:text-emerald-600 font-medium">Événements</button>
                <button className="text-gray-700 hover:text-emerald-600 font-medium">À propos</button>
              </div>
            </div>

            {/* Actions utilisateur */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700">Bonjour, <strong>{user?.prenom}</strong></span>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Mon espace
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-gray-700 hover:text-emerald-600 font-medium"
                  >
                    Se connecter
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    S'inscrire
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section avec recherche */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Trouvez votre prochaine activité sportive
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Rejoignez une communauté de sportifs passionnés près de chez vous
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                    <input
                      type="text"
                      placeholder="Recherche d'événements, d'activités, de lieux..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleLocationUpdate}
                    disabled={locationLoading}
                    className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md font-medium transition-colors disabled:opacity-50"
                  >
                    {locationLoading ? '📍...' : '📍 Ma position'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et contrôles */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filtres sports */}
            <div className="flex flex-wrap gap-2">
              {sportsFilter.slice(0, 8).map(sport => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSport === sport
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>

            {/* Contrôles de tri et distance */}
            <div className="flex items-center gap-4">
              {userLocation && (
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Rayon:</label>
                  <select
                    value={maxDistance}
                    onChange={(e) => handleDistanceChange(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value={5}>5 km</option>
                    <option value={10}>10 km</option>
                    <option value={25}>25 km</option>
                    <option value={50}>50 km</option>
                    <option value={100}>100 km</option>
                  </select>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Trier par:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="date">Date</option>
                  {userLocation && <option value="distance">Distance</option>}
                  <option value="participants">Participants</option>
                  <option value="sport">Sport</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {userLocation ? 'Recommandé pour vous' : 'Événements disponibles'}
          </h2>
          <p className="text-gray-600 mb-4">
            {filteredAndSortedEvents.length} événement{filteredAndSortedEvents.length !== 1 ? 's' : ''} trouvé{filteredAndSortedEvents.length !== 1 ? 's' : ''}
            {userLocation && ` dans un rayon de ${maxDistance} km`}
          </p>
          
          {/* Indicateur de géolocalisation */}
          {userLocation && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center text-emerald-700">
                <span className="text-lg mr-2">📍</span>
                <span className="text-sm">
                  Position détectée • Événements triés par proximité • 
                  Distances calculées automatiquement
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Liste des événements */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedEvents.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🏃‍♂️</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Aucun événement trouvé
                </h3>
                <p className="text-gray-600">
                  Essayez de modifier vos filtres ou d'élargir votre zone de recherche
                </p>
              </div>
            ) : (
              filteredAndSortedEvents.map((event) => (
                <EventCard 
                  key={event._id} 
                  event={event} 
                  onJoin={handleJoinEvent}
                  showDistance={userLocation && event.distance !== undefined}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour afficher une carte d'événement avec badges de distance
const EventCard = ({ event, onJoin, showDistance = false }) => {
  const getSportEmoji = (sport) => {
    const sportEmojis = {
      'Football': '⚽',
      'Basketball': '🏀',
      'Tennis': '🎾',
      'Running': '🏃‍♂️',
      'Volleyball': '🏐',
      'Badminton': '🏸',
      'Natation': '🏊‍♂️',
      'Cyclisme': '🚴‍♂️',
      'Fitness': '💪',
      'Yoga': '🧘‍♀️'
    };
    return sportEmojis[sport] || '🏃‍♂️';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDistanceMessage = (distance) => {
    if (distance <= 2) return "Très proche !";
    if (distance <= 5) return "À proximité";
    if (distance <= 15) return "Distance raisonnable";
    return "Un peu éloigné";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
      {/* Image placeholder avec badges */}
      <div className="h-48 bg-gradient-to-br from-emerald-400 to-green-500 rounded-t-lg flex items-center justify-center relative">
        <span className="text-4xl text-white">{getSportEmoji(event.sport)}</span>
        
        {/* Badge de distance */}
        {event.distance !== undefined && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
            📍 {event.distance} km
          </div>
        )}
        
        {/* Badge de géolocalisation */}
        {event.latitude && event.longitude ? (
          <div className="absolute top-2 left-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            📍 Géolocalisé
          </div>
        ) : (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            📍 Position approximative
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{event.titre}</h3>
            <p className="text-xs text-gray-600">{event.sport}</p>
          </div>
          <div className="text-right">
            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
              {event.statut}
            </span>
          </div>
        </div>

        {/* Informations */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-xs text-gray-600">
            <span className="w-3 h-3 mr-2">📅</span>
            {formatDate(event.date)} • {event.heure}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <span className="w-3 h-3 mr-2">📍</span>
            {event.lieu}, {event.ville}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <span className="w-3 h-3 mr-2">👥</span>
            {event.participants?.length || 0}/{event.nombreParticipants} participants
          </div>
          
          {/* Informations de distance détaillées */}
          {event.distance !== undefined && (
            <div className="flex items-center text-xs text-emerald-600 font-medium">
              <span className="w-3 h-3 mr-2">🎯</span>
              À {event.distance} km de vous • {getDistanceMessage(event.distance)}
            </div>
          )}
        </div>

        {/* Prix et action */}
        <div className="flex justify-between items-center pt-3 border-t">
          <div>
            <span className="text-lg font-bold text-gray-900">Gratuit</span>
          </div>
          <button
            onClick={() => onJoin(event._id)}
            disabled={event.statut === 'complet'}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              event.statut === 'complet'
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {event.statut === 'complet' ? 'Complet' : 'Participer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;