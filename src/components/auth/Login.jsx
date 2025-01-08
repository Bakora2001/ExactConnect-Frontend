import React, { useState } from "react";
import axios from "axios";

const Login = ({ formData, handleChange, handleSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Send login data to the API
      const response = await axios.post("https://exact-connect-latest.onrender.com/login", formData);
      setSuccess("Login successful!");
      // Redirect user to dashboard or main page after successful login
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setForgotPassword(true);
    const newPassword = prompt("Please enter your new password:");
    if (newPassword) {
      try {
        const response = await axios.post(
          `https://exact-connect-latest.onrender.com/customers/customers/${formData.email}/change-passwordverify-otp/reset`,
          { newPassword }
        );
        setSuccess("Password changed successfully!");
      } catch (err) {
        setError("Failed to change password. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="bg-white p-8 pb-24 rounded-md shadow-md w-full ring-2 ring-gray-300 ring-offset-2 max-w-md">
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7e22ce] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6b21a8]"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          {success && <p className="text-green-500 text-xs mt-2">{success}</p>}
        </form>

        {/* Forgot Password Button */}
        <button
          onClick={handleForgotPassword}
          className="mt-4 text-xs text-blue-500 hover:underline"
        >
          {forgotPassword ? "Set A New Password" : "Forgot Password?"}
        </button>
      </div>
    </div>
  );
};

export default Login;
