import { DarkModeContext } from '../../context/DarkModeContext';
//Component for lazy loading the image
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../reusables/Navbar';
import Footer from '../reusables/Footer';
import techImage from '/tech-image.png';
import server from '/server.png';
import wallet from '/wallet.png';
import phone from '/phone.png';
import Loader from '../pages/Loader';
import { useContext, useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const { darkMode } = useContext(DarkModeContext);

  const handleGetStartedClick = () => {
    navigate('/account/signup');
  };
  setTimeout(() => {
    setIsLoading(false)
  }, 2000)
  return (
    <div>
      {
        isLoading ? (
          <Loader />
        ) : <div
          className={`font-sans ${darkMode ? 'bg-[#0c0b08] text-white' : 'bg-[#7C25BA] text-white'
            }`}
        >
          {/* Header Section */}
          <div className=" mb-12 sm:mb-16 py-10 sm:py-12">
            <NavBar />
          </div>
          <main className="flex flex-col md:flex-row gap-8 sm:gap-24 text-center md:text-left">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-[1rem] md:px-[3rem] sm:px-12 gap-10 md:gap-16 mb-6">
              <div className="md:w-1/2 text-center md:text-left">
                <h1
                  className={`text-4xl sm:text-5xl font-sans font-bold leading-tight mb-6 ${darkMode ? 'text-white' : 'text-white'
                    }`}
                >
                  Need Precise Residential IPs, RDP VPS, Virtual Credit Cards, or
                  Non-VOIP Numbers?
                </h1>
                <p className="text-lg mb-8">
                  We’ve Got the Perfect Solutions For You
                </p>
                <button
                  onClick={handleGetStartedClick}
                  className={`${darkMode ? ' text-white border-gray-700 ' : 'bg-[#7C25BA]'
                    }  font-medium py-1.5 px-3 rounded-lg shadow-lg hover:opacity-90 transition-all duration-200 border mb-5`  } 
                >
                  Get Started
                </button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <LazyLoadImage
                  src={techImage}
                  width={600} height={400}
                  alt="Tech Solutions"
                  className="max-h-[350px] md:max-h-[400px] mb-5"
                />
              </div>
            </div>
            
          </main>
          {/* Residential Proxies Section */}
          <section className={`text-center py-6 px-4 mt-8 sm:px-8 ${darkMode ? 'bg-[#010100] text-white' : 'bg-[#fffe] text-black'}`}>
          <section>
            {/* Why Choose Our Services Section */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-2 font-italic">
            Why Choose Our Services?
          </h2>
          <div className="flex justify-center">
            <div className="border-b-4 sm:border-b-8 border-purple-700 w-16 sm:w-32 rounded-full mb-6 sm:mb-8"></div>
          </div>
          </section>
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Residential Proxies</h3>
              <div className="border-b-4 sm:border-b-8 border-purple-700 w-12 sm:w-16 mx-auto mb-6 rounded-full"></div>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-6 sm:gap-12">
              {/* Benefits Section */}
              <div className="flex-1 border-b sm:border-b-0 sm:border-r-2 border-gray-400 pb-6 sm:pb-0 sm:pr-8">
                <div className="text-left">
                  <h4 className="font-medium text-[16px] sm:text-[18px] ml-6 sm:ml-12">
                    Benefits
                  </h4>
                  <div className="border-b border-gray-500 w-24 sm:w-32 ml-6 sm:ml-12 mb-4"></div>
                  <ul className="list-disc list-inside font-light text-[14px] sm:text-[16px] space-y-4">
                    <li>Exact IP for Online Accounts Creation</li>
                    <li>Supports Guaranteed 100% Online Mask Identification</li>
                    <li>Very Affordable pricing for Daily and Monthly Residential IPs</li>
                    <li>Supports SOCKS5/HTTP</li>
                    <li>Cost-Effective</li>
                    <li>No setup fee</li>
                  </ul>
                </div>
              </div>

              {/* Use Case Section */}
              <div className="flex-1">
                <div className="text-left">
                  <h4 className="font-medium text-[16px] sm:text-[18px] ml-6 sm:ml-12">
                    Use Case
                  </h4>
                  <div className="border-b border-gray-500 w-24 sm:w-32 ml-6 sm:ml-12 mb-4"></div>
                  <ul className="list-disc list-inside font-light text-[14px] sm:text-[16px] space-y-4">
                    <li>Oneforma Account Creation (Any Locale)</li>
                    <li>Data Scraping</li>
                    <li>Crowdsourcing Platforms (Outlier, Appen, Clickworker, Oneforma, Echolabs, Telus AI)</li>
                    <li>Market Research</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="mt-6 sm:mt-10 flex justify-center">
              <button className="bg-purple-700 text-white px-6 sm:px-8 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-purple-800 transition duration-300">
                Buy Now
              </button>
            </div>
          </section>


          {/* bg-[#fefffe] */}
          <section className={`text-center  py-8 px-4 sm:px-16 lg:px-24  w-full ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'}`}>
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">VPS Server</h3>
              <div className="border-b-4 sm:border-b-8 border-purple-700 w-12 sm:w-16 mx-auto mb-6 rounded-full"></div>
            </div>

            <div className="mx-auto flex flex-col lg:flex-row gap-8 items-center lg:items-start max-w-7xl">
              {/* Text Section */}
              <div className="text-left w-full lg:w-1/2 px-6 sm:px-10 lg:px-12">
                <h4 className="font-medium text-[16px] sm:text-[18px] mb-2">
                  Why Our VPS?
                </h4>
                <div className="border-b border-gray-500 w-48 sm:w-56 mb-4"></div>
                <ul className="list-disc list-inside font-light text-[14px] sm:text-[16px] space-y-3 sm:space-y-4">
                  <li>Private and Secure</li>
                  <li>Supports Android Simulators & KVM Virtualization</li>
                  <li>Supports Linux, Windows, and Ubuntu Server</li>
                  <li>Affordable pricing starting from $12</li>
                  <li>Instant Deployment</li>
                  <li>Reliable Hosting</li>
                  <li>DDOS Protection</li>
                  <li>24/7 Support System</li>
                </ul>
              </div>

              {/* Image Section */}
              <div className="flex justify-center lg:justify-end w-full lg:w-1/2">
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
                className="bg-purple-700 text-white px-6 sm:px-8 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-purple-800 transition duration-300"
                onClick={() => navigate('/rdp')}
              >
                Buy Now
              </button>
            </div>
          </section>


          {/* Virtual Credit Card Section */}
          {/* bg-[#eeeeee] */}
          <section
            className={`${darkMode ? 'bg-[#131312] text-white' : 'bg-[#eeeeee] text-black'
              } py-12`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-2xl font-bold text-center  mb-8">
                Virtual Credit Card
              </h3>
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="flex justify-center">
                  <img
                    src={wallet}
                    alt="Virtual Credit Card"
                    className="max-h-[350px]"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 ">Why Choose Us?</h4>
                  <ul className="list-disc space-y-3 pl-6 ">
                    <li>Private and Secure</li>
                    <li>Instant Deployment</li>
                    <li>Reliable Hosting</li>
                    <li>24/7 Support System</li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link to="/maintainance">
                  <button className="bg-[#7C25BA]  hover:bg-[#6a1fa0]  text-white font-medium py-3 px-8 rounded-lg shadow-md">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </section>

          <section className='bg-white pt-8'>
            {/* Why Choose Our Services Section */}
            <h2 className="text-2xl sm:text-3xl text-black font-semibold text-center pb-3 font-italic">
            Are You In Need of Real Non-VOIP Numbers For Your Account Verification ?
          </h2>
          <h4 className="text-2px sm:text-2px text-black pb-4 font-light text-center font-italic">
          We are here to help you
          </h4>
          </section>

          {/* Verification Process Section */}
          {/* bg-[#e2f7f4] */}
          <section className={`py-6  px-4 sm:px-24 ${darkMode ? 'bg-[#131312] text-white' : 'bg-[#E3F6F4] text-black'}`}>
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
                        className={`rounded-full shadow-md px-4 py-2 flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                      >
                        <span className="text-black font-bold">&#8226;</span>
                        <span className="text-sm font-light whitespace-nowrap">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Section */}
                <div className="flex justify-center items-start pt-6 lg:pt-8">
                  <img
                    src={phone}
                    alt="phone-logo"
                    className="img-fluid max-w-xs sm:max-w-md"
                  />
                </div>

                {/* Right Section */}
                <div className="text-left">
                  <p>
                    This is some descriptive text about the virtual number. Add any
                    information you want to share here.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Repeat similar structure for other sections */}
          <Footer />
        </div>
      }

    </div>
  )
};

export default Home;

