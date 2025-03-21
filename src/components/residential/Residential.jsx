import React, { useEffect, useState } from 'react';
import NavBar from '../../components/reusables/Navbar';
import Footer from '../reusables/Footer';

const Residential = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    requirements: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Is element visible in viewport?
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
          element.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    
    alert("Message sent! We'll get back to you as soon as possible.");
    
    // Reset form and close dialog
    setFormData({
      name: '',
      email: '',
      message: '',
      requirements: ''
    });
    setIsContactOpen(false);
  };

  const features = [
    'High-speed connections',
    'Unlimited bandwidth',
    'Rotating IPs',
    'HTTP/HTTPS/SOCKS support',
    'Multiple locations',
    'Dedicated support'
  ];

  return (
    <main className="min-h-screen bg-white">
      <div>
                <NavBar />
            </div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black to-[#f3e8ff] text-white pt-32 pb-20">
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="reveal-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Premium Residential Proxies
            </h1>
            <p className="reveal-on-scroll text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Access the web through real residential IP addresses. Perfect for web scraping, automation, and data collection.
            </p>
            <div className="reveal-on-scroll flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#pricing" 
                className="bg-white text-black hover:bg-white/90 px-6 py-3 rounded-full font-medium transition-colors duration-300"
              >
                View Pricing
              </a>
              <a 
                href="#use-cases" 
                className="bg-transparent border border-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-colors duration-300"
              >
                Explore Use Cases
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-no-repeat bg-center opacity-10"></div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="reveal-on-scroll inline-block bg-[#f3e8ff] text-black px-4 py-1 rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="reveal-on-scroll text-3xl md:text-4xl font-bold mb-6 text-black">
              Industry-Leading Proxy Solutions
            </h2>
            <p className="reveal-on-scroll text-primary-gray text-lg">
              Our residential proxies offer unmatched reliability, speed, and anonymity for all your web needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="reveal-on-scroll glass-card p-8 rounded-2xl border border-[#f3e8ff]">
              <div className="bg-[#f3e8ff] w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Global Coverage</h3>
              <p className="text-primary-gray">
                Access residential IPs from over 150 countries worldwide, with city and state-level targeting options.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="reveal-on-scroll glass-card p-8 rounded-2xl border border-[#f3e8ff]">
              <div className="bg-[#f3e8ff] w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M12 2v20"></path>
                  <path d="m17 5-5-3-5 3"></path>
                  <path d="m17 19-5 3-5-3"></path>
                  <path d="M12 10 7 7"></path>
                  <path d="m12 10 5-3"></path>
                  <path d="m12 14 5 3"></path>
                  <path d="m12 14-5 3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">High Success Rate</h3>
              <p className="text-primary-gray">
                Our smart routing technology ensures high success rates even on the most protected websites.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="reveal-on-scroll glass-card p-8 rounded-2xl border border-[#f3e8ff]">
              <div className="bg-[#f3e8ff] w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Secure & Anonymous</h3>
              <p className="text-primary-gray">
                HTTPS support and IP rotation ensure your online activities remain private and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-[#f3e8ff]/20">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="reveal-on-scroll inline-block bg-[#f3e8ff] text-black px-4 py-1 rounded-full text-sm font-medium mb-4">
              Applications
            </span>
            <h2 className="reveal-on-scroll text-3xl md:text-4xl font-bold mb-6 text-black">
              Proxy Use Cases
            </h2>
            <p className="reveal-on-scroll text-primary-gray text-lg max-w-2xl mx-auto">
              Our residential proxies are perfect for a wide range of applications. Discover how they can benefit your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Use Case 1 */}
            <div className="reveal-on-scroll bg-white p-8 rounded-2xl shadow-sm border border-[#f3e8ff]/50">
              <div className="bg-[#f3e8ff] w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Web Scraping</h3>
              <p className="text-primary-gray mb-4">
                Collect data from websites without being blocked. Perfect for market research, price monitoring, and lead generation.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="text-sm">High success rate on anti-scraping sites</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="text-sm">Automate data collection at scale</span>
                </li>
              </ul>
            </div>

            {/* Use Case 2 */}
            <div className="reveal-on-scroll bg-white p-8 rounded-2xl shadow-sm border border-[#f3e8ff]/50">
              <div className="bg-[#f3e8ff] w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M4 17.2c4 1.2 8 1.2 12 0"></path>
                  <path d="M2 16.8C6 15.6 10 15.6 14 16.8"></path>
                  <path d="M6 13.8c4-1.2 8-1.2 12 0"></path>
                  <path d="M10 9V5.7a1.8 1.8 0 0 1 3.6 0V10"></path>
                  <path d="M10 9h6"></path>
                  <path d="M8 2v4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">SEO Monitoring</h3>
              <p className="text-primary-gray mb-4">
                Check search engine rankings from different locations. Ensure your SEO campaigns are effective globally.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="text-sm">Check rankings from specific countries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="text-sm">Monitor competitor rankings</span>
                </li>
              </ul>
            </div>

            {/* Use Case 3 */}
            <div className="reveal-on-scroll bg-white p-8 rounded-2xl shadow-sm border border-[#f3e8ff]/50">
              <div className="bg-[#f3e8ff] w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="m7.5 4.27 9 5.15"></path>
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                  <path d="m3.3 7 8.7 5 8.7-5"></path>
                  <path d="M12 22V12"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Brand Protection</h3>
              <p className="text-primary-gray mb-4">
                Monitor for counterfeit products or brand abuse online. Protect your brand integrity across multiple markets.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="text-sm">Detect unauthorized sellers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="text-sm">Monitor for trademark infringements</span>
                </li>
              </ul>
            </div>

            {/* Use Case 4 */}
            <div className="reveal-on-scroll bg-white p-8 rounded-2xl shadow-sm border border-[#f3e8ff]/50">
              <div className="bg-[#f3e8ff] w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <rect width="16" height="20" x="4" y="2" rx="2"></rect>
                  <line x1="12" x2="12" y1="14" y2="14"></line>
                  <line x1="12" x2="12" y1="18" y2="18"></line>
                  <line x1="8" x2="16" y1="6" y2="6"></line>
                  <line x1="8" x2="16" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Ad Verification</h3>
              <p className="text-primary-gray mb-4">
                Verify that your ads are displaying correctly in different regions. Ensure your ad spend is effective.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="text-sm">Check ad placements across regions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="text-sm">Monitor competitor advertising</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="reveal-on-scroll inline-block bg-[#f3e8ff] text-black px-4 py-1 rounded-full text-sm font-medium mb-4">
              Flexible Options
            </span>
            <h2 className="reveal-on-scroll text-3xl md:text-4xl font-bold mb-6 text-black">
              Simple, Transparent Pricing
            </h2>
            <p className="reveal-on-scroll text-primary-gray text-lg max-w-2xl mx-auto text-balance">
              Choose the plan that fits your needs with our affordable pricing options. All plans include our premium features and dedicated support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Shared Plan */}
            <div className="reveal-on-scroll bg-white rounded-2xl p-8 border border-[#f3e8ff] shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-2">Shared</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-black">$0.40</span>
                  <span className="text-primary-gray mb-1">per 24 hours</span>
                </div>
                <p className="text-primary-gray">May be shared by up to 3 more customers.</p>
              </div>
              
              <hr className="border-[#f3e8ff] my-6" />
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>SOCKS5</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Unlimited bandwidth</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Real LTE/4G and residential WiFi IPs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Detailed targeting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>24/7 support</span>
                </li>
              </ul>
              
              <a 
                href="#dashboard" 
                className="block w-full bg-black hover:bg-black/80 text-white text-center py-3 rounded-full transition-colors duration-300"
              >
                Get Started
              </a>
            </div>
            
            {/* Private Plan */}
            <div className="reveal-on-scroll bg-black rounded-2xl p-8 border border-black shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="mb-6">
                <div className="inline-block bg-[#f3e8ff] text-black px-3 py-1 rounded-full text-sm font-medium mb-2">
                  Popular Choice
                </div>
                <h3 className="text-lg font-medium text-white/80 mb-2">Private</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">From $1</span>
                  <span className="text-white/80 mb-1">per 24 hours</span>
                </div>
                <p className="text-white/80">Exclusively leased to you</p>
              </div>
              
              <hr className="border-white/10 my-6" />
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-white">
                  <span className="bg-white/20 rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>SOCKS5</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <span className="bg-white/20 rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Unlimited bandwidth</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <span className="bg-white/20 rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Real LTE/4G and residential WiFi IPs</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <span className="bg-white/20 rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Detailed targeting</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <span className="bg-white/20 rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>24/7 support</span>
                </li>
              </ul>
              
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="group flex items-center justify-center w-full bg-[#f3e8ff] hover:bg-[#f3e8ff]/90 text-black text-center py-3 rounded-full transition-colors duration-300"
              >
                <span>Get Started</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>

            {/* Custom Plan */}
            <div className="reveal-on-scroll bg-white rounded-2xl p-8 border border-[#f3e8ff] shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-2">Custom</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-black">Contact us</span>
                </div>
                <p className="text-primary-gray">Contact us for any special requests, we'll be happy to help.</p>
              </div>
              
              <hr className="border-[#f3e8ff] my-6" />
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>SOCKS5</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Unlimited bandwidth</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>IP rotation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Real LTE/4G IPs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Detailed targeting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>IPs from desired networks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#f3e8ff] rounded-full p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>Premium support</span>
                </li>
              </ul>
              
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="group flex items-center justify-center w-full bg-black hover:bg-black/80 text-white text-center py-3 rounded-full transition-colors duration-300"
              >
                <span>Contact Us</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#f3e8ff]/30 py-16">
        <div className="section-container text-center">
          <h2 className="reveal-on-scroll text-2xl md:text-3xl font-bold mb-6 text-black">
            Ready to get started?
          </h2>
          <p className="reveal-on-scroll text-lg text-primary-gray mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers using our residential proxies
          </p>
          <a 
            href="#dashboard" 
            className="reveal-on-scroll inline-flex items-center bg-black hover:bg-black/90 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300"
          >
            Go to Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </section>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">Contact for Custom Pricing</h3>
              <button 
                onClick={() => setIsContactOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            
            <p className="text-primary-gray mb-6">
              Tell us about your proxy requirements and we'll create a custom plan for your needs.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#f3e8ff] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f3e8ff] transition-all duration-200"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#f3e8ff] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f3e8ff] transition-all duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="requirements" className="text-sm font-medium">
                  Proxy Requirements
                </label>
                <input
                  type="text"
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#f3e8ff] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f3e8ff] transition-all duration-200"
                  placeholder="E.g., number of proxies, locations, specific use case"
                />
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white border border-[#f3e8ff] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f3e8ff] transition-all duration-200 resize-none"
                  placeholder="Tell us about your needs and how we can help"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsContactOpen(false)}
                  className="px-4 py-2 border border-[#f3e8ff] rounded-lg text-gray-700 hover:bg-[#f3e8ff]/10 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="group flex items-center justify-center bg-black hover:bg-black/90 text-white px-5 py-2 rounded-lg transition-colors duration-300"
                >
                  <span>Send Message</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                    <path d="m22 2-7 20-4-9-9-4Z"></path>
                    <path d="M22 2 11 13"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        {/* Footer Section */}
        <Footer />
    </main>
  );
};

export default Residential;