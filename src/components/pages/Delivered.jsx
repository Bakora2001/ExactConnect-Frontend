import React, { useContext } from 'react';

import { DarkModeContext } from '../../context/DarkModeContext';
import { Link } from 'react-router-dom';

function Delivered() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4  py-10 min-h-screen ${darkMode ? 'bg-[#131312]' : 'bg-gray-50'
        } `}
    >
      {/* Icon Container */}
      <div className="relative w-28 h-28 bg-[#7C25BA] rounded-[20%] rotate-0 flex items-center justify-center shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`absolute inset-0 w-full h-full text-white  p-5`}
        >
          <polyline
            points="20 6 9 17 4 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide  ${darkMode ? 'text-white' : 'text-gray-900'
            }`}
        >
          DELIVERED
        </h1>
        <p
          className={`text-sm sm:text-base lg:text-lg font-sans tracking-wider  max-w-md ${darkMode ? 'text-white' : 'text-gray-500'
            }`}
        >
          A member of our team will reach out shortly
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-row sm:flex-row gap-4 mt-6">
        <Link
          to="/contact"
          className={`px-6 py-3 text-sm sm:text-base font-medium text-gray-100 hover:bg-gray-800 rounded-lg shadow-md transition ${darkMode ? 'bg-[#131312] border border-gray-700' : 'bg-gray-700 '
            }`}
        >
          Back
        </Link>
        <Link
          to="/"
          className={`px-6 py-3 text-sm sm:text-base font-medium bg-[#7C25BA] hover:bg-[#7C40BB] rounded-lg shadow-md transition ${darkMode ? 'text-white' : 'text-white'
            }`}
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default Delivered;
