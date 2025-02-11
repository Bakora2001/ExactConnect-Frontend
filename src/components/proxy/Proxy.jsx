import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';

import Navbar from '../reusables/Navbar';
import { SERVER_URL } from '../../services/data';

import { fetchProxyData } from './utils/proxyService';
import { DarkModeContext } from '../../context/DarkModeContext';

//Importing proxy components
import Pagination from './Pagination';
import FilterModal from './FilterModal';
import Loading from './Loading';
import ProxyDetails from './ProxyDetails';
import ProxyCard from './ProxyCard';
import ProxyHeader from './ProxyHeader';
import ErrorBoundary from '../pages/ErrorBoundary';

const Proxy = () => {
  //Handling state of the proxies
  const [proxies, setProxies] = useState([]);

  //Handling state and filtering proxies
  const [filteredProxies, setFilteredProxies] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('US'); // Default country

  //Handling selecting a row
  const [selectedRow, setSelectedRow] = useState(null);

  //To handle and display the proxies details
  const [rowData, setRowData] = useState({});

  //State manangement of the loader
  const [loading, setLoading] = useState(true);

  //State management for handling any server errors
  const [error, setError] = useState(null);

  //State for handling paginations
  const [currentPage, setCurrentPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    reg: '',
    isp: '',
    city: '',
    conn: '',
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { darkMode } = useContext(DarkModeContext);

  //Using us to be the default proxies
  const fetchProxies = useCallback(
    async (page = 0, countryCode = selectedCountry) => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchProxyData(page, countryCode);

        setProxies(data);

        setFilteredProxies(
          data.filter((proxy) => proxy.loc.cc === countryCode)
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  );
  useEffect(() => {
    fetchProxies(currentPage, selectedCountry);
  }, [currentPage, selectedCountry]);

  //Fetching the total page of a given country
  const fetchProxyTotals = useCallback(
    async (page = 0, countryCode = selectedCountry) => {
      try {
        const response = await fetch(
          `${SERVER_URL}/products/proxies?page=${page}&countryCode=${countryCode}`
        );

        if (!response.ok) throw new Error('Failed to fetch proxies totals');
        const data = await response.json();

        setTotalPages(data.total);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching proxies:', error);
      }
    },
    [selectedCountry]
  );

  useEffect(() => {
    fetchProxyTotals(currentPage, selectedCountry);
  }, [currentPage, selectedCountry,fetchProxyTotals]);

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

  const filteredResults = useMemo(() => {
    return (proxies || []).filter(
      (proxy) =>
        (!filters.conn ||
          proxy.conn?.toLowerCase().includes(filters.conn.toLowerCase())) &&
        (!filters.location ||
          proxy.loc?.city
            ?.toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        (!filters.isp ||
          proxy.loc?.isp?.toLowerCase().includes(filters.isp.toLowerCase()))
    );
  }, [filters, proxies]);

  useEffect(() => {
    setFilteredProxies(filteredResults);
  }, [filteredResults]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <ErrorBoundary>
      <div
        className={`${
          darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
        } min-h-screen   flex flex-col gap-2`}
      >
        <div className="w-full mb-10 sm:mb-12">
          <Navbar />
        </div>

        <ProxyHeader
          setSelectedCountry={setSelectedCountry}
          darkMode={darkMode}
          toggleFilterModal={toggleFilterModal}
          fetchProxies={fetchProxies}
        />
        <Loading
          darkMode={darkMode}
          loading={loading}
          totalPages={totalPages}
          error={error}
          filteredProxies={filteredProxies}
        />

        <ProxyCard
          rowData={rowData}
          filteredProxies={filteredProxies}
          darkMode={darkMode}
          selectedRow={selectedRow}
          handleRowClick={handleRowClick}
        />

        {isFilterModalOpen && (
          <FilterModal
            filters={filters}
            proxies={proxies}
            darkMode={darkMode}
            handleFilterChange={handleFilterChange}
            toggleFilterModal={toggleFilterModal}
          />
        )}

        <Pagination
          currentPage={currentPage}
          loading={loading}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          setCurrentPage={setCurrentPage}
        />
        {/* Sidebar */}
        {selectedRow !== null && (
          <ProxyDetails rowData={rowData} setSelectedRow={setSelectedRow} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Proxy;
