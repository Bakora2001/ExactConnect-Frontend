import React, { useState } from 'react';
import rdp1 from '../assets/rdp1.png';
import ubuntu from '../assets/ubuntu.svg';
import windows from '../assets/windows.svg';
import centOs from '../assets/centOs.svg';
import debian from '../assets/debian.png';
import amalilinux from '../assets/linux.svg'; 
import NavBar from '../reusables/Navbar';

const Rdp = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (

        <div>
            <div className="w-full mb-32">
                    <NavBar /> {/* Render the reusable NavBar component */}
                </div>
            {/* Navigation Bar */}
            {/* <nav className="bg-[#7C25BA] text-white sticky top-0 z-50 w-full h-24">
                <div className="max-w-screen-xl px-4 flex justify-between h-16">
                    <div className="pl-4 pt-8">
                        <h1 className="text-3xl font-bold">ExactConnect</h1>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:flex space-x-8 lg:space-x-24 pt-10">
                        <a href="#locations" className="hover:text-gray-300">Locations</a>
                        <a href="#pricing" className="hover:text-gray-300">Pricing</a>
                        <a href="#contact" className="hover:text-gray-300">Contact Us</a>
                    </div>

                    <div className="hidden md:block pt-10">
                        <a href="#get-started" className="bg-[#7C25BA] text-white font-medium py-2 px-4 rounded hover:bg-[#6a1fa0] ring-1 ring-white">
                            Get Started
                        </a>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden bg-[#7C25BA] text-white p-4 space-y-4">
                        <a href="#locations" className="block hover:text-gray-300">Locations</a>
                        <a href="#pricing" className="block hover:text-gray-300">Pricing</a>
                        <a href="#contact" className="block hover:text-gray-300">Contact Us</a>
                        <a href="#get-started" className="block bg-white text-[#7C25BA] font-medium py-2 px-4 rounded hover:bg-gray-200">
                            Get Started
                        </a>
                    </div>
                )}
            </nav> */}

            {/* Main Section */}
            <div className="flex flex-col-reverse lg:flex-row justify-between bg-white p-8 lg:p-16 max-w-screen-xl mx-auto">
                <div className="text-gray-800 pt-4 lg:pt-12 flex-row w-full lg:w-1/2">
                    <h2 className="lg:text-3xl font-medium italic mb-8">
                        Find Your Best VPS Hosting<br />Plan With Us
                    </h2>
                    <h2 className="text-[14px] lg:text-[16px] font-light mb-6">
                        ExactConnect high-performance VPS Hosting redefines<br />
                        excellence, combining cutting-edge technology with affordability.
                    </h2>
                    <button className="bg-[#7C25BA] text-white font-regular py-2 px-4 lg:px-6 rounded-full hover:bg-[#6a1fa0]">
                        SELECT YOUR PLAN
                    </button>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <img src={rdp1} alt="RDP" className="h-auto pt-4 lg:pt-12 object-contain max-w-full" />
                </div>
            </div>

            {/* Flags Section */}
            <div className="bg-[#F1F0F2] p-8 mb-24">
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    {['🇺🇸', '🇬🇧', '🇨🇦', '🇩🇪', '🇫🇷', '🇮🇹', '🇪🇸', '🇦🇺', '🇳🇱', '🇸🇪', '🇨🇭', '🇧🇪'].map((flag, index) => (
                        <span key={index} className="text-3xl" title={`Country ${index + 1}`}>{flag}</span>
                    ))}
                </div>
                <h3 className="text-2xl font-light text-center mt-16 mb-4">
                    Supports Over 15+ Countries with Affordable Pricing that fits Your Needs
                </h3>
            

            {/* Buttons Section */}
            <div className="bg-[#F1F0F2] p-4 mb-20">
                <div className="flex flex-wrap justify-center gap-4">
                    {['United States', 'United Kingdom', 'Germany', 'Other Countries'].map((country, index) => (
                        <button key={index} className="bg-[#7C25BA] text-white text-md py-2 w-48 h-12 rounded-lg hover:bg-[#6a1fa0]">
                            {country}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pricing Cards Section */}
            <section className="flex flex-wrap justify-center gap-6 my-10">
                {Array(6).fill().map((_, index) => {
                    const prices = [8, 12, 15, 20, 25, 30];
                    return (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 md:w-1/4">
                            <h2 className="text-xl font-bold">VPS - Essential</h2>
                            <p className="text-purple-600 mt-2">No Setup Fee</p>
                            <p className="text-4xl font-bold mt-4">${prices[index]}</p>
                            <p className="text-gray-500">/per month incl. VAT</p>
                            <button className="mt-6 px-8 py-3 bg-purple-600 text-white">Configure</button>
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
            {/* Operating System Section */}
            <p className="bg-[#DEE2E6] pl-4 font-bold w-48 ml-60">Operating System</p>
            <section className="bg-[#DEE2E6] py-0 mx-60 mb-32">
                <div className="max-w-screen-xl mx-auto px-4 py-7">
                    <div className="flex gap-12 mx-12 flex-wrap space-x-12">
                        {[
                            { name: 'Ubuntu', icon: ubuntu },
                            { name: 'Windows', icon: windows },
                            { name: 'CentOS', icon: centOs },
                            { name: 'Debian', icon: debian },
                            // { name: 'AlmaLinux', icon: amalilinux }
                        ].map((os, index) => (
                            <div key={index} className="text-center m-2">
                                <img src={os.icon} alt={`${os.name} logo`} className="w-16 h-16" />
                                <p className="mt-2">{os.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Beyond Shared Hosting Section */}
            <section className="bg-[#DEE2E6] items-center py-10">
                <div className="max-w-screen-xl mx-auto px-4 py-10">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold mb-6">Beyond Shared Hosting</h1>
                        <p className="text-md font-light">
                            ExactConnect is taking things further with hosting. Our VPS plans go beyond shared hosting with 
                            higher speed, guaranteed resources, and maximum control over your own system.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Rdp;
