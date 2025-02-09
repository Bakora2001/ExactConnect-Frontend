const FilterModal = ({
  filters,
  proxies,
  handleFilterChange,
  toggleFilterModal,
  darkMode,
}) => {

  
  // Extract unique values for filters
  const uniqueRegions = [...new Set(proxies.map((proxy) => proxy.loc.reg))];

  const uniqueCities = [...new Set(proxies.map((proxy) => proxy.loc.city))];

  const uniqueISPs = [...new Set(proxies.map((proxy) => proxy.loc.isp))];


  return (
    <div
    className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-black text-white' : 'bg-black text-black'
      } bg-opacity-50`}
  >
    <div
      className={`${darkMode ? 'bg-[#131312] border border-gray-700' : 'bg-white'
        } p-4 sm:p-6 rounded-lg w-11/12 sm:w-96 max-w-full overflow-y-auto max-h-[90vh]`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Filter</h2>
        <button
          onClick={toggleFilterModal}
          className={`text-gray-500 hover:text-gray-700 ${darkMode ? 'hover:text-gray-300' : ''}`}
        >
          ×
        </button>
      </div>
  
      {/* Country Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Region</label>
        <select
          name="reg"
          value={filters.reg}
          onChange={handleFilterChange}
          className={`${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
            } border border-gray-600 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500`}
        >
          <option value="">Select Region</option>
          {uniqueRegions.map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>
      </div>
  
      {/* City Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">City</label>
        <select
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          className={`${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
            } border border-gray-600 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500`}
        >
          <option value="">Select City</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
  
      {/* ISP Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">ISP</label>
        <select
          name="isp"
          value={filters.isp}
          onChange={handleFilterChange}
          className={`${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
            } border border-gray-600 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500`}
        >
          <option value="">Select ISP</option>
          {uniqueISPs.map((isp) => (
            <option key={isp} value={isp}>
              {isp}
            </option>
          ))}
        </select>
      </div>
  
      {/* Buttons */}
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={toggleFilterModal}
          className={`px-4 py-2 ${darkMode ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
            } rounded-md transition duration-300`}
        >
          Reset
        </button>
        <button
          onClick={toggleFilterModal}
          className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition duration-300"
        >
          Apply Now
        </button>
      </div>
    </div>
  </div>
  );
};

export default FilterModal;
