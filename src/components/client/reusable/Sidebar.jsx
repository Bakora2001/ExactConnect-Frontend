// Side bar component 

import React, { useContext, useState } from 'react'
import Server from '../../icons/Server'
import Card from '../../icons/Card'
import { Link } from 'react-router-dom'
import { FaTimes, } from 'react-icons/fa'
import { RadioTower, LayoutDashboard, ShoppingBasket, PhoneCall } from 'lucide-react'
import { DarkModeContext } from '../../../context/DarkModeContext'


function Sidebar({ isOpen, onClose }) {

  //For allowing toggling of the sidebar on and off
  const { darkMode } = useContext(DarkModeContext)

  return (
    <aside className={`fixed inset-y-0 left-0 w-64   h-full ${darkMode ? 'bg-[#131312] text-white' : 'text-white bg-[#7C25BA] '}  p-4 md:p-6 z-20 shadow-lg transform ${isOpen ? 'translate-x-0 ' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 `}>
      <button className="md:hidden text-white text-2xl self-end mb-4 flex flex-col space-y-6 " onClick={onClose}>
        <FaTimes />
      </button>
      <nav>
        <ul className="flex flex-col space-y-4 mt-8 ">
          {[
            { to: '/dashboard', icon: <LayoutDashboard className="text-2xl" />, label: 'Dashboard' },
            { to: '/client/proxy', icon: <RadioTower className="text-2xl" />, label: 'Residential Proxy' },
            { to: '/rdp', icon: <Server className="text-2xl" />, label: 'Vps Server' },
            { to: '/maintainance', icon: <Card className="text-2xl" />, label: 'VCC Card' },
            { to: '/maintainance', icon: <PhoneCall className="text-2xl" />, label: 'Non Voip Numbers' },
            { to: '/maintainance', icon: <ShoppingBasket className="text-2xl" />, label: 'Orders ' },
          ]
            .map(({ to, icon, label }, index) => (
              <li
                key={index}
                className="relative flex items-center p-4 hover:bg-neutral-800 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 "
              >
                <Link to={to} className="flex items-center space-x-4">
                  {/* Icon */}
                  <span className="text-white">{icon}</span>
                  {/* Label */}
                  <span className="text-md font-sans text-white">{label}</span>
                </Link>
              </li>

            ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar