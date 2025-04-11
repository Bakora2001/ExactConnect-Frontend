// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  const login = (userData, token) => {
    localStorage.setItem('userDetails', JSON.stringify(userData));
    localStorage.setItem('auth_token', token);
    setUser(userData);
  };
  
  const logout = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('auth_token');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};