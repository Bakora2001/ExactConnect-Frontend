// // import { useState, useContext, useEffect } from 'react';
// // import axios from 'axios';
// // import { ToastContainer, toast } from 'react-toastify';
// // import { Smartphone, Binary } from 'lucide-react';
// // import { SERVER_URL } from '../../services/data';
// // import { DarkModeContext } from '../../context/DarkModeContext';
// // import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
// // import { customerId, email } from '../../lib/userDetails';
// // import { useNavigate } from 'react-router-dom';
// // import { z } from 'zod';

// // // Define phone number validation schema using Zod
// // const numberSchema = z.object({
// //   phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
// // });

// // // API key for currency conversion - directly set API key here or import from a config file
// // const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key

// // export default function Test({ amount = 0, isp, proxyId, countryCode, rating, proxyState, onClose }) {
// //   // Ensure amount is a proper number
// //   const numAmount = parseFloat(amount) || 0;
  
// //   // Context and state
// //   const { darkMode } = useContext(DarkModeContext);
// //   const [paymentMethod, setPaymentMethod] = useState('MPESA');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [errors, setErrors] = useState('');
// //   const [isConfirming, setIsConfirming] = useState(false);
// //   const [convertedAmount, setConvertedAmount] = useState(0);
// //   const [roundedAmount, setRoundedAmount] = useState(0);
// //   const [conversionLoading, setConversionLoading] = useState(true);

// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const navigate = useNavigate();

// //   const formattedNumber = formatPhoneNumber(phoneNumber);

// //   // Currency conversion using the API
// //   useEffect(() => {
// //     const convertCurrency = async () => {
// //       if (numAmount > 0) {
// //         try {
// //           setConversionLoading(true);
// //           const api = API_KEY;
// //           const numericAmount = numAmount;
// //           const response = await axios.get(
// //             `https://api.currencybeacon.com/v1/convert?from=USD&to=KES&api_key=${api}&amount=${numericAmount}`
// //           );
          
// //           const converted = response.data.value;
// //           setConvertedAmount(converted);
// //           setRoundedAmount(Math.ceil(converted));
// //           console.log("API conversion response:", response.data);
// //         } catch (error) {
// //           console.error("Currency conversion failed:", error);
// //           // Fallback conversion in case API fails (approx 130 KES per USD)
// //           const fallbackRate = 130;
// //           const fallbackConverted = numAmount * fallbackRate;
// //           setConvertedAmount(fallbackConverted);
// //           setRoundedAmount(Math.ceil(fallbackConverted));
// //         } finally {
// //           setConversionLoading(false);
// //         }
// //       } else {
// //         setConvertedAmount(0);
// //         setRoundedAmount(0);
// //         setConversionLoading(false);
// //       }
// //     };

// //     convertCurrency();
// //   }, [numAmount]);

// //   // Log for debugging
// //   useEffect(() => {
// //     console.log("Amount passed to Test component:", numAmount);
// //     console.log("Converted amount:", convertedAmount);
// //     console.log("Rounded amount:", roundedAmount);
// //   }, [numAmount, convertedAmount, roundedAmount]);

// //   // Function to handle mpesa push submission
// //   const MpesaStkPushSubmitted = () => {
// //     toast(
// //       'Mpesa STK submitted Successfully, Enter your pin to complete the transaction',
// //       {
// //         position: 'top-center',
// //         autoClose: 2000,
// //         hideProgressBar: true,
// //         closeOnClick: true,
// //         pauseOnHover: false,
// //       }
// //     );
// //   };

// //   const PaystackPaymentSubmitted = () => {
// //     toast(
// //       'Paystack Payment submitted Successfully, Enter your pin to complete the transaction',
// //       {
// //         position: 'top-center',
// //         autoClose: 2000,
// //         hideProgressBar: true,
// //         closeOnClick: true,
// //         pauseOnHover: false,
// //       }
// //     );
// //   };

// //   // Function to handle stk push success
// //   const MpesaStkPushSuccess = () => {
// //     toast.info('Mpesa STK Push Success, transaction completed successfully');
// //   };

// //   // Function to handle mpesa push fail
// //   const MpesaStkPushFailed = () =>
// //     toast.error('Mpesa Stk Push Failed, Please try again', {
// //       position: 'top-center',
// //       autoClose: 2000,
// //       hideProgressBar: true,
// //       closeOnClick: true,
// //       pauseOnHover: false,
// //     });

// //   // Handling stk push cancellation
// //   const StkPushCancelledByUser = () =>
// //     toast.error('StkPush was rejected by the user', {
// //       position: 'top-center',
// //       autoClose: 2000,
// //       hideProgressBar: true,
// //       closeOnClick: true,
// //       pauseOnHover: false,
// //     });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setIsConfirming(true);
// //     setIsProcessing(true);

// //     const validation = numberSchema.safeParse({ phoneNumber });
// //     // if (!validation.success) {
// //     //   setErrors(validation.error.errors[0].message);
// //     //   setIsLoading(false);
// //     //   setIsConfirming(false);
// //     //   setIsProcessing(false);
// //     //   return;
// //     // }
// //     setErrors('');

// //     try {
// //       const { data } = await axios.post(`${SERVER_URL}/payments`, {
// //         accountNumber: paymentMethod === 'MPESA' ? formattedNumber : email,
// //         amount: roundedAmount,
// //         description: 'test',
// //         mode: paymentMethod === 'MPESA' ? 'STK' : 'LINK',
// //         provider: paymentMethod,
// //         category: 'COLLECTIONS',
// //         countryCode: 'KE',
// //         currencyCode: 'KES',
// //         createdBy: 'tester',
// //         metaData: {
// //           proxyId: proxyId,
// //           rating: rating,
// //           proxyCountryCode: countryCode,
// //           isp: isp,
// //           proxyState: proxyState === true ? 'OLD' : 'NEW',
// //           amount: numAmount,
// //           requestedService: 'PROXIES',
// //           customerId: customerId,
// //         },
// //       });
      
// //       if (paymentMethod === 'MPESA') {
// //         MpesaStkPushSubmitted();
// //       } else {
// //         PaystackPaymentSubmitted();
// //         const checkoutUrl = data.metaData?.checkout;
// //         if (checkoutUrl) {
// //           window.location.href = checkoutUrl;
// //         }
// //         console.log('Paystack Response:', data.metaData);
// //       }
      
// //       setIsConfirming(false);
// //       setIsLoading(false);

// //       // Validate the transaction
// //       await validateTransaction(data);
// //     } catch (error) {
// //       console.error('Payment Error:', error);
// //       setIsLoading(false);
// //       setIsConfirming(false);
// //       MpesaStkPushFailed();
// //     }
// //   };

