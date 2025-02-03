import React, { useState, useContext } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
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

      const result = await response.json();
      if (response.ok) {
        toast.success('Registation successful');
        navigate('/account/login');
      } else {
        toast.error('Error');
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
      className={`min-h-screen flex w-screen h-screen items-center justify-center overflow-hidden
     ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'}`}
    >
      <div
        className={`${darkMode
          ? 'bg-[#131312] text-white border-gray-700'
          : 'bg-white text-black border-gray-100'
          } p-4 rounded-lg shadow-lg w-5/6 max-w-sm border `}
      >
        <h2 className="text-2xl font-bold mb-1 text-[#7C25BA] hover:text-[#806cff]">
          Exact
          <span className="text-[#7C25BA]   hover:text-[#fff]">Connect.</span>
        </h2>
        <p className="text-lg font-circular font-normal text-gray-600 mb-4">
          Get started
        </p>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'
                }`}
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full h-12 ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                } px-4 py-2 border border-gray-600  ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-sm focus:outline-none focus:ring-2 ${errors.firstName ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                }`}
              placeholder="John"
              aria-invalid={!!errors.firstName}
              aria-describedby="email_error"
            />
            {errors.firstName && (
              <p id="email_error" className="text-red-500 text-sm mt-1">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'
                }`}
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full h-12 px-4 py-2 border border-gray-600 ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                } ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-sm focus:outline-none focus:ring-2 ${errors.lastName ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                }`}
              aria-invalid={!!errors.lastName}
              aria-describedby="user_name_error"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p id="user_name_error" className="text-red-500 text-sm mt-1">
                {errors.lastName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'
                }`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full h-12 ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                } px-4 py-2 border border-gray-600  ${errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-sm focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                }`}
              aria-invalid={!!errors.email}
              aria-describedby="user_name_error"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p id="user_name_error" className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="country"
              className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'
                }`}
            >
              Country
            </label>
            <Select
              name="country"
              id="country"
              options={countryOptions}
              value={selectedCountry}
              onChange={handleCountryChange}
              className={`mt-1  p-2 block w-full border rounded-md ${darkMode ? 'bg-[#131312] text-black' : 'bg-white text-black'}`}
              placeholder="Search and Select Country"
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'
                }`}
            >
              Password
            </label>
            <div className="relative ">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className={`w-full h-12 px-4 py-2 border border-gray-600 ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                  } ${errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg text-sm focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                  }`}
                aria-invalid={!!errors.password}
                aria-describedby="password_error"
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-gray-500  "
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

          <button
            type="submit"
            className={`w-full bg-[#7C25BA] text-white py-2 rounded-lg flex items-center justify-center hover:bg-[#5b21a8] focus:outline-none focus:ring-2 focus:ring-gray-500 ${isLoading && 'opacity-50 cursor-not-allowed'
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
              'Create an account'
            )}
          </button>
        </form>
        <p
          className={`text-sm  mt-4 ${darkMode ? 'text-white' : 'text-black'}`}
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
