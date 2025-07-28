import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import des pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Loading from './components/Loading';

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
      
      {/* Route par défaut - redirige vers la page d'accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Composant App principal avec Router et AuthProvider
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppContent />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;