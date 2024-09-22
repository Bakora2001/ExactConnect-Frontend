import React from 'react';
import NavBar from '../reusables/Navbar'; // Import NavBar component


const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-purple-700 text-white">
            <NavBar /> {/* Render the reusable NavBar component */}
            <main className="flex-1 flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Need Precise Residential IPs, RDP VPS, Virtual Credit Cards or Non-VOIP Numbers?</h1>
                    <p className="text-lg mb-8">We’ve Got the Perfect Solutions For You</p>
                    <button className="border border-white py-2 px-6 rounded hover:bg-white hover:text-purple-700">Get Started</button>
                </div>
                {/* <div className="md:w-1/2">
                    <img src="../assets/tech-image.png/" alt="tech-logo" className="w-full max-w-md mx-auto" />
                </div> */}
            </main>
        </div>
    );
};

export default Home;
