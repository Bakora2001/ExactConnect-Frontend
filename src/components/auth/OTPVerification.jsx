import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../data';
import { Link } from 'react-router-dom';

const OTPVerification = ({ customerId }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (/^[0-9]*$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Move to the next input field
      if (value !== '' && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Handle OTP verification and new password setting
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const otpCode = otp.join('');
      const response = await axios.post(
        `${SERVER_URL}/customers/:id/verify-otp/reset`,
        { otp: otpCode, newPassword }
      );
      console.log('Password reset successful:', response.data);
      // Handle success (e.g., show success message)
    } catch (error) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if the Verify button should be enabled
  const isVerifyDisabled = otp.some((digit) => digit === '') || loading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md mx-auto p-6  rounded-lg shadow-lg text-white border ">
      <h2 className="text-lg font-semibold mb-4">Two-factor Authentication</h2>
      <p className="text-sm text-gray-600 mb-6">
        Please enter the authentication code. <br />
        We have sent the authentication code to your email.
      </p>
      <form onSubmit={handleOTPVerification}>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              autoComplete='off'
              placeholder='○'
              onChange={(e) => handleOtpChange(e.target.value, index)}
              className="w-12 h-12 bg-white border border-gray-600 rounded-lg text-center text-white text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          ))}
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
        <Link href="/resend-code" className="text-blue-500 hover:underline">
          Resend a new code.
        </Link>
      </p>
    </div>
    </div>
    
  );
};

export default OTPVerification;
