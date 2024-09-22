import React from 'react';
import NavBar from '../reusables/Navbar'; // Import NavBar component
import techImage from '../assets/tech-image.png'; // Import the image

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-purple-700 text-white">
            {/* Wrap NavBar in its own div with margin-bottom */}
            <div className="w-full mb-32">
                <NavBar /> {/* Render the reusable NavBar component */}
            </div>
            {/* Add margin-top to main content to avoid overlapping with fixed NavBar */}
            <main className="flex flex-col md:flex-row gap-24 text-center md:text-left pl px-12 "> 
                <div className="md:w-1/2 mb-8 md:mb-0 md:ml-12 mt-24 pt-6 ">
                    <p className="text-4xl md:text-[30px] font-medium mb-4">Need Precise Residential IPs, <br></br>RDP VPS, Virtual Credit Cards or Non-VOIP Numbers?</p>
                    <p className="text-lg mb-8">We’ve Got the Perfect Solutions For You</p>
                    <button className="border border-white py-1 px-3 text-[15px] rounded hover:bg-white 
                    hover:text-purple-700">Get Started</button>
                </div>
                <div className=" mt-6 pt-12">
                    <img src={techImage} alt="tech-logo" className="w-auto h-[330px] x-[862px] y-[270px] max-w-md mx-auto" />
                </div>
            </main>
        </div>
    );
};

export default Home;