// //   const validateTransaction = async (payload) => {
// //     const checkStatus = async () => {
// //       try {
// //         const { data } = await axios.get(`${SERVER_URL}/payments/search`, {
// //           params: {
// //             countryCode: 'KE',
// //             currencyCode: 'KES',
// //             paymentId: payload.paymentId,
// //             transactionStatus: payload.transactionStatus,
// //           },
// //         });

// //         // Check if response contains expected data
// //         if (!data.content || data.content.length === 0) {
// //           return MpesaStkPushFailed();
// //         }

// //         // Ensure we access the correct transaction
// //         const transaction = Array.isArray(data.content)
// //           ? data.content[0]
// //           : data.content;

// //         // Normalize status
// //         const status = transaction?.transactionStatus?.trim().toUpperCase();
// //         const response = data.content;
// //         console.log(response);
        
// //         switch (status) {
// //           case 'ACCEPTED':
// //             MpesaStkPushSuccess();
// //             navigate('/status/success', { state: { response } });
// //             return;
// //           case 'FAILED':
// //             navigate('/status/failed', { state: { response } });
// //             return;
// //           case 'DECLINED':
// //             navigate('/status/failed', { state: { response } });
// //             return;
// //           case 'PROCESSING':
// //             setIsProcessing(true);
// //           default:
// //             setTimeout(checkStatus, 10000);
// //             break;
// //         }
// //       } catch (error) {
// //         setIsProcessing(false);
// //         MpesaStkPushFailed();
// //       }
// //     };

// //     setTimeout(checkStatus, 10000);
// //   };

// //   return (
// //     <div className={`p-4 ${darkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}>
// //       <div className="text-center mb-6">
// //         <h2 className="text-xl font-semibold">
// //           Choose Your Payment Method
// //         </h2>
// //         <p className="text-sm text-gray-600 dark:text-gray-400">
// //           Select your preferred payment option
// //         </p>
// //       </div>

// //       <div className="grid grid-cols-2 gap-4 mb-6">
// //         <label
// //           className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${
// //             paymentMethod === 'MPESA'
// //               ? 'border-green-500 scale-105'
// //               : 'border-gray-300 hover:scale-105'
// //           } transition-all`}
// //         >
// //           <input
// //             type="radio"
// //             value="MPESA"
// //             name="paymentMethod"
// //             className="sr-only"
// //             checked={paymentMethod === 'MPESA'}
// //             onChange={() => setPaymentMethod('MPESA')}
// //           />
// //           <Smartphone className="h-8 w-8 text-green-500" />
// //           <span className="font-medium">M-Pesa</span>
// //         </label>

// //         <label
// //           className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${
// //             paymentMethod === 'PAYSTACK'
// //               ? 'border-blue-500 scale-105'
// //               : 'border-gray-300 hover:scale-105'
// //           } transition-all`}
// //         >
// //           <input
// //             type="radio"
// //             value="PAYSTACK"
// //             name="paymentMethod"
// //             className="sr-only"
// //             checked={paymentMethod === 'PAYSTACK'}
// //             onChange={() => setPaymentMethod('PAYSTACK')}
// //           />
// //           <Binary className="h-8 w-8 text-blue-500" />
// //           <span className="font-medium">Paystack</span>
// //         </label>
// //       </div>

// //       {conversionLoading ? (
// //         <div className="text-center py-2">
// //           <p>Converting currency...</p>
// //           <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
// //             <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="text-center py-2">
// //           <p className="text-sm">
// //             {numAmount > 0 
// //               ? `${numAmount} USD ≈ ${roundedAmount} KES`
// //               : 'Enter an amount to see conversion'
// //             }
// //           </p>
// //         </div>
// //       )}

// //       {paymentMethod === 'MPESA' && (
// //         <div className="mt-4">
// //           <label className="block text-sm font-medium">
// //             M-Pesa Phone Number
// //           </label>
// //           <input
// //             type="text"
// //             value={phoneNumber}
// //             onChange={(e) => setPhoneNumber(e.target.value)}
// //             placeholder="e.g 07XXXXXXXX"
// //             className={`w-full ${
// //               darkMode ? 'bg-[#2a2a2a] text-white' : ''
// //             } p-3 border-2 rounded-md border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700`}
// //           />
// //           {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
// //         </div>
// //       )}

// //       {paymentMethod === 'PAYSTACK' && (
// //         <div className="mt-4">
// //           <label className="block text-sm font-medium">
// //             Recipient Email Address
// //           </label>
// //           <input
// //             type="text"
// //             value={email}
// //             readOnly
// //             className="w-full p-3 border-2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] dark:text-gray-300"
// //           />
// //           <p className="text-sm text-gray-500 dark:text-gray-400">
// //             We'll send payment receipt details to the address above.
// //           </p>
// //         </div>
// //       )}

// //       <button
// //         onClick={handleSubmit}
// //         disabled={isConfirming || isProcessing || conversionLoading || numAmount <= 0}
// //         className={`mt-6 w-full py-3 ${
// //           paymentMethod === 'MPESA' ? 'bg-green-600' : 'bg-blue-600'
// //         } text-white font-semibold rounded-lg ${
// //           isConfirming || isProcessing || conversionLoading || numAmount <= 0
// //             ? 'opacity-50 cursor-not-allowed'
// //             : paymentMethod === 'MPESA'
// //             ? 'hover:bg-green-700'
// //             : 'hover:bg-blue-700'
// //         } transition-all`}
// //       >
// //         {isConfirming
// //           ? 'Confirming...'
// //           : isProcessing
// //           ? 'Processing...'
// //           : conversionLoading
// //           ? 'Converting...'
// //           : paymentMethod === 'MPESA'
// //           ? `Pay ${roundedAmount} KES with M-Pesa`
// //           : `Pay ${roundedAmount} KES with Paystack`}
// //       </button>
      
// //       <ToastContainer />
      
// //       {isLoading && (
// //         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
// //           <p className="dark:text-white absolute">Confirming...</p>
// //           <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-purple-500"></div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }





// import { useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { Binary, Check } from 'lucide-react';
// import { SERVER_URL } from '../../services/data';
// import { DarkModeContext } from '../../context/DarkModeContext';
// import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
// import { customerId, email } from '../../lib/userDetails';
// import { useNavigate } from 'react-router-dom';
// import { z } from 'zod';

// // Define phone number validation schema using Zod
// const numberSchema = z.object({
//   phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
// });

