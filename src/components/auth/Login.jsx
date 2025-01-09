import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { SERVER_URL } from '../../data';

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
  const [success, setSuccess] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

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

      const response = await fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.access_token);
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

  const handleForgotPassword = async () => {
    setForgotPassword(true);
    const newPassword = prompt('Please enter your new password:');
    if (newPassword) {
      try {
        const response = await axios.post(
          `${SERVER_URL}/customers/customers/${formData.email}/change-passwordverify-otp/reset`,
          { newPassword }
        );
        setSuccess('Password changed successfully!');
      } catch (err) {
        setError('Failed to change password. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-1 text-gray-900">Login</h2>
        <p className="text-sm text-gray-600 mb-4">to get service</p>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-purple-500'
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
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.password ? 'focus:ring-red-500' : 'focus:ring-purple-500'
              }`}
              aria-invalid={!!errors.password}
              aria-describedby="password_error"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? (
                <AiFillEyeInvisible className="h-5 w-5" />
              ) : (
                <AiFillEye className="h-5 w-5" />
              )}
            </span>
            {errors.password && (
              <p id="password_error" className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full flex items-center justify-center bg-[#7e22ce] text-white py-2 rounded-lg hover:bg-[#6b21a8] focus:outline-none focus:ring-2 focus:ring-purple-500 ${
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

        {/* Forgot Password Button */}
        <button
          onClick={handleForgotPassword}
          className="mt-4 text-xs text-blue-500 hover:underline"
        >
          {forgotPassword ? 'Set A New Password' : 'Forgot Password?'}
        </button>
      </div>
    </div>
  );
}

export default Login;
