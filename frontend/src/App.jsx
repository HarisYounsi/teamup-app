import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import des pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Import des pages RGPD
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import LegalNotices from './pages/LegalNotices';

// Import des composants
import Loading from './components/Loading';
import Footer from './components/footer';
import CookieConsent from './components/CookieConsent';

// Composant pour protéger les routes authentifiées
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <Loading />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Composant pour rediriger les utilisateurs déjà connectés
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <Loading />;
  }
  
  // Si déjà connecté, on peut soit rediriger vers dashboard, soit laisser accès à la page
  // Ici on laisse l'accès à la HomePage même si connecté
  return children;
};

// Composant principal de l'app
function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App min-h-screen flex flex-col">
      <div className="flex-grow">
        <Routes>
          {/* Page d'accueil publique - accessible à tous */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            } 
          />
          
          {/* Pages d'authentification - redirigent vers dashboard si déjà connecté */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          
          {/* Dashboard - protégé, nécessite d'être connecté */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Pages RGPD - publiques */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/legal-notices" element={<LegalNotices />} />
          
          {/* Pages additionnelles (à créer plus tard) */}
          <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">À propos - Page en construction</h1></div>} />
          <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Contact - Page en construction</h1></div>} />
          <Route path="/help" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Aide - Page en construction</h1></div>} />
          <Route path="/faq" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">FAQ - Page en construction</h1></div>} />
          <Route path="/community" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Communauté - Page en construction</h1></div>} />
          <Route path="/events" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Événements - Page en construction</h1></div>} />
          <Route path="/sports" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Sports - Page en construction</h1></div>} />
          
          {/* Route par défaut - redirige vers la page d'accueil */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Footer global - affiché sur toutes les pages */}
      <Footer />

      {/* Système de consentement des cookies */}
      <CookieConsent />
    </div>
  );
}

// Composant App principal avec Router et AuthProvider
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;