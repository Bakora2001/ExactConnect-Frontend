import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Send, Clock, Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { SERVER_URL } from "../../services/data";

// Form validation with Zod
const contactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

const ComingSoon = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      const payload = {
        recipients: [
          { name: 'ExactConnect', recipient: 'charleskibet101@gmail.com' },
          { name: 'ExactConnect', recipient: 'support@exactconnect.online' },
        ],
        subject: "VIBE",
        body: validatedData.message,
        deliveryMode: "EMAIL",
        countryCode: "KE",
      };

      const response = await fetch(`${SERVER_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send message");

      navigate("/delivered");
      toast.success("Message sent successfully!");
      setFormData({ email: "", message: "" });
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden dark:bg-[#0c0b08]">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#0c0b08] dark:to-[#131312] -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 dark:bg-primary/20" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 dark:bg-primary/20" />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl mx-auto text-center space-y-10 animate-fade-in">
          {/* Logo */}
          <div className="inline-block mb-4 mx-auto">
            <div
              className="w-16 h-16 rounded-2xl  bg-primary flex items-center justify-center 
      shadow-lg hover:shadow-xl transition-shadow duration-300 
      dark:bg-primary/90 dark:shadow-[rgba(255,255,255,0.3)]"
            >
              <img
                src="/assets/world_7139124.png"
                alt="ExactConnect Logo"
                className="w-12 h-12 object-contain filter invert"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-purple-600 dark:text-purple-400 tracking-tight">
              Coming Soon
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {` We're working hard to bring you something amazing. Our website is
              under construction, but we're almost there.`}
            </p>

            <div className="flex items-center justify-center space-x-4 text-primary dark:text-purple-400">
              <Clock className="h-6 w-6" />
              <span className="text-lg font-medium">Launching Soon</span>
            </div>
          </div>

          {/* Contact section */}
          <div className="bg-white dark:bg-[#131312] border dark:border-gray-700 p-8 rounded-2xl shadow-md mt-10 max-w-xl mx-auto hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6 text-primary dark:text-purple-400">
              <Mail className="h-6 w-6 mr-2" />
              <h2 className="text-2xl font-bold">Contact Us</h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {` Need to get in touch with us? Send us a message and we'll get back
              to you as soon as possible.`}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "focus:ring-red-500"
                      : "focus:ring-primary dark:focus:ring-purple-400"
                  } transition-all duration-200 dark:bg-[#1a1a1a] dark:text-white`}
                  aria-invalid={!!errors.email}
                  aria-describedby="email_error"
                />
                {errors.email && (
                  <p id="email_error" className="text-red-500  text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full h-32 px-4 py-2 rounded-md border ${
                    errors.message
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } focus:outline-none focus:ring-2 ${
                    errors.message
                      ? "focus:ring-red-500"
                      : "focus:ring-primary dark:focus:ring-purple-400"
                  } transition-all duration-200 dark:bg-[#1a1a1a] dark:text-white`}
                  aria-invalid={!!errors.message}
                  aria-describedby="message_error"
                />
                {errors.message && (
                  <p id="message_error" className="text-red-500 text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center bg-purple-600 dark:hover:bg-purple-700 dark:border dark:border-purple-600 ${
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
      <footer className="py-6 text-center text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} ExactConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ComingSoon;
