import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';

import Navbar from '../reusables/Navbar';
import { SERVER_URL } from '../../services/data';

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
  //States and contexts
  const [proxies, setProxies] = useState([]);
  const [countryDetails, setCountryDetails] = useState({});
  const [filteredProxies, setFilteredProxies] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { darkMode } = useContext(DarkModeContext);
  const [filters, setFilters] = useState({
    regionName: '',
    isp: '',
    city: '',
  });

  const fetchProxies = useCallback(
    async ({ countryCode = selectedCountry, regionName, isp,city } = {}) => {
      try {
        setLoading(true);

        //Construct query params dynamically
        const params = new URLSearchParams();
        if (countryCode) params.append('countryCode', countryCode);
        if (isp) params.append('isp', isp);
        if (regionName) params.append('regionName', regionName);
        if (city) params.append('city', city);

        const response = await fetch(
          `${SERVER_URL}/products/proxy/details/global-config?${params.toString()}`
        );
        const data = await response.json();
        setProxies(data);

        setFilteredProxies(
          data.filter((proxy) => proxy.loc.cc === countryCode)
        );
      } catch (error) {
        console.error('There is an an err', error);
      } finally {
        setLoading(false);
      }
    }
  );
  useEffect(() => {
    fetchProxies(selectedCountry);
  }, [selectedCountry]);

  //Fetching the total page of a given country
  //TODO --> Use callback
  const fetchProxyTotals = async (page = 0, countryCode = selectedCountry) => {
    try {
      const url = `${SERVER_URL}/products/proxies?page=${page}&countryCode=${countryCode}&segments=${true}`;
      const response = await fetch(url);

      const data = await response.json();
      // console.log(data);
      setTotalPages(data.total);
      setCountryDetails(data.segments || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProxyTotals(currentPage, selectedCountry);
  }, [currentPage, selectedCountry]);

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
        (!filters.regions ||
          proxy.loc.reg?.includes(filters.regions.toLowerCase())) &&
        (!filters.cities ||
          proxy.loc.cc?.includes(filters.cities.toLowerCase())) &&
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
    <ErrorBoundary>
      <div
        className={`${
          darkMode ? 'bg-[#010100] text-white' : 'bg-white text-black'
        } min-h-screen     flex flex-col gap-1`}
      >
        <div className="w-full mb-10 sm:mb-12">
          <Navbar />
        </div>
        <div className=' '>
          <ProxyHeader
            setSelectedCountry={setSelectedCountry}
            darkMode={darkMode}
            toggleFilterModal={toggleFilterModal}
            fetchProxies={fetchProxies}
          />
        </div>

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