// // Fixed conversion rate - 1 USD = 130 KES
// const FIXED_CONVERSION_RATE = 130;

// export default function Test({ amount = 0, isp, proxyId, countryCode, rating, proxyState, onClose }) {
//   // Ensure amount is a proper number
//   const numAmount = parseFloat(amount) || 0;
  
//   // Context and state
//   const { darkMode } = useContext(DarkModeContext);
//   const [paymentMethod, setPaymentMethod] = useState('PAYSTACK');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errors, setErrors] = useState('');
//   const [isConfirming, setIsConfirming] = useState(false);
//   const [convertedAmount, setConvertedAmount] = useState(0);
//   const [roundedAmount, setRoundedAmount] = useState(0);
//   const [conversionLoading, setConversionLoading] = useState(true);

//   const [phoneNumber, setPhoneNumber] = useState('');
//   const navigate = useNavigate();

//   const formattedNumber = formatPhoneNumber(phoneNumber);

//   // Currency conversion using fixed rate instead of API
//   useEffect(() => {
//     if (numAmount > 0) {
//       // Simulate a brief loading state for UX consistency
//       setTimeout(() => {
//         const converted = numAmount * FIXED_CONVERSION_RATE;
//         setConvertedAmount(converted);
//         setRoundedAmount(Math.ceil(converted));
//         setConversionLoading(false);
//       }, 300);
//     } else {
//       setConvertedAmount(0);
//       setRoundedAmount(0);
//       setConversionLoading(false);
//     }
//   }, [numAmount]);

//   // Log for debugging
//   useEffect(() => {
//     console.log("Amount passed to Test component:", numAmount);
//     console.log("Converted amount:", convertedAmount);
//     console.log("Rounded amount:", roundedAmount);
//   }, [numAmount, convertedAmount, roundedAmount]);

//   // Function to handle mpesa push submission
//   const MpesaStkPushSubmitted = () => {
//     toast(
//       'Mpesa STK submitted Successfully, Enter your pin to complete the transaction',
//       {
//         position: 'top-center',
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false,
//       }
//     );
//   };

//   const PaystackPaymentSubmitted = () => {
//     toast(
//       'Paystack Payment submitted Successfully, Enter your pin to complete the transaction',
//       {
//         position: 'top-center',
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false,
//       }
//     );
//   };

//   // Function to handle stk push success
//   const MpesaStkPushSuccess = () => {
//     toast.info('Mpesa STK Push Success, transaction completed successfully');
//   };

//   // Function to handle mpesa push fail
//   const MpesaStkPushFailed = () =>
//     toast.error('Mpesa Stk Push Failed, Please try again', {
//       position: 'top-center',
//       autoClose: 2000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: false,
//     });

//   // Handling stk push cancellation
//   const StkPushCancelledByUser = () =>
//     toast.error('StkPush was rejected by the user', {
//       position: 'top-center',
//       autoClose: 2000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: false,
//     });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setIsConfirming(true);
//     setIsProcessing(true);

//     const validation = numberSchema.safeParse({ phoneNumber });
//     // if (!validation.success) {
//     //   setErrors(validation.error.errors[0].message);
//     //   setIsLoading(false);
//     //   setIsConfirming(false);
//     //   setIsProcessing(false);
//     //   return;
//     // }
//     setErrors('');

//     try {
//       const { data } = await axios.post(`${SERVER_URL}/payments`, {
//         accountNumber: paymentMethod === 'MPESA' ? formattedNumber : email,
//         amount: roundedAmount,
//         description: 'test',
//         mode: paymentMethod === 'MPESA' ? 'STK' : 'LINK',
//         provider: paymentMethod,
//         category: 'COLLECTIONS',
//         countryCode: 'KE',
//         currencyCode: 'KES',
//         createdBy: 'tester',
//         metaData: {
//           proxyId: proxyId,
//           rating: rating,
//           proxyCountryCode: countryCode,
//           isp: isp,
//           proxyState: proxyState === true ? 'OLD' : 'NEW',
//           amount: numAmount,
//           requestedService: 'PROXIES',
//           customerId: customerId,
//         },
//       });
      
//       if (paymentMethod === 'MPESA') {
//         MpesaStkPushSubmitted();
//       } else {
//         PaystackPaymentSubmitted();
//         const checkoutUrl = data.metaData?.checkout;
//         if (checkoutUrl) {
//           window.location.href = checkoutUrl;
//         }
//         console.log('Paystack Response:', data.metaData);
//       }
      
//       setIsConfirming(false);
//       setIsLoading(false);

//       // Validate the transaction
//       await validateTransaction(data);
//     } catch (error) {
//       console.error('Payment Error:', error);
//       setIsLoading(false);
//       setIsConfirming(false);
//       MpesaStkPushFailed();
//     }
//   };

//   const validateTransaction = async (payload) => {
//     const checkStatus = async () => {
//       try {
//         const { data } = await axios.get(`${SERVER_URL}/payments/search`, {
//           params: {
//             countryCode: 'KE',
//             currencyCode: 'KES',
//             paymentId: payload.paymentId,
//             transactionStatus: payload.transactionStatus,
//           },
//         });

//         // Check if response contains expected data
//         if (!data.content || data.content.length === 0) {
//           return MpesaStkPushFailed();
//         }

//         // Ensure we access the correct transaction
//         const transaction = Array.isArray(data.content)
//           ? data.content[0]
//           : data.content;

//         // Normalize status
//         const status = transaction?.transactionStatus?.trim().toUpperCase();
//         const response = data.content;
//         console.log(response);
        
//         switch (status) {
//           case 'ACCEPTED':
//             MpesaStkPushSuccess();
//             navigate('/status/success', { state: { response } });
//             return;
//           case 'FAILED':
//             navigate('/status/failed', { state: { response } });
//             return;
//           case 'DECLINED':
//             navigate('/status/failed', { state: { response } });
//             return;
//           case 'PROCESSING':
//             setIsProcessing(true);
//           default:
//             setTimeout(checkStatus, 10000);
//             break;
//         }
//       } catch (error) {
//         setIsProcessing(false);
//         MpesaStkPushFailed();
//       }
//     };

//     setTimeout(checkStatus, 10000);
//   };

//   return (
//     <div className={`p-3 ${darkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}>
//       <div className="text-center mb-3">
//         <h2 className="text-lg font-semibold">
//         🌍 ExactConnect Accepts Payments Worldwide!
//         </h2>
//       </div>

//       <div className="mb-3">
//         <div className={`p-3 rounded-lg border-2 border-blue-500 transition-all`}>
//           <div className="flex items-center mb-2">
//             <Binary className="h-5 w-5 text-blue-500 mr-2" />
//             <h3 className="font-medium">Paystack</h3>
//           </div>
          
