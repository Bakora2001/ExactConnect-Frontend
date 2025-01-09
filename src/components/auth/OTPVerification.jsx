import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../data';

const OTPVerification = ({ customerId }) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'otp') {
      setOtp(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  // Handle OTP verification and new password setting
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${SERVER_URL}/customers/customers/${customerId}/change-passwordverify-otp/reset`,
        { otp, newPassword }
      );
      console.log('Password reset successful:', response.data);
      // Handle success (e.g., show success message)
    } catch (error) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-purple-700 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">OTP Verification</h2>
      <form onSubmit={handleOTPVerification}>
        <div className="mb-4">
          <label htmlFor="otp" className="block">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 p-2 mt-4 rounded"
          disabled={loading}
        >
          {loading ? 'Verifying OTP...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
