import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaAngleDoubleLeft } from 'react-icons/fa'; // Import icons
// #806cff
const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Use the navigate hook

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);  // Use the navigate function to go to the desired path
    setMobileMenuOpen(false); // Close mobile menu after navigating
  };

  // Function to handle the "Get Started" button click
  const handleGetStartedClick = () => {
    navigate('/signup');  // Navigate to the auth page
  };

  return (
    <header className="w-full  flex items-center justify-between px-8 py-4 bg-[#131312] shadow-sm  border-b border-gray-600 z-40  fixed top-0 bg-[#131312]/80 backdrop-blur-xl backdrop-filter dark:border-default-200/[0.2] transition-opacity rounded-small h-fit">
    {/* Mobile Menu Button */}
    <div className=" md:hidden  items-center">
      {!isMobileMenuOpen && (
        <button
          className="text-white text-2xl"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FaBars />
        </button>
      )}
    </div>
  
    {/* Logo */}
    <div className=" font-circular text-lg/[24px] text-white font-bold cursor-pointer hover:text-[#806cff]">
      <Link to='/' className="flex items-center space-x-1">
        Exact<span className='text-[#806cff] hover:text-[#fff]'>Connect.</span>
      </Link>
    </div>
  
    {/* Desktop Navigation */}
    <nav className="hidden md:flex space-x-8 text-[#919eab] font-sans font-[500] text-[12px] ">
      {[
        {to:'/proxy',label:'Residential Proxy'},
        {to:'/rdp',label:'VPS server'},
       {to:'/',label:"VCC card"},
       {to:'/',label:"Non-VOIP Numbers"},
       {to:'/',label:'Contact Us'},
      ].map(({to,label}, index) => (
        <span
          key={index}
          className="text-sm cursor-pointer hover:text-[#806cff] transition-colors"
          onClick={() => handleNavigation(to)}
        >
          {label}
        </span>
      ))}
    </nav>
  
    {/* Get Started Button */}
    <button
      className="hidden md:inline bg-white text-black border border-gray-500 px-4 py-2 text-sm font-medium rounded hover:bg-[#4a3da0] hover:text-white transition duration-200"
      onClick={handleGetStartedClick}
    >
      Get Started
    </button>
  
    {/* Mobile Side Drawer */}
    <div
      className={`fixed top-0 left-0 h-full w-2/3 bg-black z-20 shadow-lg transform ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="p-6 flex flex-col space-y-6">
        {/* Close Button */}
        <button
          className="text-white text-2xl self-end"
          onClick={() => setMobileMenuOpen(false)}
        >
          <FaAngleDoubleLeft />
        </button>
        <nav className="flex flex-col space-y-4">
          {[
            { label: "Residential Proxy", link: "/proxy" },
            { label: "VPS Server", link: "/rdp" },
            { label: "VCC Card", link: "/" },
            { label: "Non-VOIP Numbers", link: "/" },
            { label: "Contact Us", link: "/" },
          ].map((item, index) => (
            <span
              key={index}
              className="text-white text-lg cursor-pointer hover:text-gray-300 transition-colors"
              onClick={() => handleNavigation(item.link)}
            >
              {item.label}
            </span>
          ))}
          <button
            className="mt-4 bg-white text-black px-6 py-2 rounded border border-white hover:bg-[#806cff] hover:text-white transition duration-200"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
        </nav>
      </div>
    </div>
  
    {/* Overlay */}
    {isMobileMenuOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    )}
  </header>
  
  );
};

export default NavBar;
