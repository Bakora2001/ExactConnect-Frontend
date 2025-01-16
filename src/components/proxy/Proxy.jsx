import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../reusables/Navbar';
import { SERVER_URL } from '../../services/data';
import { DarkModeContext } from '../../context/DarkModeContext';

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
    price: '',
    location: '',
    isp: '',
  });

  const { darkMode } = useContext(DarkModeContext);

  // Fetching proxies from API
  const fetchProxies = async (page=0) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${SERVER_URL}/products/proxies?page=${page}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch proxies');
      }
      const data = await response.json();
      console.log(data);
      setProxies(data.agents || []);
      setFilteredProxies(data.agents || []);
      setTotalPages(data.total );
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

    if (filters.price) {
      filtered = filtered.filter(
        (proxy) => proxy.price <= parseFloat(filters.price)
      );
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={`${darkMode ? 'bg-[#131312]' : 'bg-white'} min-h-screen p-4`}
    >
      {/* Navbar */}
      <div className="w-full mb-12 sm:mb-20">
        <Navbar />
      </div>
      {loading ? (
        <div className="flex-col gap-4 w-full flex items-center justify-center h-screen">
          <div className="w-20 h-20 border-4 border-transparent text-[#7e22ce] text-4xl animate-spin flex items-center justify-center border-t-[#7e22ce] rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-white text-2xl animate-spin flex items-center justify-center border-t-black rounded-full"></div>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center text-white">
          Error: {error}
        </div>
      ) : filteredProxies.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-white py-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-500 mb-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a7 7 0 00-7 7v4.586l-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293h10.172l1.293 1.293a1 1 0 001.414-1.414l-1.293-1.293V9a7 7 0 00-7-7zm-2 8a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0z" />
          </svg>
          <p className="text-gray-400">No proxies found.</p>
        </div>
      ) : null}
      {/* Proxies Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {filteredProxies.map((proxy, index) => (
          <div
            key={proxy.id}
            className={`${
              darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
            }  p-6 rounded-lg shadow-lg hover:shadow-xl transition border ${
              index === selectedRow ? 'border-[#7265c4]' : 'border-transparent'
            } cursor-pointer`}
            onClick={() => handleRowClick(index, proxy)}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold truncate">{proxy.ip}</h2>
              <p className="text-[#7e22ce] text-lg font-semibold">
                ${proxy.price}
              </p>
            </div>
            <div className="text-sm space-y-2 text-gray-400">
              <p>
                {proxy.loc.city}, {proxy.loc.reg} {proxy.loc.zip}
              </p>
              <div className="flex items-center gap-2">
                <i className="material-icons text-gray-500">wifi</i>
                <span>{proxy.loc.isp}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">
                Connections: {proxy.conn} of {proxy.shared}
              </p>
              <div className="flex items-center mt-2">
                {[...Array(proxy.shared)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      idx < proxy.conn ? 'bg-green-400' : 'bg-gray-600'
                    } mx-[2px]`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8 ">
        <button
          className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="text-white text-sm">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>

      {/* Selected Card Details Modal */}
      {selectedRow !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1e] p-6 rounded-lg shadow-lg text-white w-full max-w-lg">
            <button
              onClick={() => setSelectedRow(null)}
              className="text-gray-400 hover:text-gray-300 absolute top-4 right-4 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Proxy Details</h2>
            <div className="text-sm space-y-2 text-gray-400">
              <p>
                <strong>IP:</strong> {rowData.ip}
              </p>
              <p>
                <strong>Region:</strong> {rowData.loc.reg}
              </p>
              <p>
                <strong>City:</strong> {rowData.loc.city}
              </p>
              <p>
                <strong>ZIP:</strong> {rowData.loc.zip}
              </p>
              <p>
                <strong>ISP:</strong> {rowData.loc.isp}
              </p>
              <p>
                <strong>Clean:</strong> {rowData.clean ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Shared:</strong> {rowData.shared}
              </p>
              <p>
                <strong>Connections:</strong> {rowData.conn}
              </p>
              <p>
                <strong>New:</strong> {rowData.new ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Price:</strong> ${rowData.price}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proxy;
