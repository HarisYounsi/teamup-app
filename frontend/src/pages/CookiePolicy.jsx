import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-emerald-600">
                🏃‍♀️ TeamUp
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Gérer mes cookies
              </button>
              <Link to="/" className="text-gray-700 hover:text-emerald-600 font-medium">
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Politique des cookies
            </h1>
            <p className="text-gray-600">Dernière mise à jour : Septembre 2025</p>
          </div>

          {/* Résumé rapide */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-emerald-800 mb-3">🍪 En résumé</h2>
            <p className="text-emerald-700 mb-3">
              TeamUp utilise des cookies pour améliorer votre expérience. Vous contrôlez entièrement 
              quels cookies vous acceptez.
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Gérer mes préférences
            </button>
          </div>

          <div className="space-y-8">
            
            {/* Qu'est-ce qu'un cookie */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p className="text-gray-700 mb-4">
                Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web. 
                Les cookies permettent au site de "se souvenir" de vos actions et préférences.
              </p>
            </section>

            {/* Types de cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types de cookies sur TeamUp</h2>
              
              <div className="space-y-6">
                
                {/* Cookies nécessaires */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">🔒 Cookies nécessaires</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Toujours activé
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Indispensables au fonctionnement de TeamUp. Sans eux, certaines parties du site ne fonctionneraient pas.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Exemples :</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Maintenir votre session de connexion</li>
                      <li>Mémoriser vos préférences de cookies</li>
                      <li>Sécuriser vos interactions</li>
                      <li>Équilibrer la charge sur nos serveurs</li>
                    </ul>
                  </div>
                </div>

                {/* Cookies d'analyse */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">📊 Cookies d'analyse</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Optionnel
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Nous aident à comprendre comment vous utilisez TeamUp pour améliorer nos services.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Ce que nous analysons :</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Pages visitées et temps passé</li>
                      <li>Parcours utilisateur et erreurs techniques</li>
                      <li>Fonctionnalités les plus utilisées</li>
                      <li>Statistiques anonymes (Google Analytics)</li>
                    </ul>
                  </div>
                </div>

                {/* Cookies marketing */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">🎯 Cookies marketing</h3>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Optionnel
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Permettent de vous proposer des publicités pertinentes et de mesurer l'efficacité de nos campagnes.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Utilisations :</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Publicités personnalisées sur les réseaux sociaux</li>
                      <li>Retargeting pour les visiteurs intéressés</li>
                      <li>Mesure des conversions (Facebook, Google Ads)</li>
                      <li>Recommandations d'événements similaires</li>
                    </ul>
                  </div>
                </div>

                {/* Cookies de préférences */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">⚙️ Cookies de préférences</h3>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      Optionnel
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Mémorisent vos choix et préférences pour personnaliser votre expérience.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Préférences sauvegardées :</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      <li>Ville par défaut pour les recherches</li>
                      <li>Sports et activités favoris</li>
                      <li>Langue et paramètres d'affichage</li>
                      <li>Notifications activées/désactivées</li>
                    </ul>
                  </div>
                </div>

              </div>
            </section>

            {/* Gestion des cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Gérer vos cookies</h2>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3">🎛️ Centre de préférences TeamUp</h3>
                <p className="text-emerald-700 mb-4">
                  Le moyen le plus simple de gérer vos cookies :
                </p>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  🍪 Ouvrir les paramètres des cookies
                </button>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Via votre navigateur</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🌐 Chrome</h4>
                  <p className="text-sm text-gray-700">
                    Paramètres → Confidentialité et sécurité → Cookies
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🦊 Firefox</h4>
                  <p className="text-sm text-gray-700">
                    Paramètres → Vie privée et sécurité → Cookies
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🍎 Safari</h4>
                  <p className="text-sm text-gray-700">
                    Préférences → Confidentialité → Cookies
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📱 Mobile</h4>
                  <p className="text-sm text-gray-700">
                    Paramètres navigateur ou système
                  </p>
                </div>
              </div>
            </section>

            {/* Impact sur l'expérience */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Impact du refus des cookies</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Si refusé</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Recommandation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">Nécessaires</td>
                      <td className="px-4 py-3 text-sm text-gray-700">❌ Connexion impossible</td>
                      <td className="px-4 py-3 text-sm text-emerald-600">Obligatoire</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">Analyse</td>
                      <td className="px-4 py-3 text-sm text-gray-700">⚠️ Amélioration ralentie</td>
                      <td className="px-4 py-3 text-sm text-blue-600">Recommandé</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">Marketing</td>
                      <td className="px-4 py-3 text-sm text-gray-700">✅ Publicités moins ciblées</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Selon préférences</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">Préférences</td>
                      <td className="px-4 py-3 text-sm text-gray-700">⚠️ Réglages à refaire</td>
                      <td className="px-4 py-3 text-sm text-orange-600">Confort</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Questions sur les cookies</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">📧 Contact</h4>
                    <p className="text-sm text-gray-700">
                      <strong>E-mail :</strong> cookies@teamup.fr<br/>
                      <strong>DPO :</strong> dpo@teamup.fr
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">⏱️ Délais</h4>
                    <p className="text-sm text-gray-700">
                      <strong>Questions :</strong> 48h max<br/>
                      <strong>Exercice droits :</strong> 30 jours max
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-500">
                Politique des cookies TeamUp v2.0 - Septembre 2025
              </div>
              <div className="flex space-x-4">
                <Link to="/privacy-policy" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                  Confidentialité
                </Link>
                <Link to="/terms-of-service" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                  CGU
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;