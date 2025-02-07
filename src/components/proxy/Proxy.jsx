import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';

import Navbar from '../reusables/Navbar';

//Base url
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


  console.log(proxies);
  //Handling state and filtering proxies
  const [filteredProxies, setFilteredProxies] = useState([]);

  // const uniqueCCs = [...new Set(proxies.map((proxy) => proxy.loc.reg))];
  // console.log("filteredProxies:", filteredProxies);
  // const debugMode = filteredProxies.map((proxy, index) => console.log("priceShrc:", proxy.priceShrc, "Type:", typeof proxy.priceShrc))
  //Getting the total proxies of a selected country
  // const [passedIn,setPassedIn] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('US'); // Default country
  const { proxyState } = 'NEW'
  //Handling the selected proxies
  const [selectedRow, setSelectedRow] = useState(null);
  // console.log(selectedRow);

  //To handle and display the proxies details
  const [rowData, setRowData] = useState({});
  // console.log(rowData);

  //State manangement of the loader
  const [loading, setLoading] = useState(true);

  //State management for handling any server errors
  const [error, setError] = useState(null);

  //State for handling paginations
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // console.log(totalPages);
  const [filters, setFilters] = useState({
    reg: '',
    isp: '',
    city: '',
    conn: '',
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { darkMode } = useContext(DarkModeContext);


  //Using us to be the default proxies
  const fetchProxies = useCallback(async (page = 0, countryCode = selectedCountry) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchProxyData(page, countryCode);
      console.log(data);
      setProxies(data);
      setFilteredProxies(
        data.filter((proxy) => proxy.loc.cc === countryCode)
      );
      setTotalPages(data.length);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  });

  //Fetching proxy details from a selected proxy
  const fetchProxiesDetails = async (isp = '') => {
    try {
      const response = await fetch(`${SERVER_URL}/products/proxy/details/global-config?&isp=${isp}`)
      if (!response.ok) throw new Error('Failed to fetch details')
      const data = await response.json()
      // console.log(data);
      setRowData(data)
    } catch (error) {
      console.error('Error fetching proxy details', error)
    }
  }

  // useEffect(() => {
  //   fetchProxiesDetails(currentPage)
  // }, [])

  useEffect(() => {

    fetchProxies(currentPage, selectedCountry);
  }, [currentPage, selectedCountry]);

  //This is the function to pass in the details of the selected proxy
  const handleRowClick = useCallback((rowIndex, proxy) => {

    //   console.log("Row Index:", rowIndex);
    // console.log("Selected Proxy:", proxy);
    setSelectedRow(rowIndex);
    // Extract the necessary values dynamically
    setRowData(proxy)

    // Extract the necessary values dynamically
    // Ensure a default value if undefined
    // const isp = proxy.loc.isp || "Safaricom";     // Ensure a default ISP if undefined
    // console.log(isp);

    // Fetch proxy details with extracted values
    // fetchProxiesDetails(isp);
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
    return (proxies || []).filter(
      (proxy) =>
        (!filters.conn ||
          proxy.conn?.toLowerCase().includes(filters.conn.toLowerCase())) &&
        (!filters.location ||
          proxy.loc?.city?.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.isp ||
          proxy.loc?.isp?.toLowerCase().includes(filters.isp.toLowerCase()))
    );
  }, [filters, proxies]);
  // console.log(filteredResults);

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
    // console.log('Hey');
    setIsFilterModalOpen(!isFilterModalOpen);
  };
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <ErrorBoundary>
       <div
      className={`${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
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
