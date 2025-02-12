//This is will be the client's dashboard
import server from '/servertwo.svg';
import mobile from '/mobiletower.svg';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { Moon, CloudSun } from 'lucide-react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { WiSunrise } from 'react-icons/wi';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { FiChevronRight } from 'react-icons/fi';

import { FaBars, FaTimes } from 'react-icons/fa';
import SideBar from '../reusable/Sidebar';
import UserMenu from '../reusable/UserMenu';
import { DarkModeContext } from '../../../context/DarkModeContext';

import { SERVER_URL } from '../../../services/data';
import { IoIosCellular } from 'react-icons/io';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '../../pages/ErrorPage';

const Dashboard = () => {
  const navigate = useNavigate();
  const capitalizeFirstLetter = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [proxies, setProxies] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [greeting, setGreeting] = useState({ text: '', icon: null });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  // Fetch user details and redirect if not logged in
  useEffect(() => {
    if (!userDetails) {
      navigate('/account/login');
    }
  }, [navigate, userDetails]);

  // Fetch proxies data
  useEffect(() => {
    fetch(`${SERVER_URL}/products/proxies?page=${0}`, {
      method: 'GET',
    })
      .then((data) => data.json())
      .then((proxies) => setProxies(proxies.total));
  }, []);

  // Format date and time
  const formatDateTime = () => {
    const currentDateTime = new Date();
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = days[currentDateTime.getDay()];
    const month = months[currentDateTime.getMonth()];
    const date = currentDateTime.getDate();
    const hours = currentDateTime.getHours().toString().padStart(2, '0');
    const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentDateTime.getSeconds().toString().padStart(2, '0');
    return `${day}, ${month} ${date} ${hours}:${minutes}:${seconds}`;
  };

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(formatDateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get greeting based on time of day
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return {
        text: 'Good Morning',
        icon: <CloudSun className="inline-block w-6 h-6 text-yellow-500" />,
      };
    } else if (currentHour >= 12 && currentHour < 17) {
      return {
        text: 'Good Afternoon',
        icon: <FaSun className="inline-block w-8 h-8 text-orange-500" />,
      };
    } else {
      return {
        text: 'Good Evening',
        icon: <Moon className="inline-block w-6 h-6 text-yellow-500" />,
      };
    }
  };

  // Update greeting every minute
  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => (location.href = '/')}
    >
      <div
        className={`min-h-screen flex relative ${
          darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'
        }`}
      >
        {/* Sidebar */}
        <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        {/* Overlay for Small Screens */}
        {isSidebarOpen && (
          <div className="fixed inset-0  z-10" onClick={toggleSidebar}></div>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 ${
            darkMode ? 'bg-[#1a1a1a]' : 'bg-white'
          } transition-all duration-300 ease-in-out  ${
            isSidebarOpen
              ? 'blur-sm pointer-events-none md:pointer-events-auto'
              : ''
          } md:ml-64`}
        >
          {/* Header Section */}
          <header
            className={`flex justify-between items-center py-4 px-6  backdrop-blur-xl bg-opacity-90 shadow-sm sticky top-0 z-50 ${
              darkMode
                ? 'bg-[#131312]/50 border-gray-700'
                : 'bg-[#7C25BA] border-[#7C25BA]'
            }`}
          >
            {/* Sidebar Toggle Button */}
            <button
              className={`md:hidden text-3xl z-50 ${
                darkMode ? 'text-white' : 'text-white'
              }`}
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className="flex-1 flex justify-end">
              <UserMenu userDetails={userDetails} />
            </div>
          </header>
          <div className="p-6">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-2xl font-bold">
                {greeting.text}, {capitalizeFirstLetter(userDetails?.firstName)}
                !
              </h1>
            </div>
            <p className="text-lg text-gray-500">
              {greeting.icon} {currentDateTime}
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 lg:p-8">
            <div
              className={`relative rounded-xl p-6 shadow-xl border overflow-hidden transition-transform transform hover:scale-[1.02] ${
                darkMode
                  ? 'bg-[#181918] border-gray-700 shadow-purple-500/50'
                  : 'bg-white border-gray-200 shadow-lg'
              }`}
            >
              {/* Neon Glow Effect */}
              <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-300 hover:border-purple-500" />

              {/* Order ID and Status */}
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm font-medium flex items-center gap-1 ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}
                >
                  <BsFillLightningChargeFill className="animate-pulse h-5" />
                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full shadow-md ${
                    darkMode
                      ? 'bg-green-900 text-green-300'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  <IoIosCellular className="w-4 h-4 animate-spin-slow" />
                  Active
                </span>
              </div>

              {/* Divider with Glowing Effect */}
              <hr
                className={`my-4 transition-all duration-300 ${
                  darkMode
                    ? 'border-gray-700 hover:border-purple-400'
                    : 'border-gray-200 hover:border-purple-600'
                }`}
              />

              {/* Total Proxies and CTA */}
              <div className="flex justify-between items-center">
                <div>
                  <p
                    className={`text-sm transition-all duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Total Proxies
                  </p>
                  <p
                    className={`text-3xl font-bold transition-all duration-300 ${
                      darkMode
                        ? 'text-white drop-shadow-[0_0px_10px_rgba(255,255,255,0.5)]'
                        : 'text-gray-800'
                    }`}
                  >
                    {proxies}
                  </p>
                </div>
                <Link to="/client/proxy">
                  <button
                    className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                      darkMode
                        ? 'text-purple-400 bg-purple-900 hover:bg-purple-700 shadow-md shadow-purple-500/40'
                        : 'text-purple-600 bg-purple-100 hover:bg-purple-200 shadow-lg'
                    }`}
                  >
                    <FiChevronRight className="w-6 h-6 animate-bounce" />
                  </button>
                </Link>
              </div>
            </div>
            {/* Servers Card */}
            <div className="rounded-lg p-6 shadow-md flex flex-col items-center border dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              {/* Icon with a subtle glow effect */}
              <div className="relative">
                <img
                  src={mobile}
                  alt="Total Servers"
                  className="w-20 h-20 mb-4 filter drop-shadow-lg"
                />
                {/* Optional: Add a glowing effect */}
                <div
                  className="absolute inset-0 bg-purple-500 rounded-full opacity-10 blur-md"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '110%',
                    height: '110%',
                  }}
                ></div>
              </div>

              {/* Number with a gradient text effect */}
              <p
                className={`text-4xl font-semibold bg-gradient-to-r ${
                  darkMode
                    ? 'from-blue-400 to-purple-400'
                    : 'from-blue-600 to-purple-600'
                } bg-clip-text text-transparent`}
              >
                0
              </p>

              {/* Title with a subtle underline animation */}
              <h2
                className={`text-lg font-medium relative inline-block ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Servers
                {/* Optional: Add an animated underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>

            {/* Cards */}
            <div
              className={`rounded-lg p-6 shadow-md flex flex-col items-center border ${
                darkMode
                  ? 'bg-[#1a1b1f] border-gray-700'
                  : 'bg-gray-100 border-gray-300'
              }`}
            >
              <img src={server} alt="Cards" className="w-20 h-20 mb-4" />
              <p
                className={`text-4xl font-semibold ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              >
                0
              </p>
              <h2
                className={`text-lg font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Cards
              </h2>
            </div>
          </div>

          {/* Activity and Announcements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 lg:p-8">
            {/* Recent Activity */}
            <div
              className={`rounded-lg p-6 shadow-md ${
                darkMode
                  ? 'bg-[#1a1b1f] border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h2
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                Recent Activity
              </h2>
              <ul className="space-y-3">
                <li
                  className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  - You bought an RDP.
                </li>
                <li
                  className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  - Logged into your account.
                </li>
                <li
                  className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  - Added a VCC card to the cart.
                </li>
              </ul>
            </div>

            {/* Announcements */}
            <div
              className={`rounded-lg p-6 shadow-md ${
                darkMode
                  ? 'bg-[#1a1b1f] border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h2
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
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
