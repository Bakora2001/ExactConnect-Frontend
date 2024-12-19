import React from "react";

const Login = ({ formData, handleChange, handleSubmit }) => {
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
        Login
      </button>
    </form>
  );
};

export default Login;
