//This is will be the client's dashboard
import server from '/servertwo.svg'
import mobile from '/mobiletower.svg'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FiChevronRight } from 'react-icons/fi';

import { FaBars, FaTimes } from 'react-icons/fa';
import SideBar from '../reusable/Sidebar';
import UserMenu from '../reusable/UserMenu';
import { DarkModeContext } from '../../../context/DarkModeContext'

import { SERVER_URL } from '../../../services/data';
import { IoIosCellular } from 'react-icons/io';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '../../pages/ErrorPage';


const Dashboard = () => {

  const [proxy, setProxies] = useState([])
  const navigate = useNavigate()
  //retreiving user details from the storage
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  // console.log(userDetails);

  // Checking if the user even has the logged in
  useEffect(() => {
    if (!userDetails) {
      navigate("account/login");
    }
  }, [navigate]);

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
    // console.log('hey it is me again');
    // setIsSidebarOpen(false);
    setIsSidebarOpen((prev) => !prev);
    // console.log('Hello');
    // document.body.style.overflow = isSidebarOpen ? 'auto' : 'hidden';
  };


  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onReset={() => location.href = '/'}>
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
            className={`flex justify-between items-center py-4 px-6 border-b backdrop-blur-xl bg-opacity-90 shadow-sm sticky top-0 z-50 ${darkMode ? 'bg-[#131312]/50 border-gray-700' : 'bg-[#7C25BA] border-[#7C25BA]'
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
            <div
              className={`relative rounded-xl p-6 shadow-xl border overflow-hidden transition-transform transform hover:scale-[1.02] ${darkMode
                ? "bg-[#1a1b1f] border-gray-700 shadow-purple-500/50"
                : "bg-white border-gray-200 shadow-lg"
                }`}
            >
              {/* Neon Glow Effect */}
              <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-300 hover:border-purple-500" />

              {/* Order ID and Status */}
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-medium flex items-center gap-1 ${darkMode ? "text-purple-400" : "text-purple-600"
                    }`}
                >
                  <BsFillLightningChargeFill className="animate-pulse h-5" />

                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full shadow-md ${darkMode
                    ? "bg-green-900 text-green-300"
                    : "bg-green-100 text-green-700"
                    }`}
                >
                  <IoIosCellular className="w-4 h-4 animate-spin-slow" />
                  Active
                </span>
              </div>

              {/* Divider with Glowing Effect */}
              <hr
                className={`my-4 transition-all duration-300 ${darkMode
                  ? "border-gray-700 hover:border-purple-400"
                  : "border-gray-200 hover:border-purple-600"
                  }`}
              />

              {/* Total Proxies and CTA */}
              <div className="flex justify-between items-center">
                <div>
                  <p
                    className={`text-sm transition-all duration-300 ${darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Total Proxies
                  </p>
                  <p
                    className={`text-3xl font-bold transition-all duration-300 ${darkMode
                      ? "text-white drop-shadow-[0_0px_10px_rgba(255,255,255,0.5)]"
                      : "text-gray-800"
                      }`}
                  >
                    {proxy}
                  </p>
                </div>
                <Link to="/client/proxy">
                  <button
                    className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${darkMode
                      ? "text-purple-400 bg-purple-900 hover:bg-purple-700 shadow-md shadow-purple-500/40"
                      : "text-purple-600 bg-purple-100 hover:bg-purple-200 shadow-lg"
                      }`}
                  >
                    <FiChevronRight className="w-6 h-6 animate-bounce" />
                  </button>
                </Link>
              </div>
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
    </ErrorBoundary>
  );
};

export default Dashboard;
