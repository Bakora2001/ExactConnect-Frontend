import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = ({ customerId }) => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission for password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.put(`https://exact-connect-latest.onrender.com/customers/customers/${customerId}/change-password`, passwordData);
      console.log('Password Changed:', response.data);
      // Handle password change success (e.g., show a success message)
    } catch (error) {
      setError('Password change failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-purple-700 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 p-2 mt-4 rounded" disabled={loading}>
          {loading ? 'Changing Password...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
