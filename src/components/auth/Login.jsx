import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

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
  const [errors, setError] = useState('');

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

      const result = await response.json();
      if (response.ok) {
        navigate('/');
        localStorage.setItem('customerReference', result.customerReference);
        toast.success('Login successsful');
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
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-screen h-screen flex items-center justify-center ${
        darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
      }`}
    >
      <div
        className={`${
          darkMode
            ? 'bg-[#131312] text-white border-gray-700'
            : 'bg-white text-black border-gray-100'
        } p-6 rounded-lg shadow-lg w-5/6 max-w-sm border `}
      >
        <h2 className="text-2xl font-normal font-circular mb-6  hover:text-[#7C25BA]">
          Welcome Back
        </h2>
        <h2 className="text-2xl font-bold  text-gray-700">Login</h2>
        <p className="text-sm text-gray-600 mb-4">Sign in to your account</p>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full ${
                darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
              } px-4 py-2 border border-gray-600  ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-gray-500'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby="email_error"
            />
            {errors.email && (
              <p id="user_name_error" className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>
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
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className={`w-full ${
                  darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                } px-4 py-2 pr-10 border ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                } rounded-lg text-sm  focus:outline-none focus:ring-2 ${
                  errors.password ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                }`}
                aria-invalid={!!errors.password}
                aria-describedby="password_error"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-300"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiFillEye className="h-5 w-5" />
                )}
              </span>
            </div>

            <div className="flex justify-end mt-2 text-gray-600">
              <Link
                to="/account/forgotpassword"
                className="text-sm font-medium text-muted-foreground hover:opacity-75"
              >
                Forgot password?
              </Link>
            </div>

            {errors.password && (
              <p id="password_error" className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full flex items-center justify-center bg-[#7C25BA] text-white py-2 rounded-lg hover:bg-[#5b21a8] focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              isLoading && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
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
              'Login'
            )}
          </button>
        </form>

        <p
          className={`text-sm  mt-4 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Don't have an account?{' '}
          <Link
            to="/account/signup"
            className="text-[#7C25BA] font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
