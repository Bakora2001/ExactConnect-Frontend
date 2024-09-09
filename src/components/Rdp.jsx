import React from 'react';
import rdp1 from '../assets/rdp1.png'; // Import your image

const Rdp = () => {
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-[#7C25BA] text-white sticky top-0 z-50 w-full h-24">
                <div className="flex items-center justify-between h-16 w-full">
                    {/* Logo */}
                    <div className="pl-4 pt-8">
                        <h1 className="text-2xl font-bold">ExactConnect</h1>
                    </div>
                    {/* Links */}
                    <div className="hidden md:flex space-x-24 pt-8">
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
                            className="bg-[#7C25BA] text-white font-medium py-2 px-4 rounded hover:bg-[#6a1fa0] ring-1 ring-[#FFFFFF]"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </nav>

            {/* New Section with Text and Image */}
            <div className="flex justify-between bg-white p-8">
                {/* Text on the left */}
        <div className="text-gray-800 pt-12 flex-row">
            <div className="mb-12">
                <h2 className="text-3xl font-medium italic">
                    <span className="block text-left">Find Your Best VPS Hosting<br></br>Plan With Us</span>
                </h2>
            </div>
            <div className="h">
                <h2 className="text-[16px] font-light">
                    <span className="block text-left">ExactConnect high-performance VPS Hosting redefines 
                        excellence,<br></br>
                        combining cutting-edge technology with 
                        affordability.
                    </span>
                </h2>
            </div>
        </div>
                {/* Image on the right */}
                <div>
                <img src={rdp1} alt="RDP" className="h-auto pt-12 object-contain" />
                </div>
            </div>

            {/* Page Content */}
            
        </div>
    );
};

export default Rdp;
