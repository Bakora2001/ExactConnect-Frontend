import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { DarkModeContext } from '../../context/DarkModeContext';
const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };
  const { darkMode } = useContext(DarkModeContext);

  // Get Started button handler
  const handleGetStartedClick = () => {
    navigate('/account/signup');
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-md border-b border-gray-500  ${
        darkMode ? 'bg-[#131312]/50 text-white' : 'bg-[#7C25BA] text-white'
      } mx-auto items-center ipad-header`}
    >
      <div className=" w-full mx-auto flex items-center justify-between px-3 py-2 md:px-8 lg:px-20 xl:px-32 2xl:px-72 max-w-screen ">
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <div className="flex items-center space-x-2 ">
            <img
              src="/assets/world_7139124.png"
              alt="Logo"
              className="w-9 h-9 md:w-8 md:h-8 lg:w-8 lg:h-8 object-contain filter invert -rotate-15"
            />
          </div>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-white text-xs font-medium">
          {[
            { to: '/residential', label: 'Residential Proxy' },
            { to: '/rdp', label: 'VPS Server' },
            { to: '/psd-template', label: 'PSD Template' },
            { to: '/coming-soon', label: 'Non-VOIP Numbers' },
            { to: '/coming-soon', label: 'VCC Card' },
            { to: '/contact', label: 'Contact Us' },
          ].map(({ to, label }, index) => (
            <span
              key={index}
              className="cursor-pointer hover:text-gray-300 transition"
              onClick={() => handleNavigation(to)}
            >
              {label}
            </span>
          ))}
        </nav>
        {/* Get Started Button */}
        <button
          className="hidden md:block bg-[#6a1fa0] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#7C25BA] transition duration-200  "
          onClick={handleGetStartedClick}
        >
          Get Started
        </button>

        {/* Mobile Menu Button */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed bottom-0 left-0 top-0 h-screen w-2/3  ${
          darkMode ? 'bg-[#131312] text-white' : 'bg-[#7C25BA] text-white  '
        } z-20 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full '
        } transition-transform duration-300 shadow-lg border border-gray-600 rounded-[16px]  `}
      >
        <div className="p-6 flex flex-col space-y-6">
          {/* Close Button */}
          <button
            className="text-2xl self-end"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaTimes />
          </button>

          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-4">
            {[
              { label: 'Residential Proxy', link: '/residential' },
              { label: 'VPS Server', link: '/rdp' },
              { label: 'VCC Card', link: '/coming-soon' },
              { label: 'Non-VOIP Numbers', link: '/coming-soon' },
              { label: 'Contact Us', link: '/contact' },
            ].map((item, index) => (
              <span
                key={index}
                className="text-lg cursor-pointer hover:text-[#6a1fa0] transition"
                onClick={() => handleNavigation(item.link)}
              >
                {item.label}
              </span>
            ))}
          </nav>

          {/* Get Started Button */}
          <button
            className="mt-6 bg-[#7e22ce] text-white  py-2 rounded-lg shadow-lg hover:bg-[#6a1fa0] transition duration-200 border border-white"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 "
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default NavBar;
