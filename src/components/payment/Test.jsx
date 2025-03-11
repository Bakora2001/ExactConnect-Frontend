import { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Smartphone, Bitcoin } from 'lucide-react';
import { SERVER_URL } from '../../services/data';
import { DarkModeContext } from '../../context/DarkModeContext';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { customerId } from '../../lib/userDetails';
import { useNavigate, useLocation } from 'react-router-dom';
import Convert from './Convert';
import { z } from 'zod';

//TODO --> Check when the payment status is in processing
//Research on how we can prevent the user from reloading the page when the payment is still being confirmed

// Define phone number validation schema using Zod
const numberSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
});

export default function PaymentPage() {
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
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const formattedNumber = formatPhoneNumber(phoneNumber);

  //Function to handle mpesa push submittion
  const MpesaStkPushSubmitted = () => {
    toast(
      'Mpesa STK submitted Successfully, Enter your pin to complete the transaction',
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
  const StkPushCancelledByUser = () =>
    toast.error('StkPush was rejected by the user', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsConfirming(true);
    setIsProcessing(true);
    // Validate phone number
    const validation = numberSchema.safeParse({ phoneNumber });
    if (!validation.success) {
      setErrors(validation.error.errors[0].message);
      setIsLoading(false);
      setIsConfirming(false);
      return;
    }
    setErrors('');

    try {
      const { data } = await axios.post(`${SERVER_URL}/payments`, {
        accountNumber: formattedNumber,
        amount: convertedAmount,
        description: 'test',
        mode: 'STK',
        provider: 'MPESA',
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
          requestedService: 'PROXIES',
          customerId: customerId,
        },
      });
      // console.log('STK Push Response:', data);
      MpesaStkPushSubmitted();
      setIsConfirming(false);
      setIsLoading(false);

      // Validate the transaction
      await validateTransaction(data);
    } catch (error) {
      // console.error('STK Push Error:', error);
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

        // console.log('Full Response:', JSON.stringify(data.content, null, 2));
        // console.log(data);
        // Check if response contains expected data
        if (!data.content || data.content.length === 0) {
          // console.log('No transaction data found');
          return MpesaStkPushFailed();
        }

        // Ensure we access the correct transaction
        const transaction = Array.isArray(data.content)
          ? data.content[0]
          : data.content;
        // console.log('Transaction Status:', transaction?.transactionStatus);

        // Normalize status
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
          default:
            // console.log('Transaction Pending... Retrying in 10 seconds');
            setTimeout(checkStatus, 10000);
            break;
        }
      } catch (error) {
        // console.error('Error fetching transaction:', error);
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
          <h2 className="text-2xl md:text-3xl font-semibold">
            Choose Your Payment Method
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Select your preferred payment option.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label
            className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${
              paymentMethod === 'mpesa'
                ? 'border-green-500 scale-105'
                : 'border-gray-300 hover:scale-105'
            } transition-all`}
          >
            <input
              type="radio"
              value="mpesa"
              name="paymentMethod"
              className="sr-only"
              checked={paymentMethod === 'mpesa'}
              onChange={() => setPaymentMethod('mpesa')}
            />
            <Smartphone className="h-8 w-8 text-green-500" />
            <span className="font-medium">M-Pesa</span>
          </label>

          <label
            className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${
              paymentMethod === 'litecoin'
                ? 'border-yellow-500 scale-105'
                : 'border-gray-300 hover:scale-105'
            } transition-all`}
          >
            <input
              type="radio"
              value="litecoin"
              name="paymentMethod"
              className="sr-only"
              checked={paymentMethod === 'litecoin'}
              onChange={() => setPaymentMethod('litecoin')}
            />
            <Bitcoin className="h-8 w-8 text-yellow-500" />
            <span className="font-medium">Litecoin</span>
          </label>
        </div>

        {paymentMethod === 'mpesa' && (
          <div className="mt-6">
            <label className="block text-sm font-medium">
              M-Pesa Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g 07XXXXXXXX"
              className={`w-full ${
                darkMode ? 'bg-[#1e1e1e] text-white' : ''
              } p-3 border-2 rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700`}
            />
            {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
          </div>
        )}

        {paymentMethod === 'litecoin' && (
          <div className="mt-6">
            <label className="block text-sm font-medium">
              Litecoin Wallet Address
            </label>
            <input
              type="text"
              value="LTC1EXAMPLE123456789ABCDEFG"
              readOnly
              className="w-full p-3 border-2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] dark:text-gray-300"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Send payment to the address above.
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isConfirming || isProcessing}
          className={`mt-8 w-full py-3 ${
            paymentMethod === 'mpesa' ? 'bg-green-600' : 'bg-yellow-600'
          } text-white font-semibold rounded-lg ${
            isConfirming || isProcessing
              ? 'opacity-50 cursor-not-allowed' // Dim and disable cursor when processing
              : paymentMethod === 'mpesa'
              ? 'hover:bg-green-700'
              : 'hover:bg-yellow-700'
          } transition-all`}
        >
          {isConfirming
            ? 'Confirming...'
            : isProcessing
            ? 'Processing...'
            : paymentMethod === 'mpesa'
            ? `Pay ${roundedAmount} with M-Pesa`
            : 'Confirm Litecoin Payment'}
        </button>
        <ToastContainer />
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center  backdrop-blur-sm z-50">
            <p className="text-white absolute">Confirming...</p>
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
