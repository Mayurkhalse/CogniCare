// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [scenario, setScenario] = useState('STABLE'); // STABLE, DECLINING, NEW_USER
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Use a mock session check
  useEffect(() => {
    const storedUser = sessionStorage.getItem('cognicare_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.user);
      setRole(parsedUser.role);
      setScenario(parsedUser.scenario);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email) => {
    const userData = await authService.login(email);
    if (userData) {
      const sessionData = { user: {name: userData.name, email }, role: userData.role, scenario: userData.scenario };
      setUser({name: userData.name, email });
      setRole(userData.role);
      setScenario(userData.scenario);
      setIsAuthenticated(true);
      sessionStorage.setItem('cognicare_user', JSON.stringify(sessionData));
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('cognicare_user');
  };

  const switchScenario = (newScenario) => {
    setScenario(newScenario);
    const storedUser = sessionStorage.getItem('cognicare_user');
     if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.scenario = newScenario;
      sessionStorage.setItem('cognicare_user', JSON.stringify(parsedUser));
    }
  };

  const value = {
    user,
    role,
    scenario,
    isAuthenticated,
    loading,
    login,
    logout,
    switchScenario,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
