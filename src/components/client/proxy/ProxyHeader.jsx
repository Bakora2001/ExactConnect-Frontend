import React, { useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiRefreshCw } from 'react-icons/fi';

const ProxyHeader = ({ 
  setSelectedCountry, 
  darkMode, 
  toggleFilterModal,
  fetchProxies 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRefresh = () => {
    fetchProxies({});
  };

  return (
    <div className={`p-3 ${darkMode ? 'bg-gray-900' : 'bg-[#f8f5ff]'} rounded-lg shadow-sm mx-4`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center">
          <div className={`flex items-center ${darkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded-md shadow-sm border ${darkMode ? 'border-gray-700' : 'border-purple-200'} flex-1`}>
            <FiSearch className={`mr-2 ${darkMode ? 'text-purple-400' : 'text-[#9b87f5]'}`} size={16} />
            <input
              type="text"
              placeholder="Search proxies..."
              className={`w-full outline-none text-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-md ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-purple-200'}`}
          >
            <FiRefreshCw className={`${darkMode ? 'text-purple-400' : 'text-[#9b87f5]'}`} size={16} />
          </button>
          
          <button
            onClick={toggleFilterModal}
            className={`flex items-center px-3 py-2 rounded-md ${darkMode ? 'bg-[#7E69AB] hover:bg-[#6a5290]' : 'bg-[#9b87f5] hover:bg-[#7E69AB]'} text-white shadow-md transition duration-200 text-sm`}
          >
            <FiFilter className="mr-1" size={14} />
            Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProxyHeader;