import React, { useState, useContext } from 'react';
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiLock,
  FiGlobe,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Button from '../reusables/Button';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import countryList from 'react-select-country-list';
import { z } from 'zod';
import toast from 'react-hot-toast';

//Dark mode
import { DarkModeContext } from '../../context/DarkModeContext';

//Base url
import { SERVER_URL } from '../../services/data';

//Form validation using zod
const registerSchema = z.object({
  email: z.string().min(1).email({
    message: 'Invalid email address',
  }),
  firstName: z.string().min(1, {
    message: 'First name is required',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required',
  }),
  countryCode: z.string().min(1, {
    message: 'Country is required',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must include at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must include at least one lowercase letter',
    }),
});

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    countryCode: '',
    password: '',
  });

  const [errors, setError] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countryOptions] = useState(countryList().getData());
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  //Selecting country
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    handleChange({
      target: {
        name: 'countryCode',
        value: selectedOption ? selectedOption.value : '',
      },
    });
  };

  const selectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: darkMode ? '#131312' : '#f3f4f6', // Light gray for better contrast
      borderColor: isFocused ? '#7C25BA' : darkMode ? '#444' : '#ccc', // Highlight border on focus
      color: darkMode ? '#fff' : '#000',
      boxShadow: isFocused ? '0 0 0 2px rgba(124, 37, 186, 0.5)' : 'none', // Subtle focus effect
      '&:hover': {
        borderColor: isFocused ? '#7C25BA' : darkMode ? '#666' : '#bbb',
      },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: darkMode ? '#131312' : '#fff',
      color: darkMode ? '#fff' : '#000',
      borderRadius: '8px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for better visibility
      overflow: 'hidden', // Prevents scrollbar from appearing
    }),
    menuList: (styles) => ({
      ...styles,
      padding: 0,
      '::-webkit-scrollbar': {
        display: 'none', // Hides scrollbar for Webkit browsers
      },
      scrollbarWidth: 'none', // Hides scrollbar for Firefox
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? '#7C25BA'
        : isFocused
        ? 'rgba(124, 37, 186, 0.1)'
        : 'transparent',
      color: isSelected ? '#fff' : darkMode ? '#ddd' : '#333',
      padding: '10px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#7C25BA',
        color: '#fff',
      },
    }),
  };

  //Handling input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Handling toggling password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //Form submittion part
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      registerSchema.parse(formData);
      setError({});

      const response = await fetch(`${SERVER_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          countryCode: formData.countryCode,
          password: formData.password,
        }),
      });
      //Check the content-type header
      const contentType = response.headers.get('Content-Type');
      let result;
      let errorMessage;
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else if (contentType && contentType.includes('text/plain')) {
        errorMessage = await response.text();
      }

      if (response.ok) {
        localStorage.setItem(
          'userDetails',
          JSON.stringify({
            customerReference: result.customerReference,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
          })
        );
        toast.success('Registation successful');
        navigate('/dashboard');
      } else {
        toast.error(errorMessage);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setError(formattedErrors);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-[#0c0b08] text-white' : 'bg-white text-black'
      }`}
    >
      <div
        className={`${
          darkMode
            ? 'bg-[#131312] text-white border-gray-700'
            : 'bg-white text-black border-gray-100'
        } p-4 rounded-lg shadow-lg w-5/6 max-w-sm border`}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-1 text-[#7C25BA] hover:text-[#806cff]">
            Exact
            <span className="text-[#7C25BA] hover:text-[#fff]">Connect.</span>
          </h2>
          <p className="text-lg font-circular font-normal text-gray-600 mb-4">
            Enter your information to get started
          </p>
        </div>

        <form onSubmit={onSubmit}>
          {/* First Name and Last Name side by side */}
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className={`block text-sm font-medium ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              >
                First Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full h-12 pl-10 pr-4 py-2 border ${
                    darkMode
                      ? 'bg-[#131312] text-white border-gray-600'
                      : 'bg-gray-100 text-black border-gray-300'
                  } ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                    errors.firstName
                      ? 'focus:ring-red-500'
                      : 'focus:ring-gray-500'
                  }`}
                  placeholder="John"
                  aria-invalid={!!errors.firstName}
                  aria-describedby="email_error"
                />
              </div>
              {errors.firstName && (
                <p id="email_error" className="text-red-500 text-sm mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className={`block text-sm font-medium ${
                  darkMode ? 'text-white' : 'text-black'
                }`}
              >
                Last Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full h-12 pl-10 pr-4 py-2 border ${
                    darkMode
                      ? 'bg-[#131312] text-white border-gray-600'
                      : 'bg-gray-100 text-black border-gray-300'
                  } ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                    errors.lastName
                      ? 'focus:ring-red-500'
                      : 'focus:ring-gray-500'
                  }`}
                  placeholder="Doe"
                  aria-invalid={!!errors.lastName}
                  aria-describedby="user_name_error"
                />
              </div>
              {errors.lastName && (
                <p id="user_name_error" className="text-red-500 text-sm mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full h-12 pl-10 pr-4 py-2 border ${
                  darkMode
                    ? 'bg-[#131312] text-white border-gray-600'
                    : 'bg-gray-100 text-black border-gray-300'
                } ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.email ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                }`}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby="user_name_error"
              />
            </div>
            {errors.email && (
              <p id="user_name_error" className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Country Field */}
          <div className="mb-4">
            <label
              htmlFor="country"
              className={`block text-sm font-medium ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              Country
            </label>
            <div className="relative">
              <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Select
                name="country"
                id="country"
                styles={selectStyles}
                options={countryOptions}
                value={selectedCountry}
                onChange={handleCountryChange}
                className={`mt-1 p-2 block w-full border rounded-md ${
                  darkMode
                    ? 'bg-[#131312] text-black border-gray-700'
                    : 'bg-white text-black'
                }`}
                placeholder="Search and Select Country"
              />
            </div>
            {errors.countryCode && (
              <p id="user_name_error" className="text-red-500 text-sm mt-1">
                {errors.countryCode}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className={`w-full h-12 pl-10 pr-4 py-2 border ${
                  darkMode
                    ? 'bg-[#131312] text-white border-gray-600'
                    : 'bg-gray-100 text-black border-gray-300'
                } ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.password ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                }`}
                aria-invalid={!!errors.password}
                aria-describedby="password_error"
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p id="password_error" className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>
          {/* Create Account Button */}
          <Button label="Create an account" isLoading={isLoading} />

          <button
            type="button"
            className="w-full dark:text-white mt-4 bg-white text-black py-2 rounded-lg flex items-center justify-center border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-[#131312] dark:hover:bg-[#131312] dark:hover:bg-opacity-80 dark:border-gray-700"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign up with Google
          </button>
        </form>

        <p
          className={`text-center text-sm mt-4 ${
            darkMode ? 'text-white' : 'text-black'
          }`}
        >
          Already have an account?{' '}
          <Link
            to="/account/login"
            className="text-[#7C25BA] font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
