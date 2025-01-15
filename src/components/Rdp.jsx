import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rdp1 from '/rdp1.png'; 
import ubuntu from '/ubuntu.svg'; 
import windows from '/windows.svg'; 
import centOs from '/centOs.svg'; 
import debian from '/debian.svg'; 
import NavBar from '../reusables/Navbar';

const Rdp = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle
    const navigate = useNavigate();
    return (
        <div>
            < NavBar />
            {/* New Section with Text and Image */}
            <div className="flex flex-col-reverse lg:flex-row justify-between bg-white p-4 sm:p-8 lg:p-16 max-w-screen-xl mx-auto mb-8">
                {/* Text on the left */}
                <div className="text-gray-800 pt-4 lg:pt-12 flex-row w-full lg:w-1/2">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium italic mb-4 sm:mb-8">
                        Find Your Best VPS Hosting<br />Plan With Us
                    </h2>
                    <h2 className="text-[12px] sm:text-[14px] lg:text-[16px] font-light mb-4 sm:mb-6">
                        ExactConnect high-performance VPS Hosting redefines<br />
                        excellence, combining cutting-edge technology with affordability.
                    </h2>
                    <button className="bg-[#7C25BA] text-white font-regular py-2 px-4 sm:px-5 lg:px-6 rounded-full hover:bg-[#6a1fa0]">
                        SELECT YOUR PLAN
                    </button>
                </div>
                {/* Image on the right */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <img src={rdp1} alt="RDP" className="h-auto pt-4 lg:pt-12 object-contain max-w-full" />
                </div>
            </div>

            {/* Flags Section */}
            <div className="bg-[#F1F0F2] p-4 sm:p-8">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-4">
                    {['🇺🇸', '🇬🇧', '🇨🇦', '🇩🇪', '🇫🇷', '🇮🇹', '🇪🇸', '🇦🇺', '🇳🇱', '🇸🇪', '🇨🇭', '🇧🇪'].map((flag, index) => (
                        <span key={index} className="text-2xl sm:text-3xl" title={`Country ${index + 1}`}>{flag}</span>
                    ))}
                </div>
                <h3 className="text-lg sm:text-2xl font-light text-center mt-8 sm:mt-16 mb-4">
                    Supports Over 15+ Countries with Affordable Pricing that fits Your Needs
                </h3>
            </div>

            {/* New Buttons Section */}
            <div className="bg-[#F1F0F2] p-2 sm:p-4 mb-12 sm:mb-20">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 ">
                    {['United States', 'United Kingdom', 'Germany', 'Other Countries'].map((country, index) => (
                        <button key={index} className="bg-[#7C25BA] text-white text-sm sm:text-md py-2 w-40 sm:w-48 h-10 sm:h-12 rounded-lg hover:bg-[#6a1fa0]">
                            {country}
                        </button>
                    ))}
                </div>

                {/* Pricing Cards Section */}
                <section className="flex flex-wrap justify-center gap-4 sm:gap-6 my-8 sm:my-10">
                    {Array(6).fill().map((_, index) => {
                        const prices = [8, 12, 15, 20, 25, 30]; // Unique prices for each card
                        return (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full sm:w-1/2 md:w-1/4">
                                <h2 className="text-lg sm:text-xl font-bold">VPS - Essential</h2>
                                <p className="text-purple-600 mt-2">No Setup Fee</p>
                                <p className="text-3xl sm:text-4xl font-bold mt-4">${prices[index]}</p> {/* Use unique price */}
                                <p className="text-gray-500">/per month incl. VAT</p>
                                <button className="mt-6 px-6 sm:px-8 py-2 sm:py-3 bg-purple-600 text-white"
                                    onClick={() => navigate('/configure')}>Configure</button>
                                <div className="mt-6">
                                    <h3 className="font-bold">Top Features:</h3>
                                    <ul className="list-disc list-inside mt-2 text-left">
                                        <li>2 vCPU Cores</li>
                                        <li>2 GB RAM</li>
                                        <li>50 GB SSD</li>
                                        <li>5 TB Traffic</li>
                                    </ul>
                                    <h3 className="font-bold mt-4">Also Includes:</h3>
                                    <ul className="list-disc list-inside mt-2 text-left">
                                        <li>1x Dedicated UK IP</li>
                                        <li>Full Root Access</li>
                                        <li>Web UI for Easy Management</li>
                                        <li>Windows / Linux OS Options</li>
                                        <li>Free cPanel / Plesk</li>
                                        <li>7/24 Ticket Support</li>
                                    </ul>
                                    <p className="text-purple-600 mt-4 cursor-pointer">Compare</p>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>

            {/* Contact Section */}
            <div className="bg-white mb-16 sm:mb-24">
                <section className="text-center my-8 sm:my-10 px-4">
                    <h2 className="text-lg sm:text-2xl font-bold">Not sure which plan is right for you?</h2>
                    <p className="mt-4 text-sm sm:text-base">We are here to guide you to make the right choices for your Business Plan.. With just seconds of reply on our WhatsApp number below</p>
                    <div className="flex justify-center flex-wrap space-x-2 sm:space-x-4 mt-6">
                        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 rounded-full m-2">+254 728703634</button>
                        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 rounded-full m-2">Live Chat</button>
                    </div>
                </section>
            </div>

            {/* Operating System Section */}
            <p className="bg-[#DEE2E6] pl-4 font-bold w-40 sm:w-48 ml-40 sm:ml-60">Operating System</p>
            <section className="bg-[#DEE2E6] py-4 mx-20 sm:mx-60 mb-16 sm:mb-32">
                <div className="max-w-screen-xl mx-auto px-4 py-6 sm:py-7">
                    <div className="flex gap-6 sm:gap-12 mx-6 sm:mx-12 flex-wrap space-x-6 sm:space-x-12">
                        {[
                            { name: 'Ubuntu', icon: ubuntu },
                            { name: 'Windows', icon: windows },
                            { name: 'CentOS', icon: centOs },
                            { name: 'Debian', icon: debian },
                        ].map((os, index) => (
                            <div key={index} className="text-center m-2">
                                <img src={os.icon} alt={`${os.name} logo`} className="w-12 h-12 sm:w-16 sm:h-16" />
                                <p className="mt-2 text-sm sm:text-base">{os.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Beyond Shared Hosting Section */}
<div className="">
    <section className="bg-[#DEE2E6] items-center py-6 sm:py-10 mb-16 sm:mb-24 pb-12 sm:pb-20">
        <h2 className="text-center text-xl sm:text-2xl font-bold">Beyond Shared Hosting</h2>
        <div className="flex flex-wrap justify-center gap-6 sm:space-x-12 mt-8 sm:mt-12">
            {['Web Hosting', 'WordPress Hosting', 'Website Builder', 'SSL Certificate'].map((service, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-40 sm:w-64 text-center flex flex-col items-center">
                    <img src="https://placehold.co/64x64" alt={`${service} icon`} className="mx-auto mb-2 sm:mb-4" />
                    <p className="text-sm sm:text-base">{service}</p>
                </div>
            ))}
        </div>
    </section>
</div>


            {/* Footer Section */}
            <div className="">
                <footer className="bg-purple-600 text-white py-6 sm:py-10 mb-6 sm:mb-8">
                    <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold">ExactConnect</h3>
                                <p className="mt-2 sm:mt-4 text-sm">ExactConnect is a Trusted Online Shopping Platform for the exact online services for our clients.</p>
                                <div className="flex space-x-2 sm:space-x-4 mt-4">
                                    <span className="hover:text-gray-300 cursor-pointer">Facebook</span>
                                    <span className="hover:text-gray-300 cursor-pointer">Twitter</span>
                                    <span className="hover:text-gray-300 cursor-pointer">Instagram</span>
                                    <span className="hover:text-gray-300 cursor-pointer">LinkedIn</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold">Our Services</h3>
                                <ul className="mt-2 sm:mt-4 text-sm">
                                    <li>Residential Proxies</li>
                                    <li>RDP VPS services</li>
                                    <li>VCC Cards</li>
                                    <li>Non-VOIP Numbers</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold">Contact Us</h3>
                                <p className="mt-2 sm:mt-4 text-sm">Moi Avenue, Nairobi</p>
                                <p className="text-sm">Nairobi, 00100</p>
                                <p className="text-sm">Phone: +254 728703634</p>
                                <p className="text-sm">Email: exactconnect@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Rdp;
