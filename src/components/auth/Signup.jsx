import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";

const Signup = ({ formData, handleChange, handleSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countryOptions] = useState(countryList().getData());
  const [selectedCountry, setSelectedCountry] = useState(null);
console.log(formData);
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        "https://exact-connect-latest.onrender.com/customers",
        formData
      );
      setSuccess("Signup successful! Please login.");
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    handleChange({
      target: {
        name: "countryCode",
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md ring-2 ring-gray-300 ring-offset-2">
        <form onSubmit={handleSignupSubmit}>
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
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="Enter First Name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="Enter Last Name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <Select
              name="country"
              id="country"
              options={countryOptions}
              value={selectedCountry}
              onChange={handleCountryChange}
              className="mt-1 p-2 block w-full border rounded-md"
              placeholder="Search and Select Country"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          {success && <p className="text-green-500 text-xs mt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
