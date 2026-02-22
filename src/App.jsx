// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './pages/auth/Login';
import UserHome from './pages/user/UserHome';
import UserDashboard from './pages/user/UserDashboard';
import FamilyDashboard from './pages/family/FamilyDashboard';
import SpecialistFinder from './pages/user/SpecialistFinder';
import DemoPanel from './pages/demo/DemoPanel';
import MemoryGamePage from './pages/user/MemoryGamePage';
import WordRecallGamePage from './pages/user/WordRecallGamePage';
import DetailedTrends from './pages/user/DetailedTrends';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, role } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Role-based default routes */}
        <Route index element={
          role === 'USER' ? <UserHome /> :
          role === 'FAMILY' ? <Navigate to="/family-dashboard" /> :
          role === 'ADMIN' ? <Navigate to="/admin-panel" /> :
          <UserHome />
        } />

        {/* User Routes */}
        <Route path="dashboard" element={<ProtectedRoute roles={['USER']}><UserDashboard /></ProtectedRoute>} />
        <Route path="trends" element={<ProtectedRoute roles={['USER']}><DetailedTrends /></ProtectedRoute>} />
        <Route path="play/memory-match" element={<ProtectedRoute roles={['USER']}><MemoryGamePage /></ProtectedRoute>} />
        <Route path="play/word-recall" element={<ProtectedRoute roles={['USER']}><WordRecallGamePage /></ProtectedRoute>} />
        
        {/* Family Routes */}
        <Route path="family-dashboard" element={<ProtectedRoute roles={['FAMILY']}><FamilyDashboard /></ProtectedRoute>} />
        <Route path="specialists" element={<ProtectedRoute roles={['FAMILY']}><SpecialistFinder /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="admin-panel" element={<ProtectedRoute roles={['ADMIN']}><DemoPanel /></ProtectedRoute>} />

      </Route>
      
      <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
    </Routes>
  );
}

export default App;
