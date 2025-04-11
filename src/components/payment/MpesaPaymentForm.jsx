import { useState } from 'react';
import { Smartphone, Binary, X } from 'lucide-react';
import axios from 'axios';

// Format phone number utility function
const formatPhoneNumber = (phoneNumber) => {
  // Remove non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Check if it's a Kenyan number
  if (cleaned.length >= 9) {
    // Add country code if needed
    if (cleaned.startsWith('0')) {
      return `254${cleaned.substring(1)}`;
    } else if (!cleaned.startsWith('254')) {
      return `254${cleaned}`;
    }
  }
  
  return cleaned;
};

const SERVER_URL = 'https://exact-connect-latest.onrender.com';
const customerId = "demo_user";
const email = "user@example.com";

// Simple converter function (to be replaced with actual implementation)
const convertAmount = (amount) => {
  // Default exchange rate fallback
  const rate = 160; 
  return Math.ceil(parseFloat(amount) * rate);
};

const MpesaPaymentForm = ({ 
  amount, 
  isp, 
  proxyId, 
  countryCode, 
  rating, 
  proxyState,
  onClose
}) => {
  const [paymentMethod, setPaymentMethod] = useState('MPESA');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState('');
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  
  // Convert and round the amount
  const roundedAmount = convertAmount(amount);
  const formattedNumber = formatPhoneNumber(phoneNumber);

  // Simple validation function
  const validatePhoneNumber = (phone) => {
    if (!phone || phone.length < 10) {
      return 'Phone number must be at least 10 digits';
    }
    return '';
  };

  // Simple toast function
  const showToast = (message, type = "default") => {
    setToast({ message, type, visible: true });
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToast({ message: '', type: '', visible: false });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsConfirming(true);
    setIsProcessing(true);

    const validationError = validatePhoneNumber(phoneNumber);
    if (validationError) {
      setErrors(validationError);
      setIsLoading(false);
      setIsConfirming(false);
      setIsProcessing(false);
      return;
    }
    setErrors('');

    try {
      const { data } = await axios.post(`${SERVER_URL}/payments`, {
        accountNumber: paymentMethod === 'MPESA' ? formattedNumber : email,
        amount: roundedAmount,
        description: 'Proxy purchase',
        mode: paymentMethod === 'MPESA' ? 'STK' : 'LINK',
        provider: paymentMethod,
        category: 'COLLECTIONS',
        countryCode: 'KE',
        currencyCode: 'KES',
        createdBy: customerId,
        metaData: {
          proxyId: proxyId,
          rating: rating,
          proxyCountryCode: countryCode,
          isp: isp,
          proxyState: proxyState === true ? 'OLD' : 'NEW',
          amount: amount,
          requestedService: 'PROXIES',
          customerId: customerId,
        },
      });

      if (paymentMethod === 'MPESA') {
        showToast('Mpesa STK submitted successfully. Enter your PIN to complete the transaction.');
      } else {
        showToast('Paystack payment link generated. You will be redirected.');
        
        // If using Paystack redirect to checkout URL but in same tab
        if (data.metaData && data.metaData.checkout) {
          window.open(data.metaData.checkout, "_blank");
        }
      }
      
      setIsConfirming(false);
      setIsLoading(false);

      // Start tracking payment status
      await validateTransaction(data);
    } catch (error) {
      console.error('Payment submission error:', error);
      setIsLoading(false);
      setIsConfirming(false);
      showToast('Payment request failed. Please try again.', 'error');
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

        if (!data.content || data.content.length === 0) {
          showToast('Could not verify payment status. Please try again.', 'error');
          setIsProcessing(false);
          return;
        }

        const transaction = Array.isArray(data.content) ? data.content[0] : data.content;
        const status = transaction?.transactionStatus?.trim().toUpperCase();
        
        switch (status) {
          case 'ACCEPTED':
            showToast('Payment successful!', 'success');
            setIsProcessing(false);
            onClose();
            break;
          case 'FAILED':
          case 'DECLINED':
            showToast('Payment was declined or failed. Please try again.', 'error');
            setIsProcessing(false);
            break;
          case 'PROCESSING':
            setIsProcessing(true);
            // Check again in 10 seconds
            setTimeout(checkStatus, 10000);
            break;
          default:
            // Check again in 10 seconds for any other status
            setTimeout(checkStatus, 10000);
            break;
        }
      } catch (error) {
        console.error('Error checking transaction status:', error);
        setIsProcessing(false);
        showToast('Could not verify payment status. Please try again.', 'error');
      }
    };

    // Start checking status after a brief delay
    setTimeout(checkStatus, 10000);
  };

  return (
    <div className="p-4">
      {/* Custom toast component */}
      {toast.visible && (
        <div 
          className={`fixed top-4 right-4 p-3 rounded-md shadow-md z-50 animate-in fade-in slide-in-from-top-5 duration-300 ${
            toast.type === 'error' ? 'bg-red-100 text-red-800 border-l-4 border-red-500' : 
            toast.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 
            'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Complete Your Payment</h2>
        <button 
          className="p-1 rounded-full hover:bg-gray-200 transition-colors" 
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Choose Your Payment Method</h3>
        <p className="text-sm text-gray-600">
          Select your preferred payment option
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <label
          className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${
            paymentMethod === 'MPESA'
              ? 'border-green-500 bg-green-50 scale-105'
              : 'border-gray-300 hover:border-green-300 hover:bg-green-50 hover:scale-105'
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
          <Smartphone className="h-8 w-8 text-green-500 mb-2" />
          <span className="font-medium">M-Pesa</span>
        </label>

        <label
          className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${
            paymentMethod === 'PAYSTACK'
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:scale-105'
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
          <Binary className="h-8 w-8 text-blue-500 mb-2" />
          <span className="font-medium">Paystack</span>
        </label>
      </div>

      {paymentMethod === 'MPESA' && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            M-Pesa Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g 07XXXXXXXX"
            className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
          {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
        </div>
      )}

      {paymentMethod === 'PAYSTACK' && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full p-3 border rounded-md border-gray-300 bg-gray-100"
          />
          <p className="text-sm text-gray-500 mt-1">
            We'll send payment receipt details to this email address.
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isConfirming || isProcessing}
        className={`mt-6 w-full py-3 ${
          paymentMethod === 'MPESA' ? 'bg-green-600' : 'bg-blue-600'
        } text-white font-semibold rounded-lg ${
          isConfirming || isProcessing
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
          : paymentMethod === 'MPESA'
          ? `Pay ${roundedAmount} KES with M-Pesa`
          : `Pay ${amount} USD with Paystack`}
      </button>

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-purple-900 font-medium">Processing payment...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MpesaPaymentForm;