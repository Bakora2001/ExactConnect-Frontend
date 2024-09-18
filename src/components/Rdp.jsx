import React, { useState } from 'react';
import rdp1 from '../assets/rdp1.png'; // Import your image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


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

                    {/* Hamburger Icon (visible on small screens) */}
                    <div className="md:hidden">
                        < button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                        <a
                            href="#get-started"
                            className="bg-[#7C25BA] text-white font-medium py-2 px-4 rounded hover:bg-[#6a1fa0] ring-1 ring-white"
                        >
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
                        <a
                            href="#get-started"
                            className="block bg-white text-[#7C25BA] font-medium py-2 px-4 rounded hover:bg-gray-200"
                        >
                            Get Started
                        </a>
                    </div>
                )}
            </nav>

            {/* New Section with Text and Image */}
            <div className="flex flex-col-reverse lg:flex-row justify-between bg-white p-8 lg:p-16 max-w-screen-xl mx-12 mb-8">
                {/* Text on the left */}
                <div className="text-gray-800 pt-4 lg:pt-12 flex-row w-full lg:w-1/2">
                    <div className="mb-8 lg:mb-12">
                        <h2 className="lg:text-3xl font-medium italic">
                            <span className="block text-left">
                                Find Your Best VPS Hosting<br />Plan With Us
                            </span>
                        </h2>
                    </div>
                    <div className="mb-6 lg:mb-8">
                        <h2 className="text-[14px] lg:text-[16px] font-light">
                            <span className="block text-left">
                                ExactConnect high-performance VPS Hosting redefines<br />
                                excellence, combining cutting-edge technology with<br /> affordability.
                            </span>
                        </h2>
                    </div>
                    {/* SELECT YOUR PLAN Button */}
                    <div className="text-left mt-24">
                        <button className="bg-[#7C25BA] text-white font-regular py-2 px-4 lg:px-6 rounded-full hover:bg-[#6a1fa0]">
                            SELECT YOUR PLAN
                        </button>
                    </div>
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
                    <span className="text-3xl" title="United States">🇺🇸</span>
                    <span className="text-3xl" title="United Kingdom">🇬🇧</span>
                    <span className="text-3xl" title="Canada">🇨🇦</span>
                    <span className="text-3xl" title="Germany">🇩🇪</span>
                    <span className="text-3xl" title="France">🇫🇷</span>
                    <span className="text-3xl" title="Italy">🇮🇹</span>
                    <span className="text-3xl" title="Spain">🇪🇸</span>
                    <span className="text-3xl" title="Australia">🇦🇺</span>
                    <span className="text-3xl" title="Netherlands">🇳🇱</span>
                    <span className="text-3xl" title="Sweden">🇸🇪</span>
                    <span className="text-3xl" title="Switzerland">🇨🇭</span>
                    <span className="text-3xl" title="Belgium">🇧🇪</span>
                </div>
                <h3 className="text-2xl font-light text-center mt-16 mb-4">
                    Supports Over 15+ Countries with Affordable Pricing that fits Your Needs
                </h3>
            {/* New Buttons Section */}
            <div className="bg-[#F1F0F2] p-4 mb-20">
                <div className="flex justify-center gap-12 mt-12">
                    <button className="bg-[#7C25BA] text-white text-md py-2 w-48 h-12 rounded-lg hover:bg-[#6a1fa0]">
                        United States
                    </button>
                    <button className="bg-[#7C25BA] text-white text-md py-2 w-48 rounded-lg hover:bg-[#6a1fa0]">
                        United Kingdom
                    </button>
                    <button className="bg-[#7C25BA] text-white text-md py-2 w-48 rounded-lg hover:bg-[#6a1fa0]">
                        Germany
                    </button>
                    <button className="bg-[#7C25BA] text-white text-md py-2 w-48 rounded-lg hover:bg-[#6a1fa0]">
                        Other Countries
                    </button>
                </div>
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
                    <p className="text-purple-600 mt-4 cursor-pointer">Compare <i className="fas fa-chevron-down"></i></p>
                </div>
            </div>
        );
    })}
</section>









        </div>
        <div className="bg-white mb-24">
        <section className="text-center my-10 px-4">
                        <h2 className="text-2xl font-bold">Not sure which plan is right for you?</h2>
                        <p className="mt-4">We are here to guide You to make the right choices for your Business Plan..With just seconds of reply in our whatsapp number below</p>
                        <div className="flex justify-center flex-wrap space-x-4 mt-6">
                            <button className="px-6 py-3 bg-gray-200 rounded-full m-2"><i className="fas fa-phone"></i> +254 728703634</button>
                            <button className="px-6 py-3 bg-gray-200 rounded-full m-2"><i className="fas fa-comments"></i> Live Chat</button>
                        </div>
</section>
</div>
<div className="bg-[#F1F0F2] h-48 mb-32">
    <section className="bg-gray-100 py-6">
                        <div className="flex justify-center space-x-4">
                            {['ubuntu', 'windows', 'centos', 'debian', 'almalinux'].map((os, index) => (
                                <div key={index} className="text-center">
                                    <img src={`https://placehold.co/64x64`} alt={`${os} logo`} />
                                    <p className="mt-2">{os.charAt(0).toUpperCase() + os.slice(1)}</p>
                                </div>
                            ))}
                        </div>
    </section>
</div>

<div className="bg-[#F1F0F2] mb-48">
    <section className="bg-gray-200 py-10">
                        <h2 className="text-center text-2xl font-bold">Beyond Shared Hosting</h2>
                        <div className="flex justify-center space-x-4 mt-6">
                            {['Web Hosting', 'Wordpress Hosting', 'Website Builder', 'SSL Certificate'].map((service, index) => (
                                <div key={index} className="bg-white shadow-lg rounded-lg p-6 w-64 text-center">
                                    <img src="https://placehold.co/64x64" alt={`${service} icon`} className="mx-auto" />
                                    <p className="mt-4">{service}</p>
                                </div>
                            ))}
                        </div>
    </section>
</div>

<div className="">
    <footer className="bg-purple-600 text-white py-10 mb-8">
                        <div className="container mx-auto px-6">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">ExactConnect</h3>
                                    <p className="mt-4">ExactConnect is an Trusted Online Shopping Platforms For the exact Online services for Our clients.</p>
                                    <div className="flex space-x-4 mt-4">
                                        <i className="fab fa-facebook-f"></i>
                                        <i className="fab fa-twitter"></i>
                                        <i className="fab fa-instagram"></i>
                                        <i className="fab fa-linkedin-in"></i>
                                    </div>
                                </div>
                                <div>
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



        </div>
    );
};

export default Rdp;
