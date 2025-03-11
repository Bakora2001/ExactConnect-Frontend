import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
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
  const [countryDetails, setCountryDetails] = useState({});
  const [filteredProxies, setFilteredProxies] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState({});
  const [loadingProxies, setLoadingProxies] = useState(true);
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

  const fetchProxies = async ({
    page = currentPage,
    countryCode = selectedCountry,
    regionName,
    isp,
    city,
  }) => {
    try {
      setLoadingProxies(true);

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
      setLoadingProxies(false);
    }
  };
  useEffect(() => {
    fetchProxies(currentPage, selectedCountry);
  }, [currentPage, selectedCountry]);

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

  const applyFilters = () => {
    fetchProxies(filters);
  };

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
        <div className=" ">
          <ProxyHeader
            setSelectedCountry={setSelectedCountry}
            darkMode={darkMode}
            toggleFilterModal={toggleFilterModal}
            // fetchProxies={fetchProxies}
          />
        </div>

        <Loading
          darkMode={darkMode}
          loadingProxies={loadingProxies}
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
