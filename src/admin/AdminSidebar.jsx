// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faShoppingCart, faUsers, faChartLine, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
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
            <Link to="/" className="flex items-center text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faHome} className="mr-2 text-xl" /> Home
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/products" className="flex items-center text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faBox} className="mr-2 text-xl" /> Products
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/orders" className="flex items-center text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-xl" /> Orders
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/customers" className="flex items-center text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faUsers} className="mr-2 text-xl" /> Customers
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/analytics" className="flex items-center text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faChartLine} className="mr-2 text-xl" /> Analytics
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/settings" className="flex items-center text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faCog} className="mr-2 text-xl" /> Store Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