//           <div className="grid grid-cols-1 gap-1 mb-2 text-xs">
//             <div className="flex items-start">
//               <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
//               <span>Pay securely with your Visa, Mastercard, or Verve from anywhere in the world</span> 
//             </div>
//             <div className="flex items-start">
//               <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
//               <span>Complete your transaction within seconds</span>
//             </div>
//             <div className="flex items-start">
//               <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
//               <span>Accepts both local and international payments</span>
//             </div>
//             <div className="flex items-start">
//               <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
//               <span>M-Pesa option available (where supported)</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {conversionLoading ? (
//         <div className="text-center py-1">
//           <p className="text-xs">Converting currency...</p>
//           <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
//             <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center py-1">
//           <p className="text-xs">
//             {numAmount > 0 
//               ? `${numAmount} USD ≈ ${roundedAmount} KES`
//               : 'Enter an amount to see conversion'
//             }
//           </p>
//         </div>
//       )}

//       <div className="mt-2">
//         <label className="block text-xs font-medium">
//           Recipient Email Address
//         </label>
//         <input
//           type="text"
//           value={email}
//           readOnly
//           className="w-full p-2 border-2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] dark:text-gray-300 text-sm"
//         />
//         <p className="text-xs text-gray-500 dark:text-gray-400">
//           We'll send payment receipt details to the address above.
//         </p>
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={isConfirming || isProcessing || conversionLoading || numAmount <= 0}
//         className={`mt-3 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg text-sm ${
//           isConfirming || isProcessing || conversionLoading || numAmount <= 0
//             ? 'opacity-50 cursor-not-allowed'
//             : 'hover:bg-blue-700'
//         } transition-all`}
//       >
//         {isConfirming
//           ? 'Confirming...'
//           : isProcessing
//           ? 'Processing...'
//           : conversionLoading
//           ? 'Converting...'
//           : `Pay ${roundedAmount} KES with Paystack`}
//       </button>
      
//       <ToastContainer />
      
//       {isLoading && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
//           <p className="dark:text-white absolute">Confirming...</p>
//           <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-purple-500"></div>
//         </div>
//       )}
//     </div>
//   );
// }











// import { useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { Binary, Check } from 'lucide-react';
// import { SERVER_URL } from '../../services/data';
// import { DarkModeContext } from '../../context/DarkModeContext';
// import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
// import { customerId, email as defaultEmail } from '../../lib/userDetails';
// import { useNavigate } from 'react-router-dom';
// import { z } from 'zod';

// // Define phone number validation schema using Zod
// const numberSchema = z.object({
//   phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
// });

// // Fixed conversion rate - 1 USD = 130 KES
// const FIXED_CONVERSION_RATE = 130;

// export default function Test({ amount = 0, isp, proxyId, countryCode, rating, proxyState, onClose, userEmail, onSubmit }) {
//   // Ensure amount is a proper number
//   const numAmount = parseFloat(amount) || 0;
  
//   // Context and state
//   const { darkMode } = useContext(DarkModeContext);
//   const [paymentMethod, setPaymentMethod] = useState('PAYSTACK');
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState('');
//   const [convertedAmount, setConvertedAmount] = useState(0);
//   const [roundedAmount, setRoundedAmount] = useState(0);
//   const [conversionLoading, setConversionLoading] = useState(true);
//   const [localEmail, setLocalEmail] = useState(userEmail || defaultEmail);

//   const [phoneNumber, setPhoneNumber] = useState('');
//   const navigate = useNavigate();

//   // If userEmail changes or becomes available, update the local state
//   useEffect(() => {
//     if (userEmail) {
//       setLocalEmail(userEmail);
//     }
//   }, [userEmail]);

//   // As a fallback, check localStorage directly 
//   useEffect(() => {
//     try {
//       const storedUserDetails = localStorage.getItem('userDetails');
//       if (storedUserDetails) {
//         const parsedDetails = JSON.parse(storedUserDetails);
//         if (parsedDetails?.email && !localEmail) {
//           console.log("Email loaded from localStorage:", parsedDetails.email);
//           setLocalEmail(parsedDetails.email);
//         }
//       }
//     } catch (error) {
//       console.error("Error accessing localStorage:", error);
//     }
//   }, []);

//   const formattedNumber = formatPhoneNumber(phoneNumber);

//   // Currency conversion using fixed rate instead of API
//   useEffect(() => {
//     if (numAmount > 0) {
//       // Simulate a brief loading state for UX consistency
//       setTimeout(() => {
//         const converted = numAmount * FIXED_CONVERSION_RATE;
//         setConvertedAmount(converted);
//         setRoundedAmount(Math.ceil(converted));
//         setConversionLoading(false);
//       }, 300);
//     } else {
//       setConvertedAmount(0);
//       setRoundedAmount(0);
//       setConversionLoading(false);
//     }
//   }, [numAmount]);

//   // Log for debugging
//   useEffect(() => {
//     console.log("Amount passed to Test component:", numAmount);
//     console.log("Converted amount:", convertedAmount);
//     console.log("Rounded amount:", roundedAmount);
//     console.log("Using email:", localEmail);
//     console.log("Customer ID:", customerId);
//   }, [numAmount, convertedAmount, roundedAmount, localEmail]);

//   const showToast = (message, type = 'info') => {
//     toast[type](message, {
//       position: 'top-center',
//       autoClose: 2000,
//       hideProgressBar: true,
//       closeOnClick: true,
//       pauseOnHover: false,
//     });
//   };

//   // Function to lease the proxy
//   const leaseProxy = async () => {
//     try {
//       // Construct the payload for leasing the proxy
//       const leasePayload = {
//         proxyId: proxyId,
//         customerId: customerId,
//         amount: numAmount,
//         status: "ACTIVE",
//         paymentReference: `PROXY-${proxyId}-${Date.now()}`,
//         customerEmail: localEmail,
//         requestedService: "PROXIES",
//         countryCode: countryCode,
//         isp: isp
//       };

//       // Make the API call to lease the proxy
//       const response = await axios.post(`${SERVER_URL}/products/proxy/lease`, leasePayload);
      
//       if (response.status === 200 || response.status === 201) {
//         console.log('Proxy leased successfully:', response.data);
//         return true;
//       } else {
//         console.error('Failed to lease proxy:', response);
//         return false;
//       }
//     } catch (error) {
//       console.error('Error leasing proxy:', error);
//       return false;
//     }
//   };

