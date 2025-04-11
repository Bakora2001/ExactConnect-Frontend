import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { userDetails } from '../../../lib/userDetails';

// Importing proxy components
import Pagination from './Pagination';
import FilterModal from './FilterModal';
import Loading from './Loading';
import ProxyDetails from './ProxyDetails';
import ProxyCard from './ProxyCard';
import ProxyHeader from './ProxyHeader';
import Header from './Header';
import { SERVER_URL } from '../../../services/data';

const Proxy = () => {
  // States and contexts
  const [proxies, setProxies] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [filteredProxies, setFilteredProxies] = useState([]);
  const [countryDetails, setCountryDetails] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState({});
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { darkMode } = useContext(DarkModeContext);
  const [allData, setAllData] = useState(0);
  const navigate = useNavigate();

  // Dashboard stats
  const [totalProxies, setTotalProxies] = useState(0);

  useEffect(() => {
    if (!userDetails) {
      navigate('account/login');
    }
  }, [navigate]);

  const [filters, setFilters] = useState({
    regionName: '',
    isp: '',
    city: '',
  });

  const fetchProxies = async ({
    page = currentPage,
    countryCode = selectedCountry,
    regionName,
    isp,
    city,
  }) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (countryCode) params.append('countryCode', countryCode);
      if (isp) params.append('isp', isp);
      if (regionName) params.append('regionName', regionName);
      if (city) params.append('city', city);

      const { data } = await axios.get(
        `${SERVER_URL}/products/proxy/details/global-config?pageNum=${page}&${params.toString()}`
      );

      const countryProxies = data.filter((proxy) => proxy.loc.cc === countryCode);
      setFilteredProxies(countryProxies);
      setTotalProxies(countryProxies.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProxies({ page: currentPage, countryCode: selectedCountry });
  }, [currentPage, selectedCountry]);

  // Fetching the total proxies from the server
  const fetchProxyTotals = async (page = 0) => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/products/proxies?page=${page}&countryCode=${selectedCountry}&segments=true`
      );

      setTotalPages(data.total);
      setCountryDetails(data.segments || {});
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch proxy totals on country change
  useEffect(() => {
    fetchProxyTotals(currentPage);
  }, [currentPage, selectedCountry]);

  // This is the function to pass in the details of the selected proxy
  const handleRowClick = useCallback((rowIndex, proxy) => {
    setSelectedRow(rowIndex);
    setRowData(proxy);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      regionName: '',
      city: '',
      isp: '',
    });
  };

  const applyFilters = () => {
    fetchProxies(filters);
  };
  
  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  // Directly check for selectedRow to show ProxyDetails
  const showProxyDetails = selectedRow !== null && rowData;

  // Card animation style
  const cardAnimationStyle = "transition-all duration-1000 hover:scale-[1.02] animate-[breathing_4s_ease-in-out_infinite]";

  return (
    <div
      className={`${
        darkMode ? 'bg-[#0c0b08] text-white' : 'bg-white text-black'
      } min-h-screen flex flex-col relative`}
      style={{
        /* Add breathing animation keyframes */
        ["@keyframes breathing"]: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" }
        }
      }}
    >
      <main
        className={`flex-1 ${
          darkMode ? 'bg-[#0c0b08]' : 'bg-white'
        } transition-all duration-300 ease-in-out`}
      >
        {/* Dashboard Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {/* Total Proxies Card */}
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-100 to-amber-50'} rounded-xl shadow-md p-4 border ${darkMode ? 'border-gray-800' : 'border-purple-100'} ${cardAnimationStyle}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-purple-800'}`}>Total Proxies Per Page</h3>
              <div className="w-10 h-10 rounded-xl bg-purple-400 hover:bg-purple-500 flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-purple-600'} font-medium`}>Available</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-purple-900'}`}>{totalProxies}</p>
            </div>
          </div>

          {/* Total Spent Card */}
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-100 to-amber-50'} rounded-xl shadow-md p-4 border ${darkMode ? 'border-gray-800' : 'border-purple-100'} ${cardAnimationStyle}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-purple-800'}`}>Total Spent</h3>
              <div className="w-10 h-10 rounded-xl bg-amber-400 hover:bg-amber-500 flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-purple-600'} font-medium`}>Current</p>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-purple-900'}`}>$0.00</p>
            </div>
          </div>

          {/* Request Services Card */}
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-100 to-amber-50'} rounded-xl shadow-md p-4 border ${darkMode ? 'border-gray-800' : 'border-purple-100'} ${cardAnimationStyle}`}>
            <div className="flex flex-col h-full justify-between">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-purple-800'} mb-2`}>Request Our Services Today!</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-purple-600'} mb-4`}>Need custom proxies or special configurations?</p>
              <button className={`mt-auto w-full py-2 px-4 ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} text-white font-medium rounded-md transition-colors`}>
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Country Selection Header */}
        <div className="w-full">
          <Header 
            darkMode={darkMode} 
            fetchProxies={fetchProxies} 
            setSelectedCountry={setSelectedCountry}
          />
        </div>

        <div className="mb-6 mt-4">
          <ProxyHeader
            setSelectedCountry={setSelectedCountry}
            darkMode={darkMode}
            toggleFilterModal={toggleFilterModal}
            fetchProxies={fetchProxies}
          />
        </div>

        <div className="mt-2">
          <Loading
            loading={loading}
            error={error}
            darkMode={darkMode}
            filteredProxies={filteredProxies}
          />

          <ProxyCard
            filteredProxies={filteredProxies}
            darkMode={darkMode}
            selectedRow={selectedRow}
            handleRowClick={handleRowClick}
          />

          {isFilterModalOpen && (
            <FilterModal
              filters={filters}
              resetFilters={resetFilters}
              applyFilters={applyFilters}
              countryDetails={countryDetails}
              darkMode={darkMode}
              handleFilterChange={handleFilterChange}
              toggleFilterModal={toggleFilterModal}
            />
          )}

          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        
        {/* Proxy Details Component - Always render but conditionally show */}
        {showProxyDetails && (
          <ProxyDetails 
            rowData={rowData} 
            setSelectedRow={setSelectedRow}
            darkMode={darkMode}
          />
        )}
      </main>
    </div>
  );
};

export default Proxy;