import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventsAPI } from '../services/api';

// Composant de création d'événement
const CreateEventForm = ({ onEventCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    sport: '',
    date: '',
    heure: '',
    lieu: '',
    ville: '',
    nombreParticipants: '',
    niveau: 'tous'
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const sportsPopulaires = [
    'Football', 'Basketball', 'Tennis', 'Running', 'Volleyball', 
    'Badminton', 'Natation', 'Cyclisme', 'Fitness', 'Yoga', 'Escalade', 
    'Randonnée', 'Boxe', 'Danse', 'Golf'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titre.trim()) newErrors.titre = 'Le titre est requis';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (!formData.sport.trim()) newErrors.sport = 'Le sport est requis';
    if (!formData.date) newErrors.date = 'La date est requise';
    if (!formData.heure) newErrors.heure = 'L\'heure est requise';
    if (!formData.lieu.trim()) newErrors.lieu = 'Le lieu est requis';
    if (!formData.ville.trim()) newErrors.ville = 'La ville est requise';
    if (!formData.nombreParticipants || formData.nombreParticipants < 2) {
      newErrors.nombreParticipants = 'Au moins 2 participants requis';
    }

    const selectedDate = new Date(formData.date + 'T' + formData.heure);
    const now = new Date();
    if (selectedDate <= now) {
      newErrors.date = 'La date et l\'heure doivent être dans le futur';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await eventsAPI.create(formData);
      onEventCreated(response.data.event);
      
      setFormData({
        titre: '',
        description: '',
        sport: '',
        date: '',
        heure: '',
        lieu: '',
        ville: '',
        nombreParticipants: '',
        niveau: 'tous'
      });
      
      alert('Événement créé avec succès !');
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Erreur lors de la création' });
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
              Titre de l'événement *
            </label>
            <input
              id="titre"
              name="titre"
              type="text"
              value={formData.titre}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.titre ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="ex: Match de football du dimanche"
            />
            {errors.titre && <p className="mt-1 text-sm text-red-600">{errors.titre}</p>}
          </div>

          <div>
            <label htmlFor="sport" className="block text-sm font-medium text-gray-700 mb-2">
              Sport *
            </label>
            <select
              id="sport"
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.sport ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Choisir un sport</option>
              {sportsPopulaires.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
              <option value="Autre">Autre</option>
            </select>
            {errors.sport && <p className="mt-1 text-sm text-red-600">{errors.sport}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Décrivez votre événement, les règles, l'ambiance..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              min={getTodayDate()}
              value={formData.date}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.date ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="heure" className="block text-sm font-medium text-gray-700 mb-2">
              Heure *
            </label>
            <input
              id="heure"
              name="heure"
              type="time"
              value={formData.heure}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.heure ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.heure && <p className="mt-1 text-sm text-red-600">{errors.heure}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="lieu" className="block text-sm font-medium text-gray-700 mb-2">
              Lieu *
            </label>
            <input
              id="lieu"
              name="lieu"
              type="text"
              value={formData.lieu}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.lieu ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="ex: Stade municipal, Parc des sports..."
            />
            {errors.lieu && <p className="mt-1 text-sm text-red-600">{errors.lieu}</p>}
          </div>

          <div>
            <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-2">
              Ville *
            </label>
            <input
              id="ville"
              name="ville"
              type="text"
              value={formData.ville}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.ville ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="ex: Paris, Lyon, Marseille..."
            />
            {errors.ville && <p className="mt-1 text-sm text-red-600">{errors.ville}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombreParticipants" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de participants *
            </label>
            <input
              id="nombreParticipants"
              name="nombreParticipants"
              type="number"
              min="2"
              max="50"
              value={formData.nombreParticipants}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.nombreParticipants ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="ex: 10"
            />
            {errors.nombreParticipants && <p className="mt-1 text-sm text-red-600">{errors.nombreParticipants}</p>}
          </div>

          <div>
            <label htmlFor="niveau" className="block text-sm font-medium text-gray-700 mb-2">
              Niveau requis
            </label>
            <select
              id="niveau"
              name="niveau"
              value={formData.niveau}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="tous">👥 Tous niveaux</option>
              <option value="debutant">🌱 Débutant</option>
              <option value="intermediaire">🎯 Intermédiaire</option>
              <option value="avance">🏆 Avancé</option>
            </select>
          </div>
        </div>

        {errors.submit && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">
              {errors.submit}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
                  <div className="border-2 border-white border-t-transparent rounded-full w-full h-full"></div>
                </div>
                Création en cours...
              </div>
            ) : (
              '✨ Créer l\'événement'
            )}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 sm:flex-initial bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-md font-medium transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

const Dashboard = () => {
  const { user, logout, isCreator } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Charger les événements au démarrage
  useEffect(() => {
    loadEvents();
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

  const handleJoinEvent = async (eventId) => {
    try {
      await eventsAPI.joinEvent(eventId);
      loadEvents();
      alert('Inscription réussie à l\'événement !');
    } catch (error) {
      alert(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  };

  const handleEventCreated = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    setShowCreateForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getNiveauEmoji = (niveau) => {
    switch(niveau) {
      case 'debutant': return '🌱';
      case 'intermediaire': return '🎯';
      case 'avance': return '🏆';
      default: return '👥';
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-emerald-600">🏃‍♀️ TeamUp</h1>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Loading */}
        <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">🏃‍♀️ TeamUp</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Bonjour, <strong>{user?.prenom} {user?.nom}</strong>
                {isCreator && <span className="ml-2 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Organisateur</span>}
              </span>
              <button
                onClick={logout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec statistiques */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {isCreator ? 'Espace Organisateur' : 'Événements sportifs'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <span className="text-2xl">🏃‍♂️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Événements disponibles</p>
                  <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">📍</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Votre ville</p>
                  <p className="text-2xl font-bold text-gray-900">{user?.ville}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">{getNiveauEmoji(user?.niveau)}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Votre niveau</p>
                  <p className="text-2xl font-bold text-gray-900 capitalize">{user?.niveau}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section créer événement pour les organisateurs */}
        {isCreator && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">⭐ Créer un nouvel événement</h3>
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  {showCreateForm ? 'Annuler' : '+ Créer un événement'}
                </button>
              </div>
              
              {showCreateForm && (
                <div className="border-t pt-4">
                  <CreateEventForm 
                    onEventCreated={handleEventCreated}
                    onCancel={() => setShowCreateForm(false)}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Liste des événements */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {events.length > 0 ? 'Événements disponibles' : 'Aucun événement pour le moment'}
          </h3>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {events.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <div className="text-6xl mb-4">🏃‍♂️</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun événement disponible</h3>
              <p className="text-gray-600">
                {isCreator 
                  ? "Créez votre premier événement pour commencer !" 
                  : "Les organisateurs vont bientôt publier des événements."
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    {/* Header de l'événement */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getSportEmoji(event.sport)}</span>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{event.titre}</h4>
                          <p className="text-sm text-gray-600">{event.sport}</p>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        {event.statut}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Informations */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 mr-2">📅</span>
                        {formatDate(event.date)} à {event.heure}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 mr-2">📍</span>
                        {event.lieu}, {event.ville}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 mr-2">👥</span>
                        {event.participants?.length || 0} / {event.nombreParticipants} participants
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 mr-2">{getNiveauEmoji(event.niveau)}</span>
                        Niveau: {event.niveau}
                      </div>
                    </div>

                    {/* Organisateur */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Organisé par <strong>{event.organisateur?.prenom} {event.organisateur?.nom}</strong>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t">
                      {event.statut === 'complet' ? (
                        <button
                          disabled
                          className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
                        >
                          Événement complet
                        </button>
                      ) : (
                        <button
                          onClick={() => handleJoinEvent(event._id)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                        >
                          Rejoindre l'événement
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;