import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getReliableCustomerId } from '@/lib/userDetails';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

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
    totalProducts: 0,
    orders: []
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
        
        let userData = null;
        
        // Try multiple sources to get user data
        const userDetailsStr = localStorage.getItem('userDetails');
        if (userDetailsStr) {
          try {
            userData = JSON.parse(userDetailsStr);
          } catch (e) {
            console.error("Error parsing userDetails:", e);
          }
        }
        
        if (!userData) {
          const userDataStr = localStorage.getItem('user_data');
          if (userDataStr) {
            try {
              userData = JSON.parse(userDataStr);
            } catch (e) {
              console.error("Error parsing user_data:", e);
            }
          }
        }
        
        if (userData) {
          // Ensure we have a consistent name field
          if (!userData.name || userData.name === 'Demo User') {
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
            
          // Check for existing customerId from previous sessions
          // Look for customerId in multiple possible fields
          const existingCustomerId = userData.customerId || userData.customerReference || userData.customerID || getReliableCustomerId();
          
          if (!existingCustomerId) {
            // Generate a new UUID for this customer if none exists
            userData.customerId = uuidv4();
            console.log("Generated new customer ID:", userData.customerId);
          } else {
            // Use the existing ID but ensure it's stored consistently
            userData.customerId = existingCustomerId;
            console.log("Using existing customer ID:", userData.customerId);
          }
          
          // Ensure customerReference is set for backward compatibility
          if (!userData.customerReference) {
            userData.customerReference = userData.customerId;
          }
            
          // Save this updated user data back to localStorage to maintain persistence
          localStorage.setItem('userDetails', JSON.stringify(userData));
          localStorage.setItem('user_data', JSON.stringify(userData));
          
          setUser(userData);
          
          // Simulated stats data for demonstration
          // Note: In a real implementation, you would fetch this from an API based on customerId
          const demoStats = {
            productsByCategory: {
              proxies: Math.floor(Math.random() * 10),
              vps: Math.floor(Math.random() * 5),
              templates: Math.floor(Math.random() * 8),
              nonVoip: Math.floor(Math.random() * 3),
              vcc: Math.floor(Math.random() * 7)
            },
            totalSpent: (Math.random() * 1000).toFixed(2),
            totalProducts: Math.floor(Math.random() * 30) + 5,
            orders: [
              {
                id: 'ORD-101',
                product: 'Elite Proxies (x5)',
                date: '2025-04-08',
                amount: '59.99',
                quantity: 5,
                category: 'Proxies',
                status: 'completed',
                customerId: userData.customerId
              },
              {
                id: 'ORD-102',
                product: 'VPS Server - Basic',
                date: '2025-04-03',
                amount: '29.99',
                quantity: 1,
                category: 'VPS Server',
                status: 'processing',
                customerId: userData.customerId
              },
              {
                id: 'ORD-103',
                product: 'Premium Template Pack',
                date: '2025-03-27',
                amount: '19.99',
                quantity: 1,
                category: 'PSD Templates',
                status: 'completed',
                customerId: userData.customerId
              }
            ]
          };
          
          setStats(demoStats);
        } else {
          localStorage.removeItem('auth_token');
          setUser(null);
          navigate('/account/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const logout = () => {
    // Store user details before logout for easier login next time
    // IMPORTANT: We keep the customer ID even after logout for persistence
    if (user && user.email) {
      const persistentData = {
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        name: user.name || '',
        customerId: user.customerId, // Keep the customer ID for persistence
        customerReference: user.customerId // Ensure consistent naming
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
    stats
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};