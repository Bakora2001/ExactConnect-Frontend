import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../reusables/Navbar'; // Import NavBar component
import techImage from '../assets/tech-image.png'; // Import the image

import server from '../assets/server.png';
import wallet from '../assets/wallet.png';
import phone from '../assets/phone.png'; 

const Home = () => {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/signup'); // Navigates to the /auth path
  };
    return (
<div className= 'bg-[#131312] text-white '>
  {/* Header Section */}
  <div className="flex flex-col items-center  text-white py-10 sm:py-16">
    {/* NavBar */}
    <div className="w-full mb-12 sm:mb-20">
      <NavBar />
    </div>

    {/* Main Content */}
    <main className="flex flex-col-reverse md:flex-row items-center md:justify-between text-center md:text-left px-6 sm:px-12 gap-8 sm:gap-16 max-w-7xl mx-auto">
      <div className="w-full md:w-1/2">
        <h1 className="text-7xl sm:text-4xl  mb-4 leading-snug font-circular font-normal text-[#fcfdfd]">
          Need Precise Residential IPs, <br />
          RDP VPS, Virtual Credit Cards, or Non-VOIP Numbers?
        </h1>
        <p className="text-md sm:text-lg mb-6">
          We’ve Got the Perfect Solutions For You
        </p>
        <button
          onClick={handleGetStartedClick}
          className="bg-[#4a3da0] text-white font-normal font-circular py-2 px-4 rounded-lg shadow text-sm hover:bg-[#6353ce] hover:text-white transition duration-200"
        >
          Get Started
        </button>
      </div>
      <div className="w-full md:w-1/2">
        <img
          src={techImage}
          alt="tech-logo"
          className="w-auto max-h-[300px] sm:max-h-[400px] mx-auto"
        />
      </div>
    </main>
  </div>

  {/* Why Choose Our Services Section */}
  <section className="text-center py-10">
    <h2 className="text-3xl font-bold mb-4 text-white">Why Choose Our Services?</h2>
    <div className="border-b-4 border-purple-700 w-20 mx-auto rounded-full mb-8"></div>
  </section>

  {/* Residential Proxies Section */}
  <section className="bg-black-50 py-10">
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      <h3 className="text-xl font-bold text-center text-white mb-6">Residential Proxies</h3>
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Benefits */}
        <div className="flex-1 text-white">
          <h4 className="font-medium text-lg mb-4">Benefits</h4>
          <ul className="list-disc pl-5 space-y-3 text-sm">
            <li>Exact IP for Online Accounts Creation</li>
            <li>Supports Guaranteed 100% Online Mask Identification</li>
            <li>Very Affordable Pricing</li>
            <li>Supports SOCKS5/HTTP</li>
            <li>No Setup Fee</li>
          </ul>
        </div>
        {/* Use Cases */}
        <div className="flex-1">
          <h4 className="font-medium text-lg mb-4">Use Cases</h4>
          <ul className="list-disc pl-5 space-y-3 text-sm">
            <li>Oneforma Account Creation (Any Locale)</li>
            <li>Data Scraping</li>
            <li>Market Research</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="bg-purple-700 text-white py-2 px-6 rounded-lg shadow hover:bg-purple-600 transition">
          Buy Now
        </button>
      </div>
    </div>
  </section>

  {/* VPS Server Section */}
  <section className="bg-black py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <h3 className="text-xl font-bold text-center text-white mb-6">VPS Server</h3>
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2 text-white">
          <h4 className="font-medium text-lg mb-4">Why Our VPS?</h4>
          <ul className="list-disc pl-5 space-y-3 text-sm">
            <li>Private and Secure</li>
            <li>Supports Android Simulators</li>
            <li>Supports Linux/Windows/Ubuntu</li>
            <li>Instant Deployment</li>
            <li>24/7 Support System</li>
          </ul>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src={server}
            alt="server-logo"
            className="w-auto max-h-[300px] mx-auto"
          />
        </div>
      </div>
      <div className="text-center mt-8">
        <button
          className="bg-purple-700 text-white py-2 px-6 rounded-lg shadow hover:bg-purple-600 transition"
          onClick={() => navigate('/rdp')}
        >
          Buy Now
        </button>
      </div>
    </div>
  </section>

  {/* Virtual Credit Card Section */}
  <section className="bg-black py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 text-white">
      <h3 className="text-xl font-bold text-center mb-6">Virtual Credit Card</h3>
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2">
          <img
            src={wallet}
            alt="wallet-logo"
            className="w-auto max-h-[300px] mx-auto"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h4 className="font-medium text-lg mb-4">Why Choose Us?</h4>
          <ul className="list-disc pl-5 space-y-3 text-sm">
            <li>Private and Secure</li>
            <li>Instant Deployment</li>
            <li>Reliable Hosting</li>
            <li>24/7 Support System</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="bg-purple-700 text-white py-2 px-6 rounded-lg shadow hover:bg-purple-600 transition">
          Buy Now
        </button>
      </div>
    </div>
  </section>
</div>



    );
};

export default Home;
