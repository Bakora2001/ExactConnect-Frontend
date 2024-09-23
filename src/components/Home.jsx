import React from 'react';
import NavBar from '../reusables/Navbar'; // Import NavBar component
import techImage from '../assets/tech-image.png'; // Import the image
import './Home.css'; // Import the CSS file for the shake effect
import server from '../assets/server.png';
import wallet from '../assets/wallet.png';

const Home = () => {
    return (
        <div>
            {/* Header Section */}
            <div className="h-[655px] flex flex-col items-center bg-purple-700 text-white mb-10">
                {/* NavBar */}
                <div className="w-full mb-32">
                    <NavBar /> {/* Render the reusable NavBar component */}
                </div>

                {/* Main Content */}
                <main className="flex flex-col md:flex-row gap-24 text-center md:text-left px-12">
                    <div className="md:w-1/2 mb-8 md:mb-0 md:ml-12 mt-24 pt-6">
                        <p className="text-4xl md:text-[30px] font-medium mb-4">
                            Need Precise Residential IPs, <br />
                            RDP VPS, Virtual Credit Cards or Non-VOIP Numbers?
                        </p>
                        <p className="text-lg mb-4 mt-12">We’ve Got the Perfect Solutions For You</p>
                        <button className="border border-white py-1.5 px-3 text-[15px] rounded hover:bg-white hover:text-purple-700">
                            Get Started
                        </button>
                    </div>
                    <div className="mt-6 pt-12">
                        <img src={techImage} alt="tech-logo" className="img-fluid animated w-auto h-[330px] max-w-md mx-auto shake-on-hover" />
                    </div>
                </main>
            </div>

            {/* Why Choose Our Services Section */}
            <h2 className="text-3xl font-semibold text-center mb-1 font-italic">Why Choose Our Services?</h2>
            <div className="flex justify-center">
                <div className="border-b-8 border-purple-700 w-32 rounded-full mb-8 thick-line"></div>
            </div>

            {/* Residential Proxies Section */}
<section className="bg-[#F9F7F2] text-center py-6">
    <div>
        <h3 className="text-xl font-bold mb-1">Residential Proxies</h3>
        <div className="border-b-8 border-purple-700 w-16 mx-auto mb-4 rounded-full thick-line"></div>
    </div>
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Benefits Section */}
        <div className="flex-1 border-r-2 border-gray-400 pr-8 mx-12">
            <div className="text-left">
                <h4 className="font-regular text-[18px] ml-40">Benefits</h4>
                <div className="border-b border-gray-500 w-32 mx-32 mb-4"></div>
                <ul className="list-disc list-inside font-light  text-[14px] ml-12 space-y-6"> {/* Reduced space between list items */}
                    <li>Exact IP for Online Accounts Creation</li>
                    <li>Supports Guaranteed 100% Online Mask Identification</li>
                    <li>Very Affordable pricing for Daily and Monthly Residential IPs</li>
                    <li>Supports SOCKS5/ HTTP</li>
                    <li>Cost Effective</li>
                    <li>No setup fee</li>
                </ul>
            </div>
        </div>

        {/* Use Case Section */}
        <div className="flex-1">
            <div className="text-left">
                <h4 className="font-regular text-[18px] ml-28">Use Case</h4>
                <div className="border-b border-gray-500 w-32 mx-20 mb-4"></div>
                <ul className="list-disc list-inside font-light text-[14px] space-y-6"> {/* Reduced space between list items */}
                    <li>Oneforma Account Creation (Any Locale)</li>
                    <li>Data Scraping</li>
                    <li>Crowdsourcing Platforms (Outlier, Appen, Clickworker, Oneforma, Echolabs, Telus AI)</li>
                    <li>Market Research</li>
                </ul>
            </div>
        </div>
    </div>
    <button className="bg-purple-700 text-white px-6 py-1.5  rounded mt-12">Buy Now</button>
</section>

    {/* VPS Server */}
<section className="bg-white text-center mt-4 py-6 pl-24 mb-12 w-full">
  <div>
    <h3 className="text-xl font-bold mb-1 pr-[100px]">VPS Server</h3>
    <div className="border-b-8 border-purple-700 w-16 mx-[480px] mb-4 rounded-full thick-line"></div>
  </div>
  <div className="mx-auto flex flex-col lg:flex-row gap-6 items-center lg:items-start max-w-7xl">
    
    {/* Text Section */}
    <div className="text-left w-full lg:w-1/2 ml-[90px] lg:px-8">
      <h4 className="font-regular text-[18px] pt-[25px] lg:mt-0">Why Our VPS ?</h4>
      <div className="border-b border-gray-500 w-[220px] mb-4"></div>
      <ul className="list-disc list-inside font-light text-[14px] space-y-6">
        <li>Private and Secure</li>
        <li>Supports Android Simulators/ KVM Virtualization</li>
        <li>Supports Linux/Windows/ Ubuntu Server</li>
        <li>Very Affordable as low as 12$</li>
        <li>Instant Deployment</li>
        <li>Reliable Hosting</li>
        <li>DDOS Protection</li>
        <li>24/7 Support System</li>
      </ul>
    </div>

    {/* Image Section */}
    <div className="flex justify-center lg:justify-start pt-8 mr-[80px] lg:pt-0 w-full lg:w-1/2">
      <img src={server} alt="server-logo" className="img-fluid max-w-xs lg:max-w-md" />
    </div>
  </div>
  <button className="bg-purple-700 text-white px-6 py-1.5 rounded mt-8">Buy Now</button>
</section>


    {/* Virtual Credit Card Section */}
    <section className="bg-[#EEEEEE] text-center py-6 mb-32 pl-24 w-full">
  <div>
    <h3 className="text-xl font-bold mb-1 text-center pr-36">Virtual Credit Card</h3>
    <div className="border-b-8 border-purple-700 w-20 ml-[450px] mb-4 rounded-full thick-line"></div>
  </div>
  <div className="mx-auto flex flex-col lg:flex-row gap-6 items-center lg:items-start max-w-7xl">
    
    {/* Image Section */}
    <div className="flex justify-center lg:justify-start pt-12 lg:mt-0 w-full lg:w-1/2">
      <img src={wallet} alt="wallet-logo" className="img-fluid max-w-xs lg:max-w-md" />
    </div>

    {/* Text Section */}
    <div className="text-left w-full lg:w-1/2 px-4 lg:px-8">
      
      {/* First Heading & List */}
      <h4 className="font-regular text-[18px] mt-8 lg:mt-0">Why Our VPS ?</h4>
      <div className="border-b border-gray-500 w-[220px] mb-4"></div>
      <ul className="list-disc list-inside font-light text-[14px] space-y-2">
        <li>Private and Secure</li>
        <li>Supports Android Simulators/ KVM Virtualization</li>
        <li>Supports Linux/Windows/ Ubuntu Server</li>
        <li>Very Affordable as low as 12$</li>
        <li>Instant Deployment</li>
        <li>Reliable Hosting</li>
        <li>DDOS Protection</li>
        <li>24/7 Support System</li>
      </ul>

      {/* Second Heading & List */}
      <h4 className="font-regular text-[18px] mt-8">Why Our VPS ?</h4>
      <div className="border-b border-gray-500 w-[220px] mb-4"></div>
      <ul className="list-disc list-inside font-light text-[14px] space-y-2">
        <li>Private and Secure</li>
        <li>Supports Android Simulators/ KVM Virtualization</li>
        <li>Supports Linux/Windows/ Ubuntu Server</li>
        <li>Very Affordable as low as 12$</li>
        <li>Instant Deployment</li>
        <li>Reliable Hosting</li>
        <li>DDOS Protection</li>
        <li>24/7 Support System</li>
      </ul>
    </div>
  </div>
  <button className="bg-purple-700 text-white px-6 py-1.5 rounded mt-8">Buy Now</button>
</section>


</div>
    );
};

export default Home;
