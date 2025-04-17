import { DarkModeContext } from '../../context/DarkModeContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../reusables/Navbar';
import Footer from '../reusables/Footer';
import techImage from '/hero-img.png';
import heroBg from '/hero-bg.jpg';
import server from '/server.png';
import wallet from '/wallet.png';
import phoneImage from '/phone5.png';
import Loader from '../pages/Loader';
import { useContext, useState, useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode } = useContext(DarkModeContext);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const fullText = "Need Precise Residential IPs, RDP VPS, PSD Templates, or Non-VOIP Numbers?";
  const typingSpeed = 25; // Even faster typing speed for a more lively animation

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // Reduced loading time for better UX

    return () => clearTimeout(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    if (isLoading || currentIndex >= fullText.length) return;

    const typingTimer = setTimeout(() => {
      setTypedText(fullText.substring(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
      
      // Show subtext after typing complete
      if (currentIndex === fullText.length - 1) {
        setTimeout(() => setShowSubtext(true), 300); // Faster transition
      }
    }, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [currentIndex, isLoading, fullText]);

  // Show button after subtext appears
  useEffect(() => {
    if (showSubtext) {
      setTimeout(() => setShowButton(true), 500); // Slightly faster transition
    }
  }, [showSubtext]);

  // Image fade-in effect
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setImageLoaded(true), 200);
    }
  }, [isLoading]);

  const handleGetStartedClick = () => {
    navigate('/account/login');
  };

  // CSS for the animations
  const bounceAnimationStyle = {
    animation: 'bounce 2s infinite ease-in-out',
    transformOrigin: 'center bottom'
  };

  const imageFadeInStyle = {
    opacity: imageLoaded ? 1 : 0,
    transition: 'opacity 1.2s ease-in-out'
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`font-sans ${darkMode ? 'bg-[#111827] text-white' : 'bg-[#7C25BA] text-white'}`}
        >
          {/* Hero Section with Enhanced Background */}
          <div 
            className="relative overflow-hidden"
            style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Modern Gradient Overlay */}
            <div 
              className={`absolute inset-0 ${
                darkMode 
                  ? 'bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#111827]' 
                  : 'bg-gradient-to-br from-[#7C25BA] via-[#9333EA] to-[#7C25BA]'
              } opacity-90`}
            ></div>
            
            {/* Animated Particles (CSS-only) */}
            <div className="particles absolute inset-0 z-0"></div>
            
            {/* Header - Enhanced z-index */}
            <div className="relative z-30 py-6 sm:py-8 animate-fadeIn">
              <NavBar />
            </div>
            
            {/* Main Content - Modern Layout */}
            <main className="relative z-10 overflow-hidden">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 sm:px-8 md:px-12 lg:px-16 gap-8 md:gap-12 lg:gap-16 py-12 md:py-16 lg:py-20">
                <div className="md:w-1/2 text-center md:text-left animate-slideInLeft">
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 md:mb-6 text-white drop-shadow-lg"
                  >
                    {typedText}
                    <span className="typing-cursor"></span>
                  </h1>
                  
                  {showSubtext && (
                    <p className="text-lg md:text-xl mb-6 md:mb-8 animate-fadeInUp text-white/90 max-w-xl">
                      We've Got the Perfect Solutions For You
                    </p>
                  )}
                  
                  {showButton && (
                    <button
                      onClick={handleGetStartedClick}
                      className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 font-medium py-2 px-6 md:py-3 md:px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-purple-400/30 mb-5 animate-pulseButton"
                    >
                      Get Started
                    </button>
                  )}
                </div>
                
                <div className="md:w-1/2 flex justify-center">
                  <div style={{...bounceAnimationStyle, ...imageFadeInStyle}}>
                    <LazyLoadImage
                      src={techImage}
                      width={550}
                      height={0}
                      alt="Tech Solutions"
                      onLoad={() => setImageLoaded(true)}
                      className="drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
          
             {/* Residential Proxies Section */}
             <section className={`text-center py-12 px-4 sm:px-8 animate-fadeIn ${
            darkMode ? 'bg-[#111827] text-white' : 'bg-[#fffe] text-black'
          }`}>

             {/* Why Choose Our Services Section */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-2 animate-slideInUp">
                Why Choose Our Services?
              </h2>
              <div className="flex justify-center">
                <div className="border-b-4 sm:border-b-8 border-purple-700 w-16 sm:w-32 rounded-full mb-6 sm:mb-8 animate-fadeIn"></div>
              </div>
            </section>
            
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 animate-fadeIn">Residential & Mobile Proxies</h3>
              <div className="border-b-4 sm:border-b-8 border-purple-700 w-12 sm:w-16 mx-auto mb-6 rounded-full animate-fadeIn"></div>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-6 sm:gap-12">
              {/* Benefits Section */}
              <div className="flex-1 border-b sm:border-b-0 sm:border-r-2 border-gray-400 pb-6 sm:pb-0 sm:pr-8 animate-slideInLeft">
                <div className="text-left">
                  <h4 className="font-medium text-[16px] sm:text-[18px] ml-6 sm:ml-12">
                    Benefits
                  </h4>
                  <div className="border-b border-gray-500 w-24 sm:w-32 ml-6 sm:ml-12 mb-4"></div>
                  <ul className="list-disc list-inside font-light text-[14px] sm:text-[16px] space-y-4">
                    <li className="animate-fadeIn" style={{animationDelay: "0.1s"}}>Real IPs from Real devices</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.2s"}}>Exact IP for Online Accounts Creation</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.3s"}}>Supports Guaranteed 100% Online Mask Identification</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.4s"}}>Very Affordable pricing for Daily and Monthly Residential IPs</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.5s"}}>Supports SOCKS5/HTTP</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.6s"}}>Cost-Effective</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.7s"}}>No setup fee</li>
                  </ul>
                </div>
              </div>

              {/* Use Case Section */}
              <div className="flex-1 animate-slideInRight">
                <div className="text-left">
                  <h4 className="font-medium text-[16px] sm:text-[18px] ml-6 sm:ml-12">
                    Use Case
                  </h4>
                  <div className="border-b border-gray-500 w-24 sm:w-32 ml-6 sm:ml-12 mb-4"></div>
                  <ul className="list-disc list-inside font-light text-[14px] sm:text-[16px] space-y-4">
                    <li className="animate-fadeIn" style={{animationDelay: "0.1s"}}>Crowdsourcing Platforms</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.2s"}}>Data Scraping</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.3s"}}>Crowdsourcing Platforms (Outlier, Appen, Clickworker, Oneforma, Echolabs, Telus AI)</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.4s"}}>Market Research</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.5s"}}>E-commerce Operations</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.6s"}}>Web Testing & Development</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buy Now Button */}
              <div className="mt-8 sm:mt-12 flex justify-center">
                <button 
                  className="bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-purple-800 transition duration-300 animate-pulseButton"
                  onClick={() => window.location.href = '/residential'}
                >
                  Buy Now
                </button>
              </div>
          </section>


          {/* RDP Server Section - Enhanced */}
          <section className={`text-center py-16 px-4 sm:px-8 md:px-12 w-full animate-fadeIn ${
            darkMode ? 'bg-[#111827] text-white' : 'bg-white text-gray-800'
          }`}>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">RDP Server</h3>
              <div className={`h-1 w-16 sm:w-24 mx-auto mb-8 rounded-full ${
                darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-600 to-indigo-600'
              } animate-fadeIn`}></div>
            </div>

            <div className="mx-auto flex flex-col lg:flex-row gap-8 items-center lg:items-start max-w-7xl">
              {/* Text Section - Enhanced */}
              <div className="text-left w-full lg:w-1/2 px-6 sm:px-10 lg:px-12 animate-slideInLeft">
                <h4 className={`font-medium text-xl mb-3 ${
                  darkMode ? 'text-purple-400' : 'text-purple-700'
                }`}>
                  Why Our RDP?
                </h4>
                <div className="border-b border-gray-500/50 w-48 sm:w-56 mb-6"></div>
                <ul className="list-none space-y-4 sm:space-y-5">
                  {[
                    "Private and Secure",
                    "Supports Android Simulators & KVM Virtualization",
                    "Supports Linux, Windows, and Ubuntu Server",
                    "Affordable pricing starting from $12",
                    "Instant Deployment",
                    "Reliable Hosting",
                    "DDOS Protection",
                    "24/7 Support System"
                  ].map((item, index) => (
                    <li 
                      key={index}
                      className={`flex items-center gap-4 ${
                        darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-purple-50'
                      } p-3 rounded-lg transition-all duration-300 animate-fadeIn`}
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <span className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                        darkMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-base sm:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Section - Enhanced */}
              <div className="flex justify-center lg:justify-end w-full lg:w-1/2 animate-slideInRight">
                <div className="relative">
                  <div className={`absolute -inset-2 rounded-full blur-md opacity-30 ${
                    darkMode ? 'bg-purple-500' : 'bg-purple-300'
                  }`}></div>
                  <img
                    src={server}
                    alt="server-logo"
                    className="max-w-[90%] sm:max-w-md lg:max-w-lg object-contain relative z-10 drop-shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Buy Now Button - Enhanced */}
            {/* Buy Now Button */}
            <div className="mt-8 sm:mt-12 flex justify-center">
                <button 
                  className="bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-purple-800 transition duration-300 animate-pulseButton"
                  onClick={() => window.location.href = '/rdp'}
                >
                  Buy Now
                </button>
              </div>
          </section>

          {/* PSD Templates Section - Replacing Virtual Credit Card */}
          <section
            className={`${
              darkMode ? 'bg-gradient-to-b from-[#111827] to-[#1E293B] text-white' : 'bg-gradient-to-b from-[#f9f7ff] to-[#eeedf5] text-gray-800'
            } py-16 animate-fadeIn`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3">
                PSD Templates
              </h3>
              <div className={`h-1 w-16 sm:w-24 mx-auto mb-6 rounded-full ${
                darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-600 to-indigo-600'
              } animate-fadeIn`}></div>
              
              <p className="text-center max-w-3xl mx-auto mb-10 text-lg">
                We OFFER Driving License Templates, Utility Bill Templates, Residency ID Card Templates, and Passport Templates at a cost-effective price.
              </p>
              
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center animate-slideInLeft">
                  <div className="relative group">
                    <div className={`absolute -inset-2 rounded-xl blur-md opacity-30 group-hover:opacity-40 transition-opacity duration-300 ${
                      darkMode ? 'bg-purple-500' : 'bg-purple-300'
                    }`}></div>
                    <img
                      src={wallet}
                      alt="PSD Templates"
                      className="max-h-[350px] relative z-10 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                <div className="animate-slideInRight">
                  <h4 className="text-xl font-semibold mb-4">Template Collection</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { title: "Driving License", desc: "High-quality PSD templates for various regions" },
                      { title: "Utility Bills", desc: "Customizable templates for documentation" },
                      { title: "ID Cards", desc: "Professional residency ID card templates" },
                      { title: "Passport Templates", desc: "Detailed passport design templates" }
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg ${
                          darkMode ? 'bg-gray-800/50' : 'bg-white shadow-md'
                        } animate-fadeIn`}
                        style={{animationDelay: `${index * 0.2}s`}}
                      >
                        <h5 className={`text-lg font-medium mb-2 ${
                          darkMode ? 'text-purple-400' : 'text-purple-700'
                        }`}>{item.title}</h5>
                        <p className="text-sm opacity-90">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-medium text-lg mb-2">Why Choose Our Templates?</h5>
                    <ul className="list-disc space-y-2 pl-6">
                      <li className="animate-fadeIn" style={{animationDelay: "0.1s"}}>High-quality design with attention to detail</li>
                      <li className="animate-fadeIn" style={{animationDelay: "0.2s"}}>Cost-effective pricing</li>
                      <li className="animate-fadeIn" style={{animationDelay: "0.3s"}}>Fully editable PSD files</li>
                      <li className="animate-fadeIn" style={{animationDelay: "0.4s"}}>Regular updates with new designs</li>
                      <li className="animate-fadeIn" style={{animationDelay: "0.5s"}}>24/7 Support System</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-10">
                <Link to="/coming-soon">
                  {/* Buy Now Button */}
              <div className="mt-8 sm:mt-12 flex justify-center">
                <button 
                  className="bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-purple-800 transition duration-300 animate-pulseButton"
                  onClick={() => window.location.href = '/residential'}
                >
                  Buy Now
                </button>
              </div>
                </Link>
              </div>
            </div>
          </section>

         <section className={`pt-12 pb-6 animate-fadeIn ${
            darkMode ? 'bg-[#111827] text-white' : 'bg-white text-black'
          }`}>
            {/* Why Choose Our Services Section */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-center pb-3 animate-slideInUp">
              Are You In Need of Real Non-VOIP Numbers For Your Account Verification?
            </h2>
            <h4 className="text-lg pb-4 font-light text-center animate-fadeInUp">
              We are here to help you
            </h4>
          </section>

          {/* Verification Process Section - Redesigned */}
          <section className={`py-12 px-4 sm:px-8 md:px-12 lg:px-16 animate-fadeIn ${
            darkMode ? 'bg-[#111827] text-white' : 'bg-[#e4eefd] text-black'
          }`}>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-10">
                {/* Left Section: Verification Process - Enhanced */}
                <div className="w-full lg:w-1/2 animate-slideInLeft">
                  <div className={`rounded-xl p-6 lg:p-8 shadow-lg ${darkMode ? 'bg-[#1f2937]' : 'bg-white'}`}>
                    <h4 className="text-xl font-semibold text-center mb-8">
                      <span className={`px-6 py-2 rounded-full ${darkMode ? 'bg-purple-900' : 'bg-purple-600'} text-white`}>
                        Verification Process
                      </span>
                    </h4>
                    
                    <ul className="space-y-5 pt-4">
                      {[
                        "Find out if the Account You want to verify is Listed",
                        "Choose the Account you want to Verify",
                        "Order the number and get instant message",
                        "If Service is not listed, consult with our Agent",
                        "Receive your Number from our Agent and verify",
                      ].map((item, index) => (
                        <li
                          key={index}
                          className={`rounded-full shadow-md px-6 py-3 flex items-center gap-4 transition-all duration-300 hover:translate-x-2 ${
                            darkMode ? 'bg-[#374151] text-white hover:bg-[#4B5563]' : 'bg-blue-50 text-black hover:bg-blue-100'
                          } animate-slideInLeft`}
                          style={{ animationDelay: `${index * 0.2}s` }}
                        >
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            darkMode ? 'bg-purple-700' : 'bg-purple-600'
                          } text-white font-bold`}>{index + 1}</span>
                          <span className="text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8 text-center">
                        <a href="/coming-soon">
                          <button className={`px-6 py-3 rounded-lg shadow-md font-medium transition-all duration-300 transform hover:scale-105 ${
                            darkMode ? 'bg-purple-700 text-white hover:bg-purple-800' : 'bg-purple-600 text-white hover:bg-purple-700'
                          } animate-pulseButton`}>
                            Get Started Now
                          </button>
                        </a>
                      </div>
                  </div>
                </div>

                {/* Right Section: Phone Image and Text */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center animate-slideInRight">
                  <div className="relative mb-8">
                    <div className={`absolute -inset-4 rounded-full blur-md opacity-50 ${
                      darkMode ? 'bg-purple-600' : 'bg-purple-400'
                    }`}></div>
                    <img
                      src={phoneImage}
                      alt="Phone Verification"
                      className="relative z-10 max-h-[350px] object-contain hover:rotate-3 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className={`rounded-xl p-6 lg:p-8 shadow-lg w-full max-w-md ${
                    darkMode ? 'bg-[#1f2937]' : 'bg-white'
                  }`}>
                    <h4 className="text-lg font-semibold mb-4 border-l-4 border-purple-600 pl-4">Why Choose Our Non-VOIP Numbers?</h4>
                    <p className="text-sm md:text-base leading-relaxed">
                      Our genuine Non-VOIP numbers ensure reliable verification for all major platforms and services. With instant delivery and 24/7 support, we guarantee successful verification every time. Perfect for social media, payment platforms, and messaging apps.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        darkMode ? 'bg-[#374151]' : 'bg-blue-50'
                      }`}>100% Success Rate</span>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        darkMode ? 'bg-[#374151]' : 'bg-blue-50'
                      }`}>Instant Delivery</span>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        darkMode ? 'bg-[#374151]' : 'bg-blue-50'
                      }`}>Major Services Supported</span>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        darkMode ? 'bg-[#374151]' : 'bg-blue-50'
                      }`}>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Grid - Additional Section to make the page more lively */}
          <section className={`py-16 px-4 sm:px-8 animate-fadeIn ${
            darkMode ? 'bg-[#111827] text-white' : 'bg-white text-gray-800'
          }`}>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Our Complete Solutions</h2>
              <div className={`h-1 w-16 sm:w-24 mx-auto mb-10 rounded-full ${
                darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-600 to-indigo-600'
              } animate-fadeIn`}></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Residential IPs",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    desc: "Secure and reliable residential proxies for all your needs"
                  },
                  {
                    title: "RDP Servers",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    ),
                    desc: "High-performance servers with flexible configuration options"
                  },
                  {
                    title: "PSD Templates",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                    desc: "Professional document templates for various purposes"
                  },
                  {
                    title: "Non-VOIP Numbers",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    desc: "Reliable phone numbers for all verification purposes"
                  }
                ].map((service, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-2 ${
                      darkMode 
                        ? 'bg-gray-800/70 border border-gray-700/30 hover:border-purple-500/30 hover:shadow-purple-500/10 hover:shadow-lg' 
                        : 'bg-white border border-gray-100 hover:border-purple-200 shadow-md hover:shadow-xl'
                    } animate-fadeIn`}
                    style={{animationDelay: `${index * 0.15}s`}}
                  >
                    <div className={`mb-4 ${
                      darkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-base opacity-80 mb-6">{service.desc}</p>
                    <a 
                      href={`/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`inline-flex items-center text-sm font-medium ${
                        darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-800'
                      }`}
                    >
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section - New section to make the page more vibrant */}
          <section className={`py-16 px-4 sm:px-8 animate-fadeIn ${
            darkMode ? 'bg-gradient-to-b from-[#111827] to-[#1E293B] text-white' : 'bg-gradient-to-b from-[#f9f7ff] to-[#eeedf5] text-gray-800'
          }`}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">What Our Clients Say</h2>
              <div className={`h-1 w-16 sm:w-24 mx-auto mb-12 rounded-full ${
                darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-600 to-indigo-600'
              } animate-fadeIn`}></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    quote: "The residential proxies provided are top quality. I've had zero issues with detection or blocking.",
                    author: "Alex M.",
                    role: "E-commerce Manager"
                  },
                  {
                    quote: "Their RDP servers are incredibly reliable and fast. Customer support is responsive and helpful.",
                    author: "Sarah K.",
                    role: "Software Developer"
                  },
                  {
                    quote: "The verification numbers work perfectly every time. This service has saved me countless hours.",
                    author: "Michael T.",
                    role: "Digital Marketer"
                  }
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-6 transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-800/70 border border-gray-700/30' 
                        : 'bg-white border border-gray-100 shadow-md'
                    } animate-fadeIn`}
                    style={{animationDelay: `${index * 0.2}s`}}
                  >
                    <div className="mb-4 text-2xl opacity-60">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-base opacity-90 mb-6 italic">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-purple-600' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{testimonial.author}</h4>
                        <p className="text-sm opacity-70">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action - Final section before footer */}
          <section className={`py-16 px-4 sm:px-8 animate-fadeIn ${
            darkMode ? 'bg-[#111827] text-white' : 'bg-white text-gray-800'
          }`}>
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 animate-slideInUp">
                Ready to Get Started?
              </h2>
              <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto opacity-80">
                Join thousands of satisfied customers who trust our solutions for their online needs
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/account/login')}
                  className={`${
                    darkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900' 
                      : 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800'
                  } text-white px-8 sm:px-10 py-3 rounded-full text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-pulseButton`}
                >
                  Sign Up Now
                </button>
                
                <a 
                  href="/contact"
                  className={`px-8 sm:px-10 py-3 rounded-full text-base sm:text-lg font-medium transition-all duration-300 ${
                    darkMode 
                      ? 'bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-900/20' 
                      : 'bg-transparent border border-purple-600 text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  Contact Support
                </a>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { 
            transform: translateX(-50px);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from { 
            transform: translateX(50px);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInUp {
          from { 
            transform: translateY(30px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from { 
            transform: translateY(20px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes pulseButton {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .typing-cursor {
          position: relative;
        }
        
        .typing-cursor::after {
          content: '|';
          position: absolute;
          right: -10px;
          animation: cursor-blink 1s step-end infinite;
        }
        
        @keyframes cursor-blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 1s ease forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 1s ease forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 1s ease forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        
        .animate-pulseButton {
          animation: pulseButton 2s infinite;
        }
        
        .particles {
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
        
        .particles::before,
        .particles::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        
        .particles::before {
          background: radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10.5%),
                      radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10.5%);
          background-size: 30px 30px;
          background-position: 0 0, 15px 15px;
          animation: particleMove 60s linear infinite;
        }
        
        .particles::after {
          background: radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10.5%),
                      radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10.5%);
          background-size: 50px 50px;
          background-position: 0 0, 25px 25px;
          animation: particleMove 120s linear infinite reverse;
          opacity: 0.5;
        }
        
        @keyframes particleMove {
          0% {
            background-position: 0 0, 15px 15px;
          }
          100% {
            background-position: 1000px 1000px, 1015px 1015px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;