//Account setting page
import { useState, useContext,useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserMenu from "../reusable/UserMenu";
import Sidebar from "../reusable/Sidebar";
import { DarkModeContext } from '../../../context/DarkModeContext'
import ChangePassword from "./ChangePassword";
import Notification from "./Notification";





function SettingsPage() {
  const navigate = useNavigate()
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  //Checking if the user even has the logged in
  useEffect(() => {
    if (!userDetails) {
      navigate("account/login");
    }
  }, [navigate]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
   
  };

  return (
    <div className={`min-h-screen  flex relative ${darkMode ? 'bg-[#030917]' : 'bg-gray-100'}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      {/* Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      <main className={`flex-1 ${darkMode ? 'bg-[#131312]' : 'bg-white'} transition-all duration-300 ease-in-out ${isSidebarOpen ? 'blur-sm pointer-events-none md:pointer-events-auto' : ''
        } md:ml-64`}>
        <header
          className={`flex justify-between items-center py-4 px-6 border-b backdrop-blur-xl bg-opacity-90 shadow-sm sticky top-0 z-50 ${darkMode ? 'bg-[#131312] border-gray-700' : 'bg-[#7C25BA] border-[#7C25BA]'
            }`}
        >
          <button
            className={`md:hidden text-3xl z-50 ${darkMode ? 'text-white' : 'text-white'}`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="flex-1 flex justify-end">
            <UserMenu userDetails={userDetails} />
          </div>
        </header>



        <div className="grid grid-cols-1  lg:grid-cols-5">
          <Notification />
        </div>
      </main>

    </div>
  );
}
export default SettingsPage