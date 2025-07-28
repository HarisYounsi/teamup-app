import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('Tous types');
  const [userLocation, setUserLocation] = useState('Paris'); // Par défaut

  // Sports pour les filtres
  const sportsFilter = [
    'Tous types', 'Sports', 'Football', 'Basketball', 'Tennis', 
    'Running', 'Volleyball', 'Badminton', 'Natation', 'Cyclisme', 
    'Fitness', 'Yoga'
  ];

  useEffect(() => {
    loadEvents();
    getUserLocation();
  }, []);

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

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Ici tu peux utiliser une API de géocodage inverse pour obtenir la ville
          // Pour l'instant on garde "Paris" par défaut
          setUserLocation('Paris');
        },
        (error) => {
          console.log('Géolocalisation non autorisée');
          setUserLocation('Paris');
        }
      );
    }
  };

  const handleJoinEvent = (eventId) => {
    if (!isAuthenticated) {
      alert('Vous devez vous connecter pour participer à un événement !');
      navigate('/login');
      return;
    }
    
    // Si connecté, rediriger vers le dashboard pour la gestion
    navigate('/dashboard');
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

  // Filtrer les événements
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.ville.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSport = selectedSport === 'Tous types' || 
                        selectedSport === 'Sports' || 
                        event.sport === selectedSport;
    
    return matchesSearch && matchesSport;
  });

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
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">📍</span>
                    <input
                      type="text"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      className="pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 w-32"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3">
            {sportsFilter.map(sport => (
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
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Recommandé pour vous
          </h2>
          <p className="text-gray-600 mb-4">
            {filteredEvents.length} événement{filteredEvents.length !== 1 ? 's' : ''} trouvé{filteredEvents.length !== 1 ? 's' : ''} près de {userLocation}
          </p>
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
            {filteredEvents.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🏃‍♂️</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Aucun événement trouvé
                </h3>
                <p className="text-gray-600">
                  Essayez de modifier vos filtres ou votre recherche
                </p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div key={event._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-emerald-400 to-green-500 rounded-t-lg flex items-center justify-center">
                    <span className="text-4xl text-white">{getSportEmoji(event.sport)}</span>
                  </div>

                  <div className="p-4">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{event.titre}</h3>
                        <p className="text-xs text-gray-600">{event.sport}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        {event.statut}
                      </span>
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
                    </div>

                    {/* Prix et action */}
                    <div className="flex justify-between items-center pt-3 border-t">
                      <div>
                        <span className="text-lg font-bold text-gray-900">Gratuit</span>
                      </div>
                      <button
                        onClick={() => handleJoinEvent(event._id)}
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
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer simple */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">🏃‍♀️ TeamUp</h3>
            <p className="text-gray-400">Connectez-vous avec des sportifs passionnés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;