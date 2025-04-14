import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import Button from '../reusables/Button';
import TestimonialSidebar from '../reusables/TestimonialSidebar';

//Dark mode
import { DarkModeContext } from '../../context/DarkModeContext';

//Base url
import { SERVER_URL } from '../../services/data';

//Zod form validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setError] = useState({});

  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  //Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      loginSchema.parse(formData);
      setError({});

      const response = await fetch(`${SERVER_URL}/customers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.customerReference && !result.customerId) {
        throw new Error('No customer ID received from server');
      }

      // Standardize customer ID format
      const customerId = result.customerReference || result.customerId;
      
      // Create complete user object with standardized fields
      const userData = {
        customerReference: customerId,
        customerId: customerId,
        email: result.email,
        firstName: result.firstName || '',
        lastName: result.lastName || '',
        name: result.firstName && result.lastName 
          ? `${result.firstName} ${result.lastName}` 
          : result.firstName || result.email.split('@')[0]
      };

      // Clear any previous user data to avoid conflicts
      localStorage.removeItem('userDetails');
      localStorage.removeItem('user_data');
      
      // Store the new user data
      localStorage.setItem('userDetails', JSON.stringify(userData));
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      // Set auth token
      localStorage.setItem('auth_token', result.token || 'demo-token');
      
      toast.success('Login successful');
      navigate('/dashboard');
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
        console.error('Login error:', err);
        toast.error(err.message || 'Invalid credentials.');
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
              className={`mx-3 text-sm ${
                darkMode ? 'text-white' : 'text-black'
              }`}
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
            {`Don't have an account? `}
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


// import { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { z } from 'zod';
// import { toast } from 'react-hot-toast';
// import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
// import Button from '../reusables/Button';
// import TestimonialSidebar from '../reusables/TestimonialSidebar';

// //Dark mode
// import { DarkModeContext } from '../../context/DarkModeContext';

// //Base url
// import { SERVER_URL } from '../../services/data';

// //Zod form validation
// const loginSchema = z.object({
//   email: z.string().email({ message: 'Invalid email address' }),
//   password: z.string().min(1, { message: 'Password is required' }),
// });

// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [isLoading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setError] = useState({});

//   const navigate = useNavigate();
//   const { darkMode } = useContext(DarkModeContext);

//   //Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       loginSchema.parse(formData);
//       setError({});

//       const response = await fetch(`${SERVER_URL}/customers/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         // Check if this is a verification issue
//         if (result.code === 'ACCOUNT_NOT_VERIFIED') {
//           toast.error('Your account is not verified. Please check your email for the otp.');
//           navigate('/account/email', { state: { email: formData.email } });
//           return;
//         }
//         throw new Error(result.message || `Error ${response.status}: ${response.statusText}`);
//       }

//       if (!result.customerReference && !result.customerId) {
//         throw new Error('No customer ID received from server');
//       }

//       // Standardize customer ID format
//       const customerId = result.customerReference || result.customerId;
      
//       // Create complete user object with standardized fields
//       const userData = {
//         customerReference: customerId,
//         customerId: customerId,
//         email: result.email,
//         firstName: result.firstName || '',
//         lastName: result.lastName || '',
//         name: result.firstName && result.lastName 
//           ? `${result.firstName} ${result.lastName}` 
//           : result.firstName || result.email.split('@')[0]
//       };

//       // Clear any previous user data to avoid conflicts
//       localStorage.removeItem('userDetails');
//       localStorage.removeItem('user_data');
      
//       // Store the new user data
//       localStorage.setItem('userDetails', JSON.stringify(userData));
//       localStorage.setItem('user_data', JSON.stringify(userData));
      
//       // Set auth token
//       localStorage.setItem('auth_token', result.token || 'demo-token');
      
//       toast.success('Login successful');
//       navigate('/dashboard');
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
//         console.error('Login error:', err);
//         toast.error(err.message || 'Invalid credentials.');
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

//           <div className="text-center text-sm mt-6">
//             {`Don't have an account? `}
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