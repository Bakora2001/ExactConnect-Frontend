import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from '../reusable/Sidebar'


//Base url
// import { SERVER_URL } from '../../services/data';
import { fetchProxyData } from './utils/proxyService';
import { DarkModeContext } from '../../../context/DarkModeContext';

//Importing proxy components
import Pagination from './Pagination';
import FilterModal from './FilterModal';
import Loading from './Loading';
import ProxyDetails from './ProxyDetails';
import ProxyCard from './ProxyCard';
import ProxyHeader from './ProxyHeader';
import UserMenu from '../reusable/UserMenu';


const Proxy = () => {
  //Handling state of the proxies
  const [proxies, setProxies] = useState([]);

  //retreiving user details from the storage
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  //State for handling switching the sidebar open and close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    // document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
  };

  //Handling state and filtering proxies
  const [filteredProxies, setFilteredProxies] = useState([]);

  //Handling the selected proxies
  const [selectedRow, setSelectedRow] = useState(null);
  console.log(selectedRow);

  //To handle and display the proxies details
  const [rowData, setRowData] = useState({});
  console.log(rowData);

  //State manangement of the loader
  const [loading, setLoading] = useState(true);

  //State management for handling any server errors
  const [error, setError] = useState(null);

  //State for handling paginations
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    location: '',
    isp: '',
    conn: '',
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { darkMode } = useContext(DarkModeContext);


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

  //Fetching proxy details from a selected proxy
  // const fetchProxiesDetails = async ()

  useEffect(() => {
    fetchProxies(currentPage);
  }, [currentPage]);

  //This is the function to pass in the details of the selected proxy
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
      className={`${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
        } min-h-screen   flex flex-col gap-2`}
    >

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0  z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      <main
        className={`flex-1 ${darkMode ? 'bg-[#030917]' : 'bg-white'} transition-all duration-300 ease-in-out ${isSidebarOpen ? 'blur-sm pointer-events-none md:pointer-events-auto' : ''
          } md:ml-64`}
      >
        <header className={`flex justify-between items-center py-4 px-6 border-b backdrop-blur-xl bg-opacity-90 shadow-sm sticky top-0 z-50 ${darkMode ? 'bg-[#131312] border-gray-700' : 'bg-[#7C25BA] border-[#7C25BA]'
          }`}>
          <button
            className={`md:hidden text-3xl z-50 ${darkMode ? 'text-white' : 'text-white'}`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="flex-1 flex justify-end">
            <UserMenu userDetails={userDetails} />
          </div>
        </header>
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
      </main>

    </div>
  );
};

export default Proxy;
