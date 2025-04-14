import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { SERVER_URL } from '../../services/data';

function AccountActivation() {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid activation token');
        return;
      }

      try {
        const response = await fetch(`${SERVER_URL}/customers/activate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Your account has been successfully activated!');
          toast.success('Account activated successfully!');
          // Automatically redirect to login page after 3 seconds
          setTimeout(() => navigate('/account/login'), 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Failed to activate account. The token may be expired or invalid.');
        }
      } catch (error) {
        console.error('Activation error:', error);
        setStatus('error');
        setMessage('An error occurred during account activation. Please try again later.');
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
            <h2 className="text-2xl font-semibold mt-4 mb-2">Activating Your Account</h2>
            <p className="text-gray-600">Please wait while we verify your account...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mt-4 mb-2 text-green-600">Account Activated!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-gray-600 mb-6">Redirecting you to login page...</p>
            <Link
              to="/account/login"
              className="inline-block bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="bg-red-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mt-4 mb-2 text-red-600">Activation Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex flex-col space-y-3">
              <Link
                to="/account/login"
                className="inline-block bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Go to Login
              </Link>
              <Link
                to="/account/signup"
                className="inline-block text-purple-600 py-2 px-4 rounded-md hover:text-purple-700 transition-colors"
              >
                Sign Up Again
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountActivation;