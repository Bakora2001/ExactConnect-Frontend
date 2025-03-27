import { useContext } from 'react';
import Server from '../../icons/Server';
import Card from '../../icons/Card';
import { Link, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import {
  RadioTower,
  LayoutDashboard,
  ShoppingBasket,
  PhoneCall,
  SunMedium,
  MonitorSmartphone,
  MessageSquareText,
} from 'lucide-react';
import { DarkModeContext } from '../../../context/DarkModeContext';
import PropTypes from 'prop-types';

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

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
    {
      to: '/support',
      icon: <MessageSquareText className="text-2xl" />,
      label: 'Contact Support',
    },
  ];

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 w-64 h-full ${
          darkMode ? 'bg-[#0c0b08] text-white' : 'text-white bg-[#7C25BA]'
        } p-4 md:p-6 z-20 shadow-lg transform ${
          isOpen ? 'translate-x-0 border border-gray-600' : '-translate-x-full '
        } border-r dark:border-gray-700   transition-transform duration-300 ease-in-out md:translate-x-0 py-2 px-4 `}
      >
        <button
          className="md:hidden text-white text-2xl self-end mb-4 flex flex-col space-y-6 ml-48"
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
                      ? ' bg-neutral-700 dark:bg-[#292524]'
                      : 'hover:text-gray-700 dark:text-white'
                  }`}
                >
                  <Link to={to}>
                    <span className="flex items-center space-x-4">
                      <span className="dark:text-white">{icon}</span>
                      <span className="text-sm font-medium dark:text-white">
                        {label}
                      </span>
                      <div className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 scale-0 rounded-lg bg-gray-800 px-3 py-1 text-xs text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                        {label}
                      </div>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav className="mt-auto flex gap-4 px-2 sm:py-5 fixed bottom-0 w-full  ">
          <div className="space-y-12 ">
            <div className="flex items-center p-[3px] dark:border border-solid dark:border-gray-700 rounded-full w-max drop-shadow-xl shadow-xl transition-all duration-300 hover:shadow-xl hover:bg-opacity-90">
              <code className="sr-only hidden tracking-wide select-none pointer-events-none">
                ⌘+J
              </code>

              <button
                onClick={toggleDarkMode}
                className="inline-flex items-center justify-center ring-offset-zinc-400 transition-colors dark:text-zinc-500 hover:text-black 
                text-white
                dark:hover:text-white
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-black w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] [--sz:36px] p-0.5 rounded-full hover:bg-transparent data-[state=active]:bg-zinc-600/30 data-[state=active]:text-black"
                disabled={darkMode === false}
                aria-label="light"
                data-state=""
                role="button"
                type="button"
              >
                <SunMedium className="h-5 w-5" />
              </button>

              <button
                onClick={toggleDarkMode}
                className="inline-flex items-center justify-center ring-offset-zinc-400 transition-colors dark:text-zinc-500 
                 text-zinc-400/80
                 transition-transform duration-200 ease-in-out hover:-translate-y-1
                hover:text-black dark:hover:text-white
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-black w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] [--sz:36px] p-0.5 rounded-full hover:bg-transparent data-[state=active]:bg-zinc-600/30 data-[state=active]:text-black"
                aria-label="system"
                // data-state="active"
                role="button"
                type="button"
              >
                <MonitorSmartphone className="h-5 w-5" />
              </button>

              <button
                onClick={toggleDarkMode}
                disabled={darkMode === true}
                className="inline-flex items-center justify-center ring-offset-zinc-400 transition-colors dark:text-zinc-500 dark:hover:text-white 
                hover:text-black 
                  text-zinc-400/80
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-black w-[var(--sz)] h-[var(--sz)] min-w-[var(--sz)] min-h-[var(--sz)] max-w-[var(--sz)] max-h-[var(--sz)] [--sz:36px] p-0.5 rounded-full hover:bg-transparent data-[state=active]:bg-zinc-600/30 data-[state=active]:text-black"
                aria-label="dark"
                data-state=""
                role="button"
                type="button"
              >
                <svg
                  data-initial="icon-theme-sync"
                  width="16px"
                  height="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="0"
                  stroke="currentColor"
                  fill="none"
                >
                  <path
                    d="m4.8.69c0-.38-.31-.69-.69-.69s-.69.31-.69.69v1.03h-1.03c-.38,0-.69.31-.69.69s.31.69.69.69h1.03v1.03c0,.38.31.69.69.69s.69-.31.69-.69v-1.03h1.03c.38,0,.69-.31.69-.69s-.31-.69-.69-.69h-1.03V.69Zm5.14,5.14c0-.38-.31-.69-.69-.69s-.69.31-.69.69v1.03h-1.03c-.38,0-.69.31-.69.69s.31.69.69.69h1.03v1.03c0,.38.31.69.69.69s.69-.31.69-.69v-1.03h1.03c.38,0,.69-.31.69-.69s-.31-.69-.69-.69h-1.03v-1.03Zm-6.86,5.14c0-.38-.31-.69-.69-.69s-.69.31-.69.69v1.03H.69c-.38,0-.69.31-.69.69s.31.69.69.69h1.03v1.03c0,.38.31.69.69.69s.69-.31.69-.69v-1.03h1.03c.38,0,.69-.31.69-.69s-.31-.69-.69-.69h-1.03v-1.03ZM14.47,1.51l-.51-.07c-.37-.04-.58.38-.37.69.24.35.46.71.67,1.08.86,1.59,1.35,3.42,1.35,5.36,0,5.61-4.08,10.26-9.43,11.16-.41.07-.84.12-1.27.14-.37.02-.57.45-.31.71.12.12.24.24.36.35l.12.11.45.39.32.25.21.15.32.22.3.2c.21.13.42.25.64.37l.45.23.45.2.52.21.42.15c.23.08.46.14.7.21.18.05.36.09.54.13.22.04.43.08.65.12l.54.07.46.04c.22.01.44.02.66.02,6.25,0,11.31-5.07,11.31-11.31,0-.43-.02-.85-.07-1.27l-.06-.48c-.06-.38-.14-.76-.23-1.13-.12-.44-.26-.88-.43-1.3l-.19-.46-.13-.28-.13-.26c-.27-.53-.58-1.03-.93-1.51l-.26-.34-.34-.41-.28-.31-.2-.21-.28-.27-.38-.34-.55-.45-.42-.3-.5-.33-.55-.32-.56-.28-.19-.09-.41-.17-.47-.18-.43-.14-.56-.15-.45-.1-.5-.09Zm3.19,7.4c0-1.76-.35-3.43-.98-4.96,3.31,1.52,5.61,4.86,5.61,8.73,0,5.3-4.3,9.6-9.6,9.6-1.49,0-2.89-.34-4.15-.94,2.5-.79,4.67-2.3,6.27-4.3.23.32.61.53,1.04.53.71,0,1.29-.58,1.29-1.29,0-.61-.43-1.12-1-1.25.11-.2.21-.4.3-.61.33.2.71.32,1.13.32,1.18,0,2.14-.96,2.14-2.14s-.96-2.14-2.14-2.14c.06-.51.09-1.02.09-1.54Z"
                    fill="currentColor"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default Sidebar;
