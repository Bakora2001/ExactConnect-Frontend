import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReliableCustomerId } from '@/lib/userDetails';

// Create the context outside of the component
const DashboardContext = createContext();

// Export the hook as a named function declaration
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

export const DashboardProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    productsByCategory: {
      proxies: 0,
      vps: 0,
      templates: 0,
      nonVoip: 0,
      vcc: 0
    },
    totalSpent: '0.00',
    totalProducts: 0
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        
        if (!token) {
          setUser(null);
          navigate('/account/login');
          return;
        }
        
        // Get user data from localStorage
        const userDetailsStr = localStorage.getItem('userDetails');
        if (!userDetailsStr) {
          console.error("No user details found in localStorage");
          localStorage.removeItem('auth_token');
          setUser(null);
          navigate('/account/login');
          return;
        }

        let userData;
        try {
          userData = JSON.parse(userDetailsStr);
        } catch (e) {
          console.error("Error parsing userDetails:", e);
          localStorage.removeItem('auth_token');
          setUser(null);
          navigate('/account/login');
          return;
        }
        
        // Ensure consistent customer ID handling
        const customerId = userData.customerId || userData.customerReference || getReliableCustomerId();
        
        if (!customerId) {
          console.error("No customer ID available");
          alert('Customer ID not found. Please log in again.');
          localStorage.removeItem('auth_token');
          setUser(null);
          navigate('/account/login');
          return;
        }
        
        // Standardize the customer ID field names
        userData.customerId = customerId;
        userData.customerReference = customerId;
        
        // Ensure we have a consistent name field
        if (!userData.name) {
          if (userData.firstName && userData.lastName) {
            userData.name = `${userData.firstName} ${userData.lastName}`.trim();
          } else if (userData.firstName) {
            userData.name = userData.firstName;
          } else if (userData.email) {
            userData.name = userData.email.split('@')[0];
          } else {
            userData.name = 'User';
          }
        }
        
        // Save the standardized user data back to localStorage
        localStorage.setItem('userDetails', JSON.stringify(userData));
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        setUser(userData);
      } catch (error) {
        console.error('Error in fetchUserData:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const logout = () => {
    // Store user details before logout for easier login next time
    // But we'll only keep minimal identifying information
    if (user && user.email) {
      const persistentData = {
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        name: user.name || '',
        customerId: user.customerId,
        customerReference: user.customerId
      };
      localStorage.setItem('userDetails', JSON.stringify(persistentData));
    }
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    navigate('/account/login');
  };

  const value = {
    user,
    setUser,
    loading,
    logout,
    stats,
    setStats
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};