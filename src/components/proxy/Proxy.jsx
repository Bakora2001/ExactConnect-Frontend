import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../reusables/Navbar';
import { SERVER_URL } from '../../services/data';
import { DarkModeContext } from '../../context/DarkModeContext';
import { IoFilterOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

//Importing connection icons
import Wifi from '../icons/Wifi';
import Cell from '../icons/Cell';

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
      <div className="sticky z-40 top-0 px-4 py-6 fixed-main flex flex-col flex-grow overflow-hidden">
        <div className={`flex items-center justify-between px-3 py-2 md:px-12 ${darkMode? 'bg-[#131312] text-white'
                : 'bg-white text-black border border-gray-300'}`}>
          <div>
            <h1 className="text-3xl font-bold">Shop Proxies</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Here's a list of proxies. Just tap to buy.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <button
              onClick={toggleFilterModal}
              className="flex items-center justify-center gap-2 px-5 py-3 text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            >
              <IoFilterOutline size={20} />
              <span className="hidden sm:inline-block">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <div className="w-20 h-20 border-4 border-t-[#7e22ce] border-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-400">Loading proxies...</p>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">Error: {error}</div>
      ) : filteredProxies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mb-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a7 7 0 00-7 7v4.586l-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293h10.172l1.293 1.293a1 1 0 001.414-1.414l-1.293-1.293V9a7 7 0 00-7-7zm-2 8a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0z" />
          </svg>
          <p>No proxies found.</p>
        </div>
      ) : null}

      {/* Proxies Section */}
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredProxies.map((proxy, index) => (
          <div
            key={proxy.id}
            className={`${
              darkMode
                ? 'bg-[#131312] text-white border border-white'
                : 'bg-white text-black border border-gray-300'
            } p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform ${
              index === selectedRow
                ? 'scale-105 border-[#7265c4]'
                : 'border-transparent'
            } cursor-pointer`}
            onClick={() => handleRowClick(index, proxy)}
          >
            {/* Proxy Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold truncate">{proxy.ip}</h2>
            </div>

            {/* Proxy Information */}
            <div
              className={`space-y-2 text-sm ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              {/* <p className="font-semibold text-gray-300">
          {proxy.protocol.http} • SOCKS5 {proxy.protocol.socks}
        </p> */}
              <div className={`flex justify-between `}>
                <div>
                  <p>Location</p>
                  <p className="font-semibold ">{proxy.loc.cc}</p>
                </div>
                <div>
                  <p>City</p>
                  <p className="font-semibold ">{proxy.loc.city}</p>
                </div>
                <div>
                  <p>ISP</p>
                  <p className="font-semibold">{proxy.loc.isp}</p>
                </div>
              </div>
            </div>

            {/* Proxy Stats */}
            <div className=" space-y-2 text-gray-400 items-center flex justify-between">
              <div>
                <p>Conn</p>
                <p
                  className={`font-bold ${
                    darkMode ? 'text-white' : 'text-black'
                  }}`}
                >
                  {proxy.conn === 'cell' ? <Cell /> : <Wifi />}
                </p>
              </div>
              <div>
                <p>Stars</p>
                <span
                  className={`font-bold ${
                    darkMode ? 'text-white' : 'text-black'
                  }}`}
                >
                  {proxy.stars}
                </span>
              </div>
              <div>
                <p>Speed</p>
                <span
                  className={`font-bold ${
                    darkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {proxy.dataLeft === Infinity ? '∞' : proxy.dataLeft + ' GB'}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
              <span
                className={`flex items-center gap-1 ${
                  proxy.isOnline ? 'text-green-400' : 'text-red-400'
                }`}
              >
                <i className="material-icons">circle</i>
                {proxy.isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
              <span>{proxy.mobile ? '5G MOBILE' : ''}</span>
              <span>Added {proxy.addedAgo} ago</span>
              <span>Expires {proxy.expires}</span>
            </div>
          </div>
        ))}
      </div>
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Filter</h2>
              <button
                onClick={toggleFilterModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={filters.price}
                onChange={handleFilterChange}
                placeholder="Max price"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Location"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">ISP</label>
              <input
                type="text"
                name="isp"
                value={filters.isp}
                onChange={handleFilterChange}
                placeholder="ISP"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={toggleFilterModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Reset
              </button>
              <button
                onClick={toggleFilterModal}
                className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        {/* Pagination Numbers */}
        {Array.from({ length: totalPages }, (_, index) => {
          if (
            index === 0 || // First Page
            index === totalPages - 1 || // Last Page
            (index >= currentPage - 2 && index <= currentPage + 2) // Nearby Pages
          ) {
            return (
              <button
                key={index}
                className={`px-4 py-2 ${
                  index === currentPage
                    ? 'bg-[#7e22ce] text-white'
                    : 'bg-gray-700 text-white'
                } rounded-md shadow-md hover:bg-gray-600 transition`}
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </button>
            );
          }

          if (
            index === currentPage - 3 || // Ellipsis before current page
            index === currentPage + 3 // Ellipsis after current page
          ) {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-gray-500 select-none"
              >
                ...
              </span>
            );
          }

          return null;
        })}

        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>

      {/* Sidebar */}
      {selectedRow !== null && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-[350px] p-6 text-white bg-[#1f1f1e] h-full shadow-lg">
            <button
              onClick={() => setSelectedRow(null)}
              className="absolute text-xl text-gray-400 hover:text-gray-300 top-4 right-4"
            >
              ×
            </button>
            <h2 className="mb-4 text-xl font-bold">Proxy Details</h2>
            <div className="space-y-2 text-sm text-gray-400">
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
            <Link to="/payment">
              <button
                onClick={() => navigateToPayment(rowData.id)}
                className="w-full px-4 py-2 mt-6 text-white bg-[#7e22ce] rounded-lg hover:bg-[#5c1ca1] transition"
              >
                Purchase proxy
              </button>
            </Link>
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setSelectedRow(null)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Proxy;
