import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
            <div className="flex items-center">
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
              Politique de confidentialité
            </h1>
            <p className="text-gray-600">Dernière mise à jour : Septembre 2025</p>
          </div>

          <div className="space-y-8">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Données collectées</h2>
              <p className="text-gray-700 mb-4">
                TeamUp collecte les informations suivantes pour vous fournir nos services :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Inscription :</strong> nom, prénom, email, mot de passe</li>
                <li><strong>Profil :</strong> photo, ville, sports pratiqués, niveau</li>
                <li><strong>Utilisation :</strong> événements créés/rejoints, messages</li>
                <li><strong>Technique :</strong> adresse IP, navigateur, cookies</li>
              </ul>
            </section>

            {/* Utilisation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilisation des données</h2>
              <p className="text-gray-700 mb-4">Nous utilisons vos données pour :</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Gérer votre compte et vous connecter avec d'autres sportifs</li>
                <li>Organiser les événements et faciliter les participations</li>
                <li>Améliorer nos services et vous envoyer des notifications</li>
                <li>Assurer la sécurité et respecter nos obligations légales</li>
              </ul>
            </section>

            {/* Partage */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Partage des données</h2>
              <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 mb-4">
                <p className="text-emerald-800">
                  <strong>Nous ne vendons jamais vos données.</strong> Elles peuvent être partagées uniquement :
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Avec les autres utilisateurs (profil public, participations)</li>
                <li>Avec nos prestataires techniques (hébergement, paiement)</li>
                <li>Si requis par la loi ou pour protéger la sécurité</li>
              </ul>
            </section>

            {/* Vos droits */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Vos droits RGPD</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">✅ Accès & Rectification</h4>
                  <p className="text-sm text-gray-600">Consulter et corriger vos données</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🗑️ Suppression</h4>
                  <p className="text-sm text-gray-600">Demander l'effacement de vos données</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📤 Portabilité</h4>
                  <p className="text-sm text-gray-600">Récupérer vos données</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">❌ Opposition</h4>
                  <p className="text-sm text-gray-600">Refuser certains traitements</p>
                </div>
              </div>
              <p className="text-gray-700">
                <strong>Contact :</strong> <a href="mailto:privacy@teamup.fr" className="text-emerald-600">privacy@teamup.fr</a> 
                | <strong>DPO :</strong> <a href="mailto:dpo@teamup.fr" className="text-emerald-600">dpo@teamup.fr</a>
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Nous utilisons des cookies pour le fonctionnement du site et l'amélioration de votre expérience.
                Consultez notre <Link to="/cookie-policy" className="text-emerald-600 hover:text-emerald-700 font-medium">politique des cookies</Link> 
                ou gérez vos préférences :
              </p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Gérer mes cookies
              </button>
            </section>

            {/* Conservation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Conservation et sécurité</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">⏰ Durées de conservation</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Compte actif : durée d'utilisation + 3 ans</li>
                    <li>• Compte supprimé : 30 jours</li>
                    <li>• Données de paiement : 13 mois</li>
                    <li>• Logs de connexion : 12 mois</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🔒 Sécurité</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Chiffrement SSL/TLS</li>
                    <li>• Mots de passe chiffrés</li>
                    <li>• Accès limité au personnel</li>
                    <li>• Sauvegardes sécurisées</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">TeamUp SAS</h4>
                    <p className="text-sm text-gray-700">
                      123 Avenue du Sport<br/>
                      75001 Paris, France<br/>
                      <strong>Email :</strong> contact@teamup.fr
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Protection des données</h4>
                    <p className="text-sm text-gray-700">
                      <strong>DPO :</strong> dpo@teamup.fr<br/>
                      <strong>Réclamation CNIL :</strong> www.cnil.fr<br/>
                      <strong>Délai de réponse :</strong> 30 jours max
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;