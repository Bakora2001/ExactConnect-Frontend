import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/reusables/Navbar';
import { Loader2, Send, Clock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { SERVER_URL } from '../../services/data';
import { DarkModeContext } from '../../context/DarkModeContext';

// Form validation with Zod
const contactSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' }),
});

const ComingSoon = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { darkMode } = useContext(DarkModeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      // Format message to include the sender's email
      const formattedMessage = `Message from: ${validatedData.email}\n\n${validatedData.message}`;

      const payload = {
        recipients: [
          { name: 'ExactConnect', recipient: 'charleskibet101@gmail.com' },
          { name: 'ExactConnect', recipient: 'support@exactconnect.online' },
        ],
        subject: 'VIBE',
        body: formattedMessage, // Include formatted message with email
        deliveryMode: 'EMAIL',
        countryCode: 'KE',
      };

      const response = await fetch(`${SERVER_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to send message');

      navigate('/delivered');
      toast.success('Message sent successfully!');
      setFormData({ email: '', message: '' });
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={`h-screen flex flex-col relative overflow-hidden ${
      darkMode ? 'bg-[#0c0b08] text-gray-200' : 'bg-white text-gray-800'
    }`}>
      {/* Added margin-bottom to the NavBar container */}
      <div className="mb-8">
        <NavBar />
      </div>
      
      {/* Background elements */}
      <div className={`absolute top-0 left-0 w-full h-full ${
        darkMode 
          ? 'bg-gradient-to-br from-[#0c0b08] to-[#131312]' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-50'
      } -z-10`} />
      <div className={`absolute -top-40 -right-40 w-96 h-96 ${
        darkMode ? 'bg-primary/20' : 'bg-primary/10'
      } rounded-full blur-3xl -z-10`} />
      <div className={`absolute -bottom-40 -left-40 w-96 h-96 ${
        darkMode ? 'bg-primary/20' : 'bg-primary/10'
      } rounded-full blur-3xl -z-10`} />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl mx-auto text-center space-y-4 animate-fade-in">
          {/* Logo */}
          <div className="inline-block mb-2 mx-auto">
            <div
              className={`w-14 h-14 rounded-2xl ${
                darkMode ? 'bg-purple-700 shadow-purple-900/30' : 'bg-purple-600'
              } flex items-center justify-center 
              shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <img
                src="/assets/world_7139124.png"
                alt="ExactConnect Logo"
                className={`w-10 h-10 object-contain filter ${darkMode ? 'invert' : ''}`}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className={`text-3xl md:text-4xl font-bold ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            } tracking-tight`}>
              Request Our Services Today!
            </h1>
            <p className={`text-base ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-2xl mx-auto`}>
              We're actively setting up our automated system, but you don't have to wait! 
              Reach out to us now to request our services while we finalize the platform.
            </p>

            <div className={`flex items-center justify-center space-x-4 ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>
              <Clock className="h-5 w-5" />
              <span className="text-base font-medium">Available on Request</span>
            </div>
          </div>

          {/* Contact section */}
          <div className={`${
            darkMode ? 'bg-[#131312] border-gray-700' : 'bg-white border-gray-200'
          } border p-6 rounded-2xl shadow-md mt-4 max-w-xl mx-auto hover:shadow-lg transition-shadow duration-300`}>
            <div className={`flex items-center justify-center mb-4 ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>
              <Mail className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-bold">Contact Us</h2>
            </div>

            <p className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } mb-4`}>
              Need to get in touch with us? Send us a message and we'll get back
              to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-md border ${
                    errors.email
                      ? 'border-red-500'
                      : darkMode ? 'border-gray-600' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'focus:ring-red-500'
                      : darkMode ? 'focus:ring-purple-400' : 'focus:ring-purple-500'
                  } transition-all duration-200 ${
                    darkMode ? 'bg-[#1a1a1a] text-white placeholder-gray-500' : 'bg-white text-gray-800 placeholder-gray-400'
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby="email_error"
                />
                {errors.email && (
                  <p id="email_error" className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  name="message"
                  placeholder="What service do you need?"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full h-24 px-3 py-2 rounded-md border ${
                    errors.message
                      ? 'border-red-500'
                      : darkMode ? 'border-gray-600' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'focus:ring-red-500'
                      : darkMode ? 'focus:ring-purple-400' : 'focus:ring-purple-500'
                  } transition-all duration-200 ${
                    darkMode ? 'bg-[#1a1a1a] text-white placeholder-gray-500' : 'bg-white text-gray-800 placeholder-gray-400'
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby="message_error"
                />
                {errors.message && (
                  <p id="message_error" className="text-red-500 text-xs mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full px-3 py-2 ${
                  darkMode 
                    ? 'bg-purple-600 hover:bg-purple-700 border border-purple-500' 
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white rounded-md transition-colors duration-200 flex items-center justify-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-3 text-center ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      } text-sm`}>
        <p>© {new Date().getFullYear()} ExactConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ComingSoon;