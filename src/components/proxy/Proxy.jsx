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
import { object } from 'zod';

const Proxy = () => {
  //Handling state of the proxies
  const [proxies, setProxies] = useState([]);

  // console.log(proxies);
  //State for getting price
  const [prices, setPrices] = useState([]);

  //State for storing the country details
  const [countryDetails, setCountryDetails] = useState({});
  //Handling state and filtering proxies
  const [filteredProxies, setFilteredProxies] = useState([]);
  // console.log(filteredProxies);
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
    regions: '',
    isp: '',
    cities: '',
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { darkMode } = useContext(DarkModeContext);

  //Using us to be the default proxies
  const fetchProxies = useCallback(
    async (page = 0, countryCode = selectedCountry) => {
      try {
        setLoading(true);

        const response = await fetch(
          `${SERVER_URL}/products/proxy/details/global-config?pageNum=${page}&countryCode=${countryCode}`
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
    fetchProxies(currentPage, selectedCountry);
  }, [currentPage, selectedCountry]);

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

  //trying to retreive prices
  // const pricing = filteredProxies.map((prices) => {
  //   console.log(
  //     prices?.priceExcC !== null ? prices?.priceExcC : prices?.priceShrC
  //   );
  // });

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
  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <ErrorBoundary>
      <div
        className={`${
          darkMode ? 'bg-[#010100] text-white' : 'bg-white text-black'
        } min-h-screen     flex flex-col gap-2`}
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
