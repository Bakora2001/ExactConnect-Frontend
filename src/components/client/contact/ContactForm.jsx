import { useContext, useState } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { DarkModeContext } from '@/context/DarkModeContext';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState({
    value: 'help',
    label: 'I need help',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const selectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: darkMode ? '#131312' : '#f3f4f6', // Light gray for better contrast
      borderColor: isFocused ? '#7C25BA' : darkMode ? '#444' : '#ccc', // Highlight border on focus
      color: darkMode ? '#fff' : '#000',
      boxShadow: isFocused ? '0 0 0 2px rgba(124, 37, 186, 0.5)' : 'none', // Subtle focus effect
      '&:hover': {
        borderColor: isFocused ? '#7C25BA' : darkMode ? '#666' : '#bbb',
      },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: darkMode ? '#131312' : '#fff',
      color: darkMode ? '#fff' : '#000',
      borderRadius: '8px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for better visibility
      overflow: 'hidden', // Prevents scrollbar from appearing
    }),
    menuList: (styles) => ({
      ...styles,
      padding: 0,
      '::-webkit-scrollbar': {
        display: 'none', // Hides scrollbar for Webkit browsers
      },
      scrollbarWidth: 'none', // Hides scrollbar for Firefox
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
  };

  const subjectOptions = [
    { value: 'help', label: 'I need help' },
    { value: 'issue', label: 'Report an issue' },
    { value: 'feedback', label: 'Provide feedback' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Your message has been sent', {
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setName('');
      setEmail('');
      setSubject({ value: 'help', label: 'I need help' });
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md border border-gray-100 shadow-sm transition-all hover:shadow-md p-6 rounded-lg dark:border-gray-700">
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Get in touch</h2>
        <p className="text-gray-600">
          {"Fill out the form below and we'll respond as soon as possible."}
        </p>
      </header>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all dark:bg-[#131312] dark:border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all dark:bg-[#131312] dark:border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <Select
              id="subject"
              value={subject}
              onChange={setSubject}
              styles={selectStyles}
              options={subjectOptions}
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable={false}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all min-h-32 resize-none dark:bg-[#131312] dark:border-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-black hover:bg-black/90 text-white py-2 px-4 border  rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#131312]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
