import React, { useContext } from 'react'
import { Link ,useLocation} from "react-router-dom";
import { FaBriefcase, FaBell } from "react-icons/fa";
//Dark mode
import { DarkModeContext } from '../../../context/DarkModeContext';


//Side navigation
function SideNav() {
  const { darkMode } = useContext(DarkModeContext)
const location = useLocation()
  return (
    <div>
      <div className="px-4 py-2 w-full">
        <h2 className={`mb-2 text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Settings</h2>
        <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-500 '} mb-4`}>
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <aside className={`lg:col-span-1  ${darkMode ? 'bg-[#131312]' : 'bg-white'} h-full  `}>
        <div className="space-y-1 py-4">

          <nav className="flex  px-2 lg:flex-col gap-2">
            <Link to='/account/changepassword'>
              <button  
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  location.pathname === '/account/changepassword'
                    ? darkMode
                      ? 'bg-[#1f2937] text-white'
                      : 'bg-gray-200 text-black'
                    : darkMode
                    ? 'text-white'
                    : 'text-black'
                }`}>
                <FaBriefcase className={`  h-4 w-4 ${darkMode ? 'text-white' : 'text-black'}`} />
                Account
              </button>
            </Link>
            <Link to='/account/settings'>
              <button className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  location.pathname === '/account/settings'
                    ? darkMode
                      ? 'bg-[#1f2937] text-white'
                      : 'bg-gray-200 text-black'
                    : darkMode
                    ? 'text-white'
                    : 'text-black'
                }`}>
                <FaBell className={`h-4 w-4    ${darkMode ? 'text-white' : 'text-black'} `} />
                Notifications
              </button>
            </Link>
          </nav>
        </div>
      </aside>
    </div>
  )
}

export default SideNav