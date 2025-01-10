import React, { useState } from 'react';

function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={toggleModal}
        className="flex items-center p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
      >
        <span className="w-8 h-8 flex items-center justify-center  text-white font-bold rounded-full">
          SN
        </span>
       
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-72 bg-gray-800 text-white rounded-lg shadow-lg"
          onBlur={() => setIsOpen(false)}
        >
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-['#131312'] text-white font-bold rounded-full">
                SN
              </div>
              <div className="ml-3">
                <p className="font-semibold">satnaing</p>
                <p className="text-sm text-gray-400">satnaingdev@gmail.com</p>
              </div>
            </div>
          </div>
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Account
            </li>
          </ul>
          <div className="border-t border-gray-700">
            <button
              onClick={() => alert('Logged out')}
              className="w-full px-4 py-2 text-left hover:bg-gray-700"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileModal;
