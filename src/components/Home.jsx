import React from 'react';
import NavBar from '../reusables/Navbar'; // Import NavBar component
import techImage from '../assets/tech-image.png'; // Import the image
import './Home.css'; // Import the CSS file for the shake effect

const Home = () => {
    return (
    <div>
        <div className=" h-[655px] flex flex-col items-center bg-purple-700 text-white mb-10">
            { /* Wrap NavBar in its own div with margin-bottom */}
            <div className="w-full mb-32">
                <NavBar /> {/* Render the reusable NavBar component */}
            </div>
            {/* Add margin-top to main content to avoid overlapping with fixed NavBar */}
            <main className="flex flex-col md:flex-row gap-24 text-center md:text-left px-12"> 
                <div className="md:w-1/2 mb-8 md:mb-0 md:ml-12 mt-24 pt-6">
                    <p className="text-4xl md:text-[30px] font-medium mb-4">Need Precise Residential IPs, <br />RDP VPS, Virtual Credit Cards or Non-VOIP Numbers?</p>
                    <p className="text-lg mb-4 mt-12">We’ve Got the Perfect Solutions For You</p>
                    <button className="border border-white py-1.5 px-3 text-[15px] rounded hover:bg-white 
                    hover:text-purple-700">Get Started</button>
                </div>
                <div className="mt-6 pt-12">
                    {/* Apply the shake effect class to the image */}
                    <img src={techImage} alt="tech-logo" className=" img-fluid animated w-auto h-[330px] x-[862px] y-[270px] max-w-md mx-auto shake-on-hover" />
                </div>
            </main>
        </div>

        <h2 className="text-3xl font-Semibold text-center mb-1 font-italic">Why Choose Our Services?</h2>
<div className="flex justify-center">
    <div className="border-b-8 border-purple-700 w-32 rounded-full mb-8 thick-line"></div>
</div>
<section className="bg-[#F9F7F2] text-center py-12">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Residential Proxies Section */}
        <div className="border-r-2 border-gray-400 pr-8">
            <h3 className="text-xl font-bold mb-4">Residential Proxies</h3>
            <div className="border-b-4 border-purple-700 w-16 mx-auto mb-4 rounded-full thick-line"></div>
            <div className="text-left flex flex-col md:flex-row">
                <div className="flex-1">
                    <h4 className="font-bold">Benefits</h4>
                    <ul className="list-disc list-inside mb-4">
                        <li>Supports Guaranteed 100% Online Mask Identification</li>
                        <li>Very Affordable pricing for Daily and Monthly Residential IPs</li>
                        <li>Supports SOCKS5 & HTTP</li>
                        <li>Cost Effective</li>
                        <li>No setup fee</li>
                    </ul>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold">Use Case</h4>
                    <ul className="list-disc list-inside">
                        <li>Social Media Marketing</li>
                        <li>Data Scraping</li>
                        <li>Sales & E-commerce</li>
                        <li>Crowdsourcing Platforms (Clicker, Appen, Clickworker, Oneforma, Echoloca, Telus AI)</li>
                        <li>Market Research</li>
                    </ul>
                </div>
            </div>
            <button className="bg-purple-700 text-white px-6 py-3 rounded mt-4">Buy Now</button>
        </div>

        {/* VPS Server Section */}
        <div className="pl-8">
            <h3 className="text-xl font-bold mb-4">VPS Server</h3>
            <div className="border-b-4 border-purple-700 w-16 mx-auto mb-4 rounded-full thick-line"></div>
            <div className="text-left flex flex-col md:flex-row">
                <div className="flex-1">
                    <h4 className="font-bold">Why Our VPS?</h4>
                    <ul className="list-disc list-inside mb-4">
                        <li>Private and Secure</li>
                        <li>Reliable Hosting</li>
                        <li>24/7 Support System</li>
                        <li>Very Affordable as low as $2</li>
                        <li>Instant Deployment</li>
                        <li>Supports Linux/Windows/Ubuntu Server</li>
                        <li>Supports Android Simulators/KVM Virtualization</li>
                        <li>DDOS Protection</li>
                        <li>No Setup fees</li>
                    </ul>
                </div>
            </div>
            <button className="bg-purple-700 text-white px-6 py-3 rounded mt-4">Buy Now</button>
        </div>
    </div>
</section>

    </div>
    );
};

export default Home;
