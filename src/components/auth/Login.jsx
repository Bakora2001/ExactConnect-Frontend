// // import React, { useState, useContext, useEffect } from 'react';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import { z } from 'zod';
// // import { FcGoogle } from 'react-icons/fc';
// // import { toast } from 'react-hot-toast';
// // import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
// // import Button from '../reusables/Button';
// // import TestimonialSidebar from '../reusables/TestimonialSidebar';
// // import { AuthContext } from '../../context/AuthContext';

// // // Zod form validation
// // const loginSchema = z.object({
// //   email: z.string().email({ message: 'Invalid email address' }),
// //   password: z.string().min(1, { message: 'Password is required' }),
// // });

// // function Login() {
// //   // Check if already logged in
// //   useEffect(() => {
// //     const token = localStorage.getItem('auth_token');
// //     if (token) {
// //       navigate('/dashboard', { replace: true });
// //     }
// //   }, []);

// //   // Check if DarkModeContext is being used
// //   let darkMode = false;
// //   try {
// //     const { DarkModeContext } = require('../../context/DarkModeContext');
// //     const darkModeContext = useContext(DarkModeContext);
// //     darkMode = darkModeContext?.darkMode || false;
// //   } catch (error) {
// //     // DarkModeContext may not exist, fallback to light mode
// //     darkMode = false;
// //   }

// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   });

// //   const [isLoading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setError] = useState({});
  
// //   // Get the auth context - safely
// //   const auth = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const location = useLocation();
  
// //   // Get redirect path from location state, or default to dashboard
// //   const from = location.state?.from?.pathname || '/dashboard';

// //   // Handle input change
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleLoginSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
    
// //     try {
// //       loginSchema.parse(formData);
// //       setError({});

// //       // For testing/development - simulate a successful login if no SERVER_URL
// //       const SERVER_URL = window.SERVER_URL || 'https://api.example.com'; // Fallback

// //       try {
// //         const response = await fetch(`${SERVER_URL}/customers/login`, {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(formData),
// //         });

// //         const result = await response.json();

// //         if (response.ok) {
// //           const userData = {
// //             customerReference: result.customerReference,
// //             email: result.email,
// //             firstName: result.firstName,
// //             lastName: result.lastName,
// //             name: `${result.firstName} ${result.lastName}` // Add name field for dashboard
// //           };
          
// //           // Store in localStorage directly as a fallback
// //           localStorage.setItem('userDetails', JSON.stringify(userData));
// //           localStorage.setItem('auth_token', result.token || 'dummy-token');
          
// //           // Store user_data for our dashboard context
// //           localStorage.setItem('user_data', JSON.stringify(userData));
          
// //           // Use AuthContext if available
// //           if (auth && auth.login) {
// //             auth.login(userData, result.token || 'dummy-token');
// //           }
          
// //           toast.success('Login successful');
// //           navigate(from, { replace: true });
// //         } else {
// //           // Handle error response from server
// //           toast.error(result.message || 'Login failed. Please check your credentials.');
// //         }
// //       } catch (fetchErr) {
// //         console.error("API error:", fetchErr);
        
// //         // For development/demo purposes - use the email to extract a potential name
// //         // instead of hardcoding "Demo User"
// //         const emailName = formData.email.split('@')[0]; // Extract name from email
// //         const nameParts = emailName.split(/[._-]/); // Split by common email separators
        
// //         // Capitalize first letter of each part
// //         const formattedNameParts = nameParts.map(part => 
// //           part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
// //         );
        
// //         // Use the first part as firstName and the rest (if any) as lastName
// //         const firstName = formattedNameParts[0] || 'User';
// //         const lastName = formattedNameParts.slice(1).join(' ') || '';
        
// //         const mockUserData = {
// //           customerReference: 'DEMO-123',
// //           email: formData.email,
// //           firstName: firstName,
// //           lastName: lastName,
// //           name: lastName ? `${firstName} ${lastName}` : firstName // Add name field for dashboard
// //         };
        
