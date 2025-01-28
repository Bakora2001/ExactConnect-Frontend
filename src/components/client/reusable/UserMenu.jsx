//User menu
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../icons/User";
import { LogOut } from 'lucide-react'
import { Link } from "react-router-dom";

import Light from "../../icons/Light";
import Moon from "../../icons/Moon";
import Settings from "../../icons/Settings";

import { DarkModeContext } from "../../../context/DarkModeContext";


const UserMenu = ({ userDetails }) => {
  //To toggle between light and darkmode
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);




  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem('token');


    navigate('/');
  };

  return (
    <div className="relative">

      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-white bg-gray-800"
      >
        {userDetails?.firstName && userDetails?.lastName ? (
          <div className="flex items-center justify-center w-5 h-5  text-white rounded-full font-bold">
            {`${userDetails.firstName[0]}${userDetails.lastName[0]}`.toUpperCase()}
          </div>
        ) : (
          <User className="w-5 h-5 aspect-square rounded-full text-gray-300" />
        )}
      </button>


      {/* Dropdown modal */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-56  ${darkMode ? 'bg-[#131312] border-zinc-800' : 'bg-white'}  border  rounded-lg shadow-lg z-50`}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-300 dark:border-gray-600">
            <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
              {userDetails.email}
            </p>
          </div>

          {/* Options */}
          <ul className="py-2">

            <li
              onClick={toggleDarkMode}
              className={`flex items-center  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md gap-2`}
            >
              <span className={`border  rounded-md p-1 ${darkMode ? 'border-gray-700' : 'border-gray-100'} `}>
                {darkMode ? (
                  <Light className="text-yellow-400 w-5 h-5 border-gray-100" />
                ) : (
                  <Moon className="text-gray-600 w-5 h-5  " />
                )}
              </span>
              <span
                className={`text-sm   ${darkMode ? "text-white" : "text-gray-800 dark:text-gray-300"}`}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>

            </li>

            {/* Account Settings */}
            <li
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md gap-2"
            >
              <Settings />
              <Link to='/account/settings'>
                <span className="text-sm text-gray-800 dark:text-gray-300">
                  Account Settings
                </span>
              </Link>

            </li>


            <li
              className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 text-red-500 dark:text-red-600" />
              <span className="text-sm text-red-600 dark:text-red-400">Sign Out</span>
            </li>
          </ul>
        </div>

      )}
    </div>
  );
};

export default UserMenu;