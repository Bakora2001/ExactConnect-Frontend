import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../services/data';
import { Link } from 'react-router-dom';

//Dark mode
import { DarkModeContext } from '../../context/DarkModeContext';
import toast from 'react-hot-toast';

const OTPVerification = () => {
  // Retrieve the customer ID from localStorage
  const customerId = localStorage.getItem('customerReference');

  // State for OTP and other inputs
  const [otp, setOtp] = useState(''); // Single string to capture dynamic OTP
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  // Handle OTP input change
  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow alphanumeric characters
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setOtp(value);
    }
  };

  // Handle OTP verification and new password setting
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = { otp };

    try {
      const response = await fetch(
        `${SERVER_URL}/customers/${customerId}/verify-otp/reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
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
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Check if the Verify button should be enabled
  const isVerifyDisabled = otp === '' || loading;

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-[#131312] text-black' : 'bg-white text-black'
      }`}
    >
      <div
        className={`max-w-md mx-auto p-6 rounded-lg shadow-lg ${
          darkMode ? 'text-white' : 'text-black'
        } border`}
      >
        <h2 className="text-lg font-semibold mb-4">
          Two-factor Authentication
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Please enter the authentication code. <br />
          We have sent the authentication code to your email.
        </p>
        <form onSubmit={handleOTPVerification}>
          <div className="flex justify-center gap-2 mb-6">
            <input
              type="text"
              value={otp}
              autoComplete="off"
              placeholder="Enter your OTP"
              onChange={handleOtpChange}
              className="w-full h-12 bg-white border border-gray-600 rounded-lg text-center text-black text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isVerifyDisabled}
            className={`w-full text-white text-sm font-medium py-2 rounded-lg transition ${
              isVerifyDisabled
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
