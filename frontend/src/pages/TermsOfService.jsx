import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
              Conditions générales d'utilisation
            </h1>
            <p className="text-gray-600">Dernière mise à jour : Septembre 2025</p>
          </div>

          <div className="space-y-8">
            
            {/* Acceptation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptation</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-blue-800">
                  En utilisant TeamUp, vous acceptez ces conditions. Si vous n'acceptez pas, 
                  veuillez ne pas utiliser nos services.
                </p>
              </div>
            </section>

            {/* Service */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description du service</h2>
              <p className="text-gray-700 mb-4">TeamUp est une plateforme qui permet de :</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Mettre en relation des sportifs et passionnés d'activités physiques</li>
                <li>Créer, découvrir et participer à des événements sportifs</li>
                <li>Former des équipes et organiser des rencontres</li>
                <li>Échanger avec une communauté de sportifs locaux</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>Important :</strong> TeamUp facilite les rencontres mais n'est pas responsable 
                des événements organisés par les utilisateurs.
              </p>
            </section>

            {/* Inscription */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Inscription et compte</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Conditions requises :</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Être âgé d'au moins 16 ans</li>
                    <li>• Fournir des informations exactes</li>
                    <li>• Disposer d'une adresse email valide</li>
                    <li>• Accepter nos conditions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Vous êtes responsable de :</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• La sécurité de votre mot de passe</li>
                    <li>• Toutes les activités sur votre compte</li>
                    <li>• Signaler tout usage non autorisé</li>
                    <li>• Maintenir vos informations à jour</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Utilisation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Utilisation du service</h2>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2 text-emerald-600">✅ Autorisé :</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Créer un profil sportif authentique</li>
                  <li>• Rechercher et participer à des événements</li>
                  <li>• Organiser des activités sportives</li>
                  <li>• Communiquer respectueusement</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">🚫 Strictement interdit :</h4>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Créer de faux profils ou usurper l'identité</li>
                  <li>• Harceler ou discriminer d'autres utilisateurs</li>
                  <li>• Publier du contenu offensant ou illégal</li>
                  <li>• Utiliser à des fins commerciales non autorisées</li>
                  <li>• Organiser des événements dangereux</li>
                </ul>
              </div>
            </section>

            {/* Événements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Événements sportifs</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">En tant qu'organisateur :</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Fournir des informations exactes</li>
                    <li>• Respecter les capacités annoncées</li>
                    <li>• Assurer un environnement sûr</li>
                    <li>• Informer des changements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">En tant que participant :</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Confirmer sa participation</li>
                    <li>• Respecter les consignes</li>
                    <li>• Adopter un comportement sportif</li>
                    <li>• Prévenir en cas d'empêchement</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Responsabilité :</strong> Chaque utilisateur est responsable de sa sécurité 
                  et de sa condition physique lors des événements.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Responsabilité et assurance</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ Clause importante</h3>
                <p className="text-red-700 mb-2">
                  TeamUp n'est pas responsable des :
                </p>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Activités sportives organisées par les utilisateurs</li>
                  <li>• Blessures ou accidents lors des événements</li>
                  <li>• Conflits entre utilisateurs</li>
                  <li>• Qualité des équipements fournis</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Recommandation assurance</h4>
                <p className="text-blue-700 text-sm">
                  Vérifiez votre couverture d'assurance responsabilité civile et sport avant de participer aux événements.
                </p>
              </div>
            </section>

            {/* Paiements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Paiements et remboursements</h2>
              
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Annulation</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Remboursement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Plus de 7 jours avant</td>
                      <td className="px-4 py-3 text-sm text-gray-700">100%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">3-7 jours avant</td>
                      <td className="px-4 py-3 text-sm text-gray-700">75%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">24-72h avant</td>
                      <td className="px-4 py-3 text-sm text-gray-700">50%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Moins de 24h</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Aucun</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Contact et litiges */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact et litiges</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">📞 Support</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>E-mail :</strong> support@teamup.fr</p>
                    <p><strong>Juridique :</strong> legal@teamup.fr</p>
                    <p><strong>Délai :</strong> 48h maximum</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">⚖️ Droit applicable</h4>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Droit français</strong></p>
                    <p>Tribunaux de Paris</p>
                    <p>Médiation possible</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">Conditions d'utilisation TeamUp - Version 2.1</p>
              <div className="flex justify-center space-x-4">
                <Link to="/privacy-policy" className="text-emerald-600 hover:text-emerald-700">
                  Confidentialité
                </Link>
                <Link to="/cookie-policy" className="text-emerald-600 hover:text-emerald-700">
                  Cookies
                </Link>
                <Link to="/legal-notices" className="text-emerald-600 hover:text-emerald-700">
                  Mentions légales
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;