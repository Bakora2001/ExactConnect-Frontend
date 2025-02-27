//Payment successful page
import { CheckCircle, ArrowRight, FileText, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
// interface PaymentSuccessProps {
//   transactionId: string;
//   amount: string;
//   phoneNumber: string;
//   paymentMethod: string;
//   date: string;
//   onViewOrder?: () => void;
//   onContinueShopping?: () => void;
// }

// {
//   transactionId,
//   amount = 200,
//   phoneNumber,
//   paymentMethod,
//   date,
//   onViewOrder,
//   onContinueShopping,
// }

export default function PaymentSuccessful() {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const getEmail = userDetails.email;
  const location = useLocation();
  const transactionData = location.state?.response || {};
  const success = transactionData[0];
  
  return (
    <ErrorBoundary >
      <div className="min-h-screen w-screen h-screen flex items-center justify-center dark:bg-[#010100]">
        <div className="w-full max-w-md mx-auto p-4">
          <div className="border border-green-200 shadow-md rounded-lg overflow-hidden dark:border-gray-700">
            <div className="bg-green-50 p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-green-700">
                  Payment Successful
                </h2>
                <p className="text-sm text-green-600 max-w-xs">
                  Thank you! Your payment has been processed successfully.
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-green-50 border border-green-100 rounded-md p-4">
                <p className="text-sm font-medium text-green-700 mb-1">
                  Transaction Complete
                </p>
                <p className="text-sm text-green-600">
                  Your payment of{' '}
                  <span className="font-semibold">{success?.amount }</span> has
                  been successfully processed.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">
                  Transaction Details
                </h3>
                <div className="space-y-2 text-sm ">
                  {['Amount', 'Payment Method', 'Phone Number'].map(
                    (label, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-white">{label}:</span>
                        <span className="font-medium">
                          {index === 0
                            ? success?.amount
                            : index === 1
                            ? success?.paymentMethod
                            : index === 2
                            ? success?.accountNumber
                            : date}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="border-t pt-4 text-center">
                <p className="text-sm font-medium text-gray-400">
                  What's Next?
                </p>
                <p className="text-sm text-gray-600">
                  You can view your order details on{' '}
                  <a
                    href={`mailto:${getEmail}`} // Open email client
                    className="text-purple-600 hover:text-purple-800 underline" // Styling
                  >
                    {getEmail}
                  </a>{' '}
                  or continue shopping.
                </p>
              </div>
            </div>

            <div className="p-6 pt-2 flex flex-col space-y-3">
              {/* Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {/* View Order Button */}
                <button
                  className="w-full border border-gray-300 rounded-md py-3 sm:py-2 flex items-center justify-center text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => window.open('https://gmail.com', '_blank')}
                >
                  <FileText className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />{' '}
                  <span className="text-sm sm:text-base">View Order</span>
                </button>

                {/* Continue Shopping Button */}
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-3 sm:py-2 flex items-center justify-center transition-colors"
                  // onClick={onContinueShopping}
                >
                  <ShoppingBag className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />{' '}
                  <span className="text-sm sm:text-base">
                    Continue Shopping
                  </span>
                </button>
              </div>

              {/* Go to Dashboard Link */}
              <a
                href="/dashboard"
                className="w-full text-purple-600 text-center py-3 sm:py-2 flex items-center justify-center group hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
              >
                <span className="text-sm sm:text-base">Go to Dashboard</span>{' '}
                <ArrowRight className="ml-2 h-5 w-5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
