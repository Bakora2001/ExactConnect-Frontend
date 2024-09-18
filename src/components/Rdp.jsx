import React, { useState } from 'react';
import rdp1 from '../assets/rdp1.png'; // Import your image

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
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
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

<div className="mb-48">
    <div className="max-w-screen-xl mx-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Card 1 */}
            <div className="bg-white w-full h-[650px] p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Basic VPS</h3>
                <ul className="space-y-2">
                    <li><strong>CPU:</strong> 2 vCPU</li>
                    <li><strong>RAM:</strong> 4 GB</li>
                    <li><strong>Storage:</strong> 50 GB SSD</li>
                    <li><strong>Bandwidth:</strong> 1 TB</li>
                    <li><strong>IP Address:</strong> 1 IPv4</li>
                    <li><strong>Price:</strong> $10/month</li>
                </ul>
                <button className="bg-[#7C25BA] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#6a1fa0]">
                    Choose Plan
                </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white w-full h-[650px] p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Basic VPS</h3>
                <ul className="space-y-2">
                    <li><strong>CPU:</strong> 2 vCPU</li>
                    <li><strong>RAM:</strong> 4 GB</li>
                    <li><strong>Storage:</strong> 50 GB SSD</li>
                    <li><strong>Bandwidth:</strong> 1 TB</li>
                    <li><strong>IP Address:</strong> 1 IPv4</li>
                    <li><strong>Price:</strong> $10/month</li>
                </ul>
                <button className="bg-[#7C25BA] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#6a1fa0]">
                    Choose Plan
                </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white w-full h-[650px] p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Basic VPS</h3>
                <ul className="space-y-2">
                    <li><strong>CPU:</strong> 2 vCPU</li>
                    <li><strong>RAM:</strong> 4 GB</li>
                    <li><strong>Storage:</strong> 50 GB SSD</li>
                    <li><strong>Bandwidth:</strong> 1 TB</li>
                    <li><strong>IP Address:</strong> 1 IPv4</li>
                    <li><strong>Price:</strong> $10/month</li>
                </ul>
                <button className="bg-[#7C25BA] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#6a1fa0]">
                    Choose Plan
                </button>
            </div>

            {/* Card 4 */}
            <div className="bg-white w-full h-[650px] p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Basic VPS</h3>
                <ul className="space-y-2">
                    <li><strong>CPU:</strong> 2 vCPU</li>
                    <li><strong>RAM:</strong> 4 GB</li>
                    <li><strong>Storage:</strong> 50 GB SSD</li>
                    <li><strong>Bandwidth:</strong> 1 TB</li>
                    <li><strong>IP Address:</strong> 1 IPv4</li>
                    <li><strong>Price:</strong> $10/month</li>
                </ul>
                <button className="bg-[#7C25BA] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#6a1fa0]">
                    Choose Plan
                </button>
            </div>
        </div>
    </div>
</div>


        </div>




        </div>
    );
};

export default Rdp;
