import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Types de cookies
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Toujours activés
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem('teamup_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      // Charger les préférences sauvegardées
      try {
        const savedPreferences = JSON.parse(consent);
        setCookiePreferences(savedPreferences);
      } catch (error) {
        setIsVisible(true);
      }
    }

    // Écouter l'événement pour ouvrir les paramètres
    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowDetails(true);
    };

    window.addEventListener('openCookieSettings', handleOpenSettings);
    return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
  }, []);

  const savePreferences = (preferences) => {
    localStorage.setItem('teamup_cookie_consent', JSON.stringify({
      ...preferences,
      consentDate: new Date().toISOString(),
      version: '1.0'
    }));

    // Dispatcher un événement pour informer l'app
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
      detail: preferences
    }));
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setCookiePreferences(allAccepted);
    savePreferences(allAccepted);
    setIsVisible(false);
  };

  const acceptSelected = () => {
    savePreferences(cookiePreferences);
    setIsVisible(false);
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setCookiePreferences(necessaryOnly);
    savePreferences(necessaryOnly);
    setIsVisible(false);
  };

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return; // Nécessaires non modifiables
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                🍪 Paramètres des cookies
              </h2>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            
            {/* Description principale */}
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Nous utilisons des cookies pour améliorer votre expérience sur TeamUp. 
                Certains cookies sont nécessaires au fonctionnement du site, tandis que 
                d'autres nous aident à analyser l'utilisation et à personnaliser votre expérience.
              </p>
              
              {!showDetails && (
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  Voir plus de détails →
                </button>
              )}
            </div>

            {/* Détails des cookies */}
            {showDetails && (
              <div className="space-y-4 mb-6">
                
                {/* Cookies nécessaires */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Cookies nécessaires</h3>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Toujours activé
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Ces cookies sont essentiels au fonctionnement du site. Ils permettent 
                    la navigation, l'authentification et l'accès aux zones sécurisées.
                  </p>
                  <div className="text-xs text-gray-500">
                    Exemples : session utilisateur, panier, préférences de langue
                  </div>
                </div>

                {/* Cookies d'analyse */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Cookies d'analyse</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookiePreferences.analytics}
                        onChange={() => handlePreferenceChange('analytics')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Ces cookies nous aident à comprendre comment vous utilisez le site 
                    pour améliorer nos services.
                  </p>
                  <div className="text-xs text-gray-500">
                    Exemples : Google Analytics, statistiques de visite, pages populaires
                  </div>
                </div>

                {/* Cookies marketing */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Cookies marketing</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookiePreferences.marketing}
                        onChange={() => handlePreferenceChange('marketing')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Ces cookies permettent de vous proposer des publicités personnalisées 
                    et de mesurer l'efficacité de nos campagnes.
                  </p>
                  <div className="text-xs text-gray-500">
                    Exemples : Facebook Pixel, Google Ads, retargeting
                  </div>
                </div>

                {/* Cookies de préférences */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Cookies de préférences</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookiePreferences.preferences}
                        onChange={() => handlePreferenceChange('preferences')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Ces cookies mémorisent vos choix et préférences pour personnaliser 
                    votre expérience sur le site.
                  </p>
                  <div className="text-xs text-gray-500">
                    Exemples : thème sombre/clair, ville par défaut, sports favoris
                  </div>
                </div>
              </div>
            )}

            {/* Informations légales */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">
                Pour plus d'informations sur notre utilisation des cookies, consultez notre{' '}
                <a href="/cookie-policy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Politique des cookies
                </a>{' '}
                et notre{' '}
                <a href="/privacy-policy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Politique de confidentialité
                </a>.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptNecessaryOnly}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
              >
                Nécessaires uniquement
              </button>
              
              {showDetails && (
                <button
                  onClick={acceptSelected}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium transition-colors"
                >
                  Sauvegarder mes choix
                </button>
              )}
              
              <button
                onClick={acceptAll}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-medium transition-colors"
              >
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;