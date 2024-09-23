import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaAngleDoubleLeft } from 'react-icons/fa'; // Import icons

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  return (
    <header className="w-full flex justify-between items-center p-4 px-6 fixed top-0 bg-purple-700 shadow-md z-10 border-b border-gray-400">
      {/* Hamburger Icon (visible only on mobile) */}
      <div className="md:hidden flex items-center">
        {!isMobileMenuOpen && (
          <button
            className="text-white text-[28px]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars />
          </button>
        )}
      </div>

      {/* Exact Connect logo */}
<div className="text-[22px] text-white font-bold">
  <button className="text-white text-[22px] font-bold" onClick={() => navigate('/')}>
    ExactConnect
  </button>
</div>

      {/* Desktop Navigation */}
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

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-auto bg-purple-700 w-1/2 z-20 shadow-lg transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        style={{ maxHeight: '80vh' }} // Limit height of the side drawer
      >
        <div className="p-6 flex flex-col space-y-4">
          {/* Close Button (Double Arrow) */}
          <button
            className="text-white text-[24px] self-end"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaAngleDoubleLeft />
          </button>
          <nav className="flex flex-col space-y-6">
            <span
              className="text-[18px] text-white cursor-pointer hover:text-gray-300"
              onClick={() => handleNavigation('/')}
            >
              Residential Proxy
            </span>
            <span
              className="text-[18px] text-white cursor-pointer hover:text-gray-300"
              onClick={() => handleNavigation('/rdp')}
            >
              VPS Server
            </span>
            <span
              className="text-[18px] text-white cursor-pointer hover:text-gray-300"
              onClick={() => handleNavigation('/')}
            >
              VCC Card
            </span>
            <span
              className="text-[18px] text-white cursor-pointer hover:text-gray-300"
              onClick={() => handleNavigation('/')}
            >
              Non-VOIP Numbers
            </span>
            <span
              className="text-[18px] text-white cursor-pointer hover:text-gray-300"
              onClick={() => handleNavigation('/')}
            >
              Contact Us
            </span>
            <button
              className="border border-gray-300 text-[18px] text-white py-2 px-6 rounded hover:bg-gray-200 hover:text-purple-700 transition-colors duration-200"
              onClick={() => handleNavigation('/')}
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay (optional, closes menu when clicked) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default NavBar;
