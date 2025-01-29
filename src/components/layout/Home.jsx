import { DarkModeContext } from '../../context/DarkModeContext';
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
          className={`font-sans ${darkMode ? 'bg-[#010001] text-white' : 'bg-[#7C25BA] text-white'
            }`}
        >
          {/* Header Section */}
          <div className=" mb-12 sm:mb-16 py-10 sm:py-12">
            <NavBar />
          </div>
          <section className="relative h-full w-full -translate-y-10 flex flex-col items-center ">
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
                  className={`${darkMode ? 'bg-[#7C25BA] text-white' : 'bg-[#7C25BA]'
                    }  font-medium py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition-all duration-200  mb-5`}
                >
                  Get Started
                </button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src={techImage}
                  alt="Tech Solutions"
                  className="max-h-[350px] md:max-h-[400px] mb-5"
                />
              </div>
            </div>
          </section>

          {/* Why Choose Our Services Section */}
          <section
            className={`py-12 ${darkMode ? 'bg-[#131312] text-white' : 'bg-[#fffe] text-black'
              }`}
          >
            <h2 className="text-3xl font-extrabold text-center  mb-6">
              Why Choose Our Services?
            </h2>
            <div className="border-b-4 border-[#7C25BA]  w-24 mx-auto rounded-full mb-8"></div>
          </section>
          {/* bg-[#f8f7f3] */}
          {/* Residential Proxies Section */}
          <section
            className={` ${darkMode ? 'bg-[#131312] text-white' : 'bg-[#f8f7f3] text-black'
              } py-12`}
          >
            <div className="max-w-6xl mx-auto px-6">
              <h3 className="text-2xl font-bold text-center  mb-8">
                Residential Proxies
              </h3>
              <div className="grid sm:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-xl font-semibold mb-4 ">Benefits</h4>
                  <ul className="list-disc space-y-3 pl-6 ">
                    <li>Exact IP for Online Accounts Creation</li>
                    <li>Supports Guaranteed 100% Online Mask Identification</li>
                    <li>Very Affordable Pricing</li>
                    <li>Supports SOCKS5/HTTP</li>
                    <li>No Setup Fee</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 ">Use Cases</h4>
                  <ul className="list-disc space-y-3 pl-6 ">
                    <li>Oneforma Account Creation (Any Locale)</li>
                    <li>Data Scraping</li>
                    <li>Market Research</li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link to="/proxy">
                  <button className="bg-[#7C25BA]  hover:bg-[#6a1fa0]  text-white font-medium py-3 px-8 rounded-lg shadow-md">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </section>
          {/* bg-[#fefffe] */}
          <section
            className={`${darkMode ? 'bg-[#28282B] text-white' : 'bg-[#fefffe] text-black'
              } py-12`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-2xl font-bold text-center  mb-8">VPS Server</h3>
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h4 className="text-xl font-semibold mb-4 ">Why Our VPS?</h4>
                  <ul className="list-disc space-y-3 pl-6 ">
                    <li>Private and Secure</li>
                    <li>Supports Android Simulators</li>
                    <li>Supports Linux/Windows/Ubuntu</li>
                    <li>Instant Deployment</li>
                    <li>24/7 Support System</li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <img src={server} alt="VPS Server" className="max-h-[350px]" />
                </div>
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => navigate('/rdp')}
                  className="bg-[#7C25BA]  hover:bg-[#6a1fa0]  text-white font-medium py-3 px-8 rounded-lg shadow-md"
                >
                  Buy Now
                </button>
              </div>
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

          {/* Verification Process Section */}
          {/* bg-[#e2f7f4] */}
          <section
            className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-[#e2f7f4] text-black'
              } py-12`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <h4 className="text-2xl font-bold text-center  mb-8">
                Verification Process
              </h4>
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <ul className="space-y-4">
                  {[
                    'Find out if the Account You want to verify is Listed',
                    'Choose the Account you want to Verify',
                    'Order the number and get instant message',
                    'If Service is not listed, consult with our Agent',
                    'Receive your Number from our Agent and verify',
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="bg-white text-black rounded-lg shadow-md p-4 flex items-center space-x-3"
                    >
                      <span className="text-purple-700 font-bold">&#8226;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <img
                    src={phone}
                    alt="Verification Process"
                    className="max-h-[300px]"
                  />
                </div>
                <p className="text-lg">
                  Add a descriptive text about the verification process or
                  additional information users should know.
                </p>
              </div>
            </div>
          </section>

          {/* Repeat similar structure for other sections */}
          <Footer />
        </div>
      }

    </div>

  );
};

export default Home;
