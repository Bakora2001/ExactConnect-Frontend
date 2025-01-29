//This is will be the client's dashboard
import server from '/servertwo.svg'
import mobile from '/mobiletower.svg'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import SideBar from '../reusable/Sidebar';
import UserMenu from '../reusable/UserMenu';
import { DarkModeContext } from '../../../context/DarkModeContext'

import { SERVER_URL } from '../../../services/data';


const Dashboard = () => {

  const [proxy, setProxies] = useState([])

  //retreiving user details from the storage
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  console.log(userDetails);


  useEffect(() => {
    fetch(`${SERVER_URL}/products/proxies?page=${0}`, {
      method: 'GET'
    })
      .then((data) => data.json())
      .then((proxies) => setProxies(proxies.total))
  }, [])


  //State for handling switching the sidebar open and close
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkMode } = useContext(DarkModeContext);


  const toggleSidebar = () => {
    console.log('hey it is me again');
    // setIsSidebarOpen(false);
    setIsSidebarOpen((prev) => !prev);
    // console.log('Hello');
    // document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
  };


  return (
    <div className={`min-h-screen flex relative ${darkMode ? 'bg-[#030917]' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 ${darkMode ? 'bg-[#030917]' : 'bg-white'} transition-all duration-300 ease-in-out ${isSidebarOpen ? 'blur-sm pointer-events-none md:pointer-events-auto' : ''
          } md:ml-64`}
      >
        {/* Header Section */}
        <header
          className={`flex justify-between items-center py-4 px-6 border-b backdrop-blur-xl bg-opacity-90 shadow-sm sticky top-0 z-50 ${darkMode ? 'bg-[#131312] border-gray-700' : 'bg-[#7C25BA] border-[#7C25BA]'
            }`}
        >
          {/* Sidebar Toggle Button */}
          <button
            className={`md:hidden text-3xl z-50 ${darkMode ? 'text-white' : 'text-white'}`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="flex-1 flex justify-end">
            <UserMenu userDetails={userDetails} />
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 lg:p-8">
          {/* Proxy Card */}
          <div
            className={`rounded-lg p-6 shadow-md flex border flex-col items-center ${darkMode ? 'bg-[#1a1b1f] border-gray-700' : 'bg-white border-gray-200'
              }`}
          >
            <img src={server} alt="Total Proxies" className="w-20 h-20 mb-4" />
            <p className={`text-4xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>{proxy}</p>
            <h2 className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Proxies
            </h2>
            <Link
              to="/client/proxy"
              className={`mt-4 px-4 py-2 text-sm font-medium rounded-lg shadow-md ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition duration-200`}
            >
              Go to Proxies
            </Link>
          </div>
          {/* Servers Card */}
          <div
            className={`rounded-lg p-6 shadow-md flex flex-col items-center border ${darkMode ? 'bg-[#1a1b1f] border-gray-700' : 'bg-white border-gray-200'
              }`}
          >
            <img src={mobile} alt="Total Servers" className="w-20 h-20 mb-4" />
            <p className={`text-4xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>0</p>
            <h2 className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Servers
            </h2>
          </div>

          {/* Cards */}
          <div
            className={`rounded-lg p-6 shadow-md flex flex-col items-center border ${darkMode ? 'bg-[#1a1b1f] border-gray-700' : 'bg-gray-100 border-gray-300'
              }`}
          >
            <img src={server} alt="Cards" className="w-20 h-20 mb-4" />
            <p className={`text-4xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>0</p>
            <h2 className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Cards
            </h2>
          </div>
        </div>

        {/* Activity and Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 lg:p-8">
          {/* Recent Activity */}
          <div
            className={`rounded-lg p-6 shadow-md ${darkMode ? 'bg-[#1a1b1f] border-gray-700' : 'bg-white border-gray-200'
              }`}
          >
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Recent Activity
            </h2>
            <ul className="space-y-3">
              <li className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                - You bought an RDP.
              </li>
              <li className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                - Logged into your account.
              </li>
              <li className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                - Added a VCC card to the cart.
              </li>
            </ul>
          </div>

          {/* Announcements */}
          <div
            className={`rounded-lg p-6 shadow-md ${darkMode ? 'bg-[#1a1b1f] border-gray-700' : 'bg-white border-gray-200'
              }`}
          >
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Announcements
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              VCC cards are now ready to be used.
            </p>
          </div>
        </div>
      </main>
    </div>

  );
};

export default Dashboard;
