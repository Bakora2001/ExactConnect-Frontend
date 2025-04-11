import { useState, useEffect } from 'react';
import { useDashboard } from './DashboardContext';
import { Menu, Bell, ChevronDown, User, LogOut, Settings } from 'lucide-react';

const DashboardHeader = ({ toggleSidebar }) => {
  const { user, logout } = useDashboard();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [displayName, setDisplayName] = useState('User');
  const [userEmail, setUserEmail] = useState('user@example.com');
  const [userInitial, setUserInitial] = useState('U');
  const [customerId, setCustomerId] = useState('');
  
  // Update user information whenever the user object changes or on component mount
  useEffect(() => {
    updateUserInfo();
    // Update user info on a regular interval to catch any changes
    const interval = setInterval(updateUserInfo, 1000);
    return () => clearInterval(interval);
  }, [user]);
  
  // Function to get and set user information from all available sources
  const updateUserInfo = () => {
    let name = null;
    let email = null;
    let id = null;
    
    // Try from context first
    if (user) {
      if (user.name) name = user.name;
      else if (user.firstName && user.lastName) name = `${user.firstName} ${user.lastName}`;
      else if (user.firstName) name = user.firstName;
      else if (user.lastName) name = user.lastName;
      
      if (user.email) email = user.email;
      if (user.customerId) id = user.customerId;
    }
    
    // If not in context, try user_data in localStorage
    if (!name || !email || !id) {
      try {
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        
        if (!name) {
          if (userData.name) name = userData.name;
          else if (userData.firstName && userData.lastName) name = `${userData.firstName} ${userData.lastName}`;
          else if (userData.firstName) name = userData.firstName;
          else if (userData.lastName) name = userData.lastName;
        }
        
        if (!email && userData.email) email = userData.email;
        if (!id && userData.customerId) id = userData.customerId;
      } catch (error) {
        console.error("Error parsing user_data from localStorage:", error);
      }
    }
    
    // Last resort: try userDetails in localStorage
    if (!name || !email || !id) {
      try {
        const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
        
        if (!name) {
          if (userDetails.name) name = userDetails.name;
          else if (userDetails.firstName && userDetails.lastName) name = `${userDetails.firstName} ${userDetails.lastName}`;
          else if (userDetails.firstName) name = userDetails.firstName;
          else if (userDetails.lastName) name = userDetails.lastName;
        }
        
        if (!email && userDetails.email) email = userDetails.email;
        if (!id && userDetails.customerId) id = userDetails.customerId;
      } catch (error) {
        console.error("Error parsing userDetails from localStorage:", error);
      }
    }
    
    // Update state with what we found
    if (name) {
      setDisplayName(name);
      setUserInitial(name.charAt(0).toUpperCase());
    }
    
    if (email) {
      setUserEmail(email);
    }
    
    if (id) {
      setCustomerId(id);
    }
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Close the user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  // Handle the logout operation
  const handleLogout = () => {
    // Close the menu first
    setUserMenuOpen(false);
    
    // Get current user data from all sources
    let userData = {};
    
    // Try to merge data from all available sources
    try {
      const contextUser = user || {};
      const storedUserData = JSON.parse(localStorage.getItem('user_data') || '{}');
      const storedUserDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      
      // Merge all data with precedence: context > user_data > userDetails
      userData = {
        ...storedUserDetails,
        ...storedUserData,
        ...contextUser
      };
    } catch (error) {
      console.error("Error gathering user data during logout:", error);
      // Use current display state as fallback
      userData = {
        name: displayName,
        email: userEmail,
        customerId: customerId
      };
    }
    
    // Create a data object ensuring we have all needed fields
    const persistentUserData = {
      email: userData.email || userEmail || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      customerReference: userData.customerReference || '',
      name: userData.name || displayName || '',
      customerId: userData.customerId || customerId || ''
    };
    
    // If no name but we have first/last name, construct it
    if (!persistentUserData.name && (persistentUserData.firstName || persistentUserData.lastName)) {
      persistentUserData.name = `${persistentUserData.firstName || ''} ${persistentUserData.lastName || ''}`.trim();
    }
    
    // Store user details for future login
    if (persistentUserData.email) {
      localStorage.setItem('userDetails', JSON.stringify(persistentUserData));
    }
    
    // Remove authentication token and current session data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // Call the logout function from context
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 dark:bg-gray-800 dark:border-gray-700">
      {/* Left side - Hamburger menu */}
      <div className="md:hidden">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Title on mobile (hidden on larger screens) */}
      <h1 className="text-lg font-semibold text-gray-800 md:hidden dark:text-white">ExactConnect</h1>
      
      {/* Spacer to push user profile to the right */}
      <div className="hidden md:block flex-1"></div>
      
      {/* Right side - User profile and notifications */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100 relative dark:text-gray-300 dark:hover:bg-gray-700">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Profile Dropdown */}
        <div className="relative user-menu-container">
          <button 
            className="flex items-center space-x-2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleUserMenu}
          >
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
              {userInitial}
            </div>
            <span className="hidden md:inline text-sm text-gray-700 dark:text-gray-300">
              {displayName}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg border border-gray-200 z-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                  {userEmail}
                </p>
                {customerId && (
                  <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                    ID: {customerId.substring(0, 8)}...
                  </p>
                )}
              </div>
              <a href="/dashboard/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                <User className="h-4 w-4 mr-2" />
                Profile
              </a>
              <a href="/dashboard/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </a>
              <button 
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;