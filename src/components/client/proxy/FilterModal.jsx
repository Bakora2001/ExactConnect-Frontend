// import React from 'react';
// import { X } from 'lucide-react';

// const FilterModal = ({
//   filters,
//   resetFilters,
//   applyFilters,
//   countryDetails,
//   darkMode,
//   handleFilterChange,
//   toggleFilterModal
// }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className={`${
//         darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
//       } rounded-lg p-6 w-full max-w-md mx-auto shadow-lg`}>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold">Filter Proxies</h3>
//           <button 
//             onClick={toggleFilterModal}
//             className={`p-1 rounded-full hover:bg-gray-200 ${darkMode ? 'hover:bg-gray-700' : ''}`}
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <div className="space-y-4">
//           {/* Region Filter */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Region</label>
//             <select
//               name="regionName"
//               value={filters.regionName}
//               onChange={handleFilterChange}
//               className={`w-full p-2 rounded border ${
//                 darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
//               }`}
//             >
//               <option value="">All Regions</option>
//               {countryDetails.regions && Object.keys(countryDetails.regions).map((region) => (
//                 <option key={region} value={region}>
//                   {region} ({countryDetails.regions[region]})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* City Filter */}
//           <div>
//             <label className="block text-sm font-medium mb-1">City</label>
//             <select
//               name="city"
//               value={filters.city}
//               onChange={handleFilterChange}
//               className={`w-full p-2 rounded border ${
//                 darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
//               }`}
//             >
//               <option value="">All Cities</option>
//               {countryDetails.cities && Object.keys(countryDetails.cities).map((city) => (
//                 <option key={city} value={city}>
//                   {city} ({countryDetails.cities[city]})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* ISP Filter */}
//           <div>
//             <label className="block text-sm font-medium mb-1">ISP</label>
//             <select
//               name="isp"
//               value={filters.isp}
//               onChange={handleFilterChange}
//               className={`w-full p-2 rounded border ${
//                 darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
//               }`}
//             >
//               <option value="">All ISPs</option>
//               {countryDetails.isps && Object.keys(countryDetails.isps).map((isp) => (
//                 <option key={isp} value={isp}>
//                   {isp} ({countryDetails.isps[isp]})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Connection Type Filter */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Connection Type</label>
//             <select
//               name="connectionType"
//               value={filters.connectionType}
//               onChange={handleFilterChange}
//               className={`w-full p-2 rounded border ${
//                 darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
//               }`}
//             >
//               <option value="">All Types</option>
//               <option value="Cell">Cell</option>
//               <option value="Wifi">Wifi</option>
//             </select>
//           </div>

//           {/* Rating Filter */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Minimum Rating</label>
//             <select
//               name="rating"
//               value={filters.rating}
//               onChange={handleFilterChange}
//               className={`w-full p-2 rounded border ${
//                 darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
//               }`}
//             >
//               <option value="">Any Rating</option>
//               <option value="1">1+ Star</option>
//               <option value="2">2+ Stars</option>
//               <option value="3">3+ Stars</option>
//               <option value="4">4+ Stars</option>
//               <option value="5">5 Stars</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-3 mt-6">
//           <button
//             onClick={resetFilters}
//             className={`px-4 py-2 rounded border ${
//               darkMode
//                 ? 'border-gray-600 hover:bg-gray-700'
//                 : 'border-gray-300 hover:bg-gray-100'
//             }`}
//           >
//             Reset
//           </button>
//           <button
//             onClick={() => {
//               applyFilters();
//               toggleFilterModal();
//             }}
//             className="px-4 py-2 rounded bg-[#893ac1] hover:bg-[#7832a8] text-white"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterModal;



import React, { useState, useEffect } from 'react';
import { FiX, FiFilter, FiMapPin, FiWifi, FiHome } from 'react-icons/fi';

const FilterModal = ({
  filters,
  resetFilters,
  applyFilters,
  countryDetails,
  darkMode,
  handleFilterChange,
  toggleFilterModal
}) => {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [isps, setIsps] = useState([]);

  useEffect(() => {
    // Extract unique regions, cities, and ISPs from country details
    if (countryDetails && countryDetails.regions) {
      setRegions(Array.from(new Set(countryDetails.regions)));
    }

    if (countryDetails && countryDetails.cities) {
      setCities(Array.from(new Set(countryDetails.cities)));
    }

    if (countryDetails && countryDetails.isps) {
      setIsps(Array.from(new Set(countryDetails.isps)));
    }
  }, [countryDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
    toggleFilterModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-4 ${
          darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
        } border ${darkMode ? 'border-gray-700' : 'border-purple-200'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-base font-semibold flex items-center ${darkMode ? 'text-purple-400' : 'text-[#7E69AB]'}`}>
            <FiFilter className="mr-2" />
            Filter Proxies
          </h3>
          <button 
            onClick={toggleFilterModal}
            className={`p-1.5 rounded-full ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            } transition-colors`}
          >
            <FiX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="text-sm">
          <div className="grid grid-cols-1 gap-4 mb-4">
            {/* Region Filter */}
            <div>
              <label 
                className={`block mb-1 font-medium flex items-center ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <FiMapPin className="mr-1" size={14} /> Region
              </label>
              <select
                name="regionName"
                value={filters.regionName}
                onChange={handleFilterChange}
                className={`w-full rounded-md shadow-sm border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm`}
              >
                <option value="">All Regions</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label 
                className={`block mb-1 font-medium flex items-center ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <FiHome className="mr-1" size={14} /> City
              </label>
              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className={`w-full rounded-md shadow-sm border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm`}
              >
                <option value="">All Cities</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* ISP Filter */}
            <div>
              <label 
                className={`block mb-1 font-medium flex items-center ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <FiWifi className="mr-1" size={14} /> ISP Provider
              </label>
              <select
                name="isp"
                value={filters.isp}
                onChange={handleFilterChange}
                className={`w-full rounded-md shadow-sm border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm`}
              >
                <option value="">All ISPs</option>
                {isps.map((isp, index) => (
                  <option key={index} value={isp}>
                    {isp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}">
            <button
              type="button"
              onClick={resetFilters}
              className={`px-3 py-1.5 rounded-md text-sm ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } transition-colors`}
            >
              Reset
            </button>
            <div className="space-x-2">
              <button
                type="button"
                onClick={toggleFilterModal}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } transition-colors`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-3 py-1.5 rounded-md text-sm ${
                  darkMode 
                    ? 'bg-[#7E69AB] hover:bg-[#6a5290]' 
                    : 'bg-[#9b87f5] hover:bg-[#7E69AB]'
                } text-white transition-colors`}
              >
                Apply
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;