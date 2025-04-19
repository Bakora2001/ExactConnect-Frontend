import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Mail, Server, Shield, Zap, Globe } from 'lucide-react';
import rdp1 from '/rdp1.png';
import NavBar from '../../components/reusables/Navbar';
import { DarkModeContext } from '../../context/DarkModeContext';
import Footer from '../reusables/Footer';
import { Button } from "@/components/ui/button";

const Rdp = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const handlePurchase = () => {
    navigate('/account/login');
  };

  return (
    <div className={darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black'}>
      {/* Navigation */}
      <div className={`${darkMode ? 'bg-[#131312]' : 'bg-[#7C25BA]'} text-white py-8`}>
        <NavBar />
      </div>

      {/* Hero Section */}
      <section className="relative w-full">
        <div className={`${darkMode ? 'bg-[#131312]' : 'bg-[#7C25BA]'} w-full py-16 text-white`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-8 gap-10 md:gap-16">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Premium RDP Services<br />Starting at Just $8/month
              </h1>
              <p className="text-base lg:text-lg font-medium mb-8 opacity-90">
                High-performance RDP solutions with built-in Android Emulator support.<br />
              </p>
              <Button 
                className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-6 text-lg font-medium"
                onClick={handlePurchase}
              >
                Configure Your RDP Now <ArrowRight className="ml-2" />
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src={rdp1} 
                alt="RDP" 
                className="h-auto w-5/6 md:w-full max-w-lg object-contain" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`${darkMode ? 'bg-[#1d1d1c]' : 'bg-gray-50'} py-16`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our RDP Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Server className="h-8 w-8 text-purple-500" />,
                title: "High Performance",
                description: "Powered by enterprise-grade hardware with SSD storage and high-speed network connectivity."
              },
              {
                icon: <Shield className="h-8 w-8 text-purple-500" />,
                title: "Secure & Reliable",
                description: "Enhanced security measures with regular backups and 99.9% uptime guarantee."
              },
              {
                icon: <Zap className="h-8 w-8 text-purple-500" />,
                title: "Quick Setup",
                description: "Get your RDP credentials within 2 hours of confirmed payment."
              }
            ].map((feature, index) => (
              <div key={index} className={`p-6 rounded-xl ${darkMode ? 'bg-[#242423]' : 'bg-white'} shadow-lg`}>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Coverage */}
      <section className={`${darkMode ? 'bg-[#131312]' : 'bg-white'} py-16`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Globe className="h-12 w-12 mx-auto mb-6 text-purple-500" />
          <h2 className="text-3xl font-bold mb-6">Global Server Locations</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Choose from multiple server locations worldwide including USA, UK, Germany, 
            Canada, Singapore, Netherlands, Japan, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-4xl">
            {['🇺🇸', '🇬🇧', '🇩🇪', '🇨🇦', '🇸🇬', '🇳🇱', '🇯🇵', '🌐'].map((flag, i) => (
              <span key={i} className="transform hover:scale-125 transition-transform duration-300">{flag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Android Emulator Feature */}
      <section className={`${darkMode ? 'bg-[#1d1d1c]' : 'bg-purple-50'} py-16`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built-in Android Emulator</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Every RDP comes with a pre-installed Android emulator, perfect for app testing,
              mobile game playing, and running Android applications in a secure environment.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`${darkMode ? 'bg-[#131312]' : 'bg-white'} py-16`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Configure your perfect RDP solution today starting at just $8/month.
            Setup within 2 hours of payment confirmation.
          </p>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 text-lg font-medium"
            onClick={handlePurchase}
          >
            Configure Your RDP Now <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Support Section */}
      <section className={`${darkMode ? 'bg-[#1d1d1c]' : 'bg-gray-50'} py-12`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="mb-6">
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <a 
            href="mailto:support@exactconnect.com" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-all duration-300"
          >
            <Mail className="h-5 w-5" />
            support@exactconnect.com
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rdp;