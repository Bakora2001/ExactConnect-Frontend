import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API calls
import Login from "./Login";
import Signup from "./Signup";
import backgroundImage from "../../assets/login.jpg"; // Corrected relative path

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    countryCode: "",
    password: "",
  });
  const [error, setError] = useState(null); // For capturing error messages
  const [successMessage, setSuccessMessage] = useState(null); // For capturing success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e, isLoginForm) => {
    e.preventDefault();
    setError(null); // Reset any previous errors
    setSuccessMessage(null); // Reset any previous success messages

    try {
      let response;

      if (isLoginForm) {
        // Handle login
        response = await axios.post("https://exact-connect-latest.onrender.com/login", formData);
        alert("Login Successful");
        navigate("/home"); // Redirect to home page after login
      } else {
        // Handle signup
        response = await axios.post("https://exact-connect-latest.onrender.com/customers", formData);
        setSuccessMessage("Sign up successful! Please login"); // Show success message for sign up
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (err) {
      setError("Something went wrong. Please try again."); // Show error message
    }
  };

  return (
    <div
    className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Set the background image
      >
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          {isLogin ? (
            <Login formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
          ) : (
            <Signup formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
          )}

          <div className="mt-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-500 hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>

          {error && <div className="text-red-500 text-center">{error}</div>}
          {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default Auth;
