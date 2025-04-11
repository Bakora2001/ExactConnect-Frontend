import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Smartphone, Binary } from 'lucide-react';
import { SERVER_URL } from '../../services/data';
import { DarkModeContext } from '../../context/DarkModeContext';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { customerId, email } from '../../lib/userDetails';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Define phone number validation schema using Zod
const numberSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
});

// API key for currency conversion - directly set API key here or import from a config file
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key

export default function Test({ amount = 0, isp, proxyId, countryCode, rating, proxyState, onClose }) {
  // Ensure amount is a proper number
  const numAmount = parseFloat(amount) || 0;
  
  // Context and state
  const { darkMode } = useContext(DarkModeContext);
  const [paymentMethod, setPaymentMethod] = useState('MPESA');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [roundedAmount, setRoundedAmount] = useState(0);
  const [conversionLoading, setConversionLoading] = useState(true);

  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const formattedNumber = formatPhoneNumber(phoneNumber);

  // Currency conversion using the API
  useEffect(() => {
    const convertCurrency = async () => {
      if (numAmount > 0) {
        try {
          setConversionLoading(true);
          const api = API_KEY;
          const numericAmount = numAmount;
          const response = await axios.get(
            `https://api.currencybeacon.com/v1/convert?from=USD&to=KES&api_key=${api}&amount=${numericAmount}`
          );
          
          const converted = response.data.value;
          setConvertedAmount(converted);
          setRoundedAmount(Math.ceil(converted));
          console.log("API conversion response:", response.data);
        } catch (error) {
          console.error("Currency conversion failed:", error);
          // Fallback conversion in case API fails (approx 130 KES per USD)
          const fallbackRate = 130;
          const fallbackConverted = numAmount * fallbackRate;
          setConvertedAmount(fallbackConverted);
          setRoundedAmount(Math.ceil(fallbackConverted));
        } finally {
          setConversionLoading(false);
        }
      } else {
        setConvertedAmount(0);
        setRoundedAmount(0);
        setConversionLoading(false);
      }
    };

    convertCurrency();
  }, [numAmount]);

  // Log for debugging
  useEffect(() => {
    console.log("Amount passed to Test component:", numAmount);
    console.log("Converted amount:", convertedAmount);
    console.log("Rounded amount:", roundedAmount);
  }, [numAmount, convertedAmount, roundedAmount]);

  // Function to handle mpesa push submission
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

  const PaystackPaymentSubmitted = () => {
    toast(
      'Paystack Payment submitted Successfully, Enter your pin to complete the transaction',
      {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      }
    );
  };

  // Function to handle stk push success
  const MpesaStkPushSuccess = () => {
    toast.info('Mpesa STK Push Success, transaction completed successfully');
  };

  // Function to handle mpesa push fail
  const MpesaStkPushFailed = () =>
    toast.error('Mpesa Stk Push Failed, Please try again', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });

  // Handling stk push cancellation
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

    const validation = numberSchema.safeParse({ phoneNumber });
    // if (!validation.success) {
    //   setErrors(validation.error.errors[0].message);
    //   setIsLoading(false);
    //   setIsConfirming(false);
    //   setIsProcessing(false);
    //   return;
    // }
    setErrors('');

    try {
      const { data } = await axios.post(`${SERVER_URL}/payments`, {
        accountNumber: paymentMethod === 'MPESA' ? formattedNumber : email,
        amount: roundedAmount,
        description: 'test',
        mode: paymentMethod === 'MPESA' ? 'STK' : 'LINK',
        provider: paymentMethod,
        category: 'COLLECTIONS',
        countryCode: 'KE',
        currencyCode: 'KES',
        createdBy: 'tester',
        metaData: {
          proxyId: proxyId,
          rating: rating,
          proxyCountryCode: countryCode,
          isp: isp,
          proxyState: proxyState === true ? 'OLD' : 'NEW',
          amount: numAmount,
          requestedService: 'PROXIES',
          customerId: customerId,
        },
      });
      
      if (paymentMethod === 'MPESA') {
        MpesaStkPushSubmitted();
      } else {
        PaystackPaymentSubmitted();
        const checkoutUrl = data.metaData?.checkout;
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
        console.log('Paystack Response:', data.metaData);
      }
      
      setIsConfirming(false);
      setIsLoading(false);

      // Validate the transaction
      await validateTransaction(data);
    } catch (error) {
      console.error('Payment Error:', error);
      setIsLoading(false);
      setIsConfirming(false);
      MpesaStkPushFailed();
    }
  };

  const validateTransaction = async (payload) => {
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

        // Check if response contains expected data
        if (!data.content || data.content.length === 0) {
          return MpesaStkPushFailed();
        }

        // Ensure we access the correct transaction
        const transaction = Array.isArray(data.content)
          ? data.content[0]
          : data.content;

        // Normalize status
        const status = transaction?.transactionStatus?.trim().toUpperCase();
        const response = data.content;
        console.log(response);
        
        switch (status) {
          case 'ACCEPTED':
            MpesaStkPushSuccess();
            navigate('/status/success', { state: { response } });
            return;
          case 'FAILED':
            navigate('/status/failed', { state: { response } });
            return;
          case 'DECLINED':
            navigate('/status/failed', { state: { response } });
            return;
          case 'PROCESSING':
            setIsProcessing(true);
          default:
            setTimeout(checkStatus, 10000);
            break;
        }
      } catch (error) {
        setIsProcessing(false);
        MpesaStkPushFailed();
      }
    };

    setTimeout(checkStatus, 10000);
  };

  return (
    <div className={`p-4 ${darkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}>
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">
          Choose Your Payment Method
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select your preferred payment option
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <label
          className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${
            paymentMethod === 'MPESA'
              ? 'border-green-500 scale-105'
              : 'border-gray-300 hover:scale-105'
          } transition-all`}
        >
          <input
            type="radio"
            value="MPESA"
            name="paymentMethod"
            className="sr-only"
            checked={paymentMethod === 'MPESA'}
            onChange={() => setPaymentMethod('MPESA')}
          />
          <Smartphone className="h-8 w-8 text-green-500" />
          <span className="font-medium">M-Pesa</span>
        </label>

        <label
          className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${
            paymentMethod === 'PAYSTACK'
              ? 'border-blue-500 scale-105'
              : 'border-gray-300 hover:scale-105'
          } transition-all`}
        >
          <input
            type="radio"
            value="PAYSTACK"
            name="paymentMethod"
            className="sr-only"
            checked={paymentMethod === 'PAYSTACK'}
            onChange={() => setPaymentMethod('PAYSTACK')}
          />
          <Binary className="h-8 w-8 text-blue-500" />
          <span className="font-medium">Paystack</span>
        </label>
      </div>

      {conversionLoading ? (
        <div className="text-center py-2">
          <p>Converting currency...</p>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
            <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-sm">
            {numAmount > 0 
              ? `${numAmount} USD ≈ ${roundedAmount} KES`
              : 'Enter an amount to see conversion'
            }
          </p>
        </div>
      )}

      {paymentMethod === 'MPESA' && (
        <div className="mt-4">
          <label className="block text-sm font-medium">
            M-Pesa Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g 07XXXXXXXX"
            className={`w-full ${
              darkMode ? 'bg-[#2a2a2a] text-white' : ''
            } p-3 border-2 rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700`}
          />
          {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
        </div>
      )}

      {paymentMethod === 'PAYSTACK' && (
        <div className="mt-4">
          <label className="block text-sm font-medium">
            Recipient Email Address
          </label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full p-3 border-2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] dark:text-gray-300"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We'll send payment receipt details to the address above.
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isConfirming || isProcessing || conversionLoading || numAmount <= 0}
        className={`mt-6 w-full py-3 ${
          paymentMethod === 'MPESA' ? 'bg-green-600' : 'bg-blue-600'
        } text-white font-semibold rounded-lg ${
          isConfirming || isProcessing || conversionLoading || numAmount <= 0
            ? 'opacity-50 cursor-not-allowed'
            : paymentMethod === 'MPESA'
            ? 'hover:bg-green-700'
            : 'hover:bg-blue-700'
        } transition-all`}
      >
        {isConfirming
          ? 'Confirming...'
          : isProcessing
          ? 'Processing...'
          : conversionLoading
          ? 'Converting...'
          : paymentMethod === 'MPESA'
          ? `Pay ${roundedAmount} KES with M-Pesa`
          : `Pay ${roundedAmount} KES with Paystack`}
      </button>
      
      <ToastContainer />
      
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
          <p className="dark:text-white absolute">Confirming...</p>
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  );
}