import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  return (
    <header className="w-full flex justify-between items-center p-4 px-6 fixed top-0 bg-purple-700 shadow-md z-10 border-b border-gray-400">
      <div className="text-[28px] font-bold">ExactConnect</div>
      <nav className="hidden md:flex space-x-10">
        <span className="text-[20px] cursor-pointer hover:text-gray-300" onClick={() => handleNavigation('/')}>Residential Proxy</span>
        <span className="text-[20px] cursor-pointer hover:text-gray-300" onClick={() => handleNavigation('/rdp')}>VPS Server</span>
        <span className="text-[20px] cursor-pointer hover:text-gray-300" onClick={() => handleNavigation('/')}>VCC Card</span>
        <span className="text-[20px] cursor-pointer hover:text-gray-300" onClick={() => handleNavigation('/')}>Non-VOIP Numbers</span>
        <span className="text-[20px] cursor-pointer hover:text-gray-300" onClick={() => handleNavigation('/')}>Contact Us</span>
      </nav>
      <button className="border border-gray-300 text-[18px] py-1 px-4 rounded hover:bg-gray-200 hover:text-purple-700 transition-colors duration-200">
        Get Started
      </button>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center">
        <button className="text-white text-[28px]" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-0 w-full bg-purple-700 shadow-lg z-20 md:hidden">
          <nav className="flex flex-col items-center p-4 space-y-2">
            <span className="text-[20px] cursor-pointer hover:text-gray-300" onClick={() => handleNavigation('/')}>Residential Proxy</span>
            <span className="text-[20px] cursor-pointer hover:text-gray-300" onClick={() => handleNavigation('/rdp')}>VPS Server</span>
            <span className="text-[20px] cursor-pointer hover:text-gray-300" onClick={() => handleNavigation('/')}>VCC Card</span>
            <span className="text-[20px] cursor-pointer hover:text-gray-300" onClick={() => handleNavigation('/')}>Non-VOIP Numbers</span>
            <span className="text-[20px] cursor-pointer hover:text-gray-300" onClick={() => handleNavigation('/')}>Contact Us</span>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
