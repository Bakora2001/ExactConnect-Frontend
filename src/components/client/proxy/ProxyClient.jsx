import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from '../reusable/Sidebar';
import { fetchProxyData } from './utils/proxyService';
import { DarkModeContext } from '../../../context/DarkModeContext';
import { userDetails } from '../../../lib/userDetails';

//Importing proxy components
import Pagination from './Pagination';
import FilterModal from './FilterModal';
import Loading from './Loading';
import ProxyDetails from './ProxyDetails';
import ProxyCard from './ProxyCard';
import ProxyHeader from './ProxyHeader';
import UserMenu from '../reusable/UserMenu';
import { SERVER_URL } from '../../../services/data';

const Proxy = () => {
  //States and contexts
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
  console.log(allData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) {
      navigate('account/login');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
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

      setFilteredProxies(data.filter((proxy) => proxy.loc.cc === countryCode));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProxies(currentPage, selectedCountry);
  }, [currentPage, selectedCountry]);

  //Fetching the total proxies from the server
  const fetchProxyTotals = async (page = 0) => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/products/proxies?page=${page}&countryCode=${selectedCountry}&segments=true`
      );

      setTotalPages(data.total);
      setCountryDetails(data.segments || {});
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // Fetch proxy totals on country change
  useEffect(() => {
    fetchProxyTotals(currentPage);
  }, [currentPage, selectedCountry]);

  //This is the function to pass in the details of the selected proxy
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

  // const filteredResults = useMemo(() => {
  //   return (proxies || []).filter(
  //     (proxy) =>
  //       (!filters.conn ||
  //         proxy.conn?.toLowerCase().includes(filters.conn.toLowerCase())) &&
  //       (!filters.location ||
  //         proxy.loc?.city
  //           ?.toLowerCase()
  //           .includes(filters.location.toLowerCase())) &&
  //       (!filters.isp ||
  //         proxy.loc?.isp?.toLowerCase().includes(filters.isp.toLowerCase()))
  //   );
  // }, [filters, proxies]);

  // useEffect(() => {
  //   setFilteredProxies(filteredResults);
  // }, [filteredResults]);

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

  return (
    <div
      className={`${
        darkMode ? 'bg-[#0c0b08] text-white' : 'bg-white text-black'
      } min-h-screen   flex flex-col gap-2`}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {isSidebarOpen && (
        <div className="fixed inset-0  z-10" onClick={toggleSidebar}></div>
      )}

      <main
        className={`flex-1 ${
          darkMode ? 'bg-[#0c0b08]' : 'bg-white'
        } transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? 'blur-sm pointer-events-none md:pointer-events-auto'
            : ''
        } md:ml-64`}
      >
        <header
          className={`flex justify-between items-center py-4 px-6 border-b backdrop-blur-xl bg-opacity-90 shadow-sm sticky top-0 z-50 ${
            darkMode
              ? 'bg-[#0c0b08]/50 border-gray-700'
              : 'bg-[#7C25BA] border-[#7C25BA]'
          }`}
        >
          <button
            className={`md:hidden text-3xl z-50 ${
              darkMode ? 'text-white' : 'text-white'
            }`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="flex-1 flex justify-end">
            <UserMenu userDetails={userDetails} />
          </div>
        </header>
        <ProxyHeader
          setSelectedCountry={setSelectedCountry}
          darkMode={darkMode}
          toggleFilterModal={toggleFilterModal}
          fetchProxies={fetchProxies}
        />
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          setCurrentPage={setCurrentPage}
        />
        {/* Sidebar */}
        {selectedRow !== null && (
          <ProxyDetails rowData={rowData} setSelectedRow={setSelectedRow} />
        )}
      </main>
    </div>
  );
};

export default Proxy;
