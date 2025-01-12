import React, { useState } from 'react';
import { SERVER_URL } from '../../data';
import { z } from 'zod';
import { Link } from 'react-router-dom';

//Email validation
const forgotePasswordSchema = z.object({
  email: z.string().min(1).email({
    message: 'Invalid email address',
  }),
});

function  ChangePassword  ()  {
  const [formData, setPasswordData] = useState({
    email: '',
  });
  const [errors, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for password change
  // const handleChangePassword = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   try {
  //     const response = await axios.put(
  //       `${SERVER_URL}/customers/customers/${customerId}/change-password`,
  //       formData
  //     );
  //     console.log('Password Changed:', response.data);
  //     // Handle password change success (e.g., show a success message)
  //   } catch (error) {
  //     setError('Password change failed. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      forgotePasswordSchema.parse(formData);
      setError({});

      const response = await fetch(`${SERVER_URL}/customers/customers/${customerId}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          
        }),
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setError(formattedErrors);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md mx-auto p-6  rounded-lg shadow-lg text-white border ">
        <h2 className="text-lg font-semibold mb-4 text-black">Forgot Password</h2>
        <p className="text-sm text-gray-700 mb-6">
          Enter your registered email and we will send you a link to reset your
          password.
        </p>
        <form onSubmit={onSubmit}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
              onChange={handleChange}
              className={`w-full bg-white px-4 py-2 border border-gray-600 text-white ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-gray-500'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby="email_error"
            />
            {errors.email && (
              <p id="user_name_error" className="text-red-500 text-sm mb-4">
                {errors.email}
              </p>
            )}
         
          <button
            type="submit"
            className="w-full bg-[#7C25BA] text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-600 transition mt-4"
          >
            Continue
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
