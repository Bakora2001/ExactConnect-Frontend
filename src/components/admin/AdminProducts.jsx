import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaBox, FaImage, FaThLarge, FaSearch, FaHome, FaTag } from 'react-icons/fa';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]); // Initialize with an empty product list
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate('/admin/products/new'); // Navigate to the add product form page
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 text-gray-800 min-h-screen rounded-lg border border-gray-200">
      {/* Page Title and Breadcrumb */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-sm text-gray-400">
          <a href="/admin/home" className="text-blue-400 hover:underline">Dashboard</a> &gt; 
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div
          className="bg-gray-300 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-purple-900 transition-colors flex items-center"
          onClick={handleAddProductClick}
        >
          <FaTag className="text-yellow-500 text-3xl mr-4" />
          <div>
            <h2 className="text-purple-600 text-lg font-bold mb-2">Create a</h2>
            <h3 className="text-2xl font-bold mb-6">New Product</h3>
            <p className="text-white">Add new products to your store</p>
          </div>
        </div>

        <div className="bg-gray-300 p-6 rounded-lg shadow-lg flex items-center">
          <FaThLarge className="text-green-500 text-3xl mr-4" />
          <div>
            <h2 className="text-purple-600 text-lg font-bold mb-2">Add product</h2>
            <h3 className="text-2xl font-bold mb-6">Collections</h3>
            <p className="text-white">Create a catalogue of products</p>
          </div>
        </div>

        <div className="bg-gray-300 p-6 rounded-lg shadow-lg flex items-center">
          <FaImage className="text-red-500 text-3xl mr-4" />
          <div>
            <h2 className="text-purple-600 text-lg font-bold mb-2">Add product</h2>
            <h3 className="text-2xl font-bold mb-6">Assets</h3>
            <p className="text-white">Access all your product images</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products"
          className="w-1/3 p-2 rounded-lg bg-gray-200 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Product Count */}
      <p className="mb-4">Total {filteredProducts.length} products</p>

      {/* Product Table */}
      <div className="bg-gray-200 p-6 rounded-lg ">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2"># Variants</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date Created</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  <div className="flex flex-col items-center">
                    <i className="fas fa-file-alt text-6xl text-gray-500 mb-4"></i>
                    <p className="text-gray-500">No Data found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.variants.length}</td>
                  <td className="py-2">{product.status}</td>
                  <td className="py-2">{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td className="py-2">Actions</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-400">Rows per page: <span className="font-bold">50</span> <i className="fas fa-chevron-down"></i></div>
        <div className="flex items-center">
          <button className="bg-gray-200 text-gray-400 px-4 py-2 rounded-l-lg">Previous</button>
          <button className="bg-purple-500 text-white px-4 py-2">1</button>
          <button className="bg-gray-200 text-gray-400 px-4 py-2 rounded-r-lg">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
