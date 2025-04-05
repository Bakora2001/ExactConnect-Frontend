
import React, { useState, useEffect, useContext, useRef } from 'react';
import NavBar from '../../components/reusables/Navbar';
import { DarkModeContext } from '../../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ChevronDown, Play, Shield, Zap, Download, CheckCircle, HelpCircle, CreditCard } from 'lucide-react';

const Psd = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const videoRef = useRef(null);

  const categories = [
    {
      id: 'driving-license',
      title: 'Driving License Template',
      icon: '🚗',
      description: 'High-quality editable driving license templates from countries worldwide.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    },
    {
      id: 'passport',
      title: 'Passport Template',
      icon: '✈️',
      description: 'Professional passport templates for international designs.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    },
    {
      id: 'utility-bill',
      title: 'Utility Bill Template',
      icon: '📝',
      description: 'Realistic utility bill templates from major providers.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    },
    {
      id: 'id-card',
      title: 'ID Card Template',
      icon: '🪪',
      description: 'Customizable ID card templates for various organizations.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    },
    {
      id: 'business-card',
      title: 'Business Card Template',
      icon: '💼',
      description: 'Modern business card designs with full customization.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    },
    {
      id: 'invoice',
      title: 'Invoice Template',
      icon: '💰',
      description: 'Professional invoice templates for businesses of all sizes.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    },
  ];

  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'South Africa', 'Nigeria', 'Kenya'];
  
  const states = {
    'USA': ['California', 'New York', 'Texas', 'Florida', 'Illinois'],
    'UK': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
    'Germany': ['Bavaria', 'Berlin', 'Hesse', 'North Rhine-Westphalia'],
    'France': ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Occitanie', 'Auvergne-Rhône-Alpes'],
    'Japan': ['Tokyo', 'Osaka', 'Hokkaido', 'Kyoto'],
    'South Africa': ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape'],
    'Nigeria': ['Lagos', 'Abuja', 'Kano', 'Rivers'],
    'Kenya': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru']
  };
  
  const cities = {
    'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
    'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
    'Texas': ['Houston', 'Austin', 'Dallas', 'San Antonio'],
    'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
    'England': ['London', 'Manchester', 'Birmingham', 'Liverpool'],
    'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'],
    'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'London'],
    'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
    'Lagos': ['Ikeja', 'Lekki', 'Surulere', 'Yaba'],
    'Nairobi': ['Westlands', 'Karen', 'Kilimani', 'Parklands']
  };

  const faqs = [
    {
      question: 'What file format will I receive after purchase?',
      answer: 'You\'ll receive PSD (Photoshop) files that are fully layered and editable. All text, colors, and images can be customized to your needs.'
    },
    {
      question: 'Do I need Adobe Photoshop to edit these templates?',
      answer: 'Yes, you\'ll need Adobe Photoshop to edit PSD files. We recommend using Photoshop CC or newer versions for optimal results.'
    },
    {
      question: 'Are fonts included with the templates?',
      answer: 'Most templates include links to free fonts used in the design. Some may use commercial fonts which are indicated in the template description.'
    },
    {
      question: 'Can I use these templates for commercial purposes?',
      answer: 'Our templates are licensed for personal use only. Commercial use is prohibited and against our terms of service.'
    },
    {
      question: 'Do you offer customization services for these templates?',
      answer: 'Yes, we offer customization services for an additional fee. Please contact our support team for custom work inquiries.'
    },
    {
      question: 'How long will I have access to download my purchased templates?',
      answer: 'You\'ll have unlimited access to download your purchased templates for a period of 1 year from the date of purchase.'
    }
  ];

  const useCases = [
    {
      title: 'Design Mockups',
      description: 'Create realistic mockups for design presentations to clients.',
      icon: <Zap size={24} />
    },
    {
      title: 'Educational Purposes',
      description: 'Use templates for teaching design principles and document structure.',
      icon: <CheckCircle size={24} />
    },
    {
      title: 'Portfolio Enhancement',
      description: 'Build your design portfolio with professional-looking designs.',
      icon: <Shield size={24} />
    },
    {
      title: 'Artwork Creation',
      description: 'Use templates as a base for creative artwork and digital designs.',
      icon: <Download size={24} />
    }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
    
    // Smooth scroll to the selection form
    document.getElementById('selection-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleDownload = () => {
    if (!selectedCountry || !selectedState || !selectedCity) {
      toast.error('Please complete your selection before proceeding');
      return;
    }
    
    setShowPaymentModal(true);
  };

  const handlePayment = (method) => {
    toast.success(`Processing ${method} payment...`);
    setTimeout(() => {
      toast.success('Payment successful! Download starting...');
      setShowPaymentModal(false);
      // In a real implementation, this would trigger the actual download
    }, 2000);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    // Pause video when modal is closed if it's playing
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in">
                Premium PSD Templates
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto animate-fade-in">
                High-quality editable templates for all your design needs
              </p>
              <button 
                onClick={openVideoModal}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md transition-all duration-200 hover:scale-105 animate-fade-in"
              >
                <Play size={20} className="mr-2" />
                Watch How It Works
              </button>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-16 sm:h-24">
            <path 
              fill={darkMode ? "#111827" : "#f9fafb"} 
              fillOpacity="1" 
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z">
            </path>
          </svg>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={`inline-block ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
              Select Your Template Category
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  selectedCategory?.id === category.id 
                    ? 'ring-4 ring-purple-500' 
                    : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 to-purple-600/70 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  <p className="text-purple-100 mt-2">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Selection Form Section */}
      <section 
        id="selection-form" 
        className={`py-16 px-4 sm:px-6 lg:px-8 ${
          darkMode ? 'bg-gray-800' : 'bg-purple-50'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {selectedCategory ? (
            <div className={`bg-white rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-700' : ''}`}>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-purple-800'}`}>
                {selectedCategory.title} Selection
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Select Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white'
                    }`}
                    required
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedCountry && (
                  <div className="animate-fade-in">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Select State/Province
                    </label>
                    <select
                      value={selectedState}
                      onChange={handleStateChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                        darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white'
                      }`}
                      required
                    >
                      <option value="">Select a state</option>
                      {states[selectedCountry]?.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {selectedState && cities[selectedState] && (
                  <div className="animate-fade-in">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Select City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={handleCityChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                        darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white'
                      }`}
                      required
                    >
                      <option value="">Select a city</option>
                      {cities[selectedState]?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="pt-4">
                  <button
                    onClick={handleDownload}
                    disabled={!selectedCountry || !selectedState || !selectedCity}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                      !selectedCountry || !selectedState || !selectedCity
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-700 hover:bg-purple-800 shadow-lg hover:shadow-purple-500/40'
                    }`}
                  >
                    <Download size={20} className="inline mr-2" />
                    Proceed to Download
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Please select a template category above to continue
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className={darkMode ? 'text-purple-400' : 'text-purple-700'}>
              Use Cases for PSD Templates
            </span>
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12">
            Our high-quality PSD templates can be used for a variety of purposes. Here are some common use cases:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-purple-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'
                }`}>
                  {useCase.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {useCase.title}
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className={darkMode ? 'text-purple-400' : 'text-purple-700'}>
              Frequently Asked Questions
            </span>
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`rounded-lg overflow-hidden ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                } shadow-md`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex justify-between items-center p-5 text-left font-medium ${
                    activeFaq === index 
                      ? (darkMode ? 'bg-purple-700' : 'bg-purple-600 text-white') 
                      : ''
                  }`}
                >
                  <span className={activeFaq === index ? 'text-white' : ''}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-300 ${
                      activeFaq === index ? 'transform rotate-180 text-white' : ''
                    }`} 
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaq === index 
                      ? 'max-h-40' 
                      : 'max-h-0'
                  }`}
                >
                  <div className="p-5 border-t">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <button
              onClick={openVideoModal}
              className={`inline-flex items-center px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              } transition-all duration-200`}
            >
              <Play size={18} className="mr-2" />
              Watch Template Tutorial
            </button>
          </div>
          
          <p className={`mt-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} PSD Templates Marketplace. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={() => setShowPaymentModal(false)}
            >
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            
            <span 
              className="hidden sm:inline-block sm:align-middle sm:h-screen" 
              aria-hidden="true"
            >
              &#8203;
            </span>
            
            <div 
              className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 
                      className={`text-lg leading-6 font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Complete Your Purchase
                    </h3>
                    
                    <div className="mt-4">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Please select your preferred payment method:
                      </p>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <button
                        onClick={() => handlePayment('Mpesa')}
                        className="w-full flex items-center justify-between p-4 rounded-lg border-2 border-green-500 hover:bg-green-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <CreditCard className="text-green-600" />
                          </div>
                          <div className="text-left">
                            <p className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                              M-Pesa
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Mobile money payment
                            </p>
                          </div>
                        </div>
                        <ChevronDown size={20} className="text-green-500" />
                      </button>
                      
                      <button
                        onClick={() => handlePayment('Paystack')}
                        className="w-full flex items-center justify-between p-4 rounded-lg border-2 border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <CreditCard className="text-blue-600" />
                          </div>
                          <div className="text-left">
                            <p className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                              Paystack
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Card and bank payment
                            </p>
                          </div>
                        </div>
                        <ChevronDown size={20} className="text-blue-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm ${
                    darkMode 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Video Tutorial Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              aria-hidden="true"
              onClick={closeVideoModal}
            >
              <div className="absolute inset-0 bg-gray-900 opacity-90"></div>
            </div>
            
            <span 
              className="hidden sm:inline-block sm:align-middle sm:h-screen" 
              aria-hidden="true"
            >
              &#8203;
            </span>
            
            <div 
              className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-black aspect-video">
                <button
                  onClick={closeVideoModal}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Replace with actual video - this is a placeholder */}
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <Play size={64} className="mx-auto mb-4 opacity-50" />
                    <p className="text-xl">Video Tutorial: How to Download & Edit PSD Templates</p>
                    <p className="text-sm mt-2 text-gray-400">
                      (This is a placeholder. In a real implementation, embed your video here)
                    </p>
                  </div>
                </div>
                
                {/* Uncomment for real video implementation */}
                {/* <video 
                  ref={videoRef}
                  controls
                  className="w-full h-full"
                  poster="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                >
                  <source src="/path/to/your/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Psd;