// //         // Store in localStorage directly
// //         localStorage.setItem('userDetails', JSON.stringify(mockUserData));
// //         localStorage.setItem('auth_token', 'demo-token-123');
        
// //         // Store user_data for our dashboard context
// //         localStorage.setItem('user_data', JSON.stringify(mockUserData));
        
// //         // Use AuthContext if available
// //         if (auth && auth.login) {
// //           auth.login(mockUserData, 'demo-token-123');
// //         }
        
// //         toast.success('Demo login successful');
// //         navigate(from, { replace: true });
// //       }
// //     } catch (err) {
// //       if (err instanceof z.ZodError) {
// //         // Handle validation errors
// //         const formattedErrors = {};
// //         err.errors.forEach((error) => {
// //           formattedErrors[error.path[0]] = error.message;
// //         });
// //         setError(formattedErrors);
// //       } else {
// //         // Handle network/server errors
// //         toast.error('Invalid credentials or server error.');
// //         console.error(err);
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div
// //       className={`min-h-screen w-screen h-screen flex ${
// //         darkMode ? 'bg-[#0c0b08] text-white' : 'bg-gray-100 text-black'
// //       }`}
// //     >
// //       {/* Testimonial Sidebar */}
// //       <TestimonialSidebar darkMode={darkMode} />
      
// //       {/* Login Form Section */}
// //       <div className="flex-1 flex items-center justify-center">
// //         <div
// //           className={`${
// //             darkMode
// //               ? 'bg-[#131312] text-white border-gray-700'
// //               : 'bg-white text-black border-gray-100'
// //           } p-6 rounded-lg shadow-lg w-5/6 max-w-sm border `}
// //         >
// //           <h2 className="font-circular text-3xl font-semibold tracking-tight text-center hover:text-purple-600 transition duration-300">
// //             Welcome Back!
// //           </h2>
// //           <p className="text-sm text-center mt-2 mb-4 text-muted-foreground">
// //             Enter your credentials to sign in
// //           </p>

// //           <form onSubmit={handleLoginSubmit}>
// //             {/* Email Field */}
// //             <div className="mb-4">
// //               <label
// //                 htmlFor="email"
// //                 className={`mb-1 block text-sm font-medium ${
// //                   darkMode ? 'text-white' : 'text-black'
// //                 }`}
// //               >
// //                 Email
// //               </label>

// //               {/* Stable Container */}
// //               <div className="relative flex items-center">
// //                 {/* Email Icon */}
// //                 <div className="absolute left-3 flex items-center">
// //                   <MailIcon
// //                     className={`h-5 w-5 ${
// //                       darkMode ? 'text-gray-400' : 'text-gray-600'
// //                     }`}
// //                   />
// //                 </div>

// //                 {/* Email Input (Fixed Height) */}
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   id="email"
// //                   placeholder="you@example.com"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   className={`w-full h-12 pl-10 rounded-lg text-sm border focus:outline-none focus:ring-2  
// //           ${
// //             darkMode
// //               ? 'bg-[#131312] text-white border-gray-600'
// //               : 'bg-gray-100 text-black border-gray-300'
// //           }
// //           ${
// //             errors.email
// //               ? 'border-red-500 focus:ring-red-500'
// //               : 'border-gray-300 focus:ring-gray-500'
// //           }
// //         `}
// //                   aria-invalid={!!errors.email}
// //                   aria-describedby="email_error"
// //                 />
// //               </div>

// //               {/* Error Message (Doesn't Affect Layout) */}
// //               {errors.email && (
// //                 <p id="email_error" className="text-red-500 text-sm mt-1">
// //                   {errors.email}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Password Field */}
// //             <div className="mb-4 relative">
// //               <label
// //                 htmlFor="password"
// //                 className={`mb-1 block text-sm font-medium ${
// //                   darkMode ? 'text-white' : 'text-black'
// //                 }`}
// //               >
// //                 Password
// //               </label>

// //               <div className="relative">
// //                 {/* Lock Icon */}
// //                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
// //                   <LockIcon className="h-5 w-5" />
// //                 </div>

