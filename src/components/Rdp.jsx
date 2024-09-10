import React from 'react';
import rdp1 from '../assets/rdp1.png'; // Import your image

const Rdp = () => {
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-[#7C25BA] text-white sticky top-0 z-50 w-full h-24">
                <div className="flex items-center justify-between h-16 max-w-screen-xl mx-auto w-full">
                    {/* Logo */}
                    <div className="pl-4 pt-8">
                        <h1 className="text-2xl font-bold">ExactConnect</h1>
                    </div>
                    {/* Links */}
                    <div className="hidden md:flex space-x-4 lg:space-x-16 pt-8">
                        <a href="#locations" className="hover:text-gray-300">
                            Locations
                        </a>
                        <a href="#pricing" className="hover:text-gray-300">
                            Pricing
                        </a>
                        <a href="#contact" className="hover:text-gray-300">
                            Contact Us
                        </a>
                    </div>
                    {/* Get Started Button */}
                    <div className="pr-6 hidden pt-8  md:block">
                        <a
                            href="#get-started"
                            className="bg-[#7C25BA] text-white font-medium py-2 px-4 rounded hover:bg-[#6a1fa0] ring-1 ring-white"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </nav>

            {/* New Section with Text and Image */}
            <div className="flex flex-col-reverse lg:flex-row justify-between bg-white p-8 lg:p-16 max-w-screen-xl mx-auto">
                {/* Text on the left */}
                <div className="text-gray-800 pt-4 lg:pt-12 flex-row w-full lg:w-1/2">
                    <div className="mb-8 lg:mb-12">
                        <h2 className="text-2xl lg:text-3xl font-medium italic">
                            <span className="block text-left">
                                Find Your Best VPS Hosting<br />Plan With Us
                            </span>
                        </h2>
                    </div>
                    <div className="mb-6 lg:mb-8">
                        <h2 className="text-[14px] lg:text-[16px] font-light">
                            <span className="block text-left">
                                ExactConnect high-performance VPS Hosting redefines<br />
                                excellence, combining cutting-edge technology with affordability.
                            </span>
                        </h2>
                    </div>
                    {/* SELECT YOUR PLAN Button */}
                    <div className="text-left mt-12">
                        <button className="bg-[#7C25BA] text-white font-regular py-2 px-4 lg:px-6 rounded-full hover:bg-[#6a1fa0]">
                            SELECT YOUR PLAN
                        </button>
                    </div>
                </div>
                {/* Image on the right */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <img src={rdp1} alt="RDP" className="h-auto pt-4 lg:pt-8 object-contain max-w-full" />
                </div>
            </div>

            {/* Page Content */}
        </div>
    );
};

export default Rdp;
