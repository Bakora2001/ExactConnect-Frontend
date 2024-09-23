import React, { useState } from 'react';
import rdp1 from '../assets/rdp1.png'; // Import your image
import ubuntu from '../assets/ubuntu.svg'; // Adjust path as necessary

import windows from '../assets/windows.svg'; // Adjust path as necessary
import centOs from '../assets/centOs.svg'; // Adjust path as necessary
import debian from '../assets/debian.svg'; // Adjust path as necessary
import windows1 from '../assets/windows1.svg'; // Adjust path as necessary
import centos from '../assets/centos.svg'; // Adjust path as necessary
import debian from '../assets/debian.png'; // Adjust path as necessary
import amalilinux from '../assets/linux.svg'; // Adjust path as necessary



// import amalilinux from '../assets/amalilinux.svg'; // Adjust path as necessary
const Rdp = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle


    return (
        <div>
            {/* Navigation Bar */}

            <nav className="bg-[#7C25BA] text-white sticky top-0 z-50 w-full h-24">
                <div className="max-w-screen-xl px-4 flex justify-between h-16">
                    {/* Logo */}
                    <div className="pl-4 pt-8">
                        <h1 className="text-3xl font-bold">ExactConnect</h1>
                    </div>

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-[#7C25BA] text-white sticky top-0 z-50 w-full h-16">
                <div className="flex items-center justify-between px-4 h-full">
                    {/* Hamburger Icon (visible on small screens) */}

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Links for larger screens */}
                    <div className="hidden md:flex space-x-8 lg:space-x-24 pt-10">
                        <a href="#locations" className="hover:text-gray-300">Locations</a>
                        <a href="#pricing" className="hover:text-gray-300">Pricing</a>
                        <a href="#contact" className="hover:text-gray-300">Contact Us</a>
                    </div>

                    {/* Get Started Button */}
                    <div className="hidden md:block pt-10">

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <h1 className="text-2xl font-bold text-white">ExactConnect</h1>

                    {/* Hidden for mobile */}
                    <div className="hidden md:flex space-x-8">
                        <a href="#locations" className="hover:text-gray-300">Locations</a>
                        <a href="#pricing" className="hover:text-gray-300">Pricing</a>
                        <a href="#contact" className="hover:text-gray-300">Contact Us</a>

                        <a href="#get-started" className="bg-[#7C25BA] text-white font-medium py-2 px-4 rounded hover:bg-[#6a1fa0] ring-1 ring-white">
                            Get Started
                        </a>
                    </div>
                </div>

                {/* Mobile Menu (visible when hamburger is clicked) */}
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
            </nav>
            {/* New Section with Text and Image */}
            <div className="flex flex-col-reverse lg:flex-row justify-between bg-white p-8 lg:p-16 max-w-screen-xl mx-auto ">
                {/* Text on the left */}
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
                {/* Image on the right */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <img src={rdp1} alt="RDP" className="h-auto pt-4 lg:pt-12 object-contain max-w-full" />
                </div>
            </div>

            {/* Flags Section */}
            <div className="bg-[#F1F0F2] p-8">
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    {/* Flags for various countries */}
                    {['🇺🇸', '🇬🇧', '🇨🇦', '🇩🇪', '🇫🇷', '🇮🇹', '🇪🇸', '🇦🇺', '🇳🇱', '🇸🇪', '🇨🇭', '🇧🇪'].map((flag, index) => (
                        <span key={index} className="text-3xl" title={`Country ${index + 1}`}>{flag}</span>
                    ))}
                </div>
                <h3 className="text-2xl font-light text-center mt-16 mb-4">
                    Supports Over 15+ Countries with Affordable Pricing that fits Your Needs
                </h3>
            </div>

            {/* New Buttons Section */}
            <div className="bg-[#F1F0F2] p-4 mb-20">

                <div className="flex flex-wrap justify-center gap-4 ">

                <div className="flex flex-wrap justify-center gap-4">

                    {['United States', 'United Kingdom', 'Germany', 'Other Countries'].map((country, index) => (
                        <button key={index} className="bg-[#7C25BA] text-white text-md py-2 w-48 h-12 rounded-lg hover:bg-[#6a1fa0]">
                            {country}
                        </button>
                    ))}
                </div>
                {/* Pricing Cards Section */}

            <section className="flex flex-wrap justify-center gap-6 my-10">
                {Array(6).fill().map((_, index) => {
                    const prices = [8, 12, 15, 20, 25, 30]; // Unique prices for each card
                    return (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 md:w-1/4">
                            <h2 className="text-xl font-bold">VPS - Essential</h2>
                            <p className="text-purple-600 mt-2">No Setup Fee</p>
                            <p className="text-4xl font-bold mt-4">${prices[index]}</p> {/* Use unique price */}
                            <p className="text-gray-500">/per month incl. VAT</p>
                            <button className="mt-6 px-8 py-3 bg-purple-600 text-white">Configure</button>
                            <div className="mt-6">
                                <h3 className="font-bold">Top Features:</h3>
                                <ul className="list-disc list-inside mt- 2 text-left">
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
            <div className="bg-white mb-24">
                <section className="text-center my-10 px-4">
                    <h2 className="text-2xl font-bold">Not sure which plan is right for you?</h2>
                    <p className="mt-4">We are here to guide You to make the right choices for your Business Plan..With just seconds of reply in our WhatsApp number below</p>
                    <div className="flex justify-center flex-wrap space-x-4 mt-6">
                        <button className="px-6 py-3 bg-gray-200 rounded-full m-2">+254 728703634</button>
                        <button className="px-6 py-3 bg-gray-200 rounded-full m-2">Live Chat</button>
                    </div>
                <section className="flex flex-wrap justify-center gap-6 my-10">
                    {Array(6).fill().map((_, index) => {
                        const prices = [8, 12, 15, 20, 25, 30]; // Unique prices for each card
                        return (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-1/2 md:w-1/4">
                                <h2 className="text-xl font-bold">VPS - Essential</h2>
                                <p className="text-purple-600 mt-2">No Setup Fee</p>
                                <p className="text-4xl font-bold mt-4">${prices[index]}</p> {/* Use unique price */}
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
<p className="bg-[#DEE2E6] pl-4 font-bold w-48 ml-60">Operating System</p>
<section className="bg-[#DEE2E6] py-0 mx-60 mb-32">
    <div className="max-w-screen-xl mx-auto px-4 py-7">
        <div className="flex gap-12 mx-12 flex-wrap space-x-12">
            {[
                { name: 'Ubuntu', icon: ubuntu }, // Use appropriate image for Ubuntu
                { name: 'Windows', icon: windows },
                { name: 'CentOS', icon: centOs }, // Use appropriate image for CentOS
                { name: 'Debian', icon: debian }, // Use appropriate image for Debian
                // { name: 'AlmaLinux', icon: amalilinux } // Use appropriate image for AlmaLinux
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

            <div className="">
                <section className="bg-[#DEE2E6] items-center py-10 mb-24 pb-20">
                    <h2 className="text-center text-2xl font-bold">Beyond Shared Hosting</h2>
                    <div className="flex justify-center space-x-12 mt-12">
                        {['Web Hosting', 'WordPress Hosting', 'Website Builder', 'SSL Certificate'].map((service, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-6 w-64 text-center">
                                <img src="https://placehold.co/64x64" alt={`${service} icon`} className="mx-auto" />
                                <p className="mt-4">{service}</p>
                            </div>
                        ))}
                    </div>
                </section>
            <div className="bg-[#DEE2E6] py-10 mb-24">
                <h2 className="text-center text-2xl font-bold mb-12">Beyond Shared Hosting</h2>
                <div className="flex flex-wrap justify-center gap-8 px-4">
                    {['Web Hosting', 'WordPress Hosting', 'Website Builder', 'SSL Certificate'].map((service, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-64 text-center">
                            <img src="https://placehold.co/64x64" alt={`${service} icon`} className="mx-auto mb-4" />
                            <p className="text-lg font-medium">{service}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* Footer Section */}
            <footer className="bg-purple-600 text-white py-10 mb-8">
                <div className="max-w-screen-xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-xl font-bold">ExactConnect</h3>
                            <p className="mt-4">ExactConnect is a Trusted Online Shopping Platform for the exact online services for our clients.</p>
                            <div className="flex space-x-4 mt-4">
                                <span className="hover:text-gray-300 cursor-pointer">Facebook</span>
                                <span className="hover:text-gray-300 cursor-pointer">Twitter</span>
                                <span className="hover:text-gray-300 cursor-pointer">Instagram</span>
                                <span className="hover:text-gray-300 cursor-pointer">LinkedIn</span>
                            </div>
                        </div>

                    </div>
                </footer>
            </div>

                        <div className="mb-6 md:mb-0">
                            <h3 className="text-xl font-bold">Our Services</h3>
                            <ul className="mt-4">
                                <li>Residential Proxies</li>
                                <li>RDP VPS services</li>
                                <li>VCC Cards</li>
                                <li>Non-VOIP Numbers</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Contact Us</h3>
                            <p className="mt-4">Moi Avenue, Nairobi</p>
                            <p>Nairobi, 00100</p>
                            <p>Phone: +254 728703634</p>
                            <p>Email: exactconnect@gmail.com</p>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Rdp;
