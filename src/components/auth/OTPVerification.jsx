// import React, { useState, useContext } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { SERVER_URL } from '../../services/data';
// import { Link } from 'react-router-dom';

// //Dark mode
// import { DarkModeContext } from '../../context/DarkModeContext';
// import toast from 'react-hot-toast';
// import { z } from 'zod';

// //Adding the zod validation for the email
// const otpVerificationSchema = z.object({
//   email: z.string().min(1).email({
//     message: 'Invalid email address'
//   }),
//   otp: z.string().min(1, {
//     message: 'Enter a valid otp'
//   })
// })

// const OTPVerification = () => {


//   //The data used in the form
//   const [formData, setFormData] = useState({
//     email: '',
//     otp: ''
//   })



//   const [errors, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { darkMode } = useContext(DarkModeContext);

//   // Handle OTP input change
//   const handleOtpChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle OTP verification and new password setting
//   const handleOTPVerification = async (e) => {
//     e.preventDefault();
//     setLoading(true)

//     try {
//       otpVerificationSchema.parse(formData)
//       setError({})
//       const response = await fetch(
//         `${SERVER_URL}/customers/verify-otp/reset`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       let responseData;
//       const contentType = response.headers.get('Content-Type');

//       // Check if the response is JSON
//       if (contentType && contentType.includes('application/json')) {
//         responseData = await response.json();
//       } else {
//         responseData = await response.text(); // Handle plain text response
//       }

//       if (response.status === 200) {
//         toast.success(responseData.message || 'OTP verified successfully');
//         navigate('/account/login');
//       } else {
//         throw new Error(responseData.message || 'OTP verification failed');
//       }
//     } catch (err) {
//       if (err instanceof z.ZodError) {
//         // Handle validation errors
//         const formattedErrors = {};
//         err.errors.forEach((error) => {
//           formattedErrors[error.path[0]] = error.message;
//         });
//         setError(formattedErrors);
//       } else {
//         // Handle network/server errors
//         toast.error('Invalid OTP.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#131312] text-black' : 'bg-white text-black'
//         }`}
//     >
//       <div
//         className={`max-w-md mx-auto p-6 rounded-lg shadow-lg ${darkMode ? 'text-white border-gray-700' : 'text-black'
//           } border`}
//       >
//         <h2 className="text-lg font-semibold mb-4">
//           Two-factor Authentication
//         </h2>
//         <p className="text-sm text-gray-600 mb-6">
//           Please enter the authentication code. <br />
//           We have sent the one time password code to your email.
//         </p>
//         <form onSubmit={handleOTPVerification}>
//           <label
//             htmlFor="email"
//             className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'
//               } mb-2`}
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="you@example.com"
//             value={formData.email}
//             onChange={handleOtpChange}
//             className={`w-full h-12 mb-4 ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
//               } px-4 py-2 border border-gray-600  ${errors.email ? 'border-red-500' : 'border-gray-300'
//               } rounded-lg text-sm focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-gray-500'
//               }`}
//             aria-invalid={!!errors.email}
//             aria-describedby="email_error"
//           />
//           {errors.email && (
//             <p id="user_name_error" className="text-red-500 text-sm mb-4">
//               {errors.email}
//             </p>
//           )}
//           <div className="mb-4 relative">
//             <label
//               htmlFor="Otp"
//               className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'
//                 }`}
//             >
//               OTP
//             </label>
//             <div className='relative'>
//               <input
//                 type="text"
//                 name='otp'
//                 value={formData.otp}
//                 autoComplete="off"
//                 placeholder="Enter your OTP"
//                 onChange={handleOtpChange}
//                 className={`w-full h-12 ${darkMode
//                   ? 'bg-[#131312] text-white border-gray-600'
//                   : 'bg-white text-black'
//                   } border  rounded-lg text-center  text-lg focus:outline-none focus:ring-2 focus:ring-gray-500`}
//               />
//             </div>

//           </div>
//           {errors.otp && <p className="text-red-500 text-sm mb-4">{errors.otp}</p>}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full text-white text-sm font-medium py-2 rounded-lg transition ${loading
//               ? 'bg-[#7C25BA] cursor-not-allowed'
//               : 'bg-gray-700 hover:bg-gray-600'
//               }`}
//           >
//             {loading ? 'Verifying...' : 'Verify'}
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-400 mt-6">
//           Haven't received it?{' '}
//           <Link to="/dashboard" className="text-purple-500 hover:underline">
//             Resend a new code.
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;



import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../services/data';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { MailIcon, KeyIcon, ShieldCheckIcon } from 'lucide-react';

//Adding the zod validation for the email
const otpVerificationSchema = z.object({
  email: z.string().min(1).email({
    message: 'Invalid email address'
  }),
  otp: z.string().min(1, {
    message: 'Enter a valid OTP'
  })
});

const OTPVerification = () => {
  //The data used in the form
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  // Handle OTP input change
  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle OTP verification and new password setting
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      otpVerificationSchema.parse(formData);
      setError({});
      
      const response = await fetch(
        `${SERVER_URL}/customers/verify-otp/reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      let responseData;
      const contentType = response.headers.get('Content-Type');

      // Check if the response is JSON
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text(); // Handle plain text response
      }

      if (response.status === 200) {
        toast.success(responseData.message || 'OTP verified successfully');
        navigate('/account/login');
      } else {
        throw new Error(responseData.message || 'OTP verification failed');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const formattedErrors = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setError(formattedErrors);
      } else {
        // Handle network/server errors
        toast.error('Invalid OTP.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-[#131312]' : 'bg-gray-50'
      }`}
    >
      <div
        className={`max-w-md w-full mx-6 md:w-96 p-8 rounded-xl shadow-lg ${
          darkMode 
            ? 'bg-[#1a1a1a] text-white border-gray-700' 
            : 'bg-white text-black border-gray-200'
        } border`}
      >
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Verify Your Email
          </h2>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We've sent a one-time password to your email address.
            Please check your inbox and enter the code below.
          </p>
        </div>
        
        <form onSubmit={handleOTPVerification} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleOtpChange}
                className={`w-full h-12 pl-10 pr-4 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                  darkMode 
                    ? 'bg-[#252525] text-white border-gray-700 focus:ring-purple-700' 
                    : 'bg-gray-50 text-black border-gray-300 focus:ring-purple-500'
                } ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>
          
          <div>
            <label
              htmlFor="otp"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              One-Time Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter your OTP"
                value={formData.otp}
                onChange={handleOtpChange}
                className={`w-full h-12 pl-10 pr-4 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                  darkMode 
                    ? 'bg-[#252525] text-white border-gray-700 focus:ring-purple-700 letter-spacing-2' 
                    : 'bg-gray-50 text-black border-gray-300 focus:ring-purple-500 letter-spacing-2'
                } ${
                  errors.otp ? 'border-red-500 focus:ring-red-500' : ''
                } text-center tracking-widest font-mono`}
              />
            </div>
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">
                {errors.otp}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center h-12 text-white font-medium rounded-lg transition-all ${
              loading 
                ? 'bg-purple-700 opacity-70 cursor-not-allowed' 
                : 'bg-[#7C25BA] hover:bg-purple-800'
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.419.876 4.623 2.334 6.291l1.666-1.666z"
                />
              </svg>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>
        
        <div className="mt-6">
          <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Didn't receive the code?{' '}
            <Link to="#" className="text-purple-600 hover:text-purple-800 font-medium">
              Resend OTP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;