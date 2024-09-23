import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for hamburger and close buttons

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  return (
    <header className="w-full flex justify-between items-center p-4 px-6 fixed top-0 bg-purple-700 shadow-md z-10 border-b border-gray-400">
      {/* Mobile Navigation (visible only on mobile) */}
      <div className="md:hidden flex items-center">
        <button
          className="text-white text-[28px]"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          {/* Toggle between hamburger and close icon */}
        </button>
      </div>

      <div className="text-[22px] text-white font-bold">ExactConnect</div>

      {/* Desktop Navigation (hidden on mobile) */}
      <nav className="hidden md:flex text-white space-x-10">
        <span
          className="text-[15px] cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation('/')}
        >
          Residential Proxy
        </span>
        <span
          className="text-[15px] cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation('/rdp')}
        >
          VPS Server
        </span>
        <span
          className="text-[15px] cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation('/')}
        >
          VCC Card
        </span>
        <span
          className="text-[15px] cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation('/')}
        >
          Non-VOIP Numbers
        </span>
        <span
          className="text-[15px] cursor-pointer hover:text-gray-300"
          onClick={() => handleNavigation('/')}
        >
          Contact Us
        </span>
      </nav>

      <button className="hidden md:inline border border-gray-300 text-[15px] py-1 px-4 text-white rounded hover:bg-gray-200 hover:text-purple-700 transition-colors duration-200">
        Get Started
      </button>

      {/* Mobile Menu (visible only when toggled on mobile) */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-purple-700 shadow-lg z-20 md:hidden">
          <nav className="flex flex-col items-center p-4 space-y-4">
            <span
              className="text-[18px] cursor-pointer hover:text-gray-300"
              onClick={() => handleNavigation('/')}
            >
              Residential Proxy
            </span>
            <span
              className="text-[18px] cursor-pointer hover:text-gray-300"
              onClick={() => handleNavigation('/rdp')}
            >
              VPS Server
            </span>
            <span
              className="text-[18px] cursor-pointer hover:text-gray-300"
              onClick={() => handleNavigation('/')}
            >
              VCC Card
            </span>
            <span
              className="text-[18px] cursor-pointer hover:text-gray-300"
              onClick={() => handleNavigation('/')}
            >
              Non-VOIP Numbers
            </span>
            <span
              className="text-[18px] cursor-pointer hover:text-gray-300"
              onClick={() => handleNavigation('/')}
            >
              Contact Us
            </span>
            <button
              className="border border-gray-300 text-[18px] py-2 px-6 rounded hover:bg-gray-200 hover:text-purple-700 transition-colors duration-200"
              onClick={() => handleNavigation('/')}
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
