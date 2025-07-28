import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'utilisateur',
    sports: [],
    niveau: 'debutant',
    ville: ''
  });
  
  const [errors, setErrors] = useState({});
  const [sportInput, setSportInput] = useState('');

  const sportsPopulaires = [
    'Football', 'Basketball', 'Tennis', 'Running', 'Volleyball', 
    'Badminton', 'Natation', 'Cyclisme', 'Fitness', 'Yoga'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addSport = (sport) => {
    if (sport && !formData.sports.includes(sport)) {
      setFormData(prev => ({
        ...prev,
        sports: [...prev.sports, sport]
      }));
    }
    setSportInput('');
  };

  const removeSport = (sportToRemove) => {
    setFormData(prev => ({
      ...prev,
      sports: prev.sports.filter(sport => sport !== sportToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!formData.password) newErrors.password = 'Le mot de passe est requis';
    if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (!formData.ville.trim()) newErrors.ville = 'La ville est requise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await register({
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      sports: formData.sports,
      niveau: formData.niveau,
      ville: formData.ville
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ submit: result.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">🏃‍♀️ TeamUp</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Créer votre compte
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Rejoignez la communauté sportive !
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type de compte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type de compte
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="utilisateur"
                    checked={formData.role === 'utilisateur'}
                    onChange={handleChange}
                    className="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    👤 Participant
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="createur"
                    checked={formData.role === 'createur'}
                    onChange={handleChange}
                    className="focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    ⭐ Organisateur
                  </span>
                </label>
              </div>
            </div>

            {/* Nom et Prénom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.nom ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
              </div>

              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.prenom ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Mots de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Ville */}
            <div>
              <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
                Ville
              </label>
              <input
                id="ville"
                name="ville"
                type="text"
                value={formData.ville}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.ville ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.ville && <p className="mt-1 text-sm text-red-600">{errors.ville}</p>}
            </div>

            {/* Sports d'intérêt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sports d'intérêt
              </label>
              
              {/* Sports populaires */}
              <div className="flex flex-wrap gap-2 mb-3">
                {sportsPopulaires.map(sport => (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => addSport(sport)}
                    disabled={formData.sports.includes(sport)}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      formData.sports.includes(sport)
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>

              {/* Sports sélectionnés */}
              {formData.sports.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Sports sélectionnés :</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.sports.map(sport => (
                      <span
                        key={sport}
                        className="inline-flex items-center px-3 py-1 text-sm bg-emerald-600 text-white rounded-full"
                      >
                        {sport}
                        <button
                          type="button"
                          onClick={() => removeSport(sport)}
                          className="ml-2 text-emerald-200 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ajouter sport personnalisé */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Autre sport..."
                  value={sportInput}
                  onChange={(e) => setSportInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSport(sportInput);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => addSport(sportInput)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Ajouter
                </button>
              </div>
            </div>

            {/* Niveau */}
            <div>
              <label htmlFor="niveau" className="block text-sm font-medium text-gray-700">
                Niveau général
              </label>
              <select
                id="niveau"
                name="niveau"
                value={formData.niveau}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="debutant">🌱 Débutant</option>
                <option value="intermediaire">🎯 Intermédiaire</option>
                <option value="avance">🏆 Avancé</option>
              </select>
            </div>

            {/* Erreur de soumission */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-800">
                  {errors.submit}
                </div>
              </div>
            )}

            {/* Bouton d'inscription */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
                      <div className="border-2 border-white border-t-transparent rounded-full w-full h-full"></div>
                    </div>
                    Inscription en cours...
                  </div>
                ) : (
                  <span className="flex items-center">
                    ✨ Créer mon compte
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Section connexion */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Déjà membre ?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">
                Vous avez déjà un compte ?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="font-medium text-emerald-600 hover:text-emerald-500 underline"
                >
                  Se connecter
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;