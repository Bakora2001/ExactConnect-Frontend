
import React, { useState, useEffect, useContext, useRef } from 'react';
import NavBar from '../../components/reusables/Navbar';
import { DarkModeContext } from '../../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ChevronDown, Play, Shield, Zap, Download, CheckCircle, HelpCircle, CreditCard, Star, FileText, Info, Users, Award } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../../components/ui/Collapsible';

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
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const introSectionRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to intro section when clicking the learn more button
  const scrollToIntro = () => {
    introSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = [
    {
      id: 'driving-license',
      title: 'Driving License Template',
      icon: '🚗',
      description: 'High-quality editable driving license templates from countries worldwide.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      price: '$19.99',
      requiresState: true,
      requiresCity: true
    },
    {
      id: 'passport',
      title: 'Passport Template',
      icon: '✈️',
      description: 'Professional passport templates for international designs.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      price: '$24.99',
      requiresState: false,
      requiresCity: false
    },
    {
      id: 'utility-bill',
      title: 'Utility Bill Template',
      icon: '📝',
      description: 'Realistic utility bill templates from major providers.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      price: '$14.99',
      requiresState: true,
      requiresCity: true
    },
    {
      id: 'id-card',
      title: 'ID Card Template',
      icon: '🪪',
      description: 'Customizable ID card templates for various organizations.',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
      price: '$17.99',
      requiresState: true,
      requiresCity: false
    },
    {
      id: 'business-card',
      title: 'Business Card Template',
      icon: '💼',
      description: 'Modern business card designs with full customization.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      price: '$12.99',
      requiresState: false,
      requiresCity: false
    },
    {
      id: 'invoice',
      title: 'Invoice Template',
      icon: '💰',
      description: 'Professional invoice templates for businesses of all sizes.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      price: '$16.99',
      requiresState: false,
      requiresCity: false
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
      answer: 'You\'ll receive PSD (Photoshop) files that are fully layered and editable. All text, colors, and images can be customized to your needs. Our templates are designed with organized layer structures for easy navigation and editing.'
    },
    {
      question: 'Do I need Adobe Photoshop to edit these templates?',
      answer: 'Yes, you\'ll need Adobe Photoshop to edit PSD files. We recommend using Photoshop CC or newer versions for optimal results. If you don\'t have Photoshop, you can also use alternatives like GIMP, but some features might be limited.'
    },
    {
      question: 'Are fonts included with the templates?',
      answer: 'Most templates include links to free fonts used in the design. Some may use commercial fonts which are indicated in the template description. We provide detailed font information in the documentation that comes with each template.'
    },
    {
      question: 'Can I use these templates for commercial purposes?',
      answer: 'Our templates are licensed for personal use only. Commercial use is prohibited and against our terms of service. If you need a commercial license, please contact our support team.'
    },
    {
      question: 'Do you offer customization services for these templates?',
      answer: 'Yes, we offer customization services for an additional fee. Please contact our support team for custom work inquiries. We can modify any template to match your specific requirements.'
    },
    {
      question: 'How long will I have access to download my purchased templates?',
      answer: 'You\'ll have unlimited access to download your purchased templates for a period of 1 year from the date of purchase. We recommend downloading and backing up your files immediately after purchase.'
    },
    {
      question: 'What resolution are the templates?',
      answer: 'All our templates are designed in high resolution (300 DPI) which is print-ready. This ensures that your designs look crisp and professional whether viewed digitally or printed.'
    },
    {
      question: 'Do you provide support after purchase?',
      answer: 'Yes, we provide dedicated support for all our templates. If you encounter any issues or have questions about using the templates, our support team is available to assist you.'
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

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Graphic Designer",
      rating: 5,
      review: "ExactConnects' PSD templates saved me hours of work. The layers are perfectly organized and everything is fully customizable. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
      date: "May 15, 2024"
    },
    {
      name: "David Chen",
      role: "Web Developer",
      rating: 4.5,
      review: "I'm impressed with the quality and attention to detail in these templates. They're easy to work with and the customer support is excellent.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      date: "April 28, 2024"
    },
    {
      name: "Maria Garcia",
      role: "UI/UX Designer",
      rating: 5,
      review: "These templates are incredibly well-designed and easy to customize. The documentation is clear and the options are impressive. Worth every penny!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      date: "June 2, 2024"
    },
    {
      name: "James Omondi",
      role: "Brand Strategist",
      rating: 4.5,
      review: "ExactConnects provided templates that perfectly matched my clients' brand guidelines. The quality is outstanding and the designs are modern.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      date: "May 20, 2024"
    }
  ];

  const usageSteps = [
    {
      title: "Download the PSD",
      description: "After completing your purchase, download the PSD file to your computer.",
      icon: <Download size={28} />
    },
    {
      title: "Open in Adobe Photoshop",
      description: "Right-click the PSD file and open it with Adobe Photoshop. We recommend Photoshop CC or newer versions.",
      icon: <FileText size={28} />
    },
    {
      title: "Navigate Layers Panel",
      description: "Locate the Layers panel in Photoshop to see all editable elements organized in folders.",
      icon: <Info size={28} />
    },
    {
      title: "Customize Text & Images",
      description: "Double-click text layers to edit content. Replace images by using the 'Place Embedded' function.",
      icon: <Users size={28} />
    },
    {
      title: "Save Your Work",
      description: "Save your edits as PSD to preserve layers, or export as JPG/PNG for final use.",
      icon: <Award size={28} />
    }
  ];

  const benefits = [
    {
      title: "Time-Saving",
      description: "Skip hours of design work with our ready-to-use templates.",
      icon: "⏱️"
    },
    {
      title: "Professional Quality",
      description: "All templates follow industry standards with proper resolution and spacing.",
      icon: "🏆"
    },
    {
      title: "Fully Customizable",
      description: "Every element can be modified to match your specific needs.",
      icon: "🎨"
    },
    {
      title: "Organized Layers",
      description: "Neatly structured layers make editing quick and easy.",
      icon: "📋"
    },
    {
      title: "Regular Updates",
      description: "We constantly update our templates to meet changing needs and standards.",
      icon: "🔄"
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
    if (!selectedCountry) {
      toast.error('Please select a country before proceeding');
      return;
    }
    
    if (selectedCategory.requiresState && !selectedState) {
      toast.error('Please select a state/province before proceeding');
      return;
    }
    
    if (selectedCategory.requiresCity && !selectedCity) {
      toast.error('Please select a city before proceeding');
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

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`star-${i}`} size={16} fill="#FFD700" color="#FFD700" className="mr-1" />
        ))}
        {hasHalfStar && (
          <div className="relative mr-1">
            <Star size={16} className="text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
              <Star size={16} fill="#FFD700" color="#FFD700" />
            </div>
          </div>
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-star-${i}`} size={16} className="mr-1 text-gray-300" />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
          <p className={`mt-4 text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Loading amazing PSD templates...</p>
        </div>
      </div>
    );
  }

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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={openVideoModal}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md transition-all duration-200 hover:scale-105 animate-fade-in"
                >
                  <Play size={20} className="mr-2" />
                  How to Download & Edit Templates
                </button>
                <button
                  onClick={scrollToIntro}
                  className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md transition-all duration-200 hover:scale-105 animate-fade-in"
                >
                  Learn More
                  <ChevronDown size={20} className="ml-2" />
                </button>
              </div>
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
      
      {/* Introduction Section */}
      <section ref={introSectionRef} className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What Are PSD Templates?
            </h2>
            <div className={`w-24 h-1 bg-purple-600 mx-auto mb-8 rounded-full`}></div>
            <p className={`text-lg max-w-3xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              PSD (Photoshop Document) templates are pre-designed, layered files created in Adobe Photoshop that serve as a starting point for your design projects. They contain all the visual elements, typography, and effects needed to create professional-looking designs without starting from scratch.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-in">
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                Why Choose ExactConnects' PSD Templates?
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-2xl mr-3">{benefit.icon}</span>
                    <div>
                      <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{benefit.title}</h4>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <div className={`w-full p-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-purple-100 hover:bg-purple-200'} transition-colors duration-200`}>
                  <span className="font-medium">What makes our templates different?</span>
                  <div className={`px-4 pt-2 pb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p className="mb-2">
                      ExactConnects provides templates that follow strict quality standards. Our templates feature:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>300 DPI resolution (print-ready)</li>
                      <li>Well-organized layer groups</li>
                      <li>Smart Objects for easy editing</li>
                      <li>Complete documentation for easy use</li>
                      <li>Regular updates to match current design trends</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 animate-fade-in">
              <div className="relative">
                <div className={`absolute inset-0 rounded-2xl ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100/50'} transform rotate-3`}></div>
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="PSD Template Example" 
                  className="relative z-10 rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-purple-600 text-white py-2 px-4 rounded-lg shadow-lg transform rotate-3 z-20">
                  Professional Quality
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Template Pricing
          </h2>
          <p className={`text-center max-w-3xl mx-auto mb-10 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We offer affordable pricing for all our premium PSD templates.
            Choose the option that fits your needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}
              >
                <div className="relative">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="text-3xl mb-1">{category.icon}</div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {category.price}
                  </div>
                </div>
                
                <div className="p-4">
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {category.description}
                  </p>
                  <button
                    onClick={() => handleCategorySelect(category)}
                    className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Select Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            <span className={`inline-block ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
              Select Your Template Category
            </span>
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12">
            Browse our collection of professionally designed templates for various purposes.
            Each template is fully customizable and available in high resolution.
          </p>
          
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
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                      {category.price}
                    </span>
                  </div>
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
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {selectedCategory ? (
            <div className={`rounded-2xl shadow-xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-3">{selectedCategory.icon}</span>
                <div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-purple-800'}`}>
                    {selectedCategory.title}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className={`font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                      {selectedCategory.price}
                    </span>
                    <span className={`mx-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>•</span>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Instant download after payment
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                  <img 
                    src={selectedCategory.image} 
                    alt={selectedCategory.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                  <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-purple-800'}`}>
                    Template Details:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle size={18} className={`mr-2 mt-0.5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span>High resolution (300 DPI)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className={`mr-2 mt-0.5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span>Fully layered PSD file</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className={`mr-2 mt-0.5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span>Smart Objects for easy editing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className={`mr-2 mt-0.5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span>Documentation included</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className={`mr-2 mt-0.5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span>Free updates for 1 year</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Select Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                      darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'
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
                
                {selectedCountry && selectedCategory.requiresState && (
                  <div className="animate-fade-in">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Select State/Province
                    </label>
                    <select
                      value={selectedState}
                      onChange={handleStateChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                        darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'
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
                
                {selectedState && selectedCategory.requiresCity && cities[selectedState] && (
                  <div className="animate-fade-in">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Select City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={handleCityChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                        darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'
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
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                      !selectedCountry || 
                      (selectedCategory.requiresState && !selectedState) || 
                      (selectedCategory.requiresCity && !selectedCity)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-purple-700 hover:bg-purple-800 shadow-lg hover:shadow-purple-500/40'
                    }`}
                  >
                    <Download size={20} className="inline mr-2" />
                    Purchase Now ({selectedCategory.price})
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
      
      {/* How to Use Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className={darkMode ? 'text-purple-400' : 'text-purple-700'}>
              How to Use Our PSD Templates
            </span>
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12">
            Follow these simple steps to get the most out of your purchased PSD templates
          </p>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200 dark:bg-purple-900"></div>
            
            {/* Steps */}
            <div className="space-y-12">
              {usageSteps.map((step, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-purple-600 z-10 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                      <div className={`inline-block p-3 rounded-full mb-4 ${darkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
                        {step.icon}
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {step.title}
                      </h3>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Empty div for spacing */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <button
              onClick={openVideoModal}
              className={`inline-flex items-center px-6 py-3 rounded-lg shadow-lg ${
                darkMode 
                  ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              } transition-all duration-300 hover:shadow-purple-500/30`}
            >
              <Play size={20} className="mr-2" />
              Watch Video Tutorial
            </button>
          </div>
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
                className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
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
      
      {/* Customer Reviews Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className={darkMode ? 'text-purple-400' : 'text-purple-700'}>
              What Our Customers Say
            </span>
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12">
            Hear from designers and creatives who use our PSD templates
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl shadow-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                } transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex items-start">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {review.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {review.role}
                    </p>
                    <div className="mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{review.review}"
                </p>
                <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {review.date}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg max-w-3xl mx-auto`}>
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Overall Customer Rating
              </h3>
              <div className="flex items-center justify-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={24} fill="#FFD700" color="#FFD700" className="mx-1" />
                  ))}
                </div>
                <span className={`ml-2 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  4.9/5
                </span>
              </div>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Based on 1,200+ verified customer reviews
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8`}>
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
                  darkMode ? 'bg-gray-800' : 'bg-white'
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
                      ? 'max-h-96' 
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
          
          <div className="mt-12 text-center">
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Still have questions about our PSD templates?
            </p>
            <button
              onClick={() => navigate('/contact')}
              className={`px-6 py-3 rounded-lg ${
                darkMode 
                  ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              } transition-colors duration-200`}
            >
              Contact Our Support Team
            </button>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Stay Updated with New Templates
          </h2>
          <p className={`max-w-2xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Subscribe to our newsletter to get notifications about new templates, special offers, and design tips.
          </p>
          
          <div className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              />
              <button 
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
            <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                About ExactConnects
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                We provide high-quality PSD templates for designers, businesses, and individuals looking for professional design solutions.
              </p>
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
            
            <div>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h3>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>
                  <a href="#" className="hover:underline">Home</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Templates</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Pricing</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">About Us</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Contact</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Us
              </h3>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>
                  Email: support@exactconnects.com
                </li>
                <li>
                  Phone: +1 (123) 456-7890
                </li>
                <li>
                  Address: 123 Template Street, Design City
                </li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              &copy; {new Date().getFullYear()} ExactConnects PSD Templates. All rights reserved.
            </p>
          </div>
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
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors z-20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Replace with actual video - this is a placeholder */}
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <Play size={64} className="mx-auto mb-4 opacity-50" />
                    <p className="text-xl">How to Download & Edit Templates</p>
                    <p className="text-sm mt-2 text-gray-400">
                      Learn how to get the most out of your purchased PSD templates with our step-by-step tutorial.
                    </p>
                    <div className="mt-6">
                      <p className="text-gray-300 text-sm">Video Highlights:</p>
                      <ul className="text-sm text-left max-w-md mx-auto mt-2 space-y-1 text-gray-400">
                        <li>• Opening and navigating PSD files in Photoshop</li>
                        <li>• Modifying text and replacing images</li> 
                        <li>• Working with smart objects</li>
                        <li>• Exporting in different formats</li>
                        <li>• Advanced editing techniques</li>
                      </ul>
                    </div>
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