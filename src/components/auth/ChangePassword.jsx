import React, { useState, useContext } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

//Dark mode
import { DarkModeContext } from '../../context/DarkModeContext';

//Base url
import { SERVER_URL } from '../../services/data';
import { useNavigate } from 'react-router-dom';

//zod from validation
const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, {
    message: 'Old password is required',
  }),
  newPassword: z.string().min(1, {
    message: 'New password is required',
  }),
});

const ChangePassword = () => {
  //Handling the data passed in using the form
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  //Accessing the customer reference from the backend
  const customerId = localStorage.getItem('customerReference');
  console.log(customerId);
  //To handle the loading state when the form is submitting
  const [isLoading, setLoading] = useState(false);

  //State to handle toggle of password
  const [showPassword, setShowPassword] = useState(false);

  //State to handle the errors from zod
  const [errors, setError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  //Function for turning the showpassord to either true or false
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //Function to handle the navigation
  const navigate = useNavigate();

  //State to manage the darkmode and light mode
  const { darkMode } = useContext(DarkModeContext);

  //Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Function to handle the form submit  const [showPassword, setShowPassword] = useState(false);tion
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data using Zod
      changePasswordSchema.parse(formData);
      setError({}); // Clear any previous errors

      // Send a request to change the password
      const response = await fetch(
        `${SERVER_URL}/customers/${customerId}/change-password`,
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
        toast.success(responseData.message || 'Navigating');
        navigate('/email');
      } else {
        throw new Error(responseData.message);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const formattedErrors = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setError(formattedErrors);
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
        <h2
          className={`text-xl font-bold mb-6  ${
            darkMode ? 'text-white' : 'text-gray-800'
          } text-center`}
        >
          Reset your password
        </h2>

        <form onSubmit={handleResetPassword}>
          <div className="mb-4 relative">
            <label
              htmlFor="oldPassword"
              className={`mb-1 block text-sm font-medium ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              Old Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="oldPassword"
                name="oldPassword"
                placeholder="********"
                value={formData.oldPassword}
                onChange={handleChange}
                className={`w-full ${
                  darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                } px-4 py-2 pr-10 border ${
                  errors.oldPassword ? 'border-red-500' : 'border-gray-600'
                } rounded-lg text-sm  focus:outline-none focus:ring-2 ${
                  errors.oldPassword
                    ? 'focus:ring-red-500'
                    : 'focus:ring-gray-500'
                }`}
                aria-invalid={!!errors.oldPassword}
                aria-describedby="password_error"
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500  "
                type="button"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiFillEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <p id="password_error" className="text-red-500 text-sm mt-1">
                {errors.oldPassword}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="newPassword"
              className={`mb-1 block text-sm font-medium ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                placeholder="********"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full ${
                  darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                } px-4 py-2 pr-10 border ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-600'
                } rounded-lg text-sm  focus:outline-none focus:ring-2 ${
                  errors.newPassword
                    ? 'focus:ring-red-500'
                    : 'focus:ring-gray-500'
                }`}
                aria-invalid={!!errors.newPassword}
                aria-describedby="password_error"
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500  "
                type="button"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiFillEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p id="password_error" className="text-red-500 text-sm mt-1">
                {errors.newPassword}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-[#7C25BA] text-white rounded-md hover:bg-[#5b21a8]   ${
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
                'Reset'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