//   // Send email notification about the purchase
//   const sendPurchaseEmail = async () => {
//     try {
//       // Construct the payload
//       const payload = {
//         recipients: [
//           {
//             name: 'ExactConnect',
//             recipient: 'maxwellbakora93@gmail.com',
//           },
//           {
//             name: 'ExactConnect',
//             recipient: 'support@exactconnect.online',
//           },
//           {
//             name: 'Exact Connect',
//             recipient: 'charleskibet101@gmail.com',
//           },
//         ],
//         subject: 'New Proxy Purchase',
//         body: `
//           Proxy Purchase Details:
          
//           Proxy ID: ${proxyId}
//           Country Code: ${countryCode}
//           Payment Amount: $${numAmount} USD (${roundedAmount} KES)
//           Customer Email: ${localEmail}
//           Customer ID: ${customerId}
//           ISP: ${isp}
//           Server Rating: ${rating}
          
//           Please activate the proxy within 2 hours.
//         `,
//         deliveryMode: 'EMAIL',
//         countryCode: 'KE',
//       };

//       // Send the email notification
//       const response = await fetch(`${SERVER_URL}/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         console.log('Purchase notification email sent successfully');
//       } else {
//         console.error('Failed to send purchase notification email');
//       }
//     } catch (error) {
//       console.error('Error sending purchase notification email:', error);
//     }
//   };

//   // Handle Paystack payment callback
//   const handlePaystackCallback = async (reference) => {
//     try {
//       // Verify the payment with Paystack (if needed)
//       // For now, we'll simply proceed with leasing the proxy
//       const leased = await leaseProxy();
      
//       if (leased) {
//         showToast('Proxy leased successfully!', 'success');
//       } else {
//         showToast('Failed to lease proxy. Please contact support.', 'error');
//       }
      
//       return leased;
//     } catch (error) {
//       console.error('Error in Paystack callback:', error);
//       return false;
//     }
//   };

//   const handlePaystackRedirect = async (checkoutUrl) => {
//     try {
//       // First send the purchase notification email
//       await sendPurchaseEmail();
      
//       // Attempt to lease the proxy immediately for Paystack
//       const leased = await leaseProxy();
//       if (leased) {
//         console.log('Proxy leased successfully before redirect');
//       } else {
//         console.warn('Proxy leasing failed before redirect, will try after payment');
//       }
      
//       // Then call the parent's onSubmit if provided
//       if (onSubmit && typeof onSubmit === 'function') {
//         await onSubmit();
//       }
      
//       // Save payment info to localStorage for verification after redirect
//       localStorage.setItem('pendingPayment', JSON.stringify({
//         proxyId,
//         countryCode,
//         isp,
//         amount: numAmount,
//         timestamp: Date.now()
//       }));
      
//       // Finally redirect to Paystack
//       if (checkoutUrl) {
//         // Ensure immediate redirect
//         window.location.href = checkoutUrl;
//       } else {
//         showToast('Payment link not received from server', 'error');
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error('Error in handlePaystackRedirect:', error);
//       showToast('Error processing payment', 'error');
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Prevent multiple submissions
//     if (isLoading) return;
    
//     setIsLoading(true);
//     setErrors('');

//     if (!customerId) {
//       showToast('Customer ID is missing. Please log in again.', 'error');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const paymentData = {
//         accountNumber: paymentMethod === 'MPESA' ? formattedNumber : localEmail,
//         amount: roundedAmount,
//         description: `Proxy purchase - ${proxyId}`,
//         mode: paymentMethod === 'MPESA' ? 'STK' : 'LINK',
//         provider: paymentMethod,
//         category: 'COLLECTIONS',
//         countryCode: 'KE',
//         currencyCode: 'KES',
//         createdBy: customerId || 'customer',
//         metaData: {
//           proxyId: proxyId,
//           rating: rating,
//           proxyCountryCode: countryCode,
//           isp: isp,
//           proxyState: proxyState === true ? 'OLD' : 'NEW',
//           amount: numAmount,
//           requestedService: 'PROXIES',
//           customerId: customerId,
//           callbackUrl: `${window.location.origin}/payment/callback`,
//         },
//       };

//       console.log('Submitting payment request:', paymentData);
      
//       const { data } = await axios.post(`${SERVER_URL}/payments`, paymentData);
//       console.log('Payment response:', data);
      
//       if (paymentMethod === 'MPESA') {
//         // Also send the purchase notification email for MPESA
//         await sendPurchaseEmail();
        
//         // Attempt to lease proxy for MPESA payment
//         const leased = await leaseProxy();
//         if (leased) {
//           console.log('Proxy leased successfully for MPESA payment');
//         } else {
//           console.warn('Proxy leasing failed for MPESA, will try after payment confirmation');
//         }
        
//         // Call parent's onSubmit if provided
//         if (onSubmit && typeof onSubmit === 'function') {
//           await onSubmit();
//         }
        
//         showToast('Mpesa STK submitted Successfully, Enter your pin to complete the transaction');
//         // Start polling for MPESA transaction status
//         validateTransaction(data);
//       } else {
//         // PAYSTACK
//         showToast('Processing Paystack payment...');
//         const checkoutUrl = data.metaData?.checkout;
        
//         if (checkoutUrl) {
//           console.log('Redirecting to Paystack checkout:', checkoutUrl);
//           // Brief delay to ensure toast is visible before redirect
//           setTimeout(() => handlePaystackRedirect(checkoutUrl), 500);  
//         } else {
//           console.error('No checkout URL in response:', data);
//           showToast('Payment processing failed - No checkout link received', 'error');
//           setIsLoading(false);
//         }
//       }
//     } catch (error) {
//       console.error('Payment Error:', error);
//       setIsLoading(false);
      
//       let errorMessage = 'Payment processing failed. Please try again.';
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }
      
//       showToast(errorMessage, 'error');
//     }
//   };

//   const validateTransaction = async (payload) => {
//     const checkStatus = async () => {
//       try {
//         const { data } = await axios.get(`${SERVER_URL}/payments/search`, {
//           params: {
//             countryCode: 'KE',
//             currencyCode: 'KES',
//             paymentId: payload.paymentId,
//             transactionStatus: payload.transactionStatus,
//           },
//         });

//         // Check if response contains expected data
//         if (!data.content || data.content.length === 0) {
//           showToast('Transaction validation failed', 'error');
//           setIsLoading(false);
//           return;
//         }

//         // Ensure we access the correct transaction
//         const transaction = Array.isArray(data.content)
//           ? data.content[0]
//           : data.content;

