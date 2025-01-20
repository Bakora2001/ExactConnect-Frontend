import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../reusables/Navbar';
import { SERVER_URL } from '../../services/data';
import { DarkModeContext } from '../../context/DarkModeContext';

//Importing proxy components
import Header from './Header';
import Pagination from './Pagination';
import FilterModal from './FilterModal';
import Loading from './Loading';
import ProxyDetails from './ProxyDetails';
import ProxyCard from './ProxyCard';

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
  const fetchProxies = async (page = 0) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${SERVER_URL}/products/proxies?page=${page}`
      );
      if (!response.ok) {
        throw new Error('Please reload the page');
      }
      const data = await response.json();
      console.log(data);
      setProxies(data.agents || []);
      setFilteredProxies(data.agents || []);
      setTotalPages(data.total);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProxies(currentPage);
  }, [currentPage]);

  const handleRowClick = (rowIndex, proxy) => {
    setSelectedRow(rowIndex);
    setRowData(proxy);
  };

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

  const applyFilters = () => {
    let filtered = proxies;

    if (filters.conn) {
      {
        filtered = filtered.filter(
          (proxy) =>
            proxy.conn.toLowerCase().includes(filters.conn.toLowerCase()) ||
            proxy.conn.toLowerCase().includes(filters.conn.toLowerCase())
        );
      }
    }

    if (filters.location) {
      filtered = filtered.filter(
        (proxy) =>
          proxy.loc.city
            .toLowerCase()
            .includes(filters.location.toLowerCase()) ||
          proxy.loc.reg.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.isp) {
      filtered = filtered.filter((proxy) =>
        proxy.loc.isp.toLowerCase().includes(filters.isp.toLowerCase())
      );
    }

    setFilteredProxies(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

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
        darkMode ? 'bg-[#030816] text-white' : 'bg-white text-black'
      } min-h-screen p-6 sm:p-8`}
    >
      <div className="w-full mb-10 sm:mb-16">
        <Navbar />
      </div>

      <Header darkMode={darkMode} toggleFilterModal={toggleFilterModal} />
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
