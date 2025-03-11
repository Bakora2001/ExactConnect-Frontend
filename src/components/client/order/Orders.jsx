import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSearch,
  FiChevronRight,
  FiDollarSign,
  FiCalendar,
} from 'react-icons/fi';
import { DatabaseZap, AlignJustify, X } from 'lucide-react';
import { customerId } from '../../../lib/userDetails';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoIosStarOutline, IoIosCellular } from 'react-icons/io';
import { userDetails } from '../../../lib/userDetails';

import SideBar from '../reusable/Sidebar';
import UserMenu from '../reusable/UserMenu';
import { DarkModeContext } from '../../../context/DarkModeContext';
import React from 'react';
import { SERVER_URL } from '../../../services/data';

const OrdersPage = () => {
  const [orderList, setOrders] = useState([]);
  const navigate = useNavigate();

  // const customerId = userDetails.customerReference;
  // const customerId = 'f455b47e-85b2-45db-b8d5-11b6298b4caa';
  //Checking if the user even has the logged in
  useEffect(() => {
    if (!userDetails) {
      navigate('account/login');
    }
  }, [navigate]);

  const { darkMode } = useContext(DarkModeContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //proxid  rating countrycode
  const fetchOrders = async ({ customerIds = customerId }) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/orders/search?customerId=${customerIds}`
      );
      const data = await response.json();
      setOrders(data.content);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrders(customerId);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Sample orders data
  const orders = [
    {
      id: '#1234',
      customer: 'Sarah Johnson',
      date: '2024-03-15',
      total: 4.99,
      status: 'Completed',
      rating: 3,
      isp: 'Safaricom',
      countyCode: 'KE',
    },
    {
      id: '#1235',
      customer: 'Mike Chen',
      date: '2024-03-14',
      total: 2.99,
      status: 'Processing',
      rating: 2,
      isp: 'Vijiji',
      countyCode: 'KE',
    },
    {
      id: '#1236',
      customer: 'Emma Wilson',
      date: '2024-03-13',
      total: 1.99,
      status: 'Shipped',
      rating: 5,
      isp: 'Faiba',
      countyCode: 'KE',
    },
    {
      id: '#1237',
      customer: 'James Brown',
      date: '2024-03-12',
      total: 1,
      status: 'Pending',
      rating: 4,
      isp: 'Wananchi',
      countyCode: 'KE',
    },
  ];

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allOrders = orderList.map((orders) => {
    // console.log(orders);
  });
  // console.log(allOrders);
  const statusStyles = {
    COMPLETED: 'bg-green-100 text-green-800',
    DECLINED: 'bg-purple-100 text-purple-800',
    FAILED: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${
        darkMode ? 'bg-[#0c0b08] text-white' : 'bg-gray-50'
      }`}
    >
      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0  z-10" onClick={toggleSidebar}></div>
      )}

      <main
        className={`flex-1 ${
          darkMode ? 'bg-[#0c0b08]' : 'bg-white'
        } transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? 'blur-sm pointer-events-none md:pointer-events-auto'
            : ''
        } md:ml-64`}
      >
        {/* Header */}
        <header
          className={`flex items-center justify-between px-6 py-4 border-b sticky top-0 z-50 backdrop-blur-xl bg-opacity-90 shadow-sm 
          ${
            darkMode
              ? 'bg-[#0c0b08] border-gray-700'
              : 'bg-[#7C25BA] border-[#7C25BA]'
          }`}
        >
          <button
            className={`md:hidden text-3xl z-50 ${
              darkMode ? 'text-white' : 'text-white'
            }`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X /> : <AlignJustify />}
          </button>

          <div className="flex-1 flex justify-end">
            <UserMenu userDetails={userDetails} />
          </div>
        </header>
        <div className="w-full flex justify-center mb-6 p-6">
          <div className="relative w-full max-w-md mr-auto mt-4 ">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search orders..."
              className={`w-full pl-10 px-4 py-2 h-12 rounded-md shadow-md focus:outline-none focus:ring-2  border border-gray-300 focus:ring-purple-500 transition-all ${
                darkMode
                  ? 'bg-[#131312]  border-gray-600 text-white'
                  : 'bg-white text-black'
              } border`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 md:p-6 flex-1">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-2  ${
              darkMode ? 'text-gray-100' : 'text-black'
            }`}
          >
            Order Management
          </h1>
          <p
            className={`text-sm mb-6  ${
              darkMode ? 'text-gray-600' : 'text-white'
            }`}
          >
            {allOrders.length} orders found
          </p>

          {/* Orders Grid */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {orderList.map((order) => (
              <div
                key={order.id}
                className={`p-4 rounded-xl shadow-sm transition-all hover:shadow-md  hover:bg-[#1e1e1e]  ${
                  darkMode ? 'bg-[#0c0b08] border-gray-700' : 'bg-white'
                } border`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-sm text-purple-600">
                    #{order.orderId.slice(0, 7)}..
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <IoIosStarOutline className="text-gray-600" />
                    <span className="text-sm text-white">{order.rating} </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-gray-600" />
                    <span className="text-sm text-white">
                      {order.totalAmount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoIosCellular className="text-gray-600" />
                    <span className="text-sm text-white">
                      {order.orderData.ISP}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-600" />
                    <span className="text-sm text-gray-white">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="text-sm text-white">{order.customer}</span>
                  <button className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-100">
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 ||
            (allOrders.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-block p-4   rounded-full mb-4 ">
                  <DatabaseZap className="w-12 h-12 text-purple-600 dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-400">
                  No orders found
                </h3>
              </div>
            ))}
        </main>
      </main>
    </div>
  );
};

export default OrdersPage;
