import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import Navbar from '../reusables/Navbar';

//Base url
// import { SERVER_URL } from '../../services/data';
import { fetchProxyData } from './utils/proxyService';
import { DarkModeContext } from '../../context/DarkModeContext';

//Importing proxy components
import Pagination from './Pagination';
import FilterModal from './FilterModal';
import Loading from './Loading';
import ProxyDetails from './ProxyDetails';
import ProxyCard from './ProxyCard';
import ProxyHeader from './ProxyHeader';

//TODO --> Add the filter section

const Proxy = () => {
  //Handling state of the proxies
  const [proxies, setProxies] = useState([]);

  //Handling state and filtering proxies
  const [filteredProxies, setFilteredProxies] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState({});

  //State manangement of the loader
  const [loading, setLoading] = useState(true);

  //State management for handling any server errors
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    location: '',
    isp: '',
    conn: '',
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { darkMode } = useContext(DarkModeContext);

  // Fetching proxies from API
  // const fetchProxies = async (page = 0, countryCode = '') => {
  //   try {
  //     setLoading(true);
  //     setError(null);  // Clear any previous errors

  //     // Construct the API URL with optional country code filter
  //     const url = `${SERVER_URL}/products/proxies?page=${page}${countryCode ? `&countryCode=${countryCode}` : ''}`;

  //     const response = await fetch(url);

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch proxies. Please reload the page.');
  //     }

  //     const data = await response.json();

  //     if (!data.agents || data.agents.length === 0) {
  //       throw new Error('No proxies found for the selected country.');
  //     }

  //     // Update state with fetched proxies
  //     setProxies(data.agents);
  //     setFilteredProxies(data.agents.filter(proxy =>
  //       countryCode ? proxy.loc.cc === countryCode : true
  //     ));
  //     setTotalPages(data.total || 0);

  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchProxies = async (page = 0, countryCode = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProxyData(page, countryCode);
      setProxies(data.agents);
      setFilteredProxies(
        data.agents.filter((proxy) =>
          countryCode ? proxy.loc.cc === countryCode : true
        )
      );
      setTotalPages(data.total || 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProxies(currentPage);
  }, [currentPage]);

  const handleRowClick = useCallback((rowIndex, proxy) => {
    setSelectedRow(rowIndex);
    setRowData(proxy);
  }, []);

  //Handling the page for viewing the payment
  const navigateToPayment = (rowData) => {
    setRowData(rowData.id);
  };
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

  // const applyFilters = () => {
  //   let filtered = proxies;

  //   if (filters.conn) {
  //     {
  //       filtered = filtered.filter(
  //         (proxy) =>
  //           proxy.conn.toLowerCase().includes(filters.conn.toLowerCase()) ||
  //           proxy.conn.toLowerCase().includes(filters.conn.toLowerCase())
  //       );
  //     }
  //   }

  //   if (filters.location) {
  //     filtered = filtered.filter(
  //       (proxy) =>
  //         proxy.loc.cc
  //           .toLowerCase()
  //           .includes(filters.location.toLowerCase()) ||
  //         proxy.loc.reg.toLowerCase().includes(filters.location.toLowerCase())
  //     );
  //   }

  //   if (filters.isp) {
  //     filtered = filtered.filter((proxy) =>
  //       proxy.loc.isp.toLowerCase().includes(filters.isp.toLowerCase())
  //     );
  //   }

  //   setFilteredProxies(filtered);
  // };
  const filteredResults = useMemo(() => {
    return proxies.filter(
      (proxy) =>
        (!filters.conn ||
          proxy.conn.toLowerCase().includes(filters.conn.toLowerCase())) &&
        (!filters.location ||
          proxy.loc.cc
            .toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        (!filters.isp ||
          proxy.loc.isp.toLowerCase().includes(filters.isp.toLowerCase()))
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

  // useEffect(() => {
  //   applyFilters();
  // }, [filters]);

  const toggleFilterModal = () => {
    console.log('Hey');
    setIsFilterModalOpen(!isFilterModalOpen);
  };
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div
      className={`${
        darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
      } min-h-screen p-6 sm:p-8 flex flex-col gap-8`}
    >
      <div className="w-full mb-10 sm:mb-12">
        <Navbar />
      </div>

      <ProxyHeader
        darkMode={darkMode}
        toggleFilterModal={toggleFilterModal}
        fetchProxies={fetchProxies}
      />
      <Loading
        loading={loading}
        error={error}
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
    </div>
  );
};

export default Proxy;
