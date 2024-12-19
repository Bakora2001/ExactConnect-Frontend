import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerCustomer } from "../../services/api";
import Navbar from "../../reusables/Navbar";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, isLoginForm) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      if (isLoginForm) {
        await loginUser(formData);
        alert("Login Successful");
        navigate("/home");
      } else {
        await registerCustomer(formData);
        setSuccessMessage("Sign up successful");
        navigate("/login");
      }
    } catch (err) {
      setError(`${isLoginForm ? "Login" : "Sign up"} Failed: ${err.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-white py-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-semibold text-center mb-6">
            {isLogin ? "Login to Your Account" : "Create an Account"}
          </h2>
          {successMessage && (
            <div className="text-green-500 text-center mb-4">{successMessage}</div>
          )}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {isLogin ? (
            <Login
              formData={formData}
              handleChange={handleChange}
              handleSubmit={(e) => handleSubmit(e, true)}
            />
          ) : (
            <Signup
              formData={formData}
              handleChange={handleChange}
              handleSubmit={(e) => handleSubmit(e, false)}
            />
          )}
          <p className="text-center mt-4">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  className="text-[#7e22ce] font-semibold hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className="text-[#7e22ce] font-semibold hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;
