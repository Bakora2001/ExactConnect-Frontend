// import { useContext } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { MailIcon } from 'lucide-react';
// import { DarkModeContext } from '../../context/DarkModeContext';

// function CheckMail() {
//   const location = useLocation();
//   const email = location.state?.email || 'your email';
//   const { darkMode } = useContext(DarkModeContext);

//   return (
//     <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#0c0b08] text-white' : 'bg-gray-100 text-gray-900'}`}>
//       <div className={`w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg ${darkMode ? 'bg-[#131312] border-gray-700' : 'bg-white border-gray-200'} border`}>
//         <div className="text-center">
//           <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-100">
//             <MailIcon size={32} className="text-purple-600" />
//           </div>
          
//           <h2 className="mt-6 text-2xl font-bold">Check your email</h2>
          
//           <p className="mt-3 text-sm text-gray-500">
//             We've sent an activation link to <strong>{email}</strong>
//           </p>
          
//           <p className="mt-4 text-sm text-gray-500">
//             Please check your email and click on the activation link to activate your account.
//           </p>
//         </div>
        
//         <div className="mt-6 space-y-4">
//           <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//             <p className="text-sm">
//               <span className="block mb-1 font-medium">Didn't receive the email?</span>
//               Check your spam folder or try again with a different email address.
//             </p>
//           </div>
          
//           <div className="flex flex-col space-y-3">
//             <Link
//               to="/account/signup"
//               className="text-center py-2 px-4 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
//             >
//               Try with a different email
//             </Link>
            
//             <Link
//               to="/account/login"
//               className="text-center py-2 px-4 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
//             >
//               Back to Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CheckMail;


import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

///Importing the darkmode context
import { DarkModeContext } from '../../context/DarkModeContext';

const CheckMail = () => {
  //The darkmode concenxt
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`flex items-center justify-center min-h-screen h-screen w-screen ${darkMode ? 'bg-[#131312]' : ' bg-gray-100'
        }`}
    >
      <div
        className={` ${darkMode ? 'bg-[#131312] border-gray-700' : 'bg-white'
          } p-8 rounded-lg shadow-lg border w-5/6 text-center max-w-sm`}
      >
        <img
          src="/icons8-unread-messages-100.png"
          alt="Mail Icon"
          className="mx-auto mb-6 animate-bounce"
        />
        <h2
          className={`text-xl font-bold  ${darkMode ? 'text-white' : 'text-gray-800'
            } mb-4`}
        >
          Check your mail
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We’ve sent a one time password to your email{' '}
          {/* <span className="font-semibold text-gray-800">marina@gmail.com</span> */}
        </p>

        <Link
          to="/account/otp"
          // target="_blank"
          className={`flex items-center justify-center w-full py-3 bg-[#7C25BA]   ${darkMode ? 'text-white' : 'text-white'
            } rounded-md hover:bg-[#5b21a8] focus:outline-none`}
        >
          Input OTP
        </Link>
      </div>
    </div>
  );
};

export default CheckMail;