import { motion } from 'framer-motion';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import Sidebar from '../reusable/Sidebar';
import { useState } from 'react';
import { userDetails } from '../../../lib/userDetails';
import { AlignJustify, X } from 'lucide-react';
import UserMenu from '../reusable/UserMenu';

const Contact = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0c0b08] transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10" onClick={toggleSidebar} />
      )}

      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'blur-sm pointer-events-none md:blur-0 md:pointer-events-auto' : ''
        } md:ml-64`}
      >
        {/* Header with menu button and user menu */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-[#0c0b08]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <AlignJustify className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <div className="flex-1 flex justify-end">
            <UserMenu userDetails={userDetails} />
          </div>
        </header>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-16">
          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16 text-center md:text-left"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto md:mx-0">
              Have a question, need help with an issue, or want to provide feedback? 
              Our team is here to assist you.
            </p>
          </motion.div>

          {/* Contact form and info grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center md:justify-end"
            >
              <div className="w-full max-w-md">
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center md:justify-start"
            >
              <div className="w-full max-w-md">
                <ContactInfo />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;