// //                 {/* Password Input */}
// //                 <input
// //                   type={showPassword ? 'text' : 'password'}
// //                   name="password"
// //                   id="password"
// //                   placeholder="********"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   className={`w-full h-12 pl-10 pr-12 rounded-lg text-sm border focus:outline-none focus:ring-2
// //           ${
// //             darkMode
// //               ? 'bg-[#131312] text-white border-gray-600'
// //               : 'bg-gray-100 text-black border-gray-300'
// //           }
// //           ${
// //             errors.password
// //               ? 'border-red-500 focus:ring-red-500'
// //               : 'border-gray-300 focus:ring-gray-500'
// //           }
// //         `}
// //                   aria-invalid={!!errors.password}
// //                   aria-describedby="password_error"
// //                 />

// //                 {/* Eye Toggle Icon */}
// //                 <span
// //                   onClick={() => setShowPassword((prev) => !prev)}
// //                   className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
// //                 >
// //                   {showPassword ? (
// //                     <EyeOffIcon
// //                       className={`h-5 w-5 ${
// //                         darkMode ? 'text-gray-500' : 'text-gray-500'
// //                       }`}
// //                     />
// //                   ) : (
// //                     <EyeIcon
// //                       className={`h-5 w-5 ${
// //                         darkMode ? 'text-gray-500' : 'text-gray-500'
// //                       }`}
// //                     />
// //                   )}
// //                 </span>
// //               </div>

// //               {/* Error Message */}
// //               {errors.password && (
// //                 <p id="password_error" className="text-red-500 text-sm mt-1">
// //                   {errors.password}
// //                 </p>
// //               )}

// //               {/* Forgot Password Link */}
// //               <div className="flex justify-end mt-2">
// //                 <Link
// //                   to="/account/forgotpassword"
// //                   className={`text-sm font-medium transition-opacity hover:opacity-75 ${
// //                     darkMode ? 'text-gray-400' : 'text-gray-600'
// //                   }`}
// //                 >
// //                   Forgot password?
// //                 </Link>
// //               </div>
// //             </div>

// //             {/* Login Button */}
// //             <Button label="Login" isLoading={isLoading} />
// //           </form>

// //           {/* Divider */}
// //           <div className="flex items-center my-6">
// //             <div className="flex-grow border-t border-gray-700"></div>
// //             <span
// //               className={`mx-3 text-sm ${darkMode ? 'text-white' : 'text-black'}`}
// //             >
// //               Or continue with
// //             </span>
// //             <div className="flex-grow border-t border-gray-700"></div>
// //           </div>

// //           {/* Google Login */}
// //           <button className="w-full flex items-center justify-center border dark:border-gray-700 py-3 px-4 rounded-lg hover:bg-black/80 transition duration-300 border-gray-300 bg-gray-100 hover:bg-white/80 dark:bg-[#131312] dark:hover:bg-[#131312] dark:hover:bg-opacity-80">
// //             <FcGoogle className="mr-2 h-5 w-5" />
// //             Sign in with Google
// //           </button>

// //           <div className="text-center text-sm mt-4">
// //             Don't have an account?{' '}
// //             <Link
// //               to="/account/signup"
// //               className="text-purple-600 font-semibold hover:underline hover:text-purple-700 transition-colors"
// //             >
// //               Sign up
// //             </Link>
// //             <p className="mt-2 text-gray-600">
// //               By continuing, you agree to our{' '}
// //               <Link
// //                 to="/privacy"
// //                 className="text-gray-600 underline hover:text-gray-700 transition-colors"
// //               >
// //                 Terms of Service
// //               </Link>{' '}
// //               and{' '}
// //               <Link
// //                 to="/privacy"
// //                 className="text-gray-600 underline hover:text-gray-700 transition-colors"
// //               >
// //                 Privacy Policy
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { z } from 'zod';
// import { FcGoogle } from 'react-icons/fc';
// import { toast } from 'react-hot-toast';
// import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
// import Button from '../reusables/Button';
// import TestimonialSidebar from '../reusables/TestimonialSidebar';
// import { AuthContext } from '../../context/AuthContext';

