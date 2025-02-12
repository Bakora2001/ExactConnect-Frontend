import React, { useContext } from 'react';
import Server from '../../icons/Server';
import Card from '../../icons/Card';
import { Link, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import {
  RadioTower,
  LayoutDashboard,
  ShoppingBasket,
  PhoneCall,
} from 'lucide-react';
import { DarkModeContext } from '../../../context/DarkModeContext';

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { darkMode } = useContext(DarkModeContext);

  const navItems = [
    {
      to: '/dashboard',
      icon: <LayoutDashboard className="text-2xl" />,
      label: 'Dashboard',
    },
    {
      to: '/client/proxy',
      icon: <RadioTower className="text-2xl" />,
      label: 'Residential Proxy',
    },
    { to: '/rdp', icon: <Server className="text-2xl" />, label: 'Vps Server' },
    {
      to: '/maintainance',
      icon: <Card className="text-2xl" />,
      label: 'VCC Card',
    },
    {
      to: '/maintainance',
      icon: <PhoneCall className="text-2xl" />,
      label: 'Non Voip Numbers',
    },
    {
      to: '/orders',
      icon: <ShoppingBasket className="text-2xl" />,
      label: 'Orders',
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 h-full ${
        darkMode ? 'bg-[#131312] text-white' : 'text-white bg-[#7C25BA]'
      } p-4 md:p-6 z-20 shadow-lg transform ${
        isOpen
          ? 'translate-x-0 border rounded-[16px] border-gray-600'
          : '-translate-x-full '
      } border border-gray-700 rounded-lg  transition-transform duration-300 ease-in-out md:translate-x-0 py-2 px-4`}
    >
      <button
        className="md:hidden text-white text-2xl self-end mb-4 flex flex-col space-y-6"
        onClick={onClose}
      >
        <FaTimes />
      </button>
      <nav>
        <ul className="flex flex-col space-y-6 mt-8">
          {navItems.map(({ to, icon, label }, index) => {
            const isActive = location.pathname === to;
            return (
              <li
                key={index}
                className={`relative flex items-center p-4 rounded-lg transition-colors duration-300 ${
                  isActive
                    ? 'bg-neutral-700 dark:bg-gray-700'
                    : 'hover:bg-neutral-800 dark:hover:bg-gray-800'
                }`}
              >
                <Link to={to}>
                  <span className="flex items-center space-x-4">
                    <span className="text-white">{icon}</span>
                    <span className="text-sm font-medium text-white">
                      {label}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
