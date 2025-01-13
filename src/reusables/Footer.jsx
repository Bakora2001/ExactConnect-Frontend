import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaPinterest,
} from 'react-icons/fa';

import { FaXTwitter } from 'react-icons/fa6';
import { DarkModeContext } from '../../DarkModeContext';
import { useContext } from 'react';

//Icons to toggle between dark and light mode
import Light from '../icons/Light';
import Moon from '../icons/Moon';

const Footer = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <footer className="py-10 border-t border-gray-700 bg-[#7C25BA] dark:bg-[#131312] text-white dark:text-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info Section */}
          <div>
            <img
              src="/src/assets/server-svgrepo-com.svg"
              alt="Company Logo"
              className="h-12 mb-4"
            />
            <p className="text-sm leading-relaxed">
              ExactConnect is a Trusted Online Shopping Platform for the exact
              online services for our clients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/maintainance" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/maintainance" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/maintainance" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/maintainance" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Phone: +254 728703634</li>
              <li>Email: exactconnect@gmail.com</li>
              <li>Address: Moi Avenue, 00100, Nairobi, Kenya</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition"
                aria-label="Twitter"
              >
                <FaXTwitter className="text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition"
                aria-label="TikTok"
              >
                <FaTiktok className="text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition"
                aria-label="Pinterest"
              >
                <FaPinterest className="text-white" />
              </a>
            </div>
            <div className="mt-8 flex justify-center items-center border border-gray-700 w-fit rounded-md p-1">
              <button
                onClick={toggleDarkMode}
                className="text-2xl focus:outline-none transition-colors duration-300"
              >
                {darkMode ? (
                  <Light className="text-yellow-300" />
                ) : (
                  <Moon className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-dashed border-white pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} ExactConnect. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
    </footer>
  );
};

export default Footer;