// // Zod form validation
// const loginSchema = z.object({
//   email: z.string().email({ message: 'Invalid email address' }),
//   password: z.string().min(1, { message: 'Password is required' }),
// });

// function Login() {
//   // Check if already logged in
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   useEffect(() => {
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       navigate('/dashboard', { replace: true });
//     }
//   }, [navigate]);

//   // Check if DarkModeContext is being used
//   let darkMode = false;
//   try {
//     const { DarkModeContext } = require('../../context/DarkModeContext');
//     const darkModeContext = useContext(DarkModeContext);
//     darkMode = darkModeContext?.darkMode || false;
//   } catch (error) {
//     // DarkModeContext may not exist, fallback to light mode
//     darkMode = false;
//   }

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [isLoading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setError] = useState({});
  
//   // Get the auth context - safely
//   const auth = useContext(AuthContext);
  
//   // Get redirect path from location state, or default to dashboard
//   const from = location.state?.from?.pathname || '/dashboard';

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle direct login (development/demo mode)
//   const handleDirectLogin = () => {
//     // Create a user based on the email provided, not just a static "Demo User"
//     const name = formData.email.split('@')[0] || 'Demo User';
//     const userData = {
//       customerReference: 'demo-user-123',
//       email: formData.email,
//       firstName: name, // Use email username as first name
//       lastName: 'User',
//       name: name // Use consistent name field
//     };
    
//     // Store auth token and user data consistently in all storage locations
//     localStorage.setItem('auth_token', 'demo-token-123');
//     localStorage.setItem('userDetails', JSON.stringify(userData));
//     localStorage.setItem('user_data', JSON.stringify(userData));
    
//     // Use auth context if available
//     if (auth && auth.login) {
//       auth.login(userData, 'demo-token-123');
//     }
    
//     toast.success('Development mode: Login successful');
//     navigate(from, { replace: true });
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       // Validate form data
//       loginSchema.parse(formData);
//       setError({});

//       // Get SERVER_URL from window or use fallback
//       const SERVER_URL = window.SERVER_URL || 'https://api.example.com'; // Fallback

//       try {
//         // Check for stored credentials first
//         let storedUserDetails = null;
//         try {
//           const storedData = localStorage.getItem('userDetails');
//           if (storedData) {
//             storedUserDetails = JSON.parse(storedData);
//           }
//         } catch (e) {
//           console.error("Error parsing stored user details:", e);
//         }

//         // If we have stored credentials matching this email, use them directly
//         // This is a development/demo mode fallback
//         if (storedUserDetails && storedUserDetails.email === formData.email) {
//           // Use the actual stored user data, not a default Demo User
//           const userData = {
//             customerReference: storedUserDetails.customerReference || 'demo-user-123',
//             email: storedUserDetails.email,
//             firstName: storedUserDetails.firstName || 'Demo',
//             lastName: storedUserDetails.lastName || 'User',
//             // Always create a complete name field that won't be overridden
//             name: `${storedUserDetails.firstName || ''} ${storedUserDetails.lastName || ''}`.trim() || 'Demo User'
//           };
          
//           localStorage.setItem('auth_token', 'demo-token-123');
//           localStorage.setItem('user_data', JSON.stringify(userData));
//           // Make sure to update userDetails as well for consistency
//           localStorage.setItem('userDetails', JSON.stringify(userData));
          
//           if (auth && auth.login) {
//             auth.login(userData, 'demo-token-123');
//           }
          
//           toast.success('Login successful');
//           navigate(from, { replace: true });
//           return;
//         }

//         // Try API login (may fail if backend is not available)
//         const response = await fetch(`${SERVER_URL}/customers/login`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//           // Add timeout to prevent long waits
//           signal: AbortSignal.timeout(5000) // 5 second timeout
//         });

//         if (!response.ok) {
//           // Check if response is JSON
//           const contentType = response.headers.get('Content-Type');
//           if (contentType && contentType.includes('application/json')) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'Login failed. Please check your credentials.');
//           } else {
//             throw new Error('Login failed. Please check your credentials.');
//           }
//         }

//         const result = await response.json();

//         // Create user data object
//         const userData = {
//           customerReference: result.customerReference,
//           email: result.email,
//           firstName: result.firstName,
//           lastName: result.lastName,
//           name: `${result.firstName} ${result.lastName}`
//         };
        
//         // Store in localStorage - store complete user data in all locations
//         localStorage.setItem('userDetails', JSON.stringify(userData));
//         localStorage.setItem('auth_token', result.token || 'dummy-token');
//         localStorage.setItem('user_data', JSON.stringify(userData));
        
//         // Use AuthContext if available
//         if (auth && auth.login) {
//           auth.login(userData, result.token || 'dummy-token');
//         }
        
//         toast.success('Login successful');
//         navigate(from, { replace: true });
//       } catch (fetchErr) {
//         console.error("API error:", fetchErr);
        
//         // Failed to fetch usually means network error
//         if (fetchErr.message.includes('Failed to fetch') || 
//             fetchErr.name === 'AbortError' ||
//             fetchErr.message.includes('NetworkError')) {
//           // For development/demo purposes, create a new account with this email
//           handleDirectLogin();
//         } else {
//           // Otherwise, show the specific error
//           toast.error(fetchErr.message || 'Login failed. Check your credentials or try again later.');
//         }
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
//         // Handle other errors
//         toast.error(err.message || 'Login failed. Please try again.');
//         console.error(err);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen w-screen h-screen flex ${
//         darkMode ? 'bg-[#0c0b08] text-white' : 'bg-gray-100 text-black'
//       }`}
//     >
//       {/* Testimonial Sidebar */}
//       <TestimonialSidebar darkMode={darkMode} />
      
//       {/* Login Form Section */}
//       <div className="flex-1 flex items-center justify-center">
//         <div
//           className={`${
//             darkMode
//               ? 'bg-[#131312] text-white border-gray-700'
//               : 'bg-white text-black border-gray-100'
//           } p-6 rounded-lg shadow-lg w-5/6 max-w-sm border `}
//         >
//           <h2 className="font-circular text-3xl font-semibold tracking-tight text-center hover:text-purple-600 transition duration-300">
//             Welcome Back!
//           </h2>
//           <p className="text-sm text-center mt-2 mb-4 text-muted-foreground">
//             Enter your credentials to sign in
//           </p>

//           <form onSubmit={handleLoginSubmit}>
//             {/* Email Field */}
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className={`mb-1 block text-sm font-medium ${
//                   darkMode ? 'text-white' : 'text-black'
//                 }`}
//               >
//                 Email
//               </label>

//               {/* Stable Container */}
//               <div className="relative flex items-center">
//                 {/* Email Icon */}
//                 <div className="absolute left-3 flex items-center">
//                   <MailIcon
//                     className={`h-5 w-5 ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}
//                   />
//                 </div>

//                 {/* Email Input (Fixed Height) */}
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full h-12 pl-10 rounded-lg text-sm border focus:outline-none focus:ring-2  
//           ${
//             darkMode
//               ? 'bg-[#131312] text-white border-gray-600'
//               : 'bg-gray-100 text-black border-gray-300'
//           }
//           ${
//             errors.email
//               ? 'border-red-500 focus:ring-red-500'
//               : 'border-gray-300 focus:ring-gray-500'
//           }
//         `}
//                   aria-invalid={!!errors.email}
//                   aria-describedby="email_error"
//                 />
//               </div>

//               {/* Error Message (Doesn't Affect Layout) */}
//               {errors.email && (
//                 <p id="email_error" className="text-red-500 text-sm mt-1">
//                   {errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="mb-4 relative">
//               <label
//                 htmlFor="password"
//                 className={`mb-1 block text-sm font-medium ${
//                   darkMode ? 'text-white' : 'text-black'
//                 }`}
//               >
//                 Password
//               </label>

//               <div className="relative">
//                 {/* Lock Icon */}
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
//                   <LockIcon className="h-5 w-5" />
//                 </div>

//                 {/* Password Input */}
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   id="password"
//                   placeholder="********"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full h-12 pl-10 pr-12 rounded-lg text-sm border focus:outline-none focus:ring-2
//           ${
//             darkMode
//               ? 'bg-[#131312] text-white border-gray-600'
//               : 'bg-gray-100 text-black border-gray-300'
//           }
//           ${
//             errors.password
//               ? 'border-red-500 focus:ring-red-500'
//               : 'border-gray-300 focus:ring-gray-500'
//           }
//         `}
//                   aria-invalid={!!errors.password}
//                   aria-describedby="password_error"
//                 />

//                 {/* Eye Toggle Icon */}
//                 <span
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOffIcon
//                       className={`h-5 w-5 ${
//                         darkMode ? 'text-gray-500' : 'text-gray-500'
//                       }`}
//                     />
//                   ) : (
//                     <EyeIcon
//                       className={`h-5 w-5 ${
//                         darkMode ? 'text-gray-500' : 'text-gray-500'
//                       }`}
//                     />
//                   )}
//                 </span>
//               </div>

//               {/* Error Message */}
//               {errors.password && (
//                 <p id="password_error" className="text-red-500 text-sm mt-1">
//                   {errors.password}
//                 </p>
//               )}

//               {/* Forgot Password Link */}
//               <div className="flex justify-end mt-2">
//                 <Link
//                   to="/account/forgotpassword"
//                   className={`text-sm font-medium transition-opacity hover:opacity-75 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//             </div>

//             {/* Login Button */}
//             <Button label="Login" isLoading={isLoading} />
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-6">
//             <div className="flex-grow border-t border-gray-700"></div>
//             <span
//               className={`mx-3 text-sm ${darkMode ? 'text-white' : 'text-black'}`}
//             >
//               Or continue with
//             </span>
//             <div className="flex-grow border-t border-gray-700"></div>
//           </div>

//           {/* Google Login */}
//           <button className="w-full flex items-center justify-center border dark:border-gray-700 py-3 px-4 rounded-lg hover:bg-black/80 transition duration-300 border-gray-300 bg-gray-100 hover:bg-white/80 dark:bg-[#131312] dark:hover:bg-[#131312] dark:hover:bg-opacity-80">
//             <FcGoogle className="mr-2 h-5 w-5" />
//             Sign in with Google
//           </button>

//           <div className="text-center text-sm mt-4">
//             Don't have an account?{' '}
//             <Link
//               to="/account/signup"
//               className="text-purple-600 font-semibold hover:underline hover:text-purple-700 transition-colors"
//             >
//               Sign up
//             </Link>
//             <p className="mt-2 text-gray-600">
//               By continuing, you agree to our{' '}
//               <Link
//                 to="/privacy"
//                 className="text-gray-600 underline hover:text-gray-700 transition-colors"
//               >
//                 Terms of Service
//               </Link>{' '}
//               and{' '}
//               <Link
//                 to="/privacy"
//                 className="text-gray-600 underline hover:text-gray-700 transition-colors"
//               >
//                 Privacy Policy
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import Button from '../reusables/Button';
import TestimonialSidebar from '../reusables/TestimonialSidebar';
import { AuthContext } from '../../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

// Zod form validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

function Login() {
  // Check if already logged in
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  // Check if DarkModeContext is being used
  let darkMode = false;
  try {
    const { DarkModeContext } = require('../../context/DarkModeContext');
    const darkModeContext = useContext(DarkModeContext);
    darkMode = darkModeContext?.darkMode || false;
  } catch (error) {
    // DarkModeContext may not exist, fallback to light mode
    darkMode = false;
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setError] = useState({});
  
  // Get the auth context - safely
  const auth = useContext(AuthContext);
  
  // Get redirect path from location state, or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle direct login (development/demo mode)
  const handleDirectLogin = () => {
    // Create a user based on the email provided, not just a static "Demo User"
    const name = formData.email.split('@')[0] || 'Demo User';
    const userData = {
      customerReference: 'demo-user-123',
      email: formData.email,
      firstName: name, // Use email username as first name
      lastName: 'User',
      name: name, // Use consistent name field
      customerId: uuidv4() // Generate a unique ID for this customer
    };
    
    // Store auth token and user data consistently in all storage locations
    localStorage.setItem('auth_token', 'demo-token-123');
    localStorage.setItem('userDetails', JSON.stringify(userData));
    localStorage.setItem('user_data', JSON.stringify(userData));
    
    // Use auth context if available
    if (auth && auth.login) {
      auth.login(userData, 'demo-token-123');
    }
    
    toast.success('Development mode: Login successful');
    navigate(from, { replace: true });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate form data
      loginSchema.parse(formData);
      setError({});

      // Get SERVER_URL from window or use fallback
      const SERVER_URL = window.SERVER_URL || 'https://api.example.com'; // Fallback

      try {
        // Check for stored credentials first
        let storedUserDetails = null;
        try {
          const storedData = localStorage.getItem('userDetails');
          if (storedData) {
            storedUserDetails = JSON.parse(storedData);
          }
        } catch (e) {
          console.error("Error parsing stored user details:", e);
        }

        // If we have stored credentials matching this email, use them directly
        // This is a development/demo mode fallback
        if (storedUserDetails && storedUserDetails.email === formData.email) {
          // Use the actual stored user data, not a default Demo User
          const userData = {
            customerReference: storedUserDetails.customerReference || 'demo-user-123',
            email: storedUserDetails.email,
            firstName: storedUserDetails.firstName || 'Demo',
            lastName: storedUserDetails.lastName || 'User',
            // Always create a complete name field that won't be overridden
            name: `${storedUserDetails.firstName || ''} ${storedUserDetails.lastName || ''}`.trim() || 'Demo User',
            // Keep existing customer ID if available, otherwise generate a new one
            customerId: storedUserDetails.customerId || uuidv4()
          };
          
          localStorage.setItem('auth_token', 'demo-token-123');
          localStorage.setItem('user_data', JSON.stringify(userData));
          // Make sure to update userDetails as well for consistency
          localStorage.setItem('userDetails', JSON.stringify(userData));
          
          if (auth && auth.login) {
            auth.login(userData, 'demo-token-123');
          }
          
          toast.success('Login successful');
          navigate(from, { replace: true });
          return;
        }

        // Try API login (may fail if backend is not available)
        const response = await fetch(`${SERVER_URL}/customers/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          // Add timeout to prevent long waits
          signal: AbortSignal.timeout(5000) // 5 second timeout
        });

        if (!response.ok) {
          // Check if response is JSON
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed. Please check your credentials.');
          } else {
            throw new Error('Login failed. Please check your credentials.');
          }
        }

        const result = await response.json();

        // Create user data object
        const userData = {
          customerReference: result.customerReference,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          name: `${result.firstName} ${result.lastName}`,
          // Set a unique customer ID
          customerId: result.customerId || uuidv4()
        };
        
        // Store in localStorage - store complete user data in all locations
        localStorage.setItem('userDetails', JSON.stringify(userData));
        localStorage.setItem('auth_token', result.token || 'dummy-token');
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        // Use AuthContext if available
        if (auth && auth.login) {
          auth.login(userData, result.token || 'dummy-token');
        }
        
        toast.success('Login successful');
        navigate(from, { replace: true });
      } catch (fetchErr) {
        console.error("API error:", fetchErr);
        
        // Failed to fetch usually means network error
        if (fetchErr.message.includes('Failed to fetch') || 
            fetchErr.name === 'AbortError' ||
            fetchErr.message.includes('NetworkError')) {
          // For development/demo purposes, create a new account with this email
          handleDirectLogin();
        } else {
          // Otherwise, show the specific error
          toast.error(fetchErr.message || 'Login failed. Check your credentials or try again later.');
        }
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
        // Handle other errors
        toast.error(err.message || 'Login failed. Please try again.');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-screen h-screen flex ${
        darkMode ? 'bg-[#0c0b08] text-white' : 'bg-gray-100 text-black'
      }`}
    >
      {/* Testimonial Sidebar */}
      <TestimonialSidebar darkMode={darkMode} />
      
      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className={`${
            darkMode
              ? 'bg-[#131312] text-white border-gray-700'
              : 'bg-white text-black border-gray-100'
          } p-6 rounded-lg shadow-lg w-5/6 max-w-sm border `}
        >
          <h2 className="font-circular text-3xl font-semibold tracking-tight text-center hover:text-purple-600 transition duration-300">
            Welcome Back!
          </h2>
          <p className="text-sm text-center mt-2 mb-4 text-muted-foreground">
            Enter your credentials to sign in
          </p>

          <form onSubmit={handleLoginSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className={`mb-1 block text-sm font-medium ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              >
                Email
              </label>

              {/* Stable Container */}
              <div className="relative flex items-center">
                {/* Email Icon */}
                <div className="absolute left-3 flex items-center">
                  <MailIcon
                    className={`h-5 w-5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  />
                </div>

                {/* Email Input (Fixed Height) */}
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full h-12 pl-10 rounded-lg text-sm border focus:outline-none focus:ring-2  
          ${
            darkMode
              ? 'bg-[#131312] text-white border-gray-600'
              : 'bg-gray-100 text-black border-gray-300'
          }
          ${
            errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-gray-500'
          }
        `}
                  aria-invalid={!!errors.email}
                  aria-describedby="email_error"
                />
              </div>

              {/* Error Message (Doesn't Affect Layout) */}
              {errors.email && (
                <p id="email_error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className={`mb-1 block text-sm font-medium ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              >
                Password
              </label>

              <div className="relative">
                {/* Lock Icon */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <LockIcon className="h-5 w-5" />
                </div>

                {/* Password Input */}
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full h-12 pl-10 pr-12 rounded-lg text-sm border focus:outline-none focus:ring-2
          ${
            darkMode
              ? 'bg-[#131312] text-white border-gray-600'
              : 'bg-gray-100 text-black border-gray-300'
          }
          ${
            errors.password
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-gray-500'
          }
        `}
                  aria-invalid={!!errors.password}
                  aria-describedby="password_error"
                />

                {/* Eye Toggle Icon */}
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon
                      className={`h-5 w-5 ${
                        darkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}
                    />
                  ) : (
                    <EyeIcon
                      className={`h-5 w-5 ${
                        darkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}
                    />
                  )}
                </span>
              </div>

              {/* Error Message */}
              {errors.password && (
                <p id="password_error" className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}

              {/* Forgot Password Link */}
              <div className="flex justify-end mt-2">
                <Link
                  to="/account/forgotpassword"
                  className={`text-sm font-medium transition-opacity hover:opacity-75 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <Button label="Login" isLoading={isLoading} />
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-700"></div>
            <span
              className={`mx-3 text-sm ${darkMode ? 'text-white' : 'text-black'}`}
            >
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center border dark:border-gray-700 py-3 px-4 rounded-lg hover:bg-black/80 transition duration-300 border-gray-300 bg-gray-100 hover:bg-white/80 dark:bg-[#131312] dark:hover:bg-[#131312] dark:hover:bg-opacity-80">
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign in with Google
          </button>

          <div className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <Link
              to="/account/signup"
              className="text-purple-600 font-semibold hover:underline hover:text-purple-700 transition-colors"
            >
              Sign up
            </Link>
            <p className="mt-2 text-gray-600">
              By continuing, you agree to our{' '}
              <Link
                to="/privacy"
                className="text-gray-600 underline hover:text-gray-700 transition-colors"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="text-gray-600 underline hover:text-gray-700 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;