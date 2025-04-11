// src/components/auth/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check both token and user details
    const token = localStorage.getItem('auth_token');
    const userDetails = localStorage.getItem('userDetails');
    
    if (token && userDetails) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Save the location they were trying to access for potential redirect after login
    return <Navigate to="/account/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;