//         // Normalize status
//         const status = transaction?.transactionStatus?.trim().toUpperCase();
//         const response = data.content;
//         console.log('Transaction status:', status, response);
        
//         switch (status) {
//           case 'ACCEPTED':
//             showToast('Payment successful!', 'success');
            
//             // Lease the proxy after successful payment
//             const leased = await leaseProxy();
//             if (leased) {
//               showToast('Proxy leased successfully!', 'success');
//             } else {
//               showToast('Payment successful but proxy leasing failed. Please contact support.', 'warning');
//             }
            
//             setIsLoading(false);
//             navigate('/status/success', { state: { response } });
//             return;
//           case 'FAILED':
//             showToast('Payment failed', 'error');
//             setIsLoading(false);
//             navigate('/status/failed', { state: { response } });
//             return;
//           case 'DECLINED':
//             showToast('Payment declined', 'error');
//             setIsLoading(false);
//             navigate('/status/failed', { state: { response } });
//             return;
//           case 'PROCESSING':
//             // Continue checking
//             setTimeout(checkStatus, 5000);
//             break;
//           default:
//             // Continue checking for other statuses
//             setTimeout(checkStatus, 5000);
//             break;
//         }
//       } catch (error) {
//         console.error('Error validating transaction:', error);
//         setIsLoading(false);
//         showToast('Error checking payment status', 'error');
//       }
//     };

//     // Start checking after a short delay
//     setTimeout(checkStatus, 5000);
//   };

//   return (
//     <div className={`p-3 ${darkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}>
//       <div className="text-center mb-3">
//         <h2 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
//           🌍 ExactConnect Accepts Payments Worldwide!
//         </h2>
//       </div>

//       <div className="mb-3">
//         <div className={`p-3 rounded-lg border-2 border-purple-500 transition-all`}>
//           <div className="flex items-center mb-2">
//             <Binary className="h-5 w-5 text-purple-500 mr-2" />
//             <h3 className="font-medium">Paystack</h3>
//           </div>
          
//           <div className="grid grid-cols-1 gap-1 mb-2 text-xs">
//             <div className="flex items-start">
//               <Check className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0 mt-0.5" />
//               <span>Pay securely with your Visa, Mastercard, or Verve from anywhere in the world</span> 
//             </div>
//             <div className="flex items-start">
//               <Check className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0 mt-0.5" />
//               <span>Complete your transaction within seconds</span>
//             </div>
//             <div className="flex items-start">
//               <Check className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0 mt-0.5" />
//               <span>Accepts both local and international payments</span>
//             </div>
//             <div className="flex items-start">
//               <Check className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0 mt-0.5" />
//               <span>M-Pesa option available (where supported)</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {conversionLoading ? (
//         <div className="text-center py-1">
//           <p className="text-xs">Converting currency...</p>
//           <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
//             <div className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full animate-pulse"></div>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center py-1">
//           <p className="text-xs">
//             {numAmount > 0 
//               ? `${numAmount} USD ≈ ${roundedAmount} KES`
//               : 'Enter an amount to see conversion'
//             }
//           </p>
//         </div>
//       )}

//       <div className="mt-2">
//         <label className="block text-xs font-medium">
//           Recipient Email Address
//         </label>
//         <input
//           type="text"
//           value={localEmail}
//           readOnly
//           className="w-full p-2 border-2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] dark:text-gray-300 text-sm"
//         />
//         <p className="text-xs text-gray-500 dark:text-gray-400">
//           We'll send payment receipt details to the address above.
//         </p>
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={isLoading || conversionLoading || numAmount <= 0}
//         className={`mt-3 w-full py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-semibold rounded-lg text-sm ${
//           isLoading || conversionLoading || numAmount <= 0
//             ? 'opacity-50 cursor-not-allowed'
//             : 'hover:from-purple-700 hover:to-amber-600'
//         } transition-all`}
//       >
//         {isLoading
//           ? 'Processing...'
//           : conversionLoading
//           ? 'Converting...'
//           : `Pay ${roundedAmount} KES with Paystack`}
//       </button>
      
//       <ToastContainer />
      
//       {isLoading && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-2"></div>
//             <p className="dark:text-white text-sm font-medium">Processing your payment...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Binary, Check } from 'lucide-react';
import { SERVER_URL } from '../../services/data';
import { DarkModeContext } from '../../context/DarkModeContext';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { getUserDetails, getReliableCustomerId } from '../../lib/userDetails';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Define phone number validation schema using Zod
const numberSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
});

// Fixed conversion rate - 1 USD = 130 KES
const FIXED_CONVERSION_RATE = 130;

