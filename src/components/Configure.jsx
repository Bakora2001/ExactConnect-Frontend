import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Server, Shield, Cpu, HardDrive, Wifi, Globe, Clock, ChevronRight, Smartphone, Binary } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import NavBar from './reusables/Navbar';


// Import icons for OS
const ubuntu = '/ubuntu.svg';
const windows = '/windows.svg';
const centOs = '/centOs.svg';
const debian = '/debian.svg';

// Define the server URL for API calls
const SERVER_URL = 'https://exact-connect-latest.onrender.com';

const Configure = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState({
        id: 1,
        name: 'Basic VPS',
        price: 10,
        cpu: '1 vCPU',
        ram: '2 GB RAM',
        storage: '20 GB SSD',
        traffic: '1 TB Bandwidth',
        color: 'from-purple-500 to-purple-600'
    });
    const [selectedOS, setSelectedOS] = useState(null);
    const [osCategory, setOsCategory] = useState('linux'); // 'linux' or 'windows'
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [totalPrice, setTotalPrice] = useState(0);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('MPESA');
    const [errors, setErrors] = useState('');
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });



    // Operating systems options
    const osOptions = {
        linux: [
            { id: 1, name: 'Ubuntu 22.04', icon: ubuntu, type: 'Linux', price: 0 },
            { id: 3, name: 'CentOS 9', icon: centOs, type: 'Linux', price: 0 },
            { id: 4, name: 'Debian 11', icon: debian, type: 'Linux', price: 0 }
        ],
        windows: [
            { id: 2, name: 'Windows Server 2022', icon: windows, type: 'Windows', price: 5 },
            { id: 5, name: 'Windows Server 2019', icon: windows, type: 'Windows', price: 5 },
            { id: 6, name: 'Windows 11 Pro', icon: windows, type: 'Windows', price: 10 }
        ]
    };

    useEffect(() => {
        // Set default OS
        setSelectedOS(osOptions.linux[0]);
        calculateTotal(selectedPlan, osOptions.linux[0], billingCycle);
    }, []);

    // Calculate total based on selections
    const calculateTotal = (plan, os, cycle) => {
        if (!plan) return;
        
        let basePrice = plan.price;
        let osPrice = os ? os.price : 0;
        
        let cycleFactor = 1;
        let discount = 0;
        
        switch(cycle) {
            case 'quarterly':
                cycleFactor = 3;
                discount = 0.05; // 5% discount
                break;
            case 'semiannually':
                cycleFactor = 6;
                discount = 0.10; // 10% discount
                break;
            case 'annually':
                cycleFactor = 12;
                discount = 0.15; // 15% discount
                break;
            default:
                cycleFactor = 1;
                discount = 0;
        }
        
        const subtotal = (basePrice + osPrice) * cycleFactor;
        const discountAmount = subtotal * discount;
        const total = subtotal - discountAmount;
        
        setTotalPrice(total);
    };

    // Handle OS category selection
    const handleOSCategoryChange = (category) => {
        setOsCategory(category);
        // Select the first OS from the selected category
        const firstOSInCategory = osOptions[category][0];
        setSelectedOS(firstOSInCategory);
        calculateTotal(selectedPlan, firstOSInCategory, billingCycle);
    };

    // Handle OS selection
    const handleOSSelect = (os) => {
        setSelectedOS(os);
        calculateTotal(selectedPlan, os, billingCycle);
    };

    // Handle billing cycle selection
    const handleBillingCycleChange = (cycle) => {
        setBillingCycle(cycle);
        calculateTotal(selectedPlan, selectedOS, cycle);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle next step in checkout process
    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        } else {
            handleSubmitOrder();
        }
    };

    // Handle previous step in checkout process
    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo(0, 0);
        } else {
            navigate('/rdp');
        }
    };

    // Format phone number function (simplified version)
    const formatPhoneNumber = (phone) => {
        // Remove any non-digit characters
        const cleaned = phone.replace(/\D/g, '');
        
        // Add country code if needed (e.g., for Kenya)
        if (cleaned.startsWith('0')) {
            return '+254' + cleaned.substring(1);
        } else if (!cleaned.startsWith('+')) {
            return '+' + cleaned;
        }
        
        return cleaned;
    };

    // Toast notification functions
    const mpesaStkPushSubmitted = () => {
        toast.success(
            'Mpesa STK submitted successfully. Enter your PIN to complete the transaction.',
            {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            }
        );
    };

    const paystackPaymentSubmitted = () => {
        toast.success(
            'Redirecting to Paystack payment gateway...',
            {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            }
        );
    };

    const paymentFailed = (message = 'Payment failed. Please try again.') => {
        toast.error(message, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    // Handle payment submission based on the Test.jsx implementation
    const handleSubmitOrder = async () => {
        setIsLoading(true);
        setIsConfirming(true);
        setIsProcessing(true);
        
        // Validate phone number for M-Pesa
        if (paymentMethod === 'MPESA' && !formData.phone) {
            setErrors('Phone number is required for M-Pesa payment');
            setIsLoading(false);
            setIsConfirming(false);
            setIsProcessing(false);
            return;
        }
        setErrors('');
        
        try {
            const formattedNumber = formatPhoneNumber(formData.phone);
            
            const { data } = await axios.post(`${SERVER_URL}/payments`, {
                accountNumber: paymentMethod === 'MPESA' ? formattedNumber : formData.email,
                amount: totalPrice.toFixed(2),
                description: `VPS ${selectedPlan.name} with ${selectedOS.name}, ${billingCycle} billing cycle`,
                mode: paymentMethod === 'MPESA' ? 'STK' : 'LINK',
                provider: paymentMethod,
                category: 'COLLECTIONS',
                countryCode: formData.country || 'KE',
                currencyCode: 'KE',
                createdBy: formData.firstName + ' ' + formData.lastName,
                metaData: {
                    planId: selectedPlan.id,
                    osId: selectedOS.id,
                    billingCycle: billingCycle,
                    amount: totalPrice.toFixed(2),
                    requestedService: 'VPS',
                    customerId: formData.email,
                },
            });
            
            if (paymentMethod === 'MPESA') {
                mpesaStkPushSubmitted();
            } else {
                paystackPaymentSubmitted();
                
                // For Paystack, redirect to checkout URL if one is provided
                if (data.metaData && data.metaData.checkout) {
                    window.location.href = data.metaData.checkout;
                }
            }
            
            setIsConfirming(false);
            setIsLoading(false);
            
            // Validate the transaction like in Test.jsx
            await validateTransaction(data);
            
        } catch (error) {
            console.error('Payment Error:', error);
            setIsLoading(false);
            setIsConfirming(false);
            setIsProcessing(false);
            paymentFailed();
        }
    };

    // Validate transaction status - implementation from Test.jsx
    const validateTransaction = async (payload) => {
        console.log('Transaction Payload:', payload);

        const checkStatus = async () => {
            try {
                const { data } = await axios.get(`${SERVER_URL}/payments/search`, {
                    params: {
                        countryCode: formData.country || 'KE',
                        currencyCode: 'USD',
                        paymentId: payload.paymentId,
                        transactionStatus: payload.transactionStatus,
                    },
                });

                // Check if response contains expected data
                if (!data.content || data.content.length === 0) {
                    console.log('No transaction data found');
                    setIsProcessing(false);
                    return paymentFailed('No transaction data found. Please try again.');
                }

                // Ensure we access the correct transaction
                const transaction = Array.isArray(data.content)
                    ? data.content[0]
                    : data.content;
                console.log('Transaction Status:', transaction?.transactionStatus);

                // Normalize status
                const status = transaction?.transactionStatus?.trim().toUpperCase();
                
                switch (status) {
                    case 'ACCEPTED':
                        console.log('Transaction Successful');
                        toast.success('Payment successful!');
                        setIsProcessing(false);
                        setStep(4); // Move to success screen
                        return;
                    case 'FAILED':
                        console.log('Transaction Failed');
                        setIsProcessing(false);
                        paymentFailed('Transaction failed. Please try again.');
                        return;
                    case 'DECLINED':
                        console.log('Transaction Declined');
                        setIsProcessing(false);
                        paymentFailed('Transaction declined. Please try again.');
                        return;
                    case 'PROCESSING':
                        console.log('Transaction Processing');
                        // Keep checking
                        setTimeout(checkStatus, 10000);
                        break;
                    default:
                        console.log('Transaction Pending... Retrying in 10 seconds');
                        setTimeout(checkStatus, 10000);
                        break;
                }
            } catch (error) {
                console.error('Error fetching transaction:', error);
                setIsProcessing(false);
                paymentFailed('Error checking transaction status');
            }
        };

        // Start checking status after a short delay
        setTimeout(checkStatus, 10000);
    };

    // Get discount percentage based on billing cycle
    const getDiscountPercentage = () => {
        switch(billingCycle) {
            case 'quarterly': return '5%';
            case 'semiannually': return '10%';
            case 'annually': return '15%';
            default: return '0%';
        }
    };

    // Get cycle duration in months
    const getCycleDuration = () => {
        switch(billingCycle) {
            case 'quarterly': return 3;
            case 'semiannually': return 6;
            case 'annually': return 12;
            default: return 1;
        }
    };

    // Determine if can proceed to next step
    const canProceed = () => {
        if (step === 1) {
            return selectedPlan && selectedOS;
        } else if (step === 2) {
            return formData.firstName && formData.lastName && formData.email && formData.phone;
        } else if (step === 3) {
            if (paymentMethod === 'MPESA') {
                return formData.phone;
            } else {
                return formData.email;
            }
        }
        return false;
    };

    if (!selectedPlan) {
        return (
            <div className="bg-white text-black min-h-screen">
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white text-black min-h-screen">
            <ToastContainer />
            
            {/* Navigation */}
            <div className="relative z-30 mb-12 sm:mb-16 py-10 sm:py-12 animate-fadeIn">
              <NavBar />
            </div>

            {/* Back Button & Page Title */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <button 
                    onClick={handlePrevStep}
                    className="flex items-center text-purple-500 hover:text-purple-700 transition-colors duration-300"
                >
                    <ArrowLeft size={18} className="mr-1" />
                    <span>{step === 1 ? 'Back to Plans' : 'Previous Step'}</span>
                </button>
                
                <h1 className="text-3xl font-bold mt-4 text-center text-gray-800">
                    {step === 1 ? 'Configure Your VPS' : 
                     step === 2 ? 'Your Information' : 
                     step === 3 ? 'Payment Details' : 
                     'Order Confirmation'}
                </h1>
            </div>

            {/* Progress Bar */}
            <div className="max-w-4xl mx-auto px-4 mb-8">
                <div className="flex items-center justify-between">
                    {[1, 2, 3, 4].map((stepNumber) => (
                        <div key={stepNumber} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step >= stepNumber 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                                : 'bg-gray-200 text-gray-500'
                            } transition-all duration-300`}>
                                {step > stepNumber ? <Check size={16} /> : stepNumber}
                            </div>
                            <span className={`text-xs mt-1 ${
                                step >= stepNumber 
                                ? 'text-purple-500' 
                                : 'text-gray-500'
                            }`}>
                                {stepNumber === 1 ? 'Configuration' : 
                                 stepNumber === 2 ? 'Account' : 
                                 stepNumber === 3 ? 'Payment' : 'Done'}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="relative mt-2">
                    <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
                    <div 
                        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded transition-all duration-500"
                        style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main configuration area */}
                    <div className="lg:w-2/3">
                        {/* Step 1: Configuration */}
                        {step === 1 && (
                            <div className="bg-white border-gray-200 border rounded-xl p-6 shadow-lg animate-fade-in">
                                <h2 className="text-xl font-bold mb-4">Selected Plan</h2>
                                <div className="bg-gray-50 border-gray-200 border rounded-lg p-4 mb-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg">{selectedPlan.name}</h3>
                                            <div className={`inline-block bg-gradient-to-r ${selectedPlan.color} px-3 py-1 rounded-full text-white text-xs font-medium mt-2`}>
                                                {selectedPlan.id === 1 ? 'Basic' : 
                                                 selectedPlan.id === 2 ? 'Standard' : 
                                                 selectedPlan.id === 3 ? 'Premium' : 'Enterprise'}
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-0">
                                            <span className="text-2xl font-bold">${selectedPlan.price}</span>
                                            <span className="text-sm text-gray-500">/mo</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="flex items-center">
                                            <Cpu size={16} className="text-purple-500 mr-2 flex-shrink-0" />
                                            <span className="text-sm">{selectedPlan.cpu}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <HardDrive size={16} className="text-purple-500 mr-2 flex-shrink-0" />
                                            <span className="text-sm">{selectedPlan.ram}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Server size={16} className="text-purple-500 mr-2 flex-shrink-0" />
                                            <span className="text-sm">{selectedPlan.storage}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Wifi size={16} className="text-purple-500 mr-2 flex-shrink-0" />
                                            <span className="text-sm">{selectedPlan.traffic}</span>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold mb-4">Choose Operating System</h2>
                                
                                {/* OS Type Selection */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <h3 className="font-medium mb-3">Select OS Type</h3>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => handleOSCategoryChange('linux')}
                                            className={`px-4 py-2 rounded-lg flex items-center ${
                                                osCategory === 'linux' 
                                                ? 'bg-purple-500 text-white' 
                                                : 'bg-white border border-gray-300 text-gray-700'
                                            }`}
                                        >
                                            <img src={ubuntu} alt="Linux" className="w-6 h-6 mr-2" />
                                            Linux
                                        </button>
                                        <button
                                            onClick={() => handleOSCategoryChange('windows')}
                                            className={`px-4 py-2 rounded-lg flex items-center ${
                                                osCategory === 'windows' 
                                                ? 'bg-purple-500 text-white' 
                                                : 'bg-white border border-gray-300 text-gray-700'
                                            }`}
                                        >
                                            <img src={windows} alt="Windows" className="w-6 h-6 mr-2" />
                                            Windows
                                        </button>
                                    </div>
                                </div>
                                
                                {/* OS Selection */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {osOptions[osCategory].map((os) => (
                                        <div 
                                            key={os.id}
                                            className={`bg-gray-50 border-gray-200 
                                                border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md
                                                ${selectedOS && selectedOS.id === os.id ? 'border-2 border-purple-500' : ''}`}
                                            onClick={() => handleOSSelect(os)}
                                        >
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md mr-3">
                                                    <img src={os.icon} alt={`${os.name} logo`} className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">{os.name}</h3>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-500">{os.type}</span>
                                                        {os.price > 0 && (
                                                            <span className="text-sm font-medium">+${os.price}/mo</span>
                                                        )}
                                                        {os.price === 0 && (
                                                            <span className="text-xs text-green-500">Free</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h2 className="text-xl font-bold mb-4">Billing Cycle</h2>
                                <div className="space-y-3 mb-6">
                                    {[
                                        {id: 'monthly', name: 'Monthly', discount: '0%', factor: 1},
                                        {id: 'quarterly', name: 'Quarterly', discount: '5%', factor: 3},
                                        {id: 'semiannually', name: 'Semi-Annually', discount: '10%', factor: 6},
                                        {id: 'annually', name: 'Annually', discount: '15%', factor: 12}
                                    ].map((cycle) => (
                                        <div 
                                            key={cycle.id}
                                            className={`bg-gray-50 border-gray-200 
                                                border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md
                                                ${billingCycle === cycle.id ? 'border-2 border-purple-500' : ''}`}
                                            onClick={() => handleBillingCycleChange(cycle.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className={`w-5 h-5 rounded-full border-2 ${billingCycle === cycle.id ? 'border-purple-500' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                                                        {billingCycle === cycle.id && (
                                                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                                        )}
                                                    </div>
                                                    <span>{cycle.name}</span>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm font-medium">
                                                        ${(selectedPlan.price * cycle.factor).toFixed(2)}
                                                        {cycle.discount !== '0%' && (
                                                            <span className="line-through text-xs text-gray-500 ml-1">
                                                                ${(selectedPlan.price * cycle.factor).toFixed(2)}
                                                            </span>
                                                        )}
                                                    </span>
                                                    {cycle.discount !== '0%' && (
                                                        <span className="text-xs text-green-500">Save {cycle.discount}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Account Information */}
                        {step === 2 && (
                            <div className="bg-white border-gray-200 border rounded-xl p-6 shadow-lg animate-fade-in">
                                <h2 className="text-xl font-bold mb-4">Account Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="block text-sm font-medium mb-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold mt-8 mb-4">Billing Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium mb-1">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="">Select a country</option>
                                            <option value="US">United States</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="DE">Germany</option>
                                            <option value="CA">Canada</option>
                                            <option value="AU">Australia</option>
                                            <option value="KE">Kenya</option>
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium mb-1">Zip/Postal Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment Information */}
                        {step === 3 && (
                            <div className="bg-white border-gray-200 border rounded-xl p-6 shadow-lg animate-fade-in">
                                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                                
                                {/* Payment Method Selection */}
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
                                        <span className="font-medium mt-2">M-Pesa</span>
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
                                        <span className="font-medium mt-2">Paystack</span>
                                    </label>
                                </div>

                                {/* M-Pesa Payment Form */}
                                {paymentMethod === 'MPESA' && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium mb-1">
                                            M-Pesa Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="e.g 07XXXXXXXX"
                                            className="w-full px-3 py-2 rounded-lg border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
                                        <p className="text-sm text-gray-500 mt-2">
                                            You will receive an STK push to this number to complete the payment.
                                        </p>
                                    </div>
                                )}

                                {/* Paystack Payment Form */}
                                {paymentMethod === 'PAYSTACK' && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium mb-1">
                                            Email Address for Receipt
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            readOnly
                                            className="w-full px-3 py-2 rounded-lg border bg-gray-100 border-gray-300"
                                        />
                                        <p className="text-sm text-gray-500 mt-2">
                                            You'll be redirected to the Paystack payment page to complete your transaction.
                                        </p>
                                    </div>
                                )}

                                <div className="bg-blue-50 border-blue-200 border rounded-lg p-4 mt-8 flex items-start">
                                    <Shield size={20} className="text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-medium">Secure Payment</h3>
                                        <p className="text-xs mt-1 opacity-80">
                                            Your payment information is encrypted and secure. We never store your full payment details.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Order Confirmation */}
                        {step === 4 && (
                            <div className="bg-white border-gray-200 border rounded-xl p-6 shadow-lg animate-fade-in text-center">
                                <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mb-6">
                                    <Check size={32} className="text-white" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
                                <p className="mb-6 opacity-80">Your VPS service will be activated shortly.</p>
                                
                                <div className="bg-gray-50 border-gray-200 border rounded-lg p-4 mb-6 text-left">
                                    <h3 className="font-bold">Order Summary</h3>
                                    <div className="mt-3 space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span>Plan: {selectedPlan.name}</span>
                                            <span>${selectedPlan.price.toFixed(2)}/mo</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span>Operating System: {selectedOS.name}</span>
                                            <span>{selectedOS.price > 0 ? `$${selectedOS.price.toFixed(2)}/mo` : 'Free'}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span>Billing Cycle: {billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}</span>
                                            <span>{getCycleDuration()} months</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span>Discount:</span>
                                            <span>{getDiscountPercentage()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span>Payment Method:</span>
                                            <span>{paymentMethod === 'MPESA' ? 'M-Pesa' : 'Paystack'}</span>
                                        </div>
                                        <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between items-center font-bold">
                                            <span>Total:</span>
                                            <span>${totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="bg-purple-50 border-purple-200 border rounded-lg p-4 flex items-start">
                                        <Server size={20} className="text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                                        <div className="text-left">
                                            <h3 className="text-sm font-medium">Server Details</h3>
                                            <p className="text-xs mt-1 opacity-80">
                                                You will receive an email with your server login details within the next 30 minutes.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-green-50 border-green-200 border rounded-lg p-4 flex items-start">
                                        <Globe size={20} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                        <div className="text-left">
                                            <h3 className="text-sm font-medium">Control Panel</h3>
                                            <p className="text-xs mt-1 opacity-80">
                                                Access your VPS control panel at <span className="font-medium">panel.yourcompany.com</span> using your email address.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => navigate('/')}
                                    className="mt-8 w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Order summary sidebar */}
                    <div className="lg:w-1/3">
                        {step < 4 && (
                            <div className="bg-white border-gray-200 border rounded-xl p-6 shadow-lg sticky top-6">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Plan</span>
                                        <span className="font-medium">{selectedPlan.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Price</span>
                                        <span className="font-medium">${selectedPlan.price.toFixed(2)}/mo</span>
                                    </div>
                                    {selectedOS && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Operating System</span>
                                            <div className="flex items-center">
                                                <span className="font-medium">{selectedOS.name}</span>
                                                {selectedOS.price > 0 && (
                                                    <span className="text-xs text-gray-500 ml-1">+${selectedOS.price}/mo</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Billing Cycle</span>
                                        <span className="font-medium">
                                            {billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)} ({getCycleDuration()} months)
                                        </span>
                                    </div>
                                    
                                    {getDiscountPercentage() !== '0%' && (
                                        <div className="flex justify-between items-center text-green-500">
                                            <span className="text-sm">Discount</span>
                                            <span className="font-medium">-{getDiscountPercentage()}</span>
                                        </div>
                                    )}
                                    
                                    <div className="pt-3 border-t border-dashed border-gray-200 mt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold">Total</span>
                                            <div>
                                                <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-right text-gray-500 mt-1">
                                            Billed {billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 border-gray-200 border rounded-lg p-4 mb-6 flex items-start">
                                    <Clock size={16} className="text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-medium">Setup Time</h3>
                                        <p className="text-xs mt-1 opacity-80">
                                            Your VPS will be set up within 30 minutes after your order is confirmed.
                                        </p>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={step === 3 ? handleSubmitOrder : handleNextStep}
                                    disabled={!canProceed() || isConfirming || isProcessing}
                                    className={`w-full py-3 flex items-center justify-center rounded-lg font-medium transition-all duration-300 ${
                                        canProceed() && !isConfirming && !isProcessing
                                        ? step === 3 
                                            ? paymentMethod === 'MPESA' 
                                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {isConfirming ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <span>
                                                {step === 1 ? 'Continue to Account Details' : 
                                                 step === 2 ? 'Continue to Payment' : 
                                                 paymentMethod === 'MPESA' ? `Pay $${totalPrice.toFixed(2)} with M-Pesa` :
                                                 `Pay $${totalPrice.toFixed(2)} with Paystack`}
                                            </span>
                                            <ChevronRight size={18} className="ml-2" />
                                        </div>
                                    )}
                                </button>
                                
                                {step === 3 && (
                                    <div className="mt-4 text-center">
                                        <p className="text-xs opacity-70">
                                            By clicking on the payment button, you agree to our <a href="#" className="text-purple-500 underline">Terms of Service</a> and <a href="#" className="text-purple-500 underline">Privacy Policy</a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Payment processing overlay */}
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4 mx-auto"></div>
                        <p className="text-lg font-medium">Processing your payment...</p>
                        <p className="text-sm text-gray-600 mt-2">Please do not close or refresh this page.</p>
                    </div>
                </div>
            )}
            
            {/* CSS for animations */}
            <style jsx="true">{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Configure;