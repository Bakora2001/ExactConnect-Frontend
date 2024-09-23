import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faShoppingCart, faUsers, faChartLine, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  // Click handlers for navigation
  const handleHomeClick = () => navigate('/admin/home');
  const handleProductsClick = () => navigate('/admin/products');
  const handleOrdersClick = () => navigate('/admin/orders');
  const handleUsersClick = () => navigate('/admin/customers');
  const handleAnalyticsClick = () => navigate('/admin/analytics');
  const handleSettingsClick = () => navigate('/admin/settings');

  return (
    <aside className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-purple-700 h-full p-4 z-50 rounded-r-lg`}>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-lg font-bold text-white">
          Demo Store <span className="text-green-300">Owner</span>
        </h1>
        <button 
          onClick={() => setSidebarOpen(false)} 
          className="text-gray-200 md:hidden"
        >
          <FontAwesomeIcon icon={faTimes} className="text-2xl" />
        </button>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <button 
              onClick={handleHomeClick} 
              className="flex items-center text-white hover:text-gray-300 w-full text-left"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2 text-xl" /> Home
            </button>
          </li>
          <li className="mb-4">
            <button 
              onClick={handleProductsClick} 
              className="flex items-center text-white hover:text-gray-300 w-full text-left"
            >
              <FontAwesomeIcon icon={faBox} className="mr-2 text-xl" /> Products
            </button>
          </li>
          <li className="mb-4">
            <button 
              onClick={handleOrdersClick} 
              className="flex items-center text-white hover:text-gray-300 w-full text-left"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-xl" /> Orders
            </button>
          </li>
          <li className="mb-4">
            <button 
              onClick={handleUsersClick} 
              className="flex items-center text-white hover:text-gray-300 w-full text-left"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2 text-xl" /> Customers
            </button>
          </li>
          <li className="mb-4">
            <button 
              onClick={handleAnalyticsClick} 
              className="flex items-center text-white hover:text-gray-300 w-full text-left"
            >
              <FontAwesomeIcon icon={faChartLine} className="mr-2 text-xl" /> Analytics
            </button>
          </li>
          <li className="mb-4">
            <button 
              onClick={handleSettingsClick} 
              className="flex items-center text-white hover:text-gray-300 w-full text-left"
            >
              <FontAwesomeIcon icon={faCog} className="mr-2 text-xl" /> Store Settings
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
