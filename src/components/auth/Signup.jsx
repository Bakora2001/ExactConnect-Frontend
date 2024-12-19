import React from "react";
import Select from "react-select";
import countryList from "react-select-country-list"; // A utility to get all countries

const Signup = ({ formData, handleChange, handleSubmit }) => {
  const countryOptions = countryList().getData(); // Gets a list of all countries

  const handleCountryChange = (selectedOption) => {
    handleChange({
      target: {
        name: "countryCode",
        value: selectedOption.value,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
          ID Number
        </label>
        <input
          type="text"
          name="idNumber"
          id="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border rounded-md"
          placeholder="Enter ID Number"
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
        />
      </div>

      <div className="mb-4">
        <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <Select
          options={countryOptions}
          value={countryOptions.find((option) => option.value === formData.countryCode)}
          onChange={handleCountryChange}
          className="mt-1"
          placeholder="Select your country"
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
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#7e22ce] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6b21a8]"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
