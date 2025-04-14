import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../services/data';
import { Link } from 'react-router-dom';

//Dark mode
import { DarkModeContext } from '../../context/DarkModeContext';
import toast from 'react-hot-toast';
import { z } from 'zod';

//Adding the zod validation for the email
const otpVerificationSchema = z.object({
  email: z.string().min(1).email({
    message: 'Invalid email address'
  }),
  otp: z.string().min(1, {
    message: 'Enter a valid otp'
  })
})

const OTPVerification = () => {


  //The data used in the form
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  })



  const [errors, setError] = useState('');
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
    setLoading(true)

    try {
      otpVerificationSchema.parse(formData)
      setError({})
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
      className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#131312] text-black' : 'bg-white text-black'
        }`}
    >
      <div
        className={`max-w-md mx-auto p-6 rounded-lg shadow-lg ${darkMode ? 'text-white border-gray-700' : 'text-black'
          } border`}
      >
        <h2 className="text-lg font-semibold mb-4">
          Two-factor Authentication
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Please enter the authentication code. <br />
          We have sent the one time password code to your email.
        </p>
        <form onSubmit={handleOTPVerification}>
          <label
            htmlFor="email"
            className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'
              } mb-2`}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleOtpChange}
            className={`w-full h-12 mb-4 ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
              } px-4 py-2 border border-gray-600  ${errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-sm focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-gray-500'
              }`}
            aria-invalid={!!errors.email}
            aria-describedby="email_error"
          />
          {errors.email && (
            <p id="user_name_error" className="text-red-500 text-sm mb-4">
              {errors.email}
            </p>
          )}
          <div className="mb-4 relative">
            <label
              htmlFor="Otp"
              className={`mb-2 block text-sm font-medium ${darkMode ? 'text-white' : 'text-black'
                }`}
            >
              OTP
            </label>
            <div className='relative'>
              <input
                type="text"
                name='otp'
                value={formData.otp}
                autoComplete="off"
                placeholder="Enter your OTP"
                onChange={handleOtpChange}
                className={`w-full h-12 ${darkMode
                  ? 'bg-[#131312] text-white border-gray-600'
                  : 'bg-white text-black'
                  } border  rounded-lg text-center  text-lg focus:outline-none focus:ring-2 focus:ring-gray-500`}
              />
            </div>

          </div>
          {errors.otp && <p className="text-red-500 text-sm mb-4">{errors.otp}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white text-sm font-medium py-2 rounded-lg transition ${loading
              ? 'bg-[#7C25BA] cursor-not-allowed'
              : 'bg-gray-700 hover:bg-gray-600'
              }`}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-6">
          Haven't received it?{' '}
          <Link to="/resend-code" className="text-purple-500 hover:underline">
            Resend a new code.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
