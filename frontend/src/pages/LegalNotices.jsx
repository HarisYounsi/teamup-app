import React from 'react';
import { Link } from 'react-router-dom';

const LegalNotices = () => {
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
              Mentions légales
            </h1>
            <p className="text-gray-600">
              Informations légales obligatoires concernant TeamUp
            </p>
          </div>

          <div className="space-y-8">
            
            {/* Éditeur du site */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Éditeur du site</h2>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-3">🏢 Société</h3>
                    <div className="space-y-1 text-emerald-700 text-sm">
                      <p><strong>Dénomination :</strong> TeamUp SAS</p>
                      <p><strong>Forme :</strong> Société par Actions Simplifiée</p>
                      <p><strong>Capital :</strong> 50 000 €</p>
                      <p><strong>RCS :</strong> Paris 123 456 789</p>
                      <p><strong>SIRET :</strong> 123 456 789 00012</p>
                      <p><strong>APE :</strong> 6201Z</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-3">📍 Coordonnées</h3>
                    <div className="space-y-1 text-emerald-700 text-sm">
                      <p><strong>Adresse :</strong></p>
                      <p>123 Avenue du Sport</p>
                      <p>75001 Paris, France</p>
                      <p><strong>Tél :</strong> +33 1 23 45 67 89</p>
                      <p><strong>Email :</strong> contact@teamup.fr</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">👤 Directeur de publication</h3>
                  <div className="text-gray-700 text-sm space-y-1">
                    <p><strong>Jean Dupont</strong></p>
                    <p>Président de TeamUp SAS</p>
                    <p><strong>Email :</strong> direction@teamup.fr</p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🛡️ Délégué à la Protection des Données</h3>
                  <div className="text-gray-700 text-sm space-y-1">
                    <p><strong>Marie Martin</strong></p>
                    <p><strong>Email :</strong> dpo@teamup.fr</p>
                    <p><strong>Adresse :</strong> Même que le siège</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Hébergement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hébergement</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🖥️ Hébergeur principal</h3>
                  <div className="text-gray-700 text-sm space-y-1">
                    <p><strong>OVHcloud</strong></p>
                    <p>SAS au capital de 10 174 560 €</p>
                    <p>RCS Lille Métropole 424 761 419 00045</p>
                    <p>2 rue Kellermann</p>
                    <p>59100 Roubaix - France</p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">☁️ Services cloud</h3>
                  <div className="text-gray-700 text-sm space-y-1">
                    <p><strong>Amazon Web Services (AWS)</strong></p>
                    <p>Amazon Web Services EMEA SARL</p>
                    <p>38 avenue John F. Kennedy</p>
                    <p>L-1855 Luxembourg</p>
                    <p><strong>Usage :</strong> CDN, stockage fichiers</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-blue-700 text-sm">
                  <strong>🌍 Données UE :</strong> Toutes vos données sont stockées sur des serveurs 
                  situés dans l'Union Européenne, conformément au RGPD.
                </p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">© Éléments protégés :</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  <li>Marque "TeamUp" et logo 🏃‍♀️</li>
                  <li>Design graphique et interface utilisateur</li>
                  <li>Code source et architecture technique</li>
                  <li>Base de données et contenus éditoriaux</li>
                  <li>Algorithmes de recommandation</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-emerald-600">✅ Autorisé :</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Usage personnel du site</li>
                    <li>• Consultation des contenus</li>
                    <li>• Partage de liens vers TeamUp</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-red-600">❌ Interdit :</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Reproduction du design</li>
                    <li>• Usage commercial non autorisé</li>
                    <li>• Extraction de la base de données</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Responsabilité */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Responsabilité</h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Important :</strong> TeamUp est une plateforme de mise en relation. 
                  Nous ne sommes pas responsables des activités organisées par les utilisateurs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">📋 Nos engagements :</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Assurer la disponibilité du site</li>
                    <li>• Protéger vos données personnelles</li>
                    <li>• Modérer les contenus</li>
                    <li>• Fournir un support technique</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">⚠️ Limitations :</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Événements organisés par utilisateurs</li>
                    <li>• Relations entre utilisateurs</li>
                    <li>• Contenus publiés par tiers</li>
                    <li>• Interruptions techniques</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Données personnelles */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Protection des données</h2>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3">🛡️ Conformité RGPD</h3>
                <p className="text-emerald-700 mb-4 text-sm">
                  TeamUp traite vos données en conformité avec le RGPD et la loi Informatique et Libertés.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-emerald-800 mb-2">📋 Plus d'infos</h4>
                    <Link to="/privacy-policy" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                      → Politique de confidentialité
                    </Link>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-800 mb-2">🍪 Cookies</h4>
                    <Link to="/cookie-policy" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                      → Politique des cookies
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">📧 Contacts données</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>DPO :</strong> dpo@teamup.fr</p>
                    <p><strong>Exercice droits :</strong> privacy@teamup.fr</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">⚖️ Réclamation</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>CNIL :</strong> www.cnil.fr</p>
                    <p>3 Place de Fontenoy</p>
                    <p>75334 Paris Cedex 07</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies et traceurs</h2>
              
              <p className="text-gray-700 mb-4 text-sm">
                TeamUp utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences à tout moment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-medium transition-colors text-sm"
                >
                  Gérer mes cookies
                </button>
                
                <Link
                  to="/cookie-policy"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium transition-colors text-center text-sm"
                >
                  Politique détaillée
                </Link>
              </div>
            </section>

            {/* Droit applicable */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Droit applicable et juridiction</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">🇫🇷 Droit applicable</h4>
                  <p className="text-sm text-gray-700">Droit français</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">⚖️ Juridiction</h4>
                  <p className="text-sm text-gray-700">Tribunaux de Paris</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">🤝 Médiation</h4>
                  <p className="text-sm text-gray-700">CMAP - www.cmap.fr</p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📞 Service client</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p><strong>Général :</strong> contact@teamup.fr</p>
                    <p><strong>Support :</strong> support@teamup.fr</p>
                    <p><strong>Partenariats :</strong> partenaires@teamup.fr</p>
                    <p><strong>Presse :</strong> presse@teamup.fr</p>
                    <p><strong>Tél :</strong> +33 1 23 45 67 89</p>
                    <p><strong>Horaires :</strong> Lun-Ven 9h-18h</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">⚖️ Questions juridiques</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p><strong>Juridique :</strong> legal@teamup.fr</p>
                    <p><strong>Protection données :</strong> dpo@teamup.fr</p>
                    <p><strong>Signalement :</strong> moderation@teamup.fr</p>
                    <p><strong>Copyright :</strong> copyright@teamup.fr</p>
                    <p><strong>Adresse :</strong> 123 Avenue du Sport, 75001 Paris</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-500">
                Mentions légales TeamUp - Septembre 2025
              </div>
              
              <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
                <Link to="/privacy-policy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Confidentialité
                </Link>
                <Link to="/terms-of-service" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  CGU
                </Link>
                <Link to="/cookie-policy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Cookies
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LegalNotices;