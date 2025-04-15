import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Binary, Check } from 'lucide-react';
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

// Fixed conversion rate - 1 USD = 130 KES
const FIXED_CONVERSION_RATE = 130;

export default function Test({ amount = 0, isp, proxyId, countryCode, rating, proxyState, onClose }) {
  // Ensure amount is a proper number
  const numAmount = parseFloat(amount) || 0;
  
  // Context and state
  const { darkMode } = useContext(DarkModeContext);
  const [paymentMethod, setPaymentMethod] = useState('PAYSTACK');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [roundedAmount, setRoundedAmount] = useState(0);
  const [conversionLoading, setConversionLoading] = useState(true);
  const [paystackCheckoutUrl, setPaystackCheckoutUrl] = useState('');
  const [showPaystackIframe, setShowPaystackIframe] = useState(false);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const formattedNumber = formatPhoneNumber(phoneNumber);

  // Currency conversion using fixed rate instead of API
  useEffect(() => {
    if (numAmount > 0) {
      // Simulate a brief loading state for UX consistency
      setTimeout(() => {
        const converted = numAmount * FIXED_CONVERSION_RATE;
        setConvertedAmount(converted);
        setRoundedAmount(Math.ceil(converted));
        setConversionLoading(false);
      }, 300);
    } else {
      setConvertedAmount(0);
      setRoundedAmount(0);
      setConversionLoading(false);
    }
  }, [numAmount]);

  // Log for debugging
  useEffect(() => {
    console.log("Amount passed to Test component:", numAmount);
    console.log("Converted amount:", convertedAmount);
    console.log("Rounded amount:", roundedAmount);
    console.log("Customer ID being used:", customerId);
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
      'Paystack Payment initiated, you will be redirected to complete the transaction',
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

    // Ensure customer ID is available
    if (!customerId) {
      console.error("Customer ID is missing or undefined");
      toast.error("Customer identification is missing. Please login again.");
      setIsLoading(false);
      setIsConfirming(false);
      setIsProcessing(false);
      return;
    }

    const validation = numberSchema.safeParse({ phoneNumber });
    setErrors('');

    try {
      console.log("Sending payment request with customer ID:", customerId);
      
      // Clear payment metadata object with all required fields
      const paymentMetadata = {
        proxyId: proxyId,
        rating: rating,
        proxyCountryCode: countryCode,
        isp: isp,
        proxyState: proxyState === true ? 'OLD' : 'NEW',
        amount: numAmount,
        requestedService: 'PROXIES',
        customerId: customerId, // Ensure this is properly set
        email: email // Add email as a fallback
      };
      
      console.log("Payment metadata:", paymentMetadata);
      
      const { data } = await axios.post(`${SERVER_URL}/payments`, {
        accountNumber: paymentMethod === 'MPESA' ? formattedNumber : email,
        amount: roundedAmount,
        description: `Proxy purchase - ${countryCode} - ${isp}`,
        mode: paymentMethod === 'MPESA' ? 'STK' : 'LINK',
        provider: paymentMethod,
        category: 'COLLECTIONS',
        countryCode: 'KE',
        currencyCode: 'KES',
        createdBy: customerId,
        metaData: paymentMetadata,
      });
      
      console.log("Payment response:", data);
      
      if (paymentMethod === 'MPESA') {
        MpesaStkPushSubmitted();
      } else {
        PaystackPaymentSubmitted();
        const checkoutUrl = data.metaData?.checkout;
        if (checkoutUrl) {
          setPaystackCheckoutUrl(checkoutUrl);
          setShowPaystackIframe(true);
          // For better UX, we'll embed the checkout rather than redirect
          // window.location.href = checkoutUrl;
        } else {
          console.error("No checkout URL received from Paystack");
          toast.error("Payment gateway error. Please try again.");
        }
        console.log('Paystack Response:', data.metaData);
      }
      
      setIsConfirming(false);
      
      // Only validate the transaction for MPESA
      // For Paystack, we'll handle via callback or iframe events
      if (paymentMethod === 'MPESA') {
        await validateTransaction(data);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      setIsLoading(false);
      setIsConfirming(false);
      setIsProcessing(false);
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        toast.error(error.response.data.message || 'Payment processing failed. Please try again.');
      } else {
        toast.error('Payment service unavailable. Please try again later.');
      }
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
          setIsProcessing(false);
          setIsLoading(false);
          return MpesaStkPushFailed();
        }

        // Ensure we access the correct transaction
        const transaction = Array.isArray(data.content)
          ? data.content[0]
          : data.content;

        // Normalize status
        const status = transaction?.transactionStatus?.trim().toUpperCase();
        const response = data.content;
        console.log("Transaction status:", status);
        console.log("Transaction data:", response);
        
        switch (status) {
          case 'ACCEPTED':
            setIsProcessing(false);
            setIsLoading(false);
            MpesaStkPushSuccess();
            navigate('/status/success', { state: { response } });
            return;
          case 'FAILED':
            setIsProcessing(false);
            setIsLoading(false);
            navigate('/status/failed', { state: { response } });
            return;
          case 'DECLINED':
            setIsProcessing(false);
            setIsLoading(false);
            navigate('/status/failed', { state: { response } });
            return;
          case 'PROCESSING':
            setIsProcessing(true);
            setTimeout(checkStatus, 5000); // Check again in 5 seconds
            break;
          default:
            setTimeout(checkStatus, 5000); // Check again in 5 seconds
            break;
        }
      } catch (error) {
        console.error("Error validating transaction:", error);
        setIsProcessing(false);
        setIsLoading(false);
        MpesaStkPushFailed();
      }
    };

    // Start checking status after a brief delay
    setTimeout(checkStatus, 5000);
  };

  // Handle Paystack iframe close
  const handlePaystackClose = () => {
    setShowPaystackIframe(false);
    setIsLoading(false);
    setIsProcessing(false);
  };

  // Handle successful payment from Paystack
  const handlePaystackSuccess = () => {
    toast.success("Payment successful! You will receive proxy details via email.");
    setShowPaystackIframe(false);
    setIsLoading(false);
    setIsProcessing(false);
    
    // Navigate to success page
    navigate('/status/success', { 
      state: { 
        response: {
          message: "Payment completed successfully",
          provider: "PAYSTACK",
          amount: roundedAmount,
          currency: "KES"
        } 
      } 
    });
  };

  return (
    <div className={`p-3 ${darkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}>
      <div className="text-center mb-3">
        <h2 className="text-lg font-semibold">
          🌍 ExactConnect Accepts Payments Worldwide!
        </h2>
      </div>

      {/* Show Paystack iframe if available */}
      {showPaystackIframe && paystackCheckoutUrl ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white rounded-lg w-full max-w-xl h-5/6 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">Complete Your Payment</h3>
              <button 
                onClick={handlePaystackClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1">
              <iframe 
                src={paystackCheckoutUrl} 
                className="w-full h-full border-0"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="mb-3">
        <div className={`p-3 rounded-lg border-2 border-blue-500 transition-all`}>
          <div className="flex items-center mb-2">
            <Binary className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="font-medium">Paystack</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-1 mb-2 text-xs">
            <div className="flex items-start">
              <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
              <span>Pay securely with your Visa, Mastercard, or Verve from anywhere in the world</span> 
            </div>
            <div className="flex items-start">
              <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
              <span>Complete your transaction within seconds</span>
            </div>
            <div className="flex items-start">
              <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
              <span>Accepts both local and international payments</span>
            </div>
            <div className="flex items-start">
              <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
              <span>M-Pesa option available (where supported)</span>
            </div>
          </div>
        </div>
      </div>

      {conversionLoading ? (
        <div className="text-center py-1">
          <p className="text-xs">Converting currency...</p>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
            <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="text-center py-1">
          <p className="text-xs">
            {numAmount > 0 
              ? `${numAmount} USD ≈ ${roundedAmount} KES`
              : 'Enter an amount to see conversion'
            }
          </p>
        </div>
      )}

      <div className="mt-2">
        <label className="block text-xs font-medium">
          Recipient Email Address
        </label>
        <input
          type="text"
          value={email}
          readOnly
          className="w-full p-2 border-2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] dark:text-gray-300 text-sm"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          We'll send proxy details and payment receipt to the address above.
        </p>
      </div>

      <div className="mt-2">
        <label className="block text-xs font-medium">
          Customer ID
        </label>
        <input
          type="text"
          value={customerId || "Not logged in"}
          readOnly
          className="w-full p-2 border-2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] dark:text-gray-300 text-sm"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Your customer ID will be used to link this purchase to your account.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isConfirming || isProcessing || conversionLoading || numAmount <= 0 || !customerId}
        className={`mt-3 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg text-sm ${
          isConfirming || isProcessing || conversionLoading || numAmount <= 0 || !customerId
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-blue-700'
        } transition-all`}
      >
        {isConfirming
          ? 'Confirming...'
          : isProcessing
          ? 'Processing...'
          : conversionLoading
          ? 'Converting...'
          : !customerId
          ? 'Please login first'
          : `Pay ${roundedAmount} KES with Paystack`}
      </button>
      
      <ToastContainer />
      
      {isLoading && !showPaystackIframe && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
          <p className="dark:text-white absolute">Confirming...</p>
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  );
}