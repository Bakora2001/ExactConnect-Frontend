import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MailIcon } from 'lucide-react';
import { DarkModeContext } from '../../context/DarkModeContext';

function CheckMail() {
  const location = useLocation();
  const email = location.state?.email || 'your email';
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#0c0b08] text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg ${darkMode ? 'bg-[#131312] border-gray-700' : 'bg-white border-gray-200'} border`}>
        <div className="text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-100">
            <MailIcon size={32} className="text-purple-600" />
          </div>
          
          <h2 className="mt-6 text-2xl font-bold">Check your email</h2>
          
          <p className="mt-3 text-sm text-gray-500">
            We've sent an activation link to <strong>{email}</strong>
          </p>
          
          <p className="mt-4 text-sm text-gray-500">
            Please check your email and click on the activation link to activate your account.
          </p>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className="text-sm">
              <span className="block mb-1 font-medium">Didn't receive the email?</span>
              Check your spam folder or try again with a different email address.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link
              to="/account/signup"
              className="text-center py-2 px-4 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
            >
              Try with a different email
            </Link>
            
            <Link
              to="/account/login"
              className="text-center py-2 px-4 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckMail;