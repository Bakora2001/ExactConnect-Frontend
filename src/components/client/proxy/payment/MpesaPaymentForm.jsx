// import { useState } from 'react';
// import { Smartphone, CreditCard, X, Binary } from 'lucide-react';
// import axios from 'axios';
// import { toast } from '@/hooks/use-toast';
// import Convert from './Convert';

// // Define a simple validation function
// const validatePhoneNumber = (phoneNumber) => {
//   return phoneNumber.length >= 10 ? { success: true } : { 
//     success: false, 
//     error: { errors: [{ message: 'Phone number must be at least 10 digits' }] }
//   };
// };

// const SERVER_URL = 'https://exact-connect-latest.onrender.com';
// const customerId = "demo_user";
// const defaultEmail = "user@example.com";

// // Format phone number function
// const formatPhoneNumber = (phoneNumber) => {
//   // Remove any non-digit characters
//   const cleaned = phoneNumber.replace(/\D/g, '');
  
//   // Add country code if needed (assuming Kenya)
//   if (cleaned.startsWith('0')) {
//     return `254${cleaned.substring(1)}`;
//   }
  
//   return cleaned;
// };

// const MpesaPaymentForm = ({ 
//   amount = 1.99, 
//   isp = "", 
//   proxyId = "default_proxy", 
//   countryCode = "US", 
//   rating = 0, 
//   proxyState = false,
//   onClose = () => {}
// }) => {
//   const [paymentMethod, setPaymentMethod] = useState('MPESA');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isConfirming, setIsConfirming] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState(defaultEmail);
//   const [errors, setErrors] = useState({
//     phone: '',
//     email: ''
//   });
  
//   // Convert and round the amount (only for MPESA)
//   const roundedAmount = Math.ceil(Convert(amount));
//   const formattedNumber = formatPhoneNumber(phoneNumber);

//   const validateEmail = (email) => {
//     const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
//     return re.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setIsConfirming(true);
    
//     let hasError = false;
//     const newErrors = { phone: '', email: '' };

//     if (paymentMethod === 'MPESA') {
//       const validation = validatePhoneNumber(phoneNumber);
//       if (!validation.success) {
//         newErrors.phone = validation.error.errors[0].message;
//         hasError = true;
//       }
//     } else if (paymentMethod === 'PAYSTACK') {
//       if (!validateEmail(email)) {
//         newErrors.email = 'Please enter a valid email address';
//         hasError = true;
//       }
//     }

//     setErrors(newErrors);
    
//     if (hasError) {
//       setIsLoading(false);
//       setIsConfirming(false);
//       return;
//     }

//     try {
//       const paymentPayload = {
//         accountNumber: paymentMethod === 'MPESA' ? formattedNumber : email,
//         amount: paymentMethod === 'MPESA' ? roundedAmount : amount,
//         description: 'Proxy purchase',
//         mode: paymentMethod === 'MPESA' ? 'STK' : 'LINK',
//         provider: paymentMethod,
//         category: 'COLLECTIONS',
//         countryCode: paymentMethod === 'MPESA' ? 'KE' : countryCode,
//         currencyCode: paymentMethod === 'MPESA' ? 'KES' : 'USD',
//         createdBy: customerId,
//         metaData: {
//           proxyId: proxyId,
//           rating: rating,
//           proxyCountryCode: countryCode,
//           isp: isp,
//           proxyState: proxyState === true ? 'OLD' : 'NEW',
//           amount: amount,
//           requestedService: 'PROXIES',
//           customerId: customerId,
//         },
//       };

//       console.log('Sending payment request:', paymentPayload);
      
//       const { data } = await axios.post(`${SERVER_URL}/payments`, paymentPayload);

//       console.log('Payment response:', data);

//       if (paymentMethod === 'MPESA') {
//         toast({
//           title: "Mpesa STK Push Sent",
//           description: "Enter your PIN to complete the transaction.",
//         });
//         setIsProcessing(true);
        
//         // Start tracking payment status for MPESA
//         await validateTransaction(data);
//       } else if (paymentMethod === 'PAYSTACK') {
//         toast({
//           title: "Paystack payment initiated",
//           description: "You will be redirected to complete payment.",
//         });
        
//         // For Paystack, redirect to checkout URL
//         if (data.metaData && data.metaData.checkout) {
//           console.log('Opening checkout URL:', data.metaData.checkout);
//           // Use direct redirection as in the original Test.jsx
//           window.location.href = data.metaData.checkout;
//         } else {
//           console.error('No checkout URL found in response:', data);
//           toast({
//             title: "Payment Error",
//             description: "Could not generate payment link. Please try again.",
//             variant: "destructive",
//           });
//         }
        
//         // We don't start continuous validation for Paystack since user will be redirected
//         // but we set a longer timeout to check once after they might return
//         setTimeout(() => validateTransaction(data), 60000);
//       }
      
//       setIsConfirming(false);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Payment submission error:', error);
//       setIsLoading(false);
//       setIsConfirming(false);
//       toast({
//         title: "Payment Error",
//         description: "Payment request failed. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const validateTransaction = async (payload) => {
//     console.log('Validating transaction with payload:', payload);
    
//     const checkStatus = async () => {
//       try {
//         const { data } = await axios.get(`${SERVER_URL}/payments/search`, {
//           params: {
//             countryCode: paymentMethod === 'MPESA' ? 'KE' : countryCode,
//             currencyCode: paymentMethod === 'MPESA' ? 'KES' : 'USD',
//             paymentId: payload.paymentId,
//             transactionStatus: payload.transactionStatus,
//           },
//         });

//         console.log('Transaction status response:', data);

//         if (!data.content || data.content.length === 0) {
//           toast({
//             title: "Verification Failed",
//             description: "Could not verify payment status. Please try again.",
//             variant: "destructive",
//           });
//           setIsProcessing(false);
//           return;
//         }

