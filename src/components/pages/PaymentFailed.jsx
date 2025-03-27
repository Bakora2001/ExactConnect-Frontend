import { useState } from "react";
import {
  XCircle,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  MessageSquareText,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function PaymentFailed() {
  const location = useLocation();
  const transactionData = location.state?.response || {};
  const errors = transactionData[0];
  const [isRetrying, setIsRetrying] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsRetrying(false);
      // Add your retry logic here
    }, 1000);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-[#010100]">
      <div className="w-full max-w-md mx-auto p-4">
        {/* Card Container */}
        <div className="border border-red-200 rounded-lg shadow-md bg-white dark:bg-[#010100] dark:border-gray-700">
          {/* Card Header */}
          <div className="bg-red-50 dark:bg-red-950/40 rounded-t-lg p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
                <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-red-700 dark:text-red-300">
                Payment Failed
              </h2>
              <p className="text-sm text-red-600/80 dark:text-red-400/80 max-w-xs">
                {`We couldn't process your payment. Please check the details and
                try again.`}
              </p>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-6">
            {/* Error Message */}
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-md p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                  Error: {errors?.transactionStatus}
                </p>
                <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
                  {errors?.providerDescription}
                </p>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Transaction Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Amount:
                  </span>
                  <span className="font-medium">{errors?.amount} KES</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Payment Method:
                  </span>
                  <span className="font-medium">{errors?.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Phone Number:
                  </span>
                  <span className="font-medium">{errors?.accountNumber}</span>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Accordion */}
            <div className="w-full">
              <button
                onClick={toggleAccordion}
                className="w-full flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Troubleshooting Tips
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    isAccordionOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isAccordionOpen && (
                <div className="text-sm space-y-2 text-gray-600 dark:text-gray-400 list-disc pl-5 ">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Check if you have sufficient funds in your account</li>
                    <li>Verify your phone number is correct</li>
                    <li>
                      {`Ensure you're responding to the payment prompt on your
                      phone`}
                    </li>
                    <li>Check if you have any daily transaction limits</li>
                    <li>Try again after a few minutes</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-6 pt-2">
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Go Back Button */}
              <Link to="/checkout/mpesa">
                <button className="w-full flex items-center justify-center p-2 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:border-gray-700">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </button>
              </Link>

              {/* Try Again Button */}
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="w-full flex items-center justify-center p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isRetrying ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Try Again
              </button>
            </div>

            {/* Contact Support Button */}
            <button
              // onClick={onContactSupport}
              className="w-full flex items-center justify-center p-2 mt-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <MessageSquareText className="mr-2 h-4 w-4" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
