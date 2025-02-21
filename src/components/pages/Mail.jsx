import { Mail } from 'lucide-react';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkModeContext';

export default function MailConfirmation() {
  const { darkMode } = useContext(DarkModeContext);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const getEmail = userDetails.email;
  console.log(getEmail);

  return (
    <div
      className={`min-h-screen flex items-center justify-center  dark:bg-[#010100]`}
    >
      <div className="w-full max-w-md p-8 dark:bg-[#010100] rounded-xl shadow-lg text-center space-y-6 border border-gray-700">
        <div className="mx-auto w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center">
          <Mail className="w-10 h-10 text-white" />
        </div>

        {/* Text Section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-white">Check Your Email</h1>
          <p className="text-sm text-gray-600">
            {"We've sent the proxy details to your email "}
            <span className="font-medium text-purple-600">{getEmail}</span>
          </p>
        </div>

        {/* Open Gmail Button */}
        <button
          className="w-full flex items-center justify-center gap-2 h-12 px-4 bg-[#010100] border border-gray-700 rounded-lg shadow-sm hover:bg-[#131312] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => window.open('https://gmail.com', '_blank')}
        >
          <img
            src="https://www.google.com/gmail/about/static/images/logo-gmail.png?cache=1adba63"
            alt="Gmail logo"
            className="w-5 h-4 object-contain"
          />
          <span className="text-sm font-medium text-gray-500">Open Gmail</span>
          <svg
            className="w-4 h-4 ml-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>

        {/* Additional Help Text */}
        {/* <p className="text-xs text-gray-500">
          Didn't receive the email? Check your spam folder or{' '}
          <button
            className="text-blue-600 hover:underline focus:outline-none"
            onClick={() => alert('Resend email functionality here')}
          >
            resend the email
          </button>
          .
        </p> */}
      </div>
    </div>
  );
}
