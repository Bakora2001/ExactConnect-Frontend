import { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { SERVER_URL } from '../../services/data';
import { DarkModeContext } from '../../context/DarkModeContext';

import { customerId, email } from '../../lib/userDetails';
import { useNavigate, useLocation } from 'react-router-dom';
import Convert from './Convert';

//TODO --> Check when the payment status is in processing
//Research on how we can prevent the user from reloading the page when the payment is still being confirmed

// Define phone number validation schema using Zod

export default function PaymentStack() {
  const location = useLocation();

  // Accessing state from navigation
  const amount = location.state?.amount || 0;
  const isp = location.state?.isp;
  const countryCode = location.state?.countryCode;
  const id = location.state?.proxyId;
  const rating = location.state?.rating;
  const proxyState = location.state?.proxyState;

  // Convert and round the amount
  const convertedAmount = Convert(amount);
  const roundedAmount = Math.ceil(convertedAmount);

  //Context and state
  const { darkMode } = useContext(DarkModeContext);
  const paymentMethod = 'PAYSTACK';
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setErrors] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const navigate = useNavigate();

  //Function to handle mpesa push submittion
  // const MpesaStkPushSubmitted = () => {
  //   toast(
  //     'Mpesa STK submitted Successfully, Enter your pin to complete the transaction',
  //     {
  //       position: 'top-center',
  //       autoClose: 2000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //     }
  //   );
  // };

  const PaystackPaymentSubmitted = () => {
    toast(
      'Payment submitted Successfully, Choose your preferred method of payment',
      {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      }
    );
  };

  //Function to handle stk push success
  const MpesaStkPushSuccess = () => {
    toast.info('Mpesa STK Push Success,transaction completed successfully');
  };

  //Function to handle mpesa push fail
  const MpesaStkPushFailed = () =>
    toast.error('Mpesa Stk Push Failed, Please try again', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });

  //Handling stk push cancellation
  // const StkPushCancelledByUser = () =>
  //   toast.error('StkPush was rejected by the user', {
  //     position: 'top-center',
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsConfirming(true);
    setIsProcessing(true);

    setErrors('');

    try {
      const { data } = await axios.post(`${SERVER_URL}/payments`, {
        accountNumber: email,
        amount: roundedAmount,
        description: 'test',
        mode: 'LINK',
        provider: 'PAYSTACK',
        category: 'COLLECTIONS',
        countryCode: 'KE',
        currencyCode: 'KES',
        createdBy: 'tester',
        metaData: {
          proxyId: id,
          rating: rating,
          proxyCountryCode: countryCode,
          isp: isp,
          proxyState: proxyState === true ? 'OLD' : 'NEW',
          amount: amount,
          requestedService: 'PROXIES',
          customerId: customerId,
        },
      });

      PaystackPaymentSubmitted();

      const checkoutUrl = data.metaData.checkout;

      window.location.href = checkoutUrl;

      console.log('Paystack Response:', data.metaData.checkout);

      setIsConfirming(false);
      setIsLoading(false);

      // Validate the transaction
      await validateTransaction(data);
    } catch (error) {
      console.error('STK Push Error:', error);
      setIsLoading(false);
      setIsConfirming(false);
      MpesaStkPushFailed();
    }
  };

  const validateTransaction = async (payload) => {
    // console.log('Transaction Payload:', payload);

    const checkStatus = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/payments/search`, {
          params: {
            countryCode: 'KE',
            currencyCode: 'KES',
            paymentId: payload.paymentId,
            transactionStatus: payload.transactionStatus,
          },
        });

        if (!data.content || data.content.length === 0) {
          return MpesaStkPushFailed();
        }

        // Ensure we access the correct transaction
        const transaction = Array.isArray(data.content)
          ? data.content[0]
          : data.content;

        const status = transaction?.transactionStatus?.trim().toUpperCase();
        const response = data.content;
        console.log(response);
        switch (status) {
          case 'ACCEPTED':
            // console.log('Transaction Successful');
            MpesaStkPushSuccess();
            navigate('/status/success', { state: { response } });
            return;
          case 'FAILED':
            // console.log('Transaction cancelled by user');
            navigate('/status/failed', { state: { response } });
            return;
          case 'DECLINED':
            // console.log('Transaction cancelled by user');

            navigate('/status/failed', { state: { response } });
            return;
          case 'PROCESSING':
            // console.log('Transaction cancelled by user');
            setIsProcessing(true);
            break;
          default:
            // console.log('Transaction Pending... Retrying in 10 seconds');
            setTimeout(checkStatus, 10000);
            break;
        }
      } catch (error) {
        console.error('Error fetching transaction:', error);
        setIsProcessing(false);
        MpesaStkPushFailed();
      }
    };

    setTimeout(checkStatus, 10000);
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 ${
        darkMode ? 'bg-[#131312] text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div
        className={`w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg ${
          darkMode ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'
        } border transition-all ease-in-out duration-300`}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Checkout</h2>
        </div>

        {paymentMethod === 'PAYSTACK' && (
          <div className="mt-6">
            <label className="block text-sm font-medium">
              Recipient Email Address
            </label>
            <input
              type="text"
              value={email}
              readOnly
              className="w-full p-3 border-2 rounded-md border border-gray-600  bg-[#131312]"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {
                " We'll send payment receipt details to the  email address above."
              }
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isConfirming || isProcessing}
          className={`mt-8 w-full py-3 ${
            paymentMethod === 'MPESA' ? 'bg-green-600' : 'bg-blue-600'
          } text-white font-semibold rounded-lg ${
            isConfirming || isProcessing
              ? 'opacity-50 cursor-not-allowed' // Dim and disable cursor when processing
              : paymentMethod === 'MPESA'
              ? 'hover:bg-green-700'
              : 'hover:bg-blue-700'
          } transition-all`}
        >
          {isConfirming
            ? 'Confirming...'
            : isProcessing
            ? 'Processing...'
            : paymentMethod === 'MPESA'
            ? `Pay ${roundedAmount} with M-Pesa`
            : `Total amount ${roundedAmount} `}
        </button>
        <ToastContainer />
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center  backdrop-blur-sm z-50">
            <p className="dark:text-white absolute ">Confirming...</p>
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
