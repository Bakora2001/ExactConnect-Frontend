import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Mail } from 'lucide-react';
import rdp1 from '/rdp1.png';
import ubuntu from '/ubuntu.svg';
import windows from '/windows.svg';
import centOs from '/centOs.svg';
import debian from '/debian.svg';
import NavBar from '../../components/reusables/Navbar';
import { DarkModeContext } from '../../context/DarkModeContext';
import Footer from '../reusables/Footer';

const Rdp = () => {
    const navigate = useNavigate();
    const { darkMode } = useContext(DarkModeContext);
    const [selectedCountry, setSelectedCountry] = useState('United States');
    const [rdpPlans, setRdpPlans] = useState([]);
    const [animateCards, setAnimateCards] = useState(true);

    // Define RDP plans for different countries
    const countryPlans = {
        'United States': [
            { id: 1, name: 'VPS - Essential', price: 8, cpu: '2 vCPU Cores', ram: '2 GB RAM', storage: '50 GB SSD', traffic: '5 TB Traffic', color: 'from-blue-500 to-purple-500' },
            { id: 2, name: 'VPS - Basic', price: 12, cpu: '3 vCPU Cores', ram: '4 GB RAM', storage: '80 GB SSD', traffic: '6 TB Traffic', color: 'from-indigo-500 to-purple-600' },
            { id: 3, name: 'VPS - Standard', price: 15, cpu: '4 vCPU Cores', ram: '6 GB RAM', storage: '120 GB SSD', traffic: '8 TB Traffic', color: 'from-violet-500 to-fuchsia-500' },
            { id: 4, name: 'VPS - Enhanced', price: 20, cpu: '4 vCPU Cores', ram: '8 GB RAM', storage: '160 GB SSD', traffic: '10 TB Traffic', color: 'from-purple-500 to-pink-500' },
            { id: 5, name: 'VPS - Professional', price: 25, cpu: '6 vCPU Cores', ram: '12 GB RAM', storage: '200 GB SSD', traffic: '12 TB Traffic', color: 'from-fuchsia-500 to-pink-600' },
            { id: 6, name: 'VPS - Enterprise', price: 30, cpu: '8 vCPU Cores', ram: '16 GB RAM', storage: '320 GB SSD', traffic: '15 TB Traffic', color: 'from-pink-500 to-rose-500' }
        ],
        'United Kingdom': [
            { id: 1, name: 'UK VPS - Essential', price: 9, cpu: '2 vCPU Cores', ram: '2 GB RAM', storage: '50 GB SSD', traffic: '5 TB Traffic', color: 'from-cyan-500 to-blue-500' },
            { id: 2, name: 'UK VPS - Basic', price: 13, cpu: '3 vCPU Cores', ram: '4 GB RAM', storage: '80 GB SSD', traffic: '6 TB Traffic', color: 'from-blue-500 to-indigo-500' },
            { id: 3, name: 'UK VPS - Standard', price: 16, cpu: '4 vCPU Cores', ram: '6 GB RAM', storage: '120 GB SSD', traffic: '8 TB Traffic', color: 'from-indigo-500 to-violet-500' },
            { id: 4, name: 'UK VPS - Enhanced', price: 22, cpu: '4 vCPU Cores', ram: '8 GB RAM', storage: '160 GB SSD', traffic: '10 TB Traffic', color: 'from-violet-500 to-purple-500' },
            { id: 5, name: 'UK VPS - Professional', price: 27, cpu: '6 vCPU Cores', ram: '12 GB RAM', storage: '200 GB SSD', traffic: '12 TB Traffic', color: 'from-purple-500 to-fuchsia-500' },
            { id: 6, name: 'UK VPS - Enterprise', price: 32, cpu: '8 vCPU Cores', ram: '16 GB RAM', storage: '320 GB SSD', traffic: '15 TB Traffic', color: 'from-fuchsia-500 to-pink-500' }
        ],
        'Germany': [
            { id: 1, name: 'DE VPS - Essential', price: 8.5, cpu: '2 vCPU Cores', ram: '2 GB RAM', storage: '50 GB SSD', traffic: '5 TB Traffic', color: 'from-emerald-500 to-teal-500' },
            { id: 2, name: 'DE VPS - Basic', price: 12.5, cpu: '3 vCPU Cores', ram: '4 GB RAM', storage: '80 GB SSD', traffic: '6 TB Traffic', color: 'from-teal-500 to-cyan-500' },
            { id: 3, name: 'DE VPS - Standard', price: 15.5, cpu: '4 vCPU Cores', ram: '6 GB RAM', storage: '120 GB SSD', traffic: '8 TB Traffic', color: 'from-cyan-500 to-sky-500' },
            { id: 4, name: 'DE VPS - Enhanced', price: 20.5, cpu: '4 vCPU Cores', ram: '8 GB RAM', storage: '160 GB SSD', traffic: '10 TB Traffic', color: 'from-sky-500 to-blue-500' },
            { id: 5, name: 'DE VPS - Professional', price: 25.5, cpu: '6 vCPU Cores', ram: '12 GB RAM', storage: '200 GB SSD', traffic: '12 TB Traffic', color: 'from-blue-500 to-indigo-500' },
            { id: 6, name: 'DE VPS - Enterprise', price: 30.5, cpu: '8 vCPU Cores', ram: '16 GB RAM', storage: '320 GB SSD', traffic: '15 TB Traffic', color: 'from-indigo-500 to-violet-500' }
        ],
        'Canada': [
            { id: 1, name: 'CA VPS - Essential', price: 8.8, cpu: '2 vCPU Cores', ram: '2 GB RAM', storage: '50 GB SSD', traffic: '5 TB Traffic', color: 'from-red-500 to-rose-500' },
            { id: 2, name: 'CA VPS - Basic', price: 12.8, cpu: '3 vCPU Cores', ram: '4 GB RAM', storage: '80 GB SSD', traffic: '6 TB Traffic', color: 'from-rose-500 to-pink-500' },
            { id: 3, name: 'CA VPS - Standard', price: 15.8, cpu: '4 vCPU Cores', ram: '6 GB RAM', storage: '120 GB SSD', traffic: '8 TB Traffic', color: 'from-pink-500 to-fuchsia-500' },
            { id: 4, name: 'CA VPS - Enhanced', price: 20.8, cpu: '4 vCPU Cores', ram: '8 GB RAM', storage: '160 GB SSD', traffic: '10 TB Traffic', color: 'from-fuchsia-500 to-purple-500' },
            { id: 5, name: 'CA VPS - Professional', price: 25.8, cpu: '6 vCPU Cores', ram: '12 GB RAM', storage: '200 GB SSD', traffic: '12 TB Traffic', color: 'from-purple-500 to-violet-500' },
            { id: 6, name: 'CA VPS - Enterprise', price: 30.8, cpu: '8 vCPU Cores', ram: '16 GB RAM', storage: '320 GB SSD', traffic: '15 TB Traffic', color: 'from-violet-500 to-indigo-500' }
        ],
        'Australia': [
            { id: 1, name: 'AU VPS - Essential', price: 9.2, cpu: '2 vCPU Cores', ram: '2 GB RAM', storage: '50 GB SSD', traffic: '5 TB Traffic', color: 'from-yellow-500 to-amber-500' },
            { id: 2, name: 'AU VPS - Basic', price: 13.2, cpu: '3 vCPU Cores', ram: '4 GB RAM', storage: '80 GB SSD', traffic: '6 TB Traffic', color: 'from-amber-500 to-orange-500' },
            { id: 3, name: 'AU VPS - Standard', price: 16.2, cpu: '4 vCPU Cores', ram: '6 GB RAM', storage: '120 GB SSD', traffic: '8 TB Traffic', color: 'from-orange-500 to-red-500' },
            { id: 4, name: 'AU VPS - Enhanced', price: 22.2, cpu: '4 vCPU Cores', ram: '8 GB RAM', storage: '160 GB SSD', traffic: '10 TB Traffic', color: 'from-red-500 to-rose-500' },
            { id: 5, name: 'AU VPS - Professional', price: 27.2, cpu: '6 vCPU Cores', ram: '12 GB RAM', storage: '200 GB SSD', traffic: '12 TB Traffic', color: 'from-rose-500 to-pink-500' },
            { id: 6, name: 'AU VPS - Enterprise', price: 32.2, cpu: '8 vCPU Cores', ram: '16 GB RAM', storage: '320 GB SSD', traffic: '15 TB Traffic', color: 'from-pink-500 to-fuchsia-500' }
        ],
        'Kenya': [
            { id: 1, name: 'KE VPS - Essential', price: 8.0, cpu: '2 vCPU Cores', ram: '2 GB RAM', storage: '50 GB SSD', traffic: '5 TB Traffic', color: 'from-green-500 to-emerald-500' },
            { id: 2, name: 'KE VPS - Basic', price: 12.0, cpu: '3 vCPU Cores', ram: '4 GB RAM', storage: '80 GB SSD', traffic: '6 TB Traffic', color: 'from-emerald-500 to-teal-500' },
            { id: 3, name: 'KE VPS - Standard', price: 15.0, cpu: '4 vCPU Cores', ram: '6 GB RAM', storage: '120 GB SSD', traffic: '8 TB Traffic', color: 'from-teal-500 to-cyan-500' },
            { id: 4, name: 'KE VPS - Enhanced', price: 20.0, cpu: '4 vCPU Cores', ram: '8 GB RAM', storage: '160 GB SSD', traffic: '10 TB Traffic', color: 'from-cyan-500 to-sky-500' },
            { id: 5, name: 'KE VPS - Professional', price: 25.0, cpu: '6 vCPU Cores', ram: '12 GB RAM', storage: '200 GB SSD', traffic: '12 TB Traffic', color: 'from-sky-500 to-blue-500' },
            { id: 6, name: 'KE VPS - Enterprise', price: 30.0, cpu: '8 vCPU Cores', ram: '16 GB RAM', storage: '320 GB SSD', traffic: '15 TB Traffic', color: 'from-blue-500 to-indigo-500' }
        ],
        'Other Countries': [
            { id: 1, name: 'Global VPS - Essential', price: 7.5, cpu: '2 vCPU Cores', ram: '2 GB RAM', storage: '50 GB SSD', traffic: '5 TB Traffic', color: 'from-amber-500 to-orange-500' },
            { id: 2, name: 'Global VPS - Basic', price: 11.5, cpu: '3 vCPU Cores', ram: '4 GB RAM', storage: '80 GB SSD', traffic: '6 TB Traffic', color: 'from-orange-500 to-red-500' },
            { id: 3, name: 'Global VPS - Standard', price: 14.5, cpu: '4 vCPU Cores', ram: '6 GB RAM', storage: '120 GB SSD', traffic: '8 TB Traffic', color: 'from-red-500 to-rose-500' },
            { id: 4, name: 'Global VPS - Enhanced', price: 19.5, cpu: '4 vCPU Cores', ram: '8 GB RAM', storage: '160 GB SSD', traffic: '10 TB Traffic', color: 'from-rose-500 to-pink-500' },
            { id: 5, name: 'Global VPS - Professional', price: 24.5, cpu: '6 vCPU Cores', ram: '12 GB RAM', storage: '200 GB SSD', traffic: '12 TB Traffic', color: 'from-pink-500 to-fuchsia-500' },
            { id: 6, name: 'Global VPS - Enterprise', price: 29.5, cpu: '8 vCPU Cores', ram: '16 GB RAM', storage: '320 GB SSD', traffic: '15 TB Traffic', color: 'from-fuchsia-500 to-purple-500' }
        ]
    };

    // Update plans when country selection changes
    useEffect(() => {
        setAnimateCards(false);
        
        // Trigger animation after a brief delay
        setTimeout(() => {
            setRdpPlans(countryPlans[selectedCountry]);
            setAnimateCards(true);
        }, 300);
    }, [selectedCountry]);

    // Country selection handler
    const handleCountrySelect = (country) => {
        if (country !== selectedCountry) {
            setSelectedCountry(country);
        }
    };

    // Get country flag
    const getCountryFlag = (country) => {
        switch(country) {
            case 'United States': return '🇺🇸';
            case 'United Kingdom': return '🇬🇧';
            case 'Germany': return '🇩🇪';
            case 'Canada': return '🇨🇦';
            case 'Australia': return '🇦🇺';
            case 'Kenya': return '🇰🇪';
            default: return '🌐';
        }
    };

    return (
        <div className={darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'}>
            {/* Navigation */}
            <div className={`${darkMode ? 'bg-[#131312]' : 'bg-[#7C25BA]'} text-white py-8`}>
                <NavBar />
            </div>

            {/* Hero Section */}
            <section className="relative w-full flex flex-col items-center">
                <div className={`${darkMode ? 'bg-[#131312]' : 'bg-[#7C25BA]'} w-full py-16 text-white`}>
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-8 gap-10 md:gap-16">
                        <div className="md:w-1/2 text-center md:text-left animate-fade-in">
                            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Find Your Best VPS Hosting<br />Plan With Us
                            </h1>
                            <p className="text-base lg:text-lg font-medium mb-8 opacity-90">
                                ExactConnect high-performance VPS Hosting redefines<br />
                                excellence, combining cutting-edge technology with affordability.
                            </p>
                            <button 
                                className="bg-white text-[#7C25BA] font-medium px-8 py-3 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                onClick={() => document.getElementById('pricing-section').scrollIntoView({ behavior: 'smooth' })}
                            >
                                SELECT YOUR PLAN
                                <ArrowRight size={18} />
                            </button>
                        </div>

                        <div className="md:w-1/2 flex justify-center">
                            <img 
                                src={rdp1} 
                                alt="RDP" 
                                className="h-auto w-5/6 md:w-full max-w-lg object-contain animate-float" 
                                style={{animation: "float 3s ease-in-out infinite"}}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Flags Section */}
            <div className={`${darkMode ? 'bg-[#1d1d1c]' : 'bg-[#F1F0F2]'} py-12 px-4`}>
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                        {['🇺🇸', '🇬🇧', '🇨🇦', '🇩🇪', '🇫🇷', '🇮🇹', '🇪🇸', '🇦🇺', '🇰🇪', '🇳🇱', '🇸🇪', '🇨🇭'].map((flag, index) => (
                            <span 
                                key={index} 
                                className="text-3xl sm:text-4xl filter drop-shadow-md transform hover:scale-125 transition-transform duration-300" 
                                title={`Country ${index + 1}`}
                                style={{animation: `pop-in 0.5s ease-out ${index * 0.1}s both`}}
                            >
                                {flag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium text-center mt-12 mb-4 animate-fade-in">
                        Supports Over 15+ Countries with Affordable Pricing that fits Your Needs
                    </h3>
                </div>
            </div>

            {/* Country Selection Buttons */}
            <div id="pricing-section" className={`${darkMode ? 'bg-[#1d1d1c]' : 'bg-[#F1F0F2]'} pt-6 pb-8 px-4`}>
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {Object.keys(countryPlans).map((country, index) => (
                            <button 
                                key={index} 
                                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 ${
                                    selectedCountry === country 
                                        ? `${darkMode ? 'bg-[#7C25BA] text-white' : 'bg-[#7C25BA] text-white'} shadow-lg transform scale-105` 
                                        : `${darkMode ? 'bg-[#242423] text-white border border-gray-700' : 'bg-white text-gray-800 border border-gray-200'}`
                                }`}
                                onClick={() => handleCountrySelect(country)}
                                style={{animation: `slide-in-right 0.5s ease-out ${index * 0.1}s both`}}
                            >
                                <span className="text-lg">{getCountryFlag(country)}</span>
                                <span className="font-medium">{country}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Cards Section */}
            <section className={`${darkMode ? 'bg-[#131312]' : 'bg-white'} py-16 px-4`}>
                <div className="max-w-6xl mx-auto">
                    <h2 className={`text-2xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-800'} animate-fade-in`}>
                        {selectedCountry} VPS Plans
                    </h2>
                    <p className="text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-medium animate-pulse">
                        Select the perfect plan for your needs
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                        {rdpPlans.map((plan, idx) => (
                            <div 
                                key={plan.id} 
                                className={`${
                                    darkMode 
                                        ? 'bg-[#1d1d1c] border-gray-700 hover:border-purple-500' 
                                        : 'bg-white border-gray-200 hover:border-purple-500'
                                } rounded-xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:scale-105 w-full`}
                                style={{
                                    maxWidth: "340px", 
                                    margin: "0 auto",
                                    animation: `fade-in 0.5s ease-out ${idx * 0.1}s both`
                                }}
                            >
                                <div className={`bg-gradient-to-r ${plan.color} p-4 text-white`}>
                                    <h3 className="text-lg font-bold">{plan.name}</h3>
                                    <p className="text-white opacity-90 text-sm">No Setup Fee</p>
                                </div>
                                
                                <div className="p-5">
                                    <div className="flex items-baseline mb-4">
                                        <span className="text-3xl font-bold">${plan.price}</span>
                                        <span className="ml-2 text-gray-500 text-sm">/mo incl. VAT</span>
                                    </div>
                                    
                                    <button 
                                        className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-1"
                                        onClick={() => navigate('/configure')}
                                    >
                                        Configure Now
                                        <ArrowRight size={14} />
                                    </button>
                                    
                                    <div className="mt-4 space-y-4 text-sm">
                                        <div>
                                            <h4 className="font-bold border-b pb-1 mb-2">Key Features:</h4>
                                            <ul className="space-y-1">
                                                <li className="flex items-center">
                                                    <Check size={14} className="text-purple-500 mr-1 flex-shrink-0" />
                                                    <span>{plan.cpu}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Check size={14} className="text-purple-500 mr-1 flex-shrink-0" />
                                                    <span>{plan.ram}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Check size={14} className="text-purple-500 mr-1 flex-shrink-0" />
                                                    <span>{plan.storage}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Check size={14} className="text-purple-500 mr-1 flex-shrink-0" />
                                                    <span>{plan.traffic}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-bold border-b pb-1 mb-2">Also Includes:</h4>
                                            <ul className="space-y-1">
                                                <li className="flex items-center">
                                                    <Check size={14} className="text-purple-500 mr-1 flex-shrink-0" />
                                                    <span>1x {selectedCountry.includes("Kingdom") ? "UK" : 
                                                           selectedCountry.includes("States") ? "US" : 
                                                           selectedCountry === "Germany" ? "DE" : 
                                                           selectedCountry === "Canada" ? "CA" : 
                                                           selectedCountry === "Australia" ? "AU" : 
                                                           selectedCountry === "Kenya" ? "KE" : "Global"} IP</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Check size={14} className="text-purple-500 mr-1 flex-shrink-0" />
                                                    <span>Root Access</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <Check size={14} className="text-purple-500 mr-1 flex-shrink-0" />
                                                    <span>Web UI Management</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 text-center">
                                        <a href="#" className="text-purple-600 text-xs font-medium hover:text-purple-700 hover:underline transition-colors">
                                            Compare Plans
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <div className={`${darkMode ? 'bg-[#1d1d1c]' : 'bg-gray-50'} py-12 px-4`}>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'} animate-fade-in`}>
                        Not sure which plan is right for you?
                    </h2>
                    <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        We are here to guide you to make the right choices for your Business Plan.<br />
                        Contact our support team for personalized assistance.
                    </p>
                    <div className="flex justify-center">
                        <a 
                            href="mailto:support@exactconnect.com" 
                            className={`
                                flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium
                                ${darkMode 
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90' 
                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
                                } 
                                transition-all duration-300 shadow-md hover:shadow-lg animate-pulse
                            `}
                        >
                            <Mail size={18} />
                            support@exactconnect.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Operating System Section */}
            <div className={`${darkMode ? 'bg-[#131312]' : 'bg-white'} py-12 px-4`}>
                <div className="max-w-5xl mx-auto">
                    <div className="relative mb-8">
                        <div className={`absolute -top-6 left-0 sm:left-6 px-6 py-2 ${darkMode ? 'bg-[#242423] border-gray-700' : 'bg-[#F1F0F2]'} border rounded-t-lg font-bold`}>
                            Operating System
                        </div>
                        <div className={`${darkMode ? 'bg-[#1d1d1c] border-gray-700' : 'bg-[#F1F0F2] border-gray-200'} border rounded-lg p-6 pt-10`}>
                            <div className="flex flex-wrap justify-center gap-10">
                                {[
                                    { name: 'Ubuntu', icon: ubuntu },
                                    { name: 'Windows', icon: windows },
                                    { name: 'CentOS', icon: centOs },
                                    { name: 'Debian', icon: debian },
                                ].map((os, index) => (
                                    <div 
                                        key={index} 
                                        className="flex flex-col items-center transition-all duration-300 transform hover:scale-110"
                                        style={{animation: `bounce-in 0.5s ease-out ${index * 0.15}s both`}}
                                    >
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#242423]' : 'bg-white'} shadow-md mb-2`}>
                                            <img 
                                                src={os.icon} 
                                                alt={`${os.name} logo`} 
                                                className="w-10 h-10" 
                                            />
                                        </div>
                                        <p className="font-medium text-sm">{os.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Beyond Shared Hosting Section */}
            <div className={`${darkMode ? 'bg-[#1d1d1c]' : 'bg-[#DEE2E6]'} py-12 px-4`}>
                <div className="max-w-6xl mx-auto">
                    <h2 className={`text-2xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'} animate-fade-in`}>
                        Beyond Shared Hosting
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Web Hosting', 'WordPress Hosting', 'Website Builder', 'SSL Certificate'].map((service, index) => (
                            <div 
                                key={index} 
                                className={`rounded-lg p-4 text-center flex flex-col items-center ${darkMode ? 'bg-[#131312] border-gray-700' : 'bg-white'} border shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
                                style={{animation: `fade-in 0.5s ease-out ${index * 0.15}s both`}}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-gradient-to-r from-purple-400 to-pink-400`}>
                                    <img src="https://placehold.co/32x32" alt={`${service} icon`} className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-medium">{service}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-in-right {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes pop-in {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                @keyframes bounce-in {
                    0% { opacity: 0; transform: scale(0.3); }
                    50% { opacity: 1; transform: scale(1.05); }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
            `}</style>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default Rdp;