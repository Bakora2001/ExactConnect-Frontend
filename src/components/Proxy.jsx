import React, { useEffect, useState } from 'react';
import Navbar from '../reusables/Navbar';
import { SERVER_URL } from '../data';

const Proxy = () => {
  const [proxies, setProxies] = useState([]);
  const [filteredProxies, setFilteredProxies] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowData, setRowData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    price: '',
    location: '',
    isp: '',
  });

  // Fetching proxies from API
  const fetchProxies = async (page = 0) => {
    try {
      setLoading(true);
      const response = await fetch(`${SERVER_URL}/products/proxies?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch proxies');
      }
      const data = await response.json();
      setProxies(data.agents || []);
      setFilteredProxies(data.agents || []);
      setTotalPages(data.totalPages || 1); // Assuming API returns total pages
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
      filtered = filtered.filter((proxy) => proxy.price <= parseFloat(filters.price));
    }

    if (filters.location) {
      filtered = filtered.filter((proxy) =>
        proxy.loc.city.toLowerCase().includes(filters.location.toLowerCase()) ||
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#131312] min-h-screen p-4">
      <div className="w-full mb-12 sm:mb-20">
        <Navbar />
      </div>

      {/* Filter Section */}
      <div className="bg-[#1f1f1e] p-6 rounded-lg shadow mb-6">
        <h2 className="text-white text-lg font-bold mb-4">Filter Proxies</h2>
        <div className="flex flex-wrap gap-4">
          <input
            type="number"
            name="price"
            placeholder="Max Price"
            value={filters.price}
            onChange={handleFilterChange}
            className="p-2 rounded bg-gray-800 text-white w-full sm:w-[30%]"
          />
          <input
            type="text"
            name="location"
            placeholder="Location (City or Region)"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 rounded bg-gray-800 text-white w-full sm:w-[30%]"
          />
          <input
            type="text"
            name="isp"
            placeholder="ISP"
            value={filters.isp}
            onChange={handleFilterChange}
            className="p-2 rounded bg-gray-800 text-white w-full sm:w-[30%]"
          />
        </div>
      </div>

      {/* Proxies Section */}
      <div className="flex flex-wrap justify-between gap-4 p-6">
        {filteredProxies.map((proxy, index) => (
          <div
            key={proxy.id}
            className={`w-full md:w-[48%] lg:w-[24%] bg-[#1f1f1e] text-white p-6 rounded-lg shadow hover:shadow-lg transition ${
              index === selectedRow ? 'border-2 border-[#7265c4]' : ''
            } cursor-pointer`}
            onClick={() => handleRowClick(index, proxy)}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{proxy.ip}</h2>
              <p className="text-green-400 text-lg font-semibold">${proxy.price}</p>
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
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>

      {/* Selected Card Details */}
      <div className="mt-8 bg-[#1f1f1e] p-6 rounded-lg shadow text-white">
        <div className="text-lg font-bold mb-2">
          {selectedRow !== null ? `Row ${selectedRow + 1}` : 'Select a Card'}
        </div>
        {selectedRow !== null ? (
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
              <strong>Shared:</strong> {rowData.shared}</p>
            <p>
              <strong>Conn:</strong> {rowData.conn}</p>
            <p>
              <strong>New:</strong> {rowData.new ? 'Yes' : 'No'}</p>
            <p>
              <strong>Price:</strong> {rowData.price}</p>
          </div>
        ) : (
          <div className="text-gray-500">Details will display here</div>
        )}
      </div>
    </div>
  );
};

export default Proxy;
