//For allowing the user to check open email
import React from 'react';
import { Link } from 'react-router-dom';

const CheckMail = () => {
  return (
    <div className="flex items-center justify-center min-h-screen h-screen w-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg border w-5/6 text-center max-w-sm">
        <img
          src="public/icons8-unread-messages-100.png"
          alt="Mail Icon"
          className="mx-auto mb-6"
        />
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Check your mail
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We’ve sent a one time password to your email{' '}
          {/* <span className="font-semibold text-gray-800">marina@gmail.com</span> */}
        </p>

        <Link
          to="/otp"
          // target="_blank"
          className="flex items-center justify-center w-full py-3 bg-[#7C25BA] text-white rounded-md hover:bg-[#5b21a8] focus:outline-none"
        >
          Input OTP
        </Link>
      </div>
    </div>
  );
};

export default CheckMail;
