//Notifications
import React, { useState, useContext } from 'react'
import SideNav from './SideNav';
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { DarkModeContext } from '../../../context/DarkModeContext'


function Notification() {


  //For allowing toggling of the sidebar on and off
  const { darkMode } = useContext(DarkModeContext)

  const [notificationPreference, setNotificationPreference] = useState("all");
  const toggleEmailPreference = (key) => {
    setEmailPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const [emailPreferences, setEmailPreferences] = useState({
    communication: true,
    marketing: false,
    security: true,
  });

  return (
    <>
      <SideNav />
      <div className={`lg:col-span-4 p-6  shadow-sm ${darkMode ? 'bg-[#131312]' : 'bg-white'}`}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Notifications</h3>
            <p className="text-sm text-gray-500">Configure how you receive notifications.</p>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Notify me about...</h4>
            <div className="space-y-2">
              <div className={`flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                <input
                  type="radio"
                  id="all"
                  name="notifications"
                  value="all"
                  checked={notificationPreference === "all"}
                  onChange={() => setNotificationPreference("all")}
                  className="h-6 w-6 text-pink-600 focus:ring-pink-600 border-gray-300"
                />
                <label htmlFor="all" className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  All new messages
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="none"
                  name="notifications"
                  value="none"
                  checked={notificationPreference === "none"}
                  onChange={() => setNotificationPreference("none")}
                  className="h-6 w-6 text-pink-600 focus:ring-pink-600 border-gray-300"
                />
                <label htmlFor="none" className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                  Nothing
                </label>
              </div>

            </div>
          </div>

          <hr className={"border-gray-200"} />

          <div>
            <h4 className="text-sm font-medium mb-4">Email Notifications</h4>
            <div className="space-y-4">
              {Object.entries(emailPreferences).map(([key, value]) => (
                <div
                  key={key}
                  className={`flex items-center  justify-between space-x-2 border  rounded-md p-4 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                >
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium capitalize">
                      {key} emails
                    </label>
                    <p className="text-sm text-gray-500">
                      {`Receive emails about ${key === "communication"
                        ? "account activity"
                        : key === "marketing"
                          ? "new products and features"
                          : "security and account activity"
                        }.`}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleEmailPreference(key)}
                    className="text-3xl focus:outline-none"
                    aria-label={`Toggle ${key} emails`}
                  >
                    {value ? (
                      <MdToggleOn className="text-purple-600" />
                    ) : (
                      <MdToggleOff className="text-gray-500" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification