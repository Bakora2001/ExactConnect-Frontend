import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaUsers, FaShoppingCart, FaChartLine, FaCheckCircle, FaClock, FaTruck, FaTimesCircle } from 'react-icons/fa';
import SalesGraph from './SalesGraph'; 
import TopProducts from './TopProducts'; 

const AdminHome = () => {
  const navigate = useNavigate();

  const totalSales = "KSh 1,234,567";
  const totalUsers = 123;
  const totalOrders = 456;
  const totalProducts = 789;

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const greeting = `${getGreeting()} Samuel Githaiga`;

  const handleOrdersClick = () => navigate('/admin/orders');
  const handleUsersClick = () => navigate('/admin/users');
  const handleSalesClick = () => navigate('/admin/analytics');
  const handleProductsClick = () => navigate('/admin/products');

  // OrderSummary component
  const OrderSummary = () => {
    const items = [
      { icon: <FaBox className="text-3xl" />, label: "All", orders: 120, amount: 50000, color: "text-blue-500" },
      { icon: <FaCheckCircle className="text-3xl" />, label: "Completed", orders: 90, amount: 30000, color: "text-green-500" },
      { icon: <FaClock className="text-3xl" />, label: "Pending", orders: 20, amount: 15000, color: "text-yellow-500" },
      { icon: <FaTruck className="text-3xl" />, label: "In Progress", orders: 10, amount: 20000, color: "text-purple-500" },
      { icon: <FaTimesCircle className="text-3xl" />, label: "Cancelled", orders: 5, amount: 5000, color: "text-red-500" },
    ];

    return (
      <div className="w-full mt-8">
        <div className="bg-gray-800 rounded-lg p-4 flex flex-wrap space-y-6 sm:space-y-0 sm:flex-nowrap sm:space-x-6">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-white flex-grow sm:w-1/5">
              <div className={`mb-1 ${item.color}`}>
                {item.icon}
              </div>
              <div className="text-md font-semibold">{item.label}</div>
              <div className="text-xs">{item.orders} orders</div>
              <div className="text-xs">KSh {item.amount.toLocaleString()}</div>
              {index < items.length - 1 && (
                <div className="border-r border-gray-700 h-19 mx-4 hidden sm:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Empty OrderTable component
  const OrderTable = () => {
    return (
      <div className="mt-8">
        <table className="w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {/* No data rows for now */}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="mb-8 text-2xl font-bold text-gray-800">{greeting}</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className="bg-purple-500 shadow-lg rounded-lg p-6 border border-gray-200 cursor-pointer hover:bg-purple-600 transition-colors flex items-center"
          onClick={handleSalesClick}
        >
          <FaChartLine className="text-3xl text-white mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-white">{totalSales}</p>
          </div>
        </div>

        <div
          className="bg-purple-500 shadow-lg rounded-lg p-6 border border-gray-200 cursor-pointer hover:bg-purple-600 transition-colors flex items-center"
          onClick={handleUsersClick}
        >
          <FaUsers className="text-3xl text-white mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-white">{totalUsers}</p>
          </div>
        </div>

        <div
          className="bg-purple-500 shadow-lg rounded-lg p-6 border border-gray-200 cursor-pointer hover:bg-purple-600 transition-colors flex items-center"
          onClick={handleOrdersClick}
        >
          <FaShoppingCart className="text-3xl text-white mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-white">{totalOrders}</p>
          </div>
        </div>

        <div
          className="bg-purple-500 shadow-lg rounded-lg p-6 border border-gray-200 cursor-pointer hover:bg-purple-600 transition-colors flex items-center"
          onClick={handleProductsClick}
        >
          <FaBox className="text-3xl text-white mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-white">{totalProducts}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-dotted border-purple-500 my-6"></div> {/* Dotted line */}

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="col-span-3">
          <SalesGraph />
        </div>
        <div className="col-span-1">
          <TopProducts />
        </div>
      </div>

      <div className="border-t border-dotted border-purple-500 my-6"></div> {/* Dotted line */}

      <OrderSummary /> {/* OrderSummary is now part of AdminHome */}
      
      <div className="border-t border-dotted border-purple-500 my-6"></div> {/* Dotted line */}

      <OrderTable /> {/* Empty OrderTable added at the bottom */}
      
      <div className="border-t border-dotted border-purple-500 my-6"></div> {/* Dotted line */}
    </div>
  );
};

export default AdminHome;
