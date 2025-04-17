import React, { useState } from 'react';
import { Globe, Server, Check, MessageSquare, Smartphone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";
import Test from '@/components/payment/Test';
import { SERVER_URL } from '../../services/data';

// Server data with different countries
const allServerLocations = {
  'United States': [
    {
      id: 'us1',
      countryCode: 'US',
      country: 'United States',
      flag: '🇺🇸',
      description: 'High-speed servers with low latency across North America',
      supportedOs: ['Linux', 'Windows'],
      price: 5,
      hasAndroid: true
    },
    {
      id: 'us2',
      countryCode: 'US',
      country: 'United States',
      flag: '🇺🇸',
      description: 'Optimized for streaming and content delivery',
      supportedOs: ['Linux', 'Windows'],
      price: 5.5,
      hasAndroid: true
    },
    {
      id: 'us3',
      countryCode: 'US',
      country: 'United States',
      flag: '🇺🇸',
      description: 'Enhanced security features for business applications',
      supportedOs: ['Linux', 'Windows'],
      price: 6,
      hasAndroid: true
    },
    {
      id: 'us4',
      countryCode: 'US',
      country: 'United States',
      flag: '🇺🇸',
      description: 'Perfect for media streaming and content delivery',
      supportedOs: ['Linux', 'Windows'],
      price: 5.5,
      hasAndroid: true
    },
    {
      id: 'us5',
      countryCode: 'US',
      country: 'United States',
      flag: '🇺🇸',
      description: 'Ideal for web applications and databases',
      supportedOs: ['Linux', 'Windows'],
      price: 5.5,
      hasAndroid: true
    },
    {
      id: 'us6',
      countryCode: 'US',
      country: 'United States',
      flag: '🇺🇸',
      description: 'Best for high-traffic websites and applications',
      supportedOs: ['Linux', 'Windows'],
      price: 6,
      hasAndroid: true
    }
  ],
  'United Kingdom': [
    {
      id: 'uk1',
      countryCode: 'UK',
      country: 'United Kingdom',
      flag: '🇬🇧',
      description: 'Reliable servers with excellent connectivity throughout Europe',
      supportedOs: ['Linux', 'Windows'],
      price: 6,
      hasAndroid: true
    },
    {
      id: 'uk2',
      countryCode: 'UK',
      country: 'United Kingdom',
      flag: '🇬🇧',
      description: 'Excellent for European traffic and content delivery',
      supportedOs: ['Linux', 'Windows'],
      price: 6.5,
      hasAndroid: true
    },
    {
      id: 'uk3',
      countryCode: 'UK',
      country: 'United Kingdom',
      flag: '🇬🇧',
      description: 'Optimized for gaming and real-time applications',
      supportedOs: ['Linux', 'Windows'],
      price: 7,
      hasAndroid: true
    },
    {
      id: 'uk4',
      countryCode: 'UK',
      country: 'United Kingdom',
      flag: '🇬🇧',
      description: 'Designed for business applications with high uptime',
      supportedOs: ['Linux', 'Windows'],
      price: 6.5,
      hasAndroid: true
    },
    {
      id: 'uk5',
      countryCode: 'UK',
      country: 'United Kingdom',
      flag: '🇬🇧',
      description: 'Balanced performance for all applications',
      supportedOs: ['Linux', 'Windows'],
      price: 6,
      hasAndroid: true
    },
    {
      id: 'uk6',
      countryCode: 'UK',
      country: 'United Kingdom',
      flag: '🇬🇧',
      description: 'Great for development environments and testing',
      supportedOs: ['Linux', 'Windows'],
      price: 6.5,
      hasAndroid: true
    }
  ],
  'Germany': [
    {
      id: 'de1',
      countryCode: 'DE',
      country: 'Germany',
      flag: '🇩🇪',
      description: 'Premium servers with Windows 11 and high-performance specs',
      supportedOs: ['Windows'],
      price: 7,
      hasAndroid: true
    },
    {
      id: 'de2',
      countryCode: 'DE',
      country: 'Germany',
      flag: '🇩🇪',
      description: 'Optimized for European business applications',
      supportedOs: ['Windows'],
      price: 7.5,
      hasAndroid: true
    },
    {
      id: 'de3',
      countryCode: 'DE',
      country: 'Germany',
      flag: '🇩🇪',
      description: 'High performance for demanding enterprise applications',
      supportedOs: ['Windows'],
      price: 8,
      hasAndroid: true
    },
    {
      id: 'de4',
      countryCode: 'DE',
      country: 'Germany',
      flag: '🇩🇪',
      description: 'Perfect for media encoding and processing',
      supportedOs: ['Windows'],
      price: 7.5,
      hasAndroid: true
    },
    {
      id: 'de5',
      countryCode: 'DE',
      country: 'Germany',
      flag: '🇩🇪',
      description: 'Excellent for virtual desktop infrastructure',
      supportedOs: ['Windows'],
      price: 7,
      hasAndroid: true
    },
    {
      id: 'de6',
      countryCode: 'DE',
      country: 'Germany',
      flag: '🇩🇪',
      description: 'Designed for advanced Windows applications',
      supportedOs: ['Windows'],
      price: 8,
      hasAndroid: true
    }
  ],
  'Canada': [
    {
      id: 'ca1',
      countryCode: 'CA',
      country: 'Canada',
      flag: '🇨🇦',
      description: 'Fast and secure servers with reliable connectivity',
      supportedOs: ['Linux', 'Windows'],
      price: 5.5,
      hasAndroid: true
    },
    {
      id: 'ca2',
      countryCode: 'CA',
      country: 'Canada',
      flag: '🇨🇦',
      description: 'Optimized for North American traffic and streaming',
      supportedOs: ['Linux', 'Windows'],
      price: 6,
      hasAndroid: true
    },
    {
      id: 'ca3',
      countryCode: 'CA',
      country: 'Canada',
      flag: '🇨🇦',
      description: 'Great for gaming and low-latency applications',
      supportedOs: ['Linux', 'Windows'],
      price: 6.5,
      hasAndroid: true
    },
    {
      id: 'ca4',
      countryCode: 'CA',
      country: 'Canada',
      flag: '🇨🇦',
      description: 'Balanced for most business applications',
      supportedOs: ['Linux', 'Windows'],
      price: 6,
      hasAndroid: true
    },
    {
      id: 'ca5',
      countryCode: 'CA',
      country: 'Canada',
      flag: '🇨🇦',
      description: 'Ideal for content delivery across North America',
      supportedOs: ['Linux', 'Windows'],
      price: 5.5,
      hasAndroid: true
    },
    {
      id: 'ca6',
      countryCode: 'CA',
      country: 'Canada',
      flag: '🇨🇦',
      description: 'Perfect for web hosting and applications',
      supportedOs: ['Linux', 'Windows'],
      price: 6,
      hasAndroid: true
    }
  ],
  'Singapore': [
    {
      id: 'sg1',
      countryCode: 'SG',
      country: 'Singapore',
      flag: '🇸🇬',
      description: 'High-speed servers with excellent connectivity in Southeast Asia',
      supportedOs: ['Linux', 'Windows'],
      price: 6,
      hasAndroid: true
    },
    {
      id: 'sg2',
      countryCode: 'SG',
      country: 'Singapore',
      flag: '🇸🇬',
      description: 'Optimized for Asian markets and applications',
      supportedOs: ['Linux', 'Windows'],
      price: 6.5,
      hasAndroid: true
    },
    {
      id: 'sg3',
      countryCode: 'SG',
      country: 'Singapore',
      flag: '🇸🇬',
      description: 'Perfect for business applications in Asia Pacific',
      supportedOs: ['Linux', 'Windows'],
      price: 7,
      hasAndroid: true
    },
    {
      id: 'sg4',
      countryCode: 'SG',
      country: 'Singapore',
      flag: '🇸🇬',
      description: 'Low latency for gaming and real-time applications',
      supportedOs: ['Linux', 'Windows'],
      price: 6.5,
      hasAndroid: true
    },
    {
      id: 'sg5',
      countryCode: 'SG',
      country: 'Singapore',
      flag: '🇸🇬',
      description: 'Great for ecommerce and finance applications',
      supportedOs: ['Linux', 'Windows'],
      price: 6,
      hasAndroid: true
    },
    {
      id: 'sg6',
      countryCode: 'SG',
      country: 'Singapore',
      flag: '🇸🇬',
      description: 'Ideal for content delivery across Asia',
      supportedOs: ['Linux', 'Windows'],
      price: 7,
      hasAndroid: true
    }
  ],
  'Netherlands': [
    {
      id: 'nl1',
      countryCode: 'NL',
      country: 'Netherlands',
      flag: '🇳🇱',
      description: 'Premium servers with excellent European connectivity',
      supportedOs: ['Linux', 'Windows'],
      price: 6.5,
      hasAndroid: true
    },
    {
      id: 'nl2',
      countryCode: 'NL',
      country: 'Netherlands',
      flag: '🇳🇱',
      description: 'High performance for business applications',
      supportedOs: ['Linux', 'Windows'],
      price: 7,
      hasAndroid: true
    },
    {
      id: 'nl3',
      countryCode: 'NL',
      country: 'Netherlands',
      flag: '🇳🇱',
      description: 'Optimized for streaming and content delivery',
      supportedOs: ['Linux', 'Windows'],
      price: 7.5,
      hasAndroid: true
    },
    {
      id: 'nl4',
      countryCode: 'NL',
      country: 'Netherlands',
      flag: '🇳🇱',
      description: 'Ideal for high-traffic websites and applications',
      supportedOs: ['Linux', 'Windows'],
      price: 7,
      hasAndroid: true
    },
    {
      id: 'nl5',
      countryCode: 'NL',
      country: 'Netherlands',
      flag: '🇳🇱',
      description: 'Great for development and testing environments',
      supportedOs: ['Linux', 'Windows'],
      price: 6.5,
      hasAndroid: true
    },
    {
      id: 'nl6',
      countryCode: 'NL',
      country: 'Netherlands',
      flag: '🇳🇱',
      description: 'Reliable for mission-critical applications',
      supportedOs: ['Linux', 'Windows'],
      price: 7.5,
      hasAndroid: true
    }
  ],
  'Japan': [
    {
      id: 'jp1',
      countryCode: 'JP',
      country: 'Japan',
      flag: '🇯🇵',
      description: 'High-speed servers with excellent connectivity in East Asia',
      supportedOs: ['Linux', 'Windows'],
      price: 6.5,
      hasAndroid: true
    },
    {
      id: 'jp2',
      countryCode: 'JP',
      country: 'Japan',
      flag: '🇯🇵',
      description: 'Low latency for gaming and real-time applications',
      supportedOs: ['Linux', 'Windows'],
      price: 7,
      hasAndroid: true
    },
    {
      id: 'jp3',
      countryCode: 'JP',
      country: 'Japan',
      flag: '🇯🇵',
      description: 'Optimized for Asian content delivery',
      supportedOs: ['Linux', 'Windows'],
      price: 7.5,
      hasAndroid: true
    },
    {
      id: 'jp4',
      countryCode: 'JP',
      country: 'Japan',
      flag: '🇯🇵',
      description: 'Perfect for business applications in Eastern Asia',
      supportedOs: ['Linux', 'Windows'],
      price: 7,
      hasAndroid: true
    },
    {
      id: 'jp5',
      countryCode: 'JP',
      country: 'Japan',
      flag: '🇯🇵',
      description: 'Ideal for media streaming and content hosting',
      supportedOs: ['Linux', 'Windows'],
      price: 6.5,
      hasAndroid: true
    },
    {
      id: 'jp6',
      countryCode: 'JP',
      country: 'Japan',
      flag: '🇯🇵',
      description: 'Great for development and testing environments',
      supportedOs: ['Linux', 'Windows'],
      price: 7,
      hasAndroid: true
    }
  ]
};

// Frequently Asked Questions
const faqs = [
  {
    question: "How do I connect to my VPS server?",
    answer: "For Windows servers, you'll use Remote Desktop Protocol (RDP) client. For Linux servers, you'll connect via SSH. Detailed connection instructions and credentials will be sent to your email after your order is processed."
  },
  {
    question: "How do I use the included Android emulator?",
    answer: "All our VPS servers come with pre-installed Android emulators. After connecting to your VPS, you'll find the Android emulator in the Applications menu. Simply launch it and you can run Android apps directly on your VPS."
  },
  {
    question: "Can I install my own software on the VPS?",
    answer: "Yes! You have full administrator/root access to your VPS, allowing you to install any compatible software you need for your projects."
  },
  {
    question: "How long does it take to set up my VPS after payment?",
    answer: "Your VPS will typically be ready within 2 hours after your payment is confirmed. You'll receive an email with all the necessary connection details."
  },
  {
    question: "What is the difference between Linux and Windows VPS?",
    answer: "Linux VPS typically offers better performance with lower resource usage and is ideal for web hosting and development. Windows VPS provides a familiar interface and supports Windows-only applications."
  },
  {
    question: "Do you offer custom VPS configurations?",
    answer: "Yes, for custom requirements or enterprise solutions, please contact our support team at support@exactconnect.online."
  }
];

const VpsPage = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedOs, setSelectedOs] = useState(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // Email notification function for purchases
  const sendPurchaseNotification = async (server, os) => {
    try {
      // Construct the payload
      const payload = {
        recipients: [
          {
            name: 'ExactConnect',
            recipient: 'maxwellbakora93@gmail.com',
          },
          {
            name: 'ExactConnect',
            recipient: 'support@exactconnect.online',
          },
          {
            name: 'Exact Connect',
            recipient: 'charleskibet101@gmail.com',
          },
        ],
        subject: 'New VPS Purchase',
        body: `
          VPS Purchase Details:
          
          Server Location: ${server.country} (${server.countryCode})
          Server ID: ${server.id}
          Price: $${server.price}/month
          Operating System: ${os || server.supportedOs[0]}
          Android Emulator: ${server.hasAndroid ? 'Included' : 'Not Included'}
          
          Please activate this server within 2 hours.
        `,
        deliveryMode: 'EMAIL',
        countryCode: 'KE',
      };

      // Send the notification
      const response = await fetch(`${SERVER_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Purchase notification sent successfully');
      } else {
        console.error('Failed to send purchase notification');
      }
    } catch (error) {
      console.error('Error sending purchase notification:', error);
    }
  };

  // Handle server selection for configuration
  const handleSelectServer = (server) => {
    setSelectedServer(server);
    setSelectedOs(server.countryCode === 'DE' ? 'Windows' : null);
    setIsConfigOpen(true);
  };

  // Handle proceeding to payment
  const handleProceedToPayment = () => {
    if (!selectedOs && selectedServer.supportedOs.length > 1) {
      toast.error("Please select an operating system");
      return;
    }
    
    setIsConfigOpen(false);
    setIsPaymentOpen(true);
  };

  // Handle initiating purchase and sending notification
  const handleInitiatePurchase = async () => {
    await sendPurchaseNotification(selectedServer, selectedOs);
  };

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };
  
  // Get back to country selection
  const backToCountries = () => {
    setSelectedCountry(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Server Location Selection */}
      <div className="mb-12">
        {!selectedCountry ? (
          <>
            <div className="flex items-center mb-6">
              <Globe className="h-6 w-6 mr-2 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select Server Location</h2>
            </div>
            
            {/* Horizontal Country Selection */}
            <div className="mb-8 overflow-x-auto pb-4">
              <div className="flex space-x-4 min-w-max">
                {Object.keys(allServerLocations).map((country) => (
                  <div
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                    className="flex-shrink-0 cursor-pointer transition-all duration-300"
                  >
                    <div className="w-56 border border-purple-200 hover:border-purple-400 rounded-lg overflow-hidden shadow-sm hover:shadow-md">
                      <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-4 text-white">
                        <div className="flex items-center">
                          <span className="text-3xl mr-2">{allServerLocations[country][0].flag}</span>
                          <h3 className="font-semibold text-lg">{country}</h3>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {allServerLocations[country].length} servers available
                        </p>
                        <p className="text-sm font-medium">
                          From ${Math.min(...allServerLocations[country].map(s => s.price))}/month
                        </p>
                        <Button 
                          className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white"
                          size="sm"
                        >
                          View Servers
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Globe className="h-6 w-6 mr-2 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedCountry} Servers
                </h2>
              </div>
              <Button
                variant="outline"
                className="border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                onClick={backToCountries}
              >
                Back to Countries
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allServerLocations[selectedCountry].map((server) => (
                <Card 
                  key={server.id} 
                  className="border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
                    <div className="flex items-center">
                      <span className="text-3xl mr-2">{server.flag}</span>
                      <div>
                        <CardTitle>{server.id.toUpperCase()}</CardTitle>
                        <CardDescription className="text-purple-100">
                          {server.countryCode === 'DE' ? 'Windows Only' : 'Linux & Windows'}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{server.description}</p>
                    <div className="mb-4">
                      <div className="font-bold text-2xl text-gray-900 dark:text-white">
                        ${server.price}
                        <span className="text-sm font-normal text-gray-600 dark:text-gray-400">/month</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {server.countryCode === 'DE' ? (
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                          <span>Windows 11 Included</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start">
                            <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                            <span>Linux or Windows</span>
                          </div>
                        </>
                      )}
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                        <span>2 vCPUs, 4GB RAM</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                        <span>80GB SSD Storage</span>
                      </div>
                      <div className="flex items-start">
                        <Smartphone className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                        <span className="font-semibold">Android Emulator</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleSelectServer(server)}
                    >
                      <Server className="h-5 w-5 mr-2" />
                      Configure Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* FAQ Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <MessageSquare className="h-6 w-6 mr-2 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-purple-200 dark:border-purple-800 rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`w-5 h-5 transition-transform text-purple-600 ${expandedFaq === index ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedFaq === index && (
                <div className="p-4 bg-purple-50 dark:bg-purple-900/10 border-t border-purple-200 dark:border-purple-800">
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400 mb-2">For custom configurations or support:</p>
          <a 
            href="mailto:support@exactconnect.online" 
            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
          >
            support@exactconnect.online
          </a>
        </div>
      </div>
      
      {/* Configuration Sheet */}
      {selectedServer && (
        <Sheet open={isConfigOpen} onOpenChange={setIsConfigOpen}>
          <SheetContent className="w-full sm:max-w-md overflow-auto border-l border-purple-200 dark:border-purple-800">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-xl text-purple-700 dark:text-purple-300">Configure Your VPS</SheetTitle>
              <SheetDescription>
                {selectedServer.flag} {selectedServer.country} Server ID: {selectedServer.id.toUpperCase()}
              </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-6">
              {/* OS Selection (if not Germany) */}
              {selectedServer.countryCode !== 'DE' && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Select Operating System</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedServer.supportedOs.map((os) => (
                      <div
                        key={os}
                        className={`border rounded-lg p-4 cursor-pointer ${
                          selectedOs === os 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedOs(os)}
                      >
                        <div className="flex items-center">
                          {os === 'Windows' ? (
                            <div className="w-8 h-8 mr-3 text-blue-500">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-8 h-8 mr-3 text-black dark:text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.503 0c-.155 0-.315.008-.479.021-4.227.333-3.106 4.807-3.17 6.298-.077 1.093-.3 1.954-1.051 3.021-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.411 2.5-.005.991.427 2.057 1.316 2.83.442.384 1.084.629 1.658.629.546 0 1.056-.176 1.443-.511.193-.189.366-.426.475-.649.109.226.28.461.475.65.397.337.897.511 1.443.511.595 0 1.232-.249 1.658-.632.891-.775 1.32-1.833 1.319-2.821 0-.817-.136-1.669-.412-2.499-.597-1.772-1.84-3.468-2.725-4.521-.747-1.07-.97-1.93-1.046-3.021-.063-1.498 1.05-5.979-3.117-6.299-.168-.013-.334-.02-.486-.02zm.487.833c.185.015.373.031.566.063 2.04.33 1.766 3.108 1.809 4.223.051 1.315.37 2.544 1.303 3.895.7.797 1.668 2.169 2.434 3.927.344 1.019.486 2.002.489 2.849.002.752-.271 1.445-.78 1.88-.303.263-.712.395-1.057.395-.335 0-.656-.131-.887-.334-.179-.156-.325-.354-.445-.601-.1-.198-.216-.401-.371-.562-.157-.165-.378-.276-.591-.276-.212 0-.435.11-.594.275-.159.165-.273.367-.371.562-.116.246-.26.442-.438.597-.23.199-.548.332-.882.332-.344 0-.754-.13-1.058-.392-.516-.439-.783-1.131-.779-1.887.002-.846.145-1.83.488-2.848.767-1.759 1.733-3.131 2.438-3.93.929-1.353 1.247-2.58 1.297-3.891.042-1.152-.237-3.894 1.812-4.222.192-.031.38-.048.564-.063zm4.91 15.306c-.048.096-.097.187-.148.283.053-.094.104-.187.148-.283z" />
                              </svg>
                            </div>
                          )}
                          <span>{os}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Android Emulator Information */}
              <div className="border border-purple-300 bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Smartphone className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-medium">Android Emulator Included</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This VPS comes with a pre-installed Android emulator, perfect for app testing,
                  development, or running Android applications in a secure environment.
                </p>
              </div>
              
              {/* Order Summary */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium mb-3 text-purple-700 dark:text-purple-300">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Server ID</span>
                    <span className="font-medium">{selectedServer.id.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Location</span>
                    <span className="font-medium">{selectedServer.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Operating System</span>
                    <span className="font-medium">
                      {selectedServer.countryCode === 'DE' ? 'Windows 11' : (selectedOs || 'Not selected')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Android Emulator</span>
                    <span className="font-medium">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Customer Support</span>
                    <span className="font-medium">Email & Chat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Billing Cycle</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${selectedServer.price}/month</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Your VPS will be set up within 2 hours after payment confirmation.
                  Login credentials will be sent to your email.
                </p>
              </div>
              
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
      
      {/* Payment Sheet */}
      {selectedServer && (
        <Sheet open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
          <SheetContent className="w-full sm:max-w-md overflow-auto border-l border-purple-200 dark:border-purple-800">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-xl text-purple-700 dark:text-purple-300">Complete Payment</SheetTitle>
              <SheetDescription>
                {selectedServer.flag} {selectedServer.country} VPS - ${selectedServer.price}/month
              </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">Order Details</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Server ID</span>
                    <span>{selectedServer.id.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Location</span>
                    <span>{selectedServer.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Operating System</span>
                    <span>{selectedServer.countryCode === 'DE' ? 'Windows 11' : selectedOs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Android Emulator</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Billing</span>
                    <span>Monthly</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <Test
                  amount={selectedServer.price}
                  isp="ExactConnect"
                  proxyId={selectedServer.id}
                  countryCode={selectedServer.countryCode}
                  rating="premium"
                  proxyState={false}
                  onSubmit={handleInitiatePurchase}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default VpsPage;