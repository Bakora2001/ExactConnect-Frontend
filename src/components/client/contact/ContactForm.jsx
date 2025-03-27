import { useContext, useState } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { DarkModeContext } from '@/context/DarkModeContext';
import { z } from 'zod';
import { SERVER_URL } from '@/services/data';
import { useNavigate } from 'react-router-dom';

const contactSchema = z.object({
  name: z.string().min(1, { message: 'Full name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  message: z
    .string()
    .min(10, { message: 'Message should be at least 10 characters' }),
});

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: { value: 'help', label: 'I need help' },
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const subjectOptions = [
    { value: 'help', label: 'I need help' },
    { value: 'issue', label: 'Report an issue' },
    { value: 'feedback', label: 'Provide feedback' },
    { value: 'other', label: 'Other' },
  ];

  const selectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: darkMode ? '#131312' : '#f3f4f6',
      borderColor: isFocused ? '#7C25BA' : darkMode ? '#444' : '#ccc',
      color: darkMode ? '#fff' : '#000',
      boxShadow: isFocused ? '0 0 0 2px rgba(124, 37, 186, 0.5)' : 'none',
      '&:hover': {
        borderColor: isFocused ? '#7C25BA' : darkMode ? '#666' : '#bbb',
      },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: darkMode ? '#131312' : '#fff',
      color: darkMode ? '#fff' : '#000',
      borderRadius: '8px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    }),
    menuList: (styles) => ({
      ...styles,
      padding: 0,
      '::-webkit-scrollbar': {
        display: 'none',
      },
      scrollbarWidth: 'none',
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected
        ? '#7C25BA'
        : isFocused
        ? 'rgba(124, 37, 186, 0.1)'
        : 'transparent',
      color: isSelected ? '#fff' : darkMode ? '#ddd' : '#333',
      padding: '10px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#7C25BA',
        color: '#fff',
      },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: darkMode ? '#fff' : '#000',
    }),
    input: (styles) => ({
      ...styles,
      color: darkMode ? '#fff' : '#000',
    }),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, subject: selectedOption }));
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      contactSchema.parse({
        name: formData.name,
        email: formData.email,
        subject: formData.subject.value,
        message: formData.message,
      });
      setErrors({});

      // Construct the payload
      const payload = {
        recipients: [
          { name: 'ExactConnect', recipient: 'maxwellbakora93@gmail.com' },
          { name: 'ExactConnect', recipient: 'support@exactconnect.online' },
          { name: 'Exact Connect', recipient: 'charleskibet101@gmail.com' },
        ],
        subject: `Contact Form: ${formData.subject.label}`,
        body: `
          Name: ${formData.name}
          Email: ${formData.email}
          Subject: ${formData.subject.label}
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

      if (response.ok) {
        toast.success('Message sent successfully!');
        navigate('/delivered');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: { value: 'help', label: 'I need help' },
          message: '',
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            formattedErrors[error.path[0]] = error.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full max-w-md border shadow-sm transition-all hover:shadow-md p-6 rounded-lg ${
        darkMode ? 'border-gray-700 bg-[#131312]' : 'border-gray-100 bg-white'
      }`}
    >
      <header className="mb-6">
        <h2
          className={`text-2xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-black'
          }`}
        >
          Get in touch
        </h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          {"Fill out the form below and we'll respond as soon as possible."}
        </p>
      </header>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className={`block text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all ${
                darkMode
                  ? 'bg-[#131312] border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-black'
              } ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all ${
                darkMode
                  ? 'bg-[#131312] border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-black'
              } ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className={`block text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Subject
            </label>
            <Select
              id="subject"
              value={formData.subject}
              onChange={handleSelectChange}
              styles={selectStyles}
              options={subjectOptions}
              classNamePrefix="react-select"
              isSearchable={false}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className={`block text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all min-h-32 resize-none ${
                darkMode
                  ? 'bg-[#131312] border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-black'
              } ${errors.message ? 'border-red-500' : ''}`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : darkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500'
                : 'bg-black hover:bg-gray-800 text-white focus:ring-black'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
