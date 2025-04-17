import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDashboard } from './DashboardContext';
import { 
  Laptop, 
  Server, 
  FileImage, 
  Phone, 
  CreditCard, 
  ShoppingCart, 
  Home, 
  User, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useDashboard();
  
  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Proxies', path: '/dashboard/proxies', icon: Laptop },
    { name: 'RDP Server', path: '/dashboard/vps', icon: Server },
    { name: 'PSD Templates', path: '/dashboard/templates', icon: FileImage },
    { name: 'Non-VOIP Numbers', path: '/dashboard/nonvoip', icon: Phone },
    { name: 'VCC Card', path: '/dashboard/vcc', icon: CreditCard },
    { name: 'Orders', path: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    // Redirect will happen in the effect hook in Dashboard context
  };

  // Mobile menu with overlay
  const MobileMenu = () => (
    <>
      {/* Dark overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      ></div>
      
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 bg-white shadow-xl z-50 w-64 transition-transform duration-300 transform md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between h-16 border-b border-gray-200 bg-gradient-to-r from-[#874fc2] to-[#9a6dd2] px-4">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#874fc2] text-xl font-bold shadow-md mr-3">
              E
            </div>
            <span className="text-lg font-semibold text-white">ExactConnect</span>
          </div>
          <button onClick={toggleMobileMenu} className="text-white p-2 focus:outline-none">
            <X size={24} />
          </button>
        </div>
        
        {/* Mobile navigation */}
        <nav className="mt-4 px-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center py-3 px-3 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-[#f3eefb] text-[#874fc2] font-medium'
                      : 'text-gray-600 hover:bg-[#f8f5fd] hover:text-[#874fc2]'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3 transition-transform hover:scale-110" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>
        
        {/* Mobile logout button */}
        <div className="absolute bottom-6 px-2 w-full">
          <button
            onClick={handleLogout}
            className="flex items-center py-3 px-3 rounded-md transition-colors w-full text-gray-600 hover:bg-[#f8f5fd] hover:text-[#874fc2]"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger menu button for mobile */}
      <button 
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md text-[#874fc2] md:hidden"
      >
        <Menu size={24} />
      </button>
      
      {/* Mobile sidebar */}
      <MobileMenu />
      
      {/* Desktop sidebar */}
      <div className="relative">
        <div 
          className={`bg-white shadow-lg border-r border-gray-200 z-30 h-screen transition-all duration-300 ease-in-out ${
            collapsed ? 'w-20' : 'w-64'
          } hidden md:block`}
        >
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-gradient-to-r from-[#874fc2] to-[#9a6dd2]">
            {collapsed ? (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#874fc2] text-xl font-bold shadow-md">
                E
              </div>
            ) : (
              <div className="px-4 flex items-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#874fc2] text-xl font-bold shadow-md mr-3">
                  E
                </div>
                <span className="text-lg font-semibold text-white">ExactConnect</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-2">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center py-3 px-3 rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-[#f3eefb] text-[#874fc2] font-medium'
                        : 'text-gray-600 hover:bg-[#f8f5fd] hover:text-[#874fc2]'
                    } ${collapsed ? 'justify-center' : ''}`
                  }
                >
                  <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} transition-transform hover:scale-110`} />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-6 px-2 w-full">
            <button
              onClick={handleLogout}
              className={`flex items-center py-3 px-3 rounded-md transition-colors w-full text-gray-600 hover:bg-[#f8f5fd] hover:text-[#874fc2] ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
        
        {/* Toggle Button for desktop */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-4 top-20 bg-white shadow-md border border-gray-200 rounded-full p-1.5 text-[#874fc2] hover:bg-[#f8f5fd] transition-colors z-40 hidden md:block"
        >
          {collapsed ? 
            <ChevronRight size={18} className="transition-transform hover:scale-110" /> : 
            <ChevronLeft size={18} className="transition-transform hover:scale-110" />
          }
        </button>
      </div>
    </>
  );
};

export default DashboardSidebar;