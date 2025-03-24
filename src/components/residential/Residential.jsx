import React, { useState, useEffect, useContext, useRef } from 'react';
import NavBar from '../../components/reusables/Navbar';
import { ArrowRight, CheckCircle, Globe, Shield, Zap, Phone, Mail, Smartphone } from 'lucide-react';
import Footer from '../reusables/Footer';
import { DarkModeContext } from '../../context/DarkModeContext';

const Residential = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCustomPlanModal, setShowCustomPlanModal] = useState(false);
  const [showUseCaseModal, setShowUseCaseModal] = useState(false);
  const pricingRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requirements: '',
    budget: '',
    phone: '',
    duration: '1 month',
    useCase: ''
  });
  const [animatedElements, setAnimatedElements] = useState([]);
  const [modalType, setModalType] = useState('contact'); // 'contact', 'customPlan', 'useCase'

  useEffect(() => {
    // Animation observer for fade-in elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Select all elements with animation classes
    const animationTargets = document.querySelectorAll('.animate-on-scroll');
    animationTargets.forEach(target => {
      observer.observe(target);
    });

    return () => {
      animationTargets.forEach(target => {
        observer.unobserve(target);
      });
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    
    // You would typically send a POST request here
    // Example:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })

    alert('Thank you for your inquiry! Our team will contact you shortly.');
    
    // Close all modals
    setShowContactModal(false);
    setShowCustomPlanModal(false);
    setShowUseCaseModal(false);
    
    // Reset form data
    setFormData({
      name: '',
      email: '',
      company: '',
      requirements: '',
      budget: '',
      phone: '',
      duration: '1 month',
      useCase: ''
    });
  };

  const scrollToPricing = () => {
    pricingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const openModal = (type) => {
    setModalType(type);
    setShowContactModal(true);
  };

  const features = [
    {
      icon: <Globe size={24} />,
      title: "Global Coverage",
      description: "Access to over 50 million residential IPs across 195+ countries and regions worldwide."
    },
    {
      icon: <Shield size={24} />,
      title: "High Anonymity",
      description: "Real residential IPs from actual devices ensure maximum anonymity and minimal detection rates."
    },
    {
      icon: <Zap size={24} />,
      title: "Lightning Fast",
      description: "Optimized connection speeds with minimal latency for seamless browsing and data collection."
    }
  ];

  // Updated pricing plans
  const pricingPlans = [
    {
      title: "Monthly",
      price: "$10",
      period: "per month",
      subtitle: "Custom plan tailored to your needs",
      features: [
        "SOCKS5",
        "Unlimited bandwidth",
        "Real LTE/4G and residential WiFi IPs",
        "Detailed targeting",
        "24/7 support",
        "Flexible configuration options"
      ],
      isCustom: true
    },
    {
      title: "Private",
      price: "From $1",
      period: "per 24 hours",
      subtitle: "Exclusively leased to you",
      features: [
        "SOCKS5",
        "Unlimited bandwidth",
        "Real LTE/4G and residential WiFi IPs",
        "Detailed targeting",
        "24/7 support",
        "Premium IP selection"
      ],
      popular: true
    },
    {
      title: "Mobile Proxies",
      price: "$250",
      period: "per month",
      subtitle: "Premium mobile proxy access",
      features: [
        "SOCKS5",
        "Unlimited bandwidth",
        "Real LTE/4G mobile IPs",
        "IP rotation",
        "Detailed targeting",
        "24/7 premium support"
      ]
    }
  ];

  const discounts = [
    {
      percentage: "10%",
      range: "$50 - $100"
    },
    {
      percentage: "15%",
      range: "$150 - $500"
    },
    {
      percentage: "20%",
      range: "> $500"
    }
  ];

  const faqItems = [
    {
      question: "What are residential proxies?",
      answer: "Residential proxies are IP addresses provided by Internet Service Providers (ISPs) to homeowners. When you connect through a residential proxy, your internet traffic appears to come from a regular residential connection rather than a data center, making them ideal for tasks requiring high anonymity."
    },
    {
      question: "How do ExactConnect's proxies differ from competitors?",
      answer: "ExactConnect's residential proxy network offers superior uptime, extensive global coverage, and ethical sourcing practices. Our proxies are optimized for speed and reliability with advanced rotation features and precise location targeting capabilities not available with most competitors."
    },
    {
      question: "Do you offer city-level targeting?",
      answer: "Yes, ExactConnect provides city-level targeting options in our Private and Custom plans. This allows you to direct your traffic through specific cities for more precise geolocation needs."
    },
    {
      question: "Are your proxies suitable for scraping?",
      answer: "Absolutely. Our residential proxies are ideal for web scraping operations as they provide legitimate residential IPs that help avoid detection and blocks from anti-bot systems. The high rotation capabilities and large IP pool ensure successful data collection."
    },
    {
      question: "How is bandwidth calculated and billed?",
      answer: "With ExactConnect, you enjoy unlimited bandwidth with all our packages. Instead of charging by data transferred, we bill based on the duration of usage (per 24 hours) or with monthly packages for our Mobile Proxies option."
    }
  ];

  const useCases = [
    {
      title: "E-commerce & Retail",
      description: "Monitor competitor pricing, verify advertisements, and ensure global brand consistency across different markets.",
      applications: ["Price comparison", "Ad verification", "Market research"]
    },
    {
      title: "Digital Marketing",
      description: "Verify ad placements, test geo-targeted campaigns, and conduct SEO research across different locations.",
      applications: ["Campaign testing", "SERP analysis", "Ad verification"]
    },
    {
      title: "Travel & Hospitality",
      description: "Access location-specific pricing, verify hotel rates, and monitor flight prices from different countries.",
      applications: ["Price comparison", "Competitive analysis", "Regional offerings"]
    },
    {
      title: "Finance & Investment",
      description: "Gather market data, perform due diligence, and access financial information from multiple regions.",
      applications: ["Market research", "Financial aggregation", "Investment analysis"]
    }
  ];

  const renderContactForm = () => {
    let formTitle, formDescription, formFields;
    
    switch(modalType) {
      case 'customPlan':
        formTitle = "Request Custom Monthly Plan";
        formDescription = "Tell us about your specific requirements for a monthly subscription plan tailored to your needs.";
        formFields = (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                required
              >
                <option value="1 month">1 Month</option>
                <option value="2 months">2 Months</option>
                <option value="3 months">3 Months</option>
                <option value="custom">Custom Duration</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                placeholder="Please describe your custom proxy requirements in detail."
                required
              ></textarea>
            </div>
          </>
        );
        break;
      case 'useCase':
        formTitle = "Discuss Your Use Case";
        formDescription = "Tell us about your specific use case and how our proxies can help your business needs.";
        formFields = (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Use Case</label>
              <select
                name="useCase"
                value={formData.useCase}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                required
              >
                <option value="">Select your use case</option>
                <option value="E-commerce">E-commerce & Retail</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Travel">Travel & Hospitality</option>
                <option value="Finance">Finance & Investment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                placeholder="Please describe your use case in detail and how our proxies can help."
                required
              ></textarea>
            </div>
          </>
        );
        break;
      default: // contact
        formTitle = "Custom Proxy Solution";
        formDescription = "Tell us about your specific requirements and our team will create a custom solution tailored to your needs.";
        formFields = (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
              >
                <option value="">Select budget range</option>
                <option value="$50 - $100">$50 - $100 (10% discount)</option>
                <option value="$150 - $500">$150 - $500 (15% discount)</option>
                <option value="$500+">$500+ (20% discount)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                placeholder="Please describe your proxy requirements, including target locations, traffic volume, and specific use cases."
                required
              ></textarea>
            </div>
          </>
        );
    }
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{formTitle}</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              {formDescription}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {formFields}
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-[#8a4fc2] hover:bg-[#7040a3] text-white px-4 py-3 rounded-lg font-semibold transition duration-300"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <NavBar />
      
      {/* Hero Section */}
      <section className={`relative py-32 overflow-hidden ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-[#f8f5ff] to-gray-100'}`}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-5 bg-cover bg-center"></div>
        {/* Wave moved down */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className={darkMode ? "text-gray-900" : "text-white"}>
            <path fill="currentColor" fillOpacity="1" d="M0,160 C200,60, 400,60, 600,120 C800,180, 1000,180, 1200,120 C1400,60, 1600,60, 1800,160 L1800,200 L0,200 Z"></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <h1 className={`text-5xl md:text-5xl lg:text-5xl font-bold mb-8 text-center leading-tight animate-fadeInDown ${darkMode ? 'text-purple-300' : 'text-[#3a2854]'}`}>
              High-Quality Proxies Starting at Just <span className={`${darkMode ? 'text-purple-400' : 'text-[#8a4fc2]'} italic`}>$1/Day!</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {/* Left Column - Main Text - Single consistent color */}
              <div className={`${darkMode ? 'text-gray-300' : 'text-[#5a4575]'} text-xl pl-4 md:pl-8 animate-fadeInLeft`}>
                <p className="leading-relaxed">
                  Get real residential IPs from real devices for as low as $1 per day! Whether you need affordable monthly IPs or high-speed mobile proxies, ExactConnect delivers fast, secure, and reliable connections tailored to your needs.
                </p>
              </div>
              
              {/* Right Column - Feature List with Professional Checkboxes */}
              <div className={`${darkMode ? 'text-gray-300' : 'text-[#5a4575]'} animate-fadeInRight`}>
                <div className="space-y-4">
                  {[
                    "Authentic Residential IPs for seamless browsing",
                    "Budget-Friendly Daily & Monthly Plans",
                    "Premium Mobile Proxies with unbeatable performance",
                    "Custom Plans tailored to your needs"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center group">
                      <div className={`flex-shrink-0 w-6 h-6 mr-3 rounded-full ${darkMode ? 'bg-purple-800' : 'bg-purple-100'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <CheckCircle className={`w-4 h-4 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
                      </div>
                      <span className="text-lg font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Buttons - Centered at Bottom */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 mb-6 animate-fadeInUp">
              <button 
                onClick={scrollToPricing}
                className={`${darkMode ? 'bg-purple-700 hover:bg-purple-800' : 'bg-[#8a4fc2] hover:bg-[#7b3ea4]'} text-white font-medium py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105`}
              >
                See Prices
              </button>
              <button className={`${darkMode ? 'border-2 border-purple-700 text-purple-400 hover:bg-gray-800' : 'border-2 border-[#8a4fc2] text-[#8a4fc2] hover:bg-[#f5f0fb]'} font-medium py-3 px-8 rounded-md shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Proxy Set-up
              </button>
            </div>
            
            {/* Stats at Bottom */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-4 animate-pulse">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-[#f5f0fb]'} flex items-center justify-center`}>
                  <span className={`${darkMode ? 'text-purple-400' : 'text-[#8a4fc2]'} font-bold text-xl`}>🌎</span>
                </div>
                <span className={`ml-2 font-medium ${darkMode ? 'text-gray-200' : 'text-[#3a2854]'}`}>190+ Countries</span>
              </div>
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-[#f5f0fb]'} flex items-center justify-center`}>
                  <span className={`${darkMode ? 'text-purple-400' : 'text-[#8a4fc2]'} font-bold text-xl`}>📱</span>
                </div>
                <span className={`ml-2 font-medium ${darkMode ? 'text-gray-200' : 'text-[#3a2854]'}`}>Mobile Proxies</span>
              </div>
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-[#f5f0fb]'} flex items-center justify-center`}>
                  <span className={`${darkMode ? 'text-purple-400' : 'text-[#8a4fc2]'} font-bold text-xl`}>💰</span>
                </div>
                <span className={`ml-2 font-medium ${darkMode ? 'text-gray-200' : 'text-[#3a2854]'}`}>From $1/Day</span>
              </div>
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-[#f5f0fb]'} flex items-center justify-center`}>
                  <span className={`${darkMode ? 'text-purple-400' : 'text-[#8a4fc2]'} font-bold text-xl`}>⏱️</span>
                </div>
                <span className={`ml-2 font-medium ${darkMode ? 'text-gray-200' : 'text-[#3a2854]'}`}>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content area with wider layout */}
      <div className="container mx-auto px-4">
        {/* Features Section */}
        <section className={`py-16 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} animate-on-scroll`}>
          <div className="px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Why Choose ExactConnect Residential Proxies?</h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our state-of-the-art proxy infrastructure provides unmatched reliability, speed, and anonymity for all your web access needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-on-scroll ${
                    darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-100'
                  }`}
                >
                  <div className={`inline-block p-3 rounded-full mb-4 ${
                    darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-[#8a4fc2]'
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{feature.title}</h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{feature.description}</p>
                </div>
              ))}
            </div>

            <div className={`mt-16 p-8 rounded-xl border animate-on-scroll ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Key Features of Our Network</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Ethically sourced residential IPs",
                  "Automatic IP rotation",
                  "Country & city targeting",
                  "Unlimited bandwidth",
                  "99.9% uptime guarantee",
                  "Sticky session support",
                  "SOCKS5 compatibility",
                  "Username/password authentication",
                  "24/7 technical support"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={`py-16 rounded-lg shadow-md mt-8 animate-on-scroll ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>How ExactConnect Residential Proxies Work</h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our residential proxy network provides a secure and anonymous way to access the internet through real residential IP addresses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Connect to Our Network",
                  description: "Simply configure your application with our proxy settings, authentication credentials, and connection parameters."
                },
                {
                  step: "2",
                  title: "Select Your Location",
                  description: "Choose specific countries, regions, or cities for your connection based on your targeting needs."
                },
                {
                  step: "3",
                  title: "Browse Anonymously",
                  description: "Your traffic is routed through our residential IP network, making your requests appear as if they're coming from regular residential connections."
                }
              ].map((item, index) => (
                <div key={index} className="relative animate-on-scroll">
                  <div className={`absolute -left-4 -top-4 w-12 h-12 ${darkMode ? 'bg-purple-700' : 'bg-[#8a4fc2]'} text-white rounded-full flex items-center justify-center text-xl font-bold animate-bounce`}>
                    {item.step}
                  </div>
                  <div className={`p-8 pt-10 rounded-xl shadow-md h-full hover:shadow-lg transition-all duration-300 ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{item.title}</h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className={`py-16 rounded-lg shadow-md mt-8 animate-on-scroll ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Industry Applications</h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our residential proxies power a wide range of business use cases across multiple industries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className={`p-8 rounded-xl border transform hover:scale-102 hover:shadow-lg transition-all duration-300 animate-on-scroll ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{useCase.title}</h3>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.applications.map((app, i) => (
                      <span key={i} className={`px-3 py-1 rounded-full text-sm ${
                        darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-[#8a4fc2]'
                      }`}>
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button 
                className={`${darkMode ? 'bg-purple-700 hover:bg-purple-800' : 'bg-[#8a4fc2] hover:bg-[#7040a3]'} text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105`}
                onClick={() => setShowContactModal(true)}
              >
                Discuss Your Use Case
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Section - Redesigned with 3 larger cards and better animations */}
        <section id="pricing" className={`py-16 rounded-lg shadow-md mt-8 animate-on-scroll ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Transparent Pricing Plans</h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Choose the plan that fits your needs, with flexible options for businesses of all sizes.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <div 
                    key={index} 
                    className={`rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl group ${
                      plan.popular 
                        ? `${darkMode ? 'border-2 border-purple-500 relative scale-105 z-10' : 'border-2 border-[#8a4fc2] relative scale-105 z-10'}` 
                        : `${darkMode ? 'border border-gray-700' : 'border border-gray-200'} hover:scale-105`
                    } ${darkMode ? 'bg-gray-800' : 'bg-white'} animate-on-scroll`}
                  >
                    {plan.popular && (
                      <div className={`absolute top-0 right-0 ${darkMode ? 'bg-purple-700' : 'bg-[#8a4fc2]'} text-white px-4 py-1 text-sm font-semibold`}>
                        Most Popular
                      </div>
                    )}
                    <div className={`absolute inset-0 ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    <div className="p-8">
                      <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'} group-hover:translate-x-1 transition-transform duration-300`}>{plan.title}</h3>
                      <div className="mb-2 group-hover:scale-110 transform transition-transform duration-300 origin-left">
                        <span className={`text-4xl font-bold ${darkMode ? 'text-purple-400' : 'text-[#8a4fc2]'}`}>{plan.price}</span>
                      </div>
                      {plan.period && (
                        <div className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span>{plan.period}</span>
                        </div>
                      )}
                      {plan.subtitle && (
                        <div className={`mb-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span>{plan.subtitle}</span>
                        </div>
                      )}
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start group-hover:translate-x-1 transition-transform duration-300 delay-100">
                            <CheckCircle className={`${plan.popular ? 'text-green-400' : 'text-green-500'} mr-2 flex-shrink-0 mt-1`} size={18} />
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button 
                        className={`w-full py-4 rounded-lg font-semibold transition-all duration-500 ${
                          plan.popular 
                            ? `${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-[#8a4fc2] hover:bg-[#7040a3]'} text-white shadow-lg hover:shadow-xl group-hover:translate-y-1` 
                            : `${darkMode ? 'bg-gray-700 hover:bg-gray-600 border border-purple-700' : 'bg-gray-50 hover:bg-gray-100 border border-[#8a4fc2]'} ${darkMode ? 'text-purple-400' : 'text-[#8a4fc2]'} group-hover:translate-y-1`
                        }`}
                        onClick={() => window.location.href = '/account/signup'}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <button
                className={`${darkMode ? 'bg-purple-800 hover:bg-purple-700 border border-purple-600' : 'bg-white hover:bg-purple-50 border border-[#8a4fc2]'} ${darkMode ? 'text-purple-300' : 'text-[#8a4fc2]'} px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
                onClick={() => setShowContactModal(true)}
              >
                Need a Custom Plan? Contact Us
              </button>
            </div>
          </div>
        </section>

        
        {/* Sign-up Discounts Section */}
        <section className={`py-12 rounded-lg shadow-md mt-8 animate-on-scroll ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Sign-up Discounts</h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                A discount of 10-20% is given to each registered user when the first deposit is made, depending on the deposit amount:
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4">
                {discounts.map((discount, index) => (
                  <div key={index} className={`rounded-xl p-6 text-center border hover:shadow-md transition-all duration-300 animate-on-scroll transform hover:scale-105 ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-purple-400' : 'text-[#8a4fc2]'}`}>{discount.percentage}</div>
                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{discount.range}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

       {/* FAQ Section */}
       <section className={`py-16 rounded-lg shadow-md mt-8 animate-on-scroll ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Find answers to common questions about our residential proxy services.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className={`border rounded-lg overflow-hidden animate-on-scroll transition-all duration-300 hover:shadow-md ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <details className="group">
                    <summary className={`flex justify-between items-center font-medium cursor-pointer list-none p-4 ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-50'
                    }`}>
                      <span className={darkMode ? 'text-gray-100' : 'text-gray-900'}>{item.question}</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    </summary>
                    <p className={`p-4 pt-0 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.answer}</p>
                  </details>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Still have questions?</p>
              <button 
                className={`${darkMode ? 'bg-purple-700 hover:bg-purple-800' : 'bg-[#8a4fc2] hover:bg-[#7040a3]'} text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105`}
                onClick={() => setShowContactModal(true)}
              >
                Contact Our Support Team
              </button>
            </div>
          </div>
        </section>
      </div>

{/* CTA Section */}
<section className="relative">
  <div className="bg-gradient-to-r from-[#8a4fc2] to-[#7040a3] text-white relative">
    <div className="container mx-auto px-6 py-16 text-center">
      <div className="animate-float">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Premium Residential Proxies?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of satisfied customers who trust ExactConnect for their proxy needs.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <button 
          className="bg-white text-[#8a4fc2] hover:bg-purple-100 px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 hover:-translate-y-1"
          onClick={() => window.location.href = '/signup'}
        >
          Start Your Free Trial
        </button>
        <button 
          className="bg-transparent border-2 border-white hover:bg-white hover:text-[#8a4fc2] px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 hover:-translate-y-1"
          onClick={() => setShowContactModal(true)}
        >
          Schedule a Demo
        </button>
      </div>
    </div>

    {/* Additional animated elements in CTA section */}
    <div className="absolute top-1/4 left-16 w-8 h-8 rounded-full bg-white opacity-20 animate-pulse"></div>
    <div className="absolute bottom-1/3 right-20 w-12 h-12 rounded-full bg-white opacity-20 animate-pulse"></div>
    <div className="absolute top-2/3 left-1/4 w-10 h-10 rounded-full bg-white opacity-20 animate-pulse"></div>
  </div>
</section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Custom Proxy Solution</h3>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Tell us about your specific requirements and our team will create a custom solution tailored to your needs.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                    >
                      <option value="">Select budget range</option>
                      <option value="$50 - $100">$50 - $100 (10% discount)</option>
                      <option value="$150 - $500">$150 - $500 (15% discount)</option>
                      <option value="$500+">$500+ (20% discount)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a4fc2]"
                      placeholder="Please describe your proxy requirements, including target locations, traffic volume, and specific use cases."
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#8a4fc2] hover:bg-[#7040a3] text-white px-4 py-3 rounded-lg font-semibold transition duration-300"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Residential;