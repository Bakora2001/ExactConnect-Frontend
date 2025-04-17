
import { useState, useContext } from 'react';
import { useDashboard } from './DashboardContext';
import { DarkModeContext } from '@/context/DarkModeContext';
import { User, Mail } from 'lucide-react';

const ProfilePage = () => {
  const { user, stats } = useDashboard();
  const { darkMode } = useContext(DarkModeContext);
  
  return (
    <div className="animate-fade-in">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-sm overflow-hidden`}>
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-exactconnect-800 to-exactconnect-600 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center text-exactconnect border-4 border-white">
              <span className="text-4xl sm:text-5xl font-bold">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {user?.name || 'User'}
              </h1>
              <p className="text-exactconnect-100 flex justify-center sm:justify-start items-center">
                <Mail className="h-4 w-4 mr-2" />
                {user?.email || 'email@example.com'}
              </p>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm rounded-full">
                  Customer ID: {user?.customerId || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="md:col-span-2">
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
                <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Personal Information</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className={`w-5 h-5 mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Full Name</p>
                        <p className={`text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className={`w-5 h-5 mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email Address</p>
                        <p className={`text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.email || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <User className={`w-5 h-5 mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Customer ID</p>
                        <p className={`text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user?.customerId || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div>
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden mb-6`}>
                <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Account Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${darkMode ? 'bg-purple-900' : 'bg-exactconnect-100'} rounded-full flex items-center justify-center text-exactconnect`}>
                        <span className="text-lg font-bold">{stats.totalProducts || 0}</span>
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Products</p>
                        <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.totalProducts || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Products by Category */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
                <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Products by Category</h2>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Proxies</span>
                      <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.productsByCategory.proxies || 0}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>VPS Servers</span>
                      <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.productsByCategory.vps || 0}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>PSD Templates</span>
                      <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.productsByCategory.templates || 0}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Non-VOIP Numbers</span>
                      <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.productsByCategory.nonVoip || 0}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>VCC Cards</span>
                      <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.productsByCategory.vcc || 0}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;