//         const transaction = Array.isArray(data.content) ? data.content[0] : data.content;
//         const status = transaction?.transactionStatus?.trim().toUpperCase();
        
//         console.log('Transaction status:', status);
        
//         switch (status) {
//           case 'ACCEPTED':
//             toast({
//               title: "Payment Successful",
//               description: "Your payment has been processed successfully!",
//               variant: "success",
//             });
//             setIsProcessing(false);
//             onClose();
//             break;
//           case 'FAILED':
//           case 'DECLINED':
//             toast({
//               title: "Payment Failed",
//               description: "Your payment was declined or failed. Please try again.",
//               variant: "destructive",
//             });
//             setIsProcessing(false);
//             break;
//           case 'PROCESSING':
//             setIsProcessing(true);
//             // Check again in 10 seconds
//             setTimeout(checkStatus, 10000);
//             break;
//           default:
//             // Check again in 10 seconds for any other status
//             setTimeout(checkStatus, 10000);
//             break;
//         }
//       } catch (error) {
//         console.error('Error checking transaction status:', error);
//         setIsProcessing(false);
//         toast({
//           title: "Verification Error",
//           description: "Could not verify payment status. Please try again.",
//           variant: "destructive",
//         });
//       }
//     };

//     // Start checking status after a brief delay
//     setTimeout(checkStatus, 10000);
//   };

//   return (
//     <div className="p-4 animate-scale-in">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Complete Your Payment</h2>
//         <button className="p-1 rounded-full hover:bg-gray-200" onClick={onClose}>
//           <X size={20} />
//         </button>
//       </div>

//       <div className="text-center mb-6">
//         <h3 className="text-lg font-medium">Choose Your Payment Method</h3>
//         <p className="text-sm text-gray-600">
//           Select your preferred payment option
//         </p>
//       </div>

//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <label
//           className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${
//             paymentMethod === 'MPESA'
//               ? 'border-green-500 scale-105'
//               : 'border-gray-300 hover:scale-105'
//           } transition-all`}
//         >
//           <input
//             type="radio"
//             value="MPESA"
//             name="paymentMethod"
//             className="sr-only"
//             checked={paymentMethod === 'MPESA'}
//             onChange={() => setPaymentMethod('MPESA')}
//           />
//           <Smartphone className="h-8 w-8 text-green-500" />
//           <span className="font-medium">M-Pesa</span>
//           <span className="text-xs text-gray-500 mt-1">Pay in KES</span>
//         </label>

//         <label
//           className={`flex flex-col items-center p-4 cursor-pointer rounded-lg border-2 ${
//             paymentMethod === 'PAYSTACK'
//               ? 'border-blue-500 scale-105'
//               : 'border-gray-300 hover:scale-105'
//           } transition-all`}
//         >
//           <input
//             type="radio"
//             value="PAYSTACK"
//             name="paymentMethod"
//             className="sr-only"
//             checked={paymentMethod === 'PAYSTACK'}
//             onChange={() => setPaymentMethod('PAYSTACK')}
//           />
//           <Binary className="h-8 w-8 text-blue-500" />
//           <span className="font-medium">Paystack</span>
//           <span className="text-xs text-gray-500 mt-1">Pay in USD</span>
//         </label>
//       </div>

//       {paymentMethod === 'MPESA' && (
//         <div className="mt-4 animate-fade-in">
//           <label className="block text-sm font-medium mb-1">
//             M-Pesa Phone Number
//           </label>
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             placeholder="e.g 07XXXXXXXX"
//             className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
//           />
//           {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          
//           <div className="mt-4 p-3 bg-gray-50 rounded-md">
//             <p className="text-sm text-gray-700">
//               <span className="font-medium">Amount to pay:</span> {roundedAmount} KES
//             </p>
//             <p className="text-xs text-gray-500 mt-1">
//               (Converted from ${amount} USD at current rate)
//             </p>
//           </div>
//         </div>
//       )}

//       {paymentMethod === 'PAYSTACK' && (
//         <div className="mt-4 animate-fade-in">
//           <label className="block text-sm font-medium mb-1">
//             Email Address
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             readOnly={false}
//             placeholder="your.email@example.com"
//             className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
//           />
//           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           <p className="text-sm text-gray-500 mt-1">
//             We'll send payment receipt details to this email address.
//           </p>
          
//           <div className="mt-4 p-3 bg-gray-50 rounded-md">
//             <p className="text-sm text-gray-700">
//               <span className="font-medium">Amount to pay:</span> ${amount} USD
//             </p>
//             <p className="text-xs text-gray-500 mt-1">
//               (Paid directly in USD with credit/debit card)
//             </p>
//           </div>
//         </div>
//       )}

//       <button
//         onClick={handleSubmit}
//         disabled={isConfirming || isProcessing}
//         className={`mt-6 w-full py-3 ${
//           paymentMethod === 'MPESA' ? 'bg-green-600' : 'bg-blue-600'
//         } text-white font-semibold rounded-lg ${
//           isConfirming || isProcessing
//             ? 'opacity-50 cursor-not-allowed'
//             : paymentMethod === 'MPESA'
//             ? 'hover:bg-green-700'
//             : 'hover:bg-blue-700'
//         } transition-all`}
//       >
//         {isConfirming
//           ? 'Confirming...'
//           : isProcessing
//           ? 'Processing...'
//           : paymentMethod === 'MPESA'
//           ? `Pay ${roundedAmount} KES with M-Pesa`
//           : `Pay $${amount} USD with Paystack`}
//       </button>

//       {isLoading && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
//           <div className="flex flex-col items-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
//             <p className="mt-4 text-purple-900 font-medium">Processing payment...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MpesaPaymentForm;