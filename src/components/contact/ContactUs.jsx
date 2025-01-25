import { z } from 'zod';
import { useState, useContext } from 'react';
import Navbar from '../reusables/Navbar';
import { SERVER_URL } from '../../services/data';
import toast from 'react-hot-toast';

//Dark mode
import { DarkModeContext } from '../../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';

//Handling passing in correct mobile numbers
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

//Form validation using zode
const contactSchema = z.object({
  fullName: z.string().min(1, {
    message: 'Full name is required',
  }),
  email: z.string().min(1).email({
    message: 'Invalid email address',
  }),
  phone_number: z.string().regex(phoneRegex, 'Invalid Phone Number!'),
  message: z.string().min(10, {
    message: 'Message is should be more than 10 words',
  }),
});

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone_number: '',
    message: '',
  });

  //State to handle switching between dark and light mode
  const { darkMode } = useContext(DarkModeContext);

  //State to handle zode errors
  const [errors, setError] = useState({});

  //State to handle and disable the button when the form is submitting
  const [isLoading, setLoading] = useState(false);

  //Function to handle navigation
  const navigate = useNavigate();

  //Handling input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data using Zod
      contactSchema.parse(formData);
      setError({});

      // Construct the payload
      const payload = {
        recipients: [
          {
            name: 'ExactConnect',
            recipient: 'maxwellbakora93@gmail.com',
          },
          {
            name: 'Exact Connect',
            recipient: 'charleskibet101@gmail.com',
          },
        ],
        subject: 'VIBE',
        body: `
          Name: ${formData.fullName}
          Email: ${formData.email}
          Phone Number: ${formData.phone_number}
          Message: ${formData.message}
        `,
        deliveryMode: 'EMAIL',
        countryCode: 'KE',
      };

      // Send the data to the server
      const response = await fetch(`${SERVER_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let responseData;

      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (response.status === 200) {
        navigate('/delivered');
        toast.success('Message sent successfully!');
        setFormData({
          email: '',
          fullName: '',
          phone_number: '',
          message: '',
        });
      }
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
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
      }`}
    >
      <Navbar />
      <div className="container mx-auto py-20 px-6">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <p className="text-sm uppercase tracking-wide text-gray-600">
            Need a partner to work with?
          </p>
          <h1 className="text-4xl font-extrabold">Let's work together</h1>
          <p className="text-gray-600">
            Want learn more about our services? Let us know and a member of our
            team will reach out right away!
          </p>
          <div className="mt-6">
            <a
              href="mailto:charleskibet101@gmail.com"
              className="text-[#7C25BA] hover:underline text-lg"
            >
              charleskibet101@gmail.com
            </a>
            <div className="mt-2">
              <button
                onClick={() =>
                  navigator.clipboard.writeText('charleskibet101@gmail.com')
                }
                className="flex items-center space-x-2 bg-[#7C25BA] px-4 py-2 rounded-md  shadow-lg hover:bg-[#6a1fa0]"
              >
                <span className="text-white font-circular">Copy Email</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 12.75l3-3 3 3m-3-3v7.5m9-5.25V18.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18.75V5.25A2.25 2.25 0 016.75 3h7.5a2.25 2.25 0 012.25 2.25V8.25"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div
          className={`  ${
            darkMode
              ? 'bg-[#131312] border-gray-700'
              : 'bg-white border-gray-100'
          } p-8 rounded-lg shadow-lg max-w-4xl mx-auto border   `}
        >
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm text-gray-500">
                Your Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={`mt-2 w-full ${
                  darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                }  px-4 py-3 border border-gray-600  ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.fullName ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                }`}
                aria-invalid={!!errors.fullName}
                aria-describedby="fullName_error"
              />
              {errors.fullName && (
                <p id="email_error" className="text-red-500 text-sm mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`mt-2 w-full  px-4 py-3 border border-gray-600 ${
                  darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                } ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.email ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                }`}
                aria-invalid={!!errors.email}
                aria-describedby="fullName_error"
              />
              {errors.email && (
                <p id="email_error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-400">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="0712345678"
                className={`mt-2 w-full  px-4 py-3 border border-gray-600 ${
                  darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                } ${
                  errors.phone_number ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.phone_number
                    ? 'focus:ring-red-500'
                    : 'focus:ring-gray-500'
                }`}
                aria-invalid={!!errors.phone_number}
                aria-describedby="fullName_error"
              />
              {errors.phone_number && (
                <p id="email_error" className="text-red-500 text-sm mt-1">
                  {errors.phone_number}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-400">
                How can we help?
              </label>
              <textarea
                id="message"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className={`mt-2 w-full ${
                  darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
                } px-4 py-3 border border-gray-600  ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                } rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.message ? 'focus:ring-red-500' : 'focus:ring-gray-500'
                }`}
                aria-invalid={!!errors.message}
                aria-describedby="fullName_error"
              ></textarea>
              {errors.message && (
                <p id="email_error" className="text-red-500 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-[#7C25BA] flex items-center justify-center py-3 px-6 rounded-md text-white font-semibold hover:bg-[#6a1fa0] transition${
                isLoading && 'opacity-50 cursor-not-allowed'
              }`}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.419.876 4.623 2.334 6.291l1.666-1.666z"
                  />
                </svg>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
