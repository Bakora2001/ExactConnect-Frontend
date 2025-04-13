import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { DashboardProvider, useDashboard } from './DashboardContext';

const DashboardContent = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, loading } = useDashboard();
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [customerReference, setcustomerReference] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (!token || !userData) {
      navigate('/account/login');
    }
  }, [navigate]);
  
  // Generate welcome message when user changes
  useEffect(() => {
    if (user) {
      if (user.name) {
        setWelcomeMessage(`Welcome back, ${user.name}!`);
        setcustomerReference(`${user.customerReference}`)
      }
       else if (user.email) {
        setWelcomeMessage(`Welcome back, ${user.email.split('@')[0]}!`);
        setcustomerReference(`${user.customerReference}`)
      } else {
        setWelcomeMessage('Welcome to your dashboard!');
      }
    }
  }, [user]);
  
  // Prevent using back button to bypass authentication
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    
    const handlePopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };
    
    window.addEventListener('popstate', handlePopstate);
    
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Redirect to login if no user
  if (!user) {
    return <Navigate to="/account/login" replace />;
  }
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-[#0c0b08]">
      {/* Sidebar */}
      <DashboardSidebar collapsed={sidebarCollapsed} />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <DashboardHeader user={user} toggleSidebar={toggleSidebar} />
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Welcome Message */}
          {welcomeMessage && (
            <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {welcomeMessage}
              </h1>
              {user && user.customerId && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Customer ID: {customerReference}
                </p>
              )}
            </div>
          )}
           
           {/* This will render child routes defined in routes.jsx */}
           <Outlet />
        </main>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;