export default function Test({ amount = 0, isp, proxyId, countryCode, rating, proxyState, onClose, userEmail, onSubmit }) {
  // Ensure amount is a proper number
  const numAmount = parseFloat(amount) || 0;
  
  // Context and state
  const { darkMode } = useContext(DarkModeContext);
  const [paymentMethod, setPaymentMethod] = useState('PAYSTACK');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [roundedAmount, setRoundedAmount] = useState(0);
  const [conversionLoading, setConversionLoading] = useState(true);
  const [localEmail, setLocalEmail] = useState(userEmail || '');
  const [emailSent, setEmailSent] = useState(false);
  const [activeCustomerId, setActiveCustomerId] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  // Important fix: Initialize customer ID immediately and keep it actively updated
  useEffect(() => {
    const initializeCustomerId = () => {
      // Get the latest customer ID using the reliable function
      const currentCustomerId = getReliableCustomerId();
      
      if (currentCustomerId) {
        console.log("Customer ID initialized:", currentCustomerId);
        setActiveCustomerId(currentCustomerId);
      } else {
        console.warn("Customer ID not found in localStorage");
        // Try to get user details directly as a fallback
        const userDetails = getUserDetails();
        if (userDetails?.customerId || userDetails?.customerReference) {
          const id = userDetails.customerId || userDetails.customerReference;
          console.log("Customer ID found in getUserDetails():", id);
          setActiveCustomerId(id);
        }
      }
    };

    // Initialize immediately
    initializeCustomerId();
    
    // Set up a periodic check to ensure we always have the latest customer ID
    const intervalId = setInterval(initializeCustomerId, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // If userEmail changes or becomes available, update the local state
  useEffect(() => {
    if (userEmail) {
      setLocalEmail(userEmail);
    }
  }, [userEmail]);

  // As a fallback, check localStorage directly for email
  useEffect(() => {
    try {
      if (!localEmail) {
        const userDetails = getUserDetails();
        if (userDetails?.email) {
          console.log("Email loaded from getUserDetails():", userDetails.email);
          setLocalEmail(userDetails.email);
        }
      }
    } catch (error) {
      console.error("Error accessing user details:", error);
    }
  }, [localEmail]);

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
    console.log("Using email:", localEmail);
    console.log("Active Customer ID:", activeCustomerId);
  }, [numAmount, convertedAmount, roundedAmount, localEmail, activeCustomerId]);

  const showToast = (message, type = 'info') => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });
  };

  // Send payment notification email after successful lease
  const sendPaymentNotificationEmail = async () => {
    // Don't send if already sent
    if (emailSent) {
      console.log('Email already sent, skipping duplicate');
      return true;
    }
    
    try {
      // Check if this is a VPS purchase (based on specific identifiers)
      const isVpsPurchase = isp === 'ExactConnect' && rating === 'premium';
      
      // Construct the payload
      const payload = {
        recipients: [
          {
            name: 'ExactConnect',
            recipient: 'maxwellbakora93@gmail.com',
          },
          {
            name: 'ExactConnect',
            recipient: 'support@exactconnect.online',
          },
          {
            name: 'Exact Connect',
            recipient: 'charleskibet101@gmail.com',
          },
        ],
        subject: isVpsPurchase ? 'New VPS Purchase' : 'New Proxy Purchase',
        body: isVpsPurchase ? `
          VPS Purchase Details:
          
          Server ID: ${proxyId}
          Country Code: ${countryCode}
          Payment Amount: $${numAmount} USD (${roundedAmount} KES)
          Customer Email: ${localEmail}
          Customer ID: ${activeCustomerId || 'Unknown'}
          ISP: ExactConnect
          Server Rating: premium
          Server Location: ${countryCode === 'GB' ? 'United Kingdom (UK)' : countryCode}
          Price: $${numAmount} USD
          Operating System: Windows
          Android Emulator: Yes
          
          ***CUSTOMER ID: ${activeCustomerId || 'Unknown'}***
          ***CUSTOMER EMAIL: ${localEmail}***
          
          Please activate the VPS within 2 hours.
        ` : `
          Proxy Details:
          
          Proxy ID: ${proxyId}
          Country Code: ${countryCode}
          Payment Amount: $${numAmount} USD (${roundedAmount} KES)
          Customer Email: ${localEmail}
          Customer ID: ${activeCustomerId || 'Unknown'}
          ISP: ${isp}
          Server Rating: ${rating}
          
          Please activate the proxy within 2 hours.
        `,
        deliveryMode: 'EMAIL',
        countryCode: 'KE',
      };

      // Send the email notification
      const response = await fetch(`${SERVER_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Payment notification email sent successfully');
        setEmailSent(true);
        return true;
      } else {
        console.error('Failed to send payment notification email');
        return false;
      }
    } catch (error) {
      console.error('Error sending payment notification email:', error);
      return false;
    }
  };

  // Function to lease the proxy
  const leaseProxy = async () => {
    if (!activeCustomerId) {
      console.error("Cannot lease proxy: Customer ID is missing");
      showToast('Customer ID is missing. Please try again or refresh.', 'error');
      return false;
    }
    
    try {
      // Construct the payload for leasing the proxy
      const leasePayload = {
        proxyId: proxyId,
        customerId: activeCustomerId,
        amount: numAmount,
        status: "ACTIVE",
        paymentReference: `PROXY-${proxyId}-${Date.now()}`,
        customerEmail: localEmail,
        requestedService: "PROXIES",
        countryCode: countryCode,
        isp: isp
      };

      console.log("Leasing proxy with payload:", leasePayload);

      // Make the API call to lease the proxy
      const response = await axios.post(`${SERVER_URL}/products/proxy/lease`, leasePayload);
      
      if (response.status === 200 || response.status === 201) {
        console.log('Proxy leased successfully:', response.data);
        
        // Send payment notification email ONLY after successful leasing
        const emailSent = await sendPaymentNotificationEmail();
        if (emailSent) {
          console.log('Payment notification email sent after successful lease');
        } else {
          console.warn('Failed to send payment notification email after lease');
        }
        
        return true;
      } else {
        console.error('Failed to lease proxy:', response);
        return false;
      }
    } catch (error) {
      console.error('Error leasing proxy:', error);
      return false;
    }
  };

  // Handle Paystack payment callback
  const handlePaystackCallback = async (reference) => {
    try {
      // Verify the payment with Paystack (if needed)
      // For now, we'll simply proceed with leasing the proxy
      const leased = await leaseProxy();
      
      if (leased) {
        showToast('Proxy leased successfully!', 'success');
      } else {
        showToast('Failed to lease proxy. Please contact support.', 'error');
      }
      
      return leased;
    } catch (error) {
      console.error('Error in Paystack callback:', error);
      return false;
    }
  };

  const handlePaystackRedirect = async (checkoutUrl) => {
    try {
      // Validate customer ID is present
      if (!activeCustomerId) {
        showToast('Customer ID is missing. Please log in again.', 'error');
        setIsLoading(false);
        return;
      }
      
      // Check if this is a VPS purchase
      const isVpsPurchase = isp === 'ExactConnect' && rating === 'premium';
      
      if (isVpsPurchase) {
        // For VPS purchases, send email immediately upon click regardless of payment status
        console.log('VPS purchase detected, sending notification email immediately');
        const emailSent = await sendPaymentNotificationEmail();
        if (emailSent) {
          console.log('VPS purchase notification email sent before payment');
        } else {
          console.warn('Failed to send VPS notification email before payment');
        }
      }
      
      // Then attempt to lease the proxy as usual
      const leased = await leaseProxy();
      if (leased) {
        console.log('Proxy leased successfully before redirect');
      } else {
        console.warn('Proxy leasing failed before redirect, will try after payment');
      }
      
      // Then call the parent's onSubmit if provided
      if (onSubmit && typeof onSubmit === 'function') {
        await onSubmit();
      }
      
      // Save payment info to localStorage for verification after redirect
      localStorage.setItem('pendingPayment', JSON.stringify({
        proxyId,
        countryCode,
        isp,
        amount: numAmount,
        timestamp: Date.now(),
        isVps: isVpsPurchase,
        customerId: activeCustomerId, // Make sure to include the active customer ID
        customerEmail: localEmail // And this
      }));
      
      // Finally redirect to Paystack
      if (checkoutUrl) {
        // Ensure immediate redirect
        window.location.href = checkoutUrl;
      } else {
        showToast('Payment link not received from server', 'error');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in handlePaystackRedirect:', error);
      showToast('Error processing payment', 'error');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isLoading) return;
    
    setIsLoading(true);
    setErrors('');
    setEmailSent(false);  // Reset email sent status on new submission

    // Ensure we have the customer ID
    if (!activeCustomerId) {
      showToast('Customer ID is missing. Please log in again.', 'error');
      setIsLoading(false);
      return;
    }

    try {
      const paymentData = {
        accountNumber: paymentMethod === 'MPESA' ? formattedNumber : localEmail,
        amount: roundedAmount,
        description: `Proxy purchase - ${proxyId}`,
        mode: paymentMethod === 'MPESA' ? 'STK' : 'LINK',
        provider: paymentMethod,
        category: 'COLLECTIONS',
        countryCode: 'KE',
        currencyCode: 'KES',
        createdBy: activeCustomerId || 'customer',
        metaData: {
          proxyId: proxyId,
          rating: rating,
          proxyCountryCode: countryCode,
          isp: isp,
          proxyState: proxyState === true ? 'OLD' : 'NEW',
          amount: numAmount,
          requestedService: 'PROXIES',
          customerId: activeCustomerId,
          callbackUrl: `${window.location.origin}/payment/callback`,
        },
      };

      console.log('Submitting payment request:', paymentData);
      
      const { data } = await axios.post(`${SERVER_URL}/payments`, paymentData);
      console.log('Payment response:', data);
      
      if (paymentMethod === 'MPESA') {
        // Attempt to lease proxy for MPESA payment
        // Email will be sent by leaseProxy function if successful
        const leased = await leaseProxy();
        if (leased) {
          console.log('Proxy leased successfully for MPESA payment');
        } else {
          console.warn('Proxy leasing failed for MPESA, will try after payment confirmation');
        }
        
        // Call parent's onSubmit if provided
        if (onSubmit && typeof onSubmit === 'function') {
          await onSubmit();
        }
        
        showToast('Mpesa STK submitted Successfully, Enter your pin to complete the transaction');
        // Start polling for MPESA transaction status
        validateTransaction(data);
      } else {
        // PAYSTACK
        showToast('Processing Paystack payment...');
        const checkoutUrl = data.metaData?.checkout;
        
        if (checkoutUrl) {
          console.log('Redirecting to Paystack checkout:', checkoutUrl);
          // Brief delay to ensure toast is visible before redirect
          setTimeout(() => handlePaystackRedirect(checkoutUrl), 500);  
        } else {
          console.error('No checkout URL in response:', data);
          showToast('Payment processing failed - No checkout link received', 'error');
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Payment Error:', error);
      setIsLoading(false);
      
      let errorMessage = 'Payment processing failed. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      showToast(errorMessage, 'error');
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
          showToast('Transaction validation failed', 'error');
          setIsLoading(false);
          return;
        }

        // Ensure we access the correct transaction
        const transaction = Array.isArray(data.content)
          ? data.content[0]
          : data.content;

        // Normalize status
        const status = transaction?.transactionStatus?.trim().toUpperCase();
        const response = data.content;
        console.log('Transaction status:', status, response);
        
        switch (status) {
          case 'ACCEPTED':
            showToast('Payment successful!', 'success');
            
            // Lease the proxy after successful payment
            const leased = await leaseProxy();
            if (leased) {
              showToast('Proxy leased successfully!', 'success');
            } else {
              showToast('Payment successful but proxy leasing failed. Please contact support.', 'warning');
            }
            
            setIsLoading(false);
            navigate('/status/success', { state: { response } });
            return;
          case 'FAILED':
            showToast('Payment failed', 'error');
            setIsLoading(false);
            navigate('/status/failed', { state: { response } });
            return;
          case 'DECLINED':
            showToast('Payment declined', 'error');
            setIsLoading(false);
            navigate('/status/failed', { state: { response } });
            return;
          case 'PROCESSING':
            // Continue checking
            setTimeout(checkStatus, 5000);
            break;
          default:
            // Continue checking for other statuses
            setTimeout(checkStatus, 5000);
            break;
        }
      } catch (error) {
        console.error('Error validating transaction:', error);
        setIsLoading(false);
        showToast('Error checking payment status', 'error');
      }
    };

    // Start checking after a short delay
    setTimeout(checkStatus, 5000);
  };

  return (
    <div className={`p-3 ${darkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}>
      <div className="text-center mb-3">
        <h2 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
          🌍 ExactConnect Accepts Payments Worldwide!
        </h2>
      </div>

      <div className="mb-3">
        <div className={`p-3 rounded-lg border-2 border-purple-500 transition-all`}>
          <div className="flex items-center mb-2">
            <Binary className="h-5 w-5 text-purple-500 mr-2" />
            <h3 className="font-medium">Paystack</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-1 mb-2 text-xs">
            <div className="flex items-start">
              <Check className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0 mt-0.5" />
              <span>Pay securely with your Visa, Mastercard, or Verve from anywhere in the world</span> 
            </div>
            <div className="flex items-start">
              <Check className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0 mt-0.5" />
              <span>Complete your transaction within seconds</span>
            </div>
            <div className="flex items-start">
              <Check className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0 mt-0.5" />
              <span>Accepts both local and international payments</span>
            </div>
            <div className="flex items-start">
              <Check className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0 mt-0.5" />
              <span>M-Pesa option available (where supported)</span>
            </div>
          </div>
        </div>
      </div>

      {conversionLoading ? (
        <div className="text-center py-1">
          <p className="text-xs">Converting currency...</p>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
            <div className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full animate-pulse"></div>
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
          value={localEmail}
          readOnly
          className="w-full p-2 border-2 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2b2b2b] dark:text-gray-300 text-sm"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          We'll send payment receipt details to the address above.
        </p>
      </div>
      
      {/* Customer ID Debug Display - Can be removed in production */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <p>
          Customer ID: {activeCustomerId ? `${activeCustomerId.substring(0, 5)}...` : 'Loading...'}
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || conversionLoading || numAmount <= 0 || !activeCustomerId}
        className={`mt-3 w-full py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-semibold rounded-lg text-sm ${
          isLoading || conversionLoading || numAmount <= 0 || !activeCustomerId
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:from-purple-700 hover:to-amber-600'
        } transition-all`}
      >
        {isLoading
          ? 'Processing...'
          : conversionLoading
          ? 'Converting...'
          : !activeCustomerId
          ? 'Loading customer data...'
          : `Pay ${roundedAmount} KES with Paystack`}
      </button>
      
      <ToastContainer />
      
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-2"></div>
            <p className="dark:text-white text-sm font-medium">Processing your payment...</p>
          </div>
        </div>
      )}
    </div>
  );
}