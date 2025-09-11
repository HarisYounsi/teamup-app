import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section principale */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Logo et description */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold text-emerald-400">🏃‍♀️ TeamUp</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                La plateforme qui connecte les sportifs passionnés. Trouvez des partenaires, 
                rejoignez des événements et développez votre réseau sportif local.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.182 17.65l-1.96-1.96l1.96-1.96l1.943 1.942c.875-.807 2.026-1.297 3.323-1.297c2.31 0 4.17 1.86 4.17 4.17c0 2.31-1.86 4.17-4.17 4.17z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-emerald-400">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                    Événements
                  </Link>
                </li>
                <li>
                  <Link to="/sports" className="text-gray-300 hover:text-white transition-colors">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-emerald-400">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@teamup.fr" className="text-gray-300 hover:text-white transition-colors">
                    Support technique
                  </a>
                </li>
                <li>
                  <Link to="/community" className="text-gray-300 hover:text-white transition-colors">
                    Communauté
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-800"></div>

        {/* Section légale */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {currentYear} TeamUp. Tous droits réservés.
            </div>

            {/* Liens légaux */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link 
                to="/privacy-policy" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Conditions d'utilisation
              </Link>
              <Link 
                to="/cookie-policy" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Politique des cookies
              </Link>
              <button 
                onClick={() => {
                  // Ouvrir les paramètres des cookies
                  const event = new CustomEvent('openCookieSettings');
                  window.dispatchEvent(event);
                }}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Paramètres des cookies
              </button>
              <Link 
                to="/legal-notices" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>

        {/* Badge de conformité */}
        <div className="border-t border-gray-800 py-4">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-emerald-900 text-emerald-300">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                RGPD Conforme
              </span>
            </div>
            <span>Plateforme sécurisée et respectueuse de vos données</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;