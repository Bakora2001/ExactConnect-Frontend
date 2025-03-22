import { DarkModeContext } from '../../context/DarkModeContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../reusables/Navbar';
import Footer from '../reusables/Footer';
import techImage from '/hero-img.png';
import heroBg from '/hero-bg.jpg';
import server from '/server.png';
import wallet from '/wallet.png';
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
  
  const fullText = "Need Precise Residential IPs, RDP VPS, Virtual Credit Cards, or Non-VOIP Numbers?";
  const typingSpeed = 30; // Faster typing speed (reduced from 50ms to 30ms per character)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
        setTimeout(() => setShowSubtext(true), 400); // Slightly faster transition
      }
    }, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [currentIndex, isLoading, fullText]);

  // Show button after subtext appears
  useEffect(() => {
    if (showSubtext) {
      setTimeout(() => setShowButton(true), 600); // Slightly faster transition
    }
  }, [showSubtext]);

  // Image fade-in effect
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setImageLoaded(true), 300);
    }
  }, [isLoading]);

  const handleGetStartedClick = () => {
    navigate('/account/signup');
  };

  // CSS for the animations
  const bounceAnimationStyle = {
    animation: 'bounce 2.5s infinite ease-in-out',
    transformOrigin: 'center bottom'
  };

  const imageFadeInStyle = {
    opacity: imageLoaded ? 1 : 0,
    transition: 'opacity 1.5s ease-in-out'
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`font-sans ${darkMode ? 'bg-[#0c0b08] text-white' : 'bg-[#7C25BA] text-white'}`}
        >
          {/* Hero Section with Background Image */}
          <div 
            className="relative"
            style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Color Overlay */}
            <div 
              className={`absolute inset-0 ${darkMode ? 'bg-[#0c0b08]' : 'bg-[#7C25BA]'} opacity-80`}
            ></div>
            
            {/* Header */}
            <div className="relative z-10 mb-12 sm:mb-16 py-10 sm:py-12 animate-fadeIn">
              <NavBar />
            </div>
            
            {/* Main Content */}
            <main className="relative z-10 flex flex-col md:flex-row gap-8 sm:gap-24 text-center md:text-left">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-[1rem] md:px-[3rem] sm:px-12 gap-10 md:gap-16 pb-16">
                <div className="md:w-1/2 text-center md:text-left animate-slideInLeft">
                  <p
                    className={`text-4xl sm:text-4xl font-[200px] font-sans font-bold leading-tight mb-6 ${
                      darkMode ? 'text-white' : 'text-white'
                    } typing-cursor`}
                  >
                    {typedText}
                    <span className="typing-cursor"></span>
                  </p>
                  
                  {showSubtext && (
                    <p className="text-lg mb-8 animate-fadeInUp">
                      We've Got the Perfect Solutions For You
                    </p>
                  )}
                  
                  {showButton && (
                    <button
                      onClick={handleGetStartedClick}
                      className={`${
                        darkMode ? 'text-white border-gray-700' : 'bg-[#7C25BA]'
                      } font-medium py-1.5 px-3 rounded-lg shadow-lg hover:opacity-90 transition-all duration-200 border mb-5 animate-pulseButton`}
                    >
                      Get Started
                    </button>
                  )}
                </div>
                
                <div className="md:w-1/2 flex justify-center">
                  <div style={{...bounceAnimationStyle, ...imageFadeInStyle}}>
                    <LazyLoadImage
                      src={techImage}
                      width={500}
                      height={0}
                      alt="Tech Solutions"
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
          
          {/* Residential Proxies Section */}
          <section className={`text-center py-6 px-4 sm:px-8 animate-fadeIn ${
            darkMode ? 'bg-[#010100] text-white' : 'bg-[#fffe] text-black'
          }`}>
            <section>
              {/* Why Choose Our Services Section */}
              <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-2 font-italic animate-slideInUp">
                Why Choose Our Services?
              </h2>
              <div className="flex justify-center">
                <div className="border-b-4 sm:border-b-8 border-purple-700 w-16 sm:w-32 rounded-full mb-6 sm:mb-8 animate-fadeIn"></div>
              </div>
            </section>
            
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 animate-fadeIn">Residential Proxies</h3>
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
                    <li className="animate-fadeIn" style={{animationDelay: "0.1s"}}>Exact IP for Online Accounts Creation</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.2s"}}>Supports Guaranteed 100% Online Mask Identification</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.3s"}}>Very Affordable pricing for Daily and Monthly Residential IPs</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.4s"}}>Supports SOCKS5/HTTP</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.5s"}}>Cost-Effective</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.6s"}}>No setup fee</li>
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
                    <li className="animate-fadeIn" style={{animationDelay: "0.1s"}}>Oneforma Account Creation (Any Locale)</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.2s"}}>Data Scraping</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.3s"}}>Crowdsourcing Platforms (Outlier, Appen, Clickworker, Oneforma, Echolabs, Telus AI)</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.4s"}}>Market Research</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="mt-6 sm:mt-10 flex justify-center">
              <button className="bg-purple-700 text-white px-6 sm:px-8 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-purple-800 transition duration-300 animate-pulseButton">
                Buy Now
              </button>
            </div>
          </section>

          {/* VPS Server Section */}
          <section className={`text-center py-8 px-4 sm:px-16 lg:px-24 w-full animate-fadeIn ${
            darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'
          }`}>
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">VPS Server</h3>
              <div className="border-b-4 sm:border-b-8 border-purple-700 w-12 sm:w-16 mx-auto mb-6 rounded-full animate-fadeIn"></div>
            </div>

            <div className="mx-auto flex flex-col lg:flex-row gap-8 items-center lg:items-start max-w-7xl">
              {/* Text Section */}
              <div className="text-left w-full lg:w-1/2 px-6 sm:px-10 lg:px-12 animate-slideInLeft">
                <h4 className="font-medium text-[16px] sm:text-[18px] mb-2">
                  Why Our VPS?
                </h4>
                <div className="border-b border-gray-500 w-48 sm:w-56 mb-4"></div>
                <ul className="list-disc list-inside font-light text-[14px] sm:text-[16px] space-y-3 sm:space-y-4">
                  <li className="animate-fadeIn" style={{animationDelay: "0.1s"}}>Private and Secure</li>
                  <li className="animate-fadeIn" style={{animationDelay: "0.2s"}}>Supports Android Simulators & KVM Virtualization</li>
                  <li className="animate-fadeIn" style={{animationDelay: "0.3s"}}>Supports Linux, Windows, and Ubuntu Server</li>
                  <li className="animate-fadeIn" style={{animationDelay: "0.4s"}}>Affordable pricing starting from $12</li>
                  <li className="animate-fadeIn" style={{animationDelay: "0.5s"}}>Instant Deployment</li>
                  <li className="animate-fadeIn" style={{animationDelay: "0.6s"}}>Reliable Hosting</li>
                  <li className="animate-fadeIn" style={{animationDelay: "0.7s"}}>DDOS Protection</li>
                  <li className="animate-fadeIn" style={{animationDelay: "0.8s"}}>24/7 Support System</li>
                </ul>
              </div>

              {/* Image Section */}
              <div className="flex justify-center lg:justify-end w-full lg:w-1/2 animate-slideInRight">
                <img
                  src={server}
                  alt="server-logo"
                  className="max-w-[80%] sm:max-w-md lg:max-w-lg object-contain"
                />
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="mt-8 flex justify-center">
              <button
                className="bg-purple-700 text-white px-6 sm:px-8 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-purple-800 transition duration-300 animate-pulseButton"
                onClick={() => navigate('/rdp')}
              >
                Buy Now
              </button>
            </div>
          </section>

          {/* Virtual Credit Card Section */}
          <section
            className={`${
              darkMode ? 'bg-[#131312] text-white' : 'bg-[#eeeeee] text-black'
            } py-12 animate-fadeIn`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-2xl font-bold text-center mb-8">
                Virtual Credit Card
              </h3>
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center animate-slideInLeft">
                  <img
                    src={wallet}
                    alt="Virtual Credit Card"
                    className="max-h-[350px]"
                  />
                </div>
                <div className="animate-slideInRight">
                  <h4 className="text-xl font-semibold mb-4">Why Choose Us?</h4>
                  <ul className="list-disc space-y-3 pl-6">
                    <li className="animate-fadeIn" style={{animationDelay: "0.1s"}}>Private and Secure</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.2s"}}>Instant Deployment</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.3s"}}>Instant Deployment</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.4s"}}>Reliable Hosting</li>
                    <li className="animate-fadeIn" style={{animationDelay: "0.5s"}}>24/7 Support System</li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link to="/maintainance">
                  <button className="bg-[#7C25BA] hover:bg-[#6a1fa0] text-white font-medium py-3 px-8 rounded-lg shadow-md animate-pulseButton">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-white pt-8 animate-fadeIn">
            {/* Why Choose Our Services Section */}
            <h2 className="text-2xl sm:text-3xl text-black font-semibold text-center pb-3 font-italic animate-slideInUp">
              Are You In Need of Real Non-VOIP Numbers For Your Account Verification?
            </h2>
            <h4 className="text-2px sm:text-2px text-black pb-4 font-light text-center font-italic animate-fadeInUp">
              We are here to help you
            </h4>
          </section>

          {/* Verification Process Section */}
          <section className={`py-6 px-4 sm:px-24 animate-fadeIn ${
            darkMode ? 'bg-[#e4eefd] text-white' : 'bg-[#e4eefd] text-black'
          }`}>
            <div className="max-w-7xl mx-auto">
              {/* Heading Section */}
              <div className="grid lg:grid-cols-3 items-start gap-6">
                {/* Left Section: Verification Process */}
                <div>
                  <h4 className="text-lg font-semibold text-center">Verification Process</h4>
                  <ul className="space-y-4 pt-6 rounded-lg overflow-hidden">
                    {[
                      "Find out if the Account You want to verify is Listed",
                      "Choose the Account you want to Verify",
                      "Order the number and get instant message",
                      "If Service is not listed, consult with our Agent",
                      "Receive your Number from our Agent and verify",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className={`rounded-full shadow-md px-4 py-2 flex items-center space-x-2 ${
                          darkMode ? 'bg-gray-700' : 'bg-white'
                        } animate-slideInLeft`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <span className="text-black font-bold">&#8226;</span>
                        <span className="text-sm font-light whitespace-nowrap">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Section */}
                <div className="text-left animate-slideInRight">
                  <p>
                    This is some descriptive text about the virtual number. Add any
                    information you want to share here.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      )}

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default Home;