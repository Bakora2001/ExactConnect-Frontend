// import React, { useState, useContext } from 'react';
// import { SERVER_URL } from '../../services/data';
// import { z } from 'zod';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

// import { DarkModeContext } from '../../context/DarkModeContext';

// //Email validation
// const forgotePasswordSchema = z.object({
//   email: z.string().min(1).email({
//     message: 'Invalid email address',
//   }),
//   newPassword: z.string().min(1, {
//     message: 'New password is required',
//   }),
// });

// function ForgotPassword() {
//   const [formData, setPasswordData] = useState({
//     email: '',
//     newPassword: '',
//   });

//   //To handle navigation
//   const navigate = useNavigate()

//   //State to handle toggling the password visibility
//   const [showPassword, setShowPassword] = useState(false);

//   //State for handling zod/server errors
//   const [errors, setError] = useState('');

//   //State for disabling the submit button when making server requests
//   const [loading, setLoading] = useState(false);

//   //State for handling light and dark mode
//   const { darkMode } = useContext(DarkModeContext);


//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   //Function for handling form submittions
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       forgotePasswordSchema.parse(formData);
//       setError({});

//       const response = await fetch(
//         `${SERVER_URL}/customers/forgot-password/reset`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         navigate('/account/email');
//         toast.success('Reset successful');
//       }
//     } catch (err) {
//       if (err instanceof z.ZodError) {
//         const formattedErrors = {};
//         err.errors.forEach((error) => {
//           formattedErrors[error.path[0]] = error.message;
//         });
//         setError(formattedErrors);
//       } else {
//         toast.error('Something went wrong. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen w-screen h-screen flex items-center justify-center ${darkMode ? 'bg-[#131312]' : 'bg-white'
//         }`}
//     >
//       <div
//         className={`max-w-sm w-5/6 p-4  rounded-lg shadow-lg ${darkMode ? 'text-white border-gray-700' : 'text-black border-gray-100'
//           } border `}
//       >
//         <h2
//           className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'
//             }`}
//         >
//           Forgot Password
//         </h2>
//         <p className="text-sm text-gray-700 mb-6">
//           Enter your registered email and we will send you a link to reset your
//           password.
//         </p>
//         <form onSubmit={onSubmit}>
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
//             placeholder="name@example.com"
//             value={formData.email}
//             onChange={handleChange}
//             className={`w-full h-12 ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
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
//           <div className="mb-4 mt-5 relative">
//             <label
//               htmlFor="password"
//               className={`mb-1 block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'
//                 }`}
//             >
//               New Password
//             </label>

//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="newPassword"
//                 id="password"
//                 placeholder="********"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//                 className={`w-full h-12 ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
//                   } px-4 py-2 pr-10 border ${errors.newPassword ? 'border-red-500' : 'border-gray-600'
//                   } rounded-lg text-sm  focus:outline-none focus:ring-2 ${errors.newPassword
//                     ? 'focus:ring-red-500'
//                     : 'focus:ring-gray-500'
//                   }`}
//                 aria-invalid={!!errors.newPassword}
//                 aria-describedby="password_error"
//               />
//               <span
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-300"
//               >
//                 {showPassword ? (
//                   <AiFillEyeInvisible className="h-5 w-5" />
//                 ) : (
//                   <AiFillEye className="h-5 w-5" />
//                 )}
//               </span>
//             </div>

//             {errors.newPassword && (
//               <p id="password_error" className="text-red-500 text-sm mt-1">
//                 {errors.newPassword}
//               </p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className={`w-full flex items-center justify-center bg-[#7C25BA] text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-600 transition mt-4 ${loading && 'opacity-50 cursor-not-allowed'
//               }`}
//             disabled={loading}
//             aria-busy={loading}
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.419.876 4.623 2.334 6.291l1.666-1.666z"
//                 />
//               </svg>
//             ) : (
//               'Continue'
//             )}
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-400 mt-6">
//           Don't have an account?{' '}
//           <Link to="/account/signup" className="text-blue-500 hover:underline">
//             Sign up.
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;


import React, { useState, useContext } from 'react';
import { SERVER_URL } from '../../services/data';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { DarkModeContext } from '../../context/DarkModeContext';

//Email validation
const forgotePasswordSchema = z.object({
  email: z.string().min(1).email({
    message: 'Invalid email address',
  }),
  newPassword: z.string().min(1, {
    message: 'New password is required',
  }),
});

function ForgotPassword() {
  const [formData, setPasswordData] = useState({
    email: '',
    newPassword: '',
  });

  //To handle navigation
  const navigate = useNavigate();

  //State to handle toggling the password visibility
  const [showPassword, setShowPassword] = useState(false);

  //State for handling zod/server errors
  const [errors, setError] = useState('');

  //State for disabling the submit button when making server requests
  const [loading, setLoading] = useState(false);

  //State for handling light and dark mode
  const { darkMode } = useContext(DarkModeContext);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Function for handling form submittions
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      forgotePasswordSchema.parse(formData);
      setError({});

      const response = await fetch(
        `${SERVER_URL}/customers/forgot-password/reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate('/account/otp');
        toast.success('Reset successful');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setError(formattedErrors);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-screen h-screen flex items-center justify-center ${
        darkMode ? 'bg-[#131312]' : 'bg-gray-50'
      }`}
    >
      <div
        className={`max-w-md w-full mx-6 p-8 rounded-xl shadow-lg ${
          darkMode 
            ? 'bg-[#1a1a1a] text-white border-gray-700' 
            : 'bg-white text-black border-gray-200'
        } border`}
      >
        <div className="text-center mb-6">
          <h2
            className={`text-2xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Reset Your Password
          </h2>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Enter your email and new password. We'll send you an OTP to confirm.
          </p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full h-12 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                darkMode 
                  ? 'bg-[#252525] text-white border-gray-700 focus:ring-purple-700' 
                  : 'bg-gray-50 text-black border-gray-300 focus:ring-purple-500'
              } ${
                errors.email ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>
          
          <div>
            <label
              htmlFor="newPassword"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                id="newPassword"
                placeholder="••••••••"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full h-12 px-4 py-2 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                  darkMode 
                    ? 'bg-[#252525] text-white border-gray-700 focus:ring-purple-700' 
                    : 'bg-gray-50 text-black border-gray-300 focus:ring-purple-500'
                } ${
                  errors.newPassword ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                aria-invalid={!!errors.newPassword}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiFillEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword}
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
              'Continue to Verification'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Remember your password?{' '}
            <Link 
              to="/account/login" 
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;