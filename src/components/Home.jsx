import React from 'react';
import NavBar from '../reusables/Navbar'; // Import NavBar component
import techImage from '../assets/tech-image.png'; // Import the image

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-purple-700 text-white">
            {/* Wrap NavBar in its own div with margin-bottom */}
            <div className="w-full mb-24 md:mb-40">
                <NavBar /> {/* Render the reusable NavBar component */}
            </div>
            {/* Add margin-top to main content to avoid overlapping with fixed NavBar */}
            <main className="flex flex-col md:flex-row gap-12 md:gap-24 text-center md:text-left px-6 md:px-12">
                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:ml-12 lg:ml-24 mt-12 md:mt-48">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
                        Need Precise Residential IPs, <br />
                        RDP VPS, Virtual Credit Cards or Non-VOIP Numbers?
                    </p>
                    <p className="text-base md:text-lg lg:text-xl mb-8">
                        We’ve Got the Perfect Solutions For You
                    </p>
                    <button className="border border-white py-2 px-6 rounded hover:bg-white hover:text-purple-700">
                        Get Started
                    </button>
                </div>
                <div className="w-full md:w-1/2 mt-8 md:mt-24">
                    <img
                        src={techImage}
                        alt="tech-logo"
                        className="w-full max-w-lg md:max-w-md lg:max-w-lg h-auto mx-auto"
                    />
                </div>
            </main>
        </div>
    );
};

export default Home;
