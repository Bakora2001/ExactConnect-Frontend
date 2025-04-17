
import React, { useState, useEffect } from 'react';
import { Server, Globe, Check, AlertCircle, MessageSquare, Shield, Zap, Clock, MonitorSmartphone, Code, Video, ChevronRight, Users, LucideDatabase, Gift } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../services/data';
import Test from '../payment/Test';

// RDP data with different countries and reduced prices
const rdpData = [
  {
    id: 1,
    countryCode: 'US',
    country: 'United States',
    name: 'Standard RDP',
    price: 5,
    features: ['2 vCPUs', '4GB RAM', '80GB SSD', 'Windows Server 2019', 'Full Admin Access', 'Supports Bluestacks'],
    bestSeller: false,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 2,
    countryCode: 'US',
    country: 'United States',
    name: 'Premium RDP',
    price: 8,
    features: ['4 vCPUs', '8GB RAM', '120GB SSD', 'Windows Server 2022', 'Full Admin Access', 'Supports Android Emulators', 'Enhanced Security'],
    bestSeller: true,
    color: 'from-amber-500 to-pink-500',
  },
  {
    id: 3,
    countryCode: 'US',
    country: 'United States',
    name: 'Business RDP',
    price: 10,
    features: ['8 vCPUs', '16GB RAM', '250GB SSD', 'Windows Server 2022', 'Full Admin Access', 'Supports Bluestacks & Android Emulators', 'Enhanced Security', 'Dedicated Resources'],
    bestSeller: false,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 4,
    countryCode: 'UK',
    country: 'United Kingdom',
    name: 'Standard RDP',
    price: 6,
    features: ['2 vCPUs', '4GB RAM', '80GB SSD', 'Windows Server 2019', 'Full Admin Access', 'Supports Bluestacks'],
    bestSeller: false,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 5,
    countryCode: 'UK',
    country: 'United Kingdom',
    name: 'Premium RDP',
    price: 9,
    features: ['4 vCPUs', '8GB RAM', '120GB SSD', 'Windows Server 2022', 'Full Admin Access', 'Supports Android Emulators', 'Enhanced Security'],
    bestSeller: true,
    color: 'from-amber-500 to-pink-500',
  },
  {
    id: 6,
    countryCode: 'UK',
    country: 'United Kingdom',
    name: 'Business RDP',
    price: 12,
    features: ['8 vCPUs', '16GB RAM', '250GB SSD', 'Windows Server 2022', 'Full Admin Access', 'Supports Bluestacks & Android Emulators', 'Enhanced Security', 'Dedicated Resources'],
    bestSeller: false,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 7,
    countryCode: 'DE',
    country: 'Germany',
    name: 'Standard RDP',
    price: 5.5,
    features: ['2 vCPUs', '4GB RAM', '80GB SSD', 'Windows Server 2019', 'Full Admin Access', 'Supports Bluestacks'],
    bestSeller: false,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 8,
    countryCode: 'DE',
    country: 'Germany',
    name: 'Premium RDP',
    price: 8.5,
    features: ['4 vCPUs', '8GB RAM', '120GB SSD', 'Windows Server 2022', 'Full Admin Access', 'Supports Android Emulators', 'Enhanced Security'],
    bestSeller: true,
    color: 'from-amber-500 to-pink-500',
  },
  {
    id: 9,
    countryCode: 'DE',
    country: 'Germany',
    name: 'Business RDP',
    price: 11,
    features: ['8 vCPUs', '16GB RAM', '250GB SSD', 'Windows Server 2022', 'Full Admin Access', 'Supports Bluestacks & Android Emulators', 'Enhanced Security', 'Dedicated Resources'],
    bestSeller: false,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 10,
    countryCode: 'CA',
    country: 'Canada',
    name: 'Standard RDP',
    price: 5.5,
    features: ['2 vCPUs', '4GB RAM', '80GB SSD', 'Windows Server 2019', 'Full Admin Access', 'Supports Bluestacks'],
    bestSeller: false,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 11,
    countryCode: 'CA',
    country: 'Canada',
    name: 'Premium RDP',
    price: 8.5,
    features: ['4 vCPUs', '8GB RAM', '120GB SSD', 'Windows Server 2022', 'Full Admin Access', 'Supports Android Emulators', 'Enhanced Security'],
    bestSeller: true,
    color: 'from-amber-500 to-pink-500',
  },
  {
    id: 12,
    countryCode: 'CA',
    country: 'Canada',
    name: 'Business RDP',
    price: 11,
    features: ['8 vCPUs', '16GB RAM', '250GB SSD', 'Windows Server 2022', 'Full Admin Access', 'Supports Bluestacks & Android Emulators', 'Enhanced Security', 'Dedicated Resources'],
    bestSeller: false,
    color: 'from-blue-500 to-cyan-400',
  },
];

// Available countries for filtering
const countries = [
  { code: 'ALL', name: 'All Countries' },
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'CA', name: 'Canada' },
];

// Server benefits information
const serverBenefits = [
  {
    icon: <Shield className="h-10 w-10 text-purple-600" />,
    title: "Enterprise-Grade Security",
    description: "Our servers employ advanced encryption, regular security patches, and dedicated firewalls to keep your data protected at all times."
  },
  {
    icon: <Zap className="h-10 w-10 text-amber-500" />,
    title: "Lightning-Fast Performance",
    description: "Experience minimal latency with our optimized network infrastructure and high-performance hardware configurations."
  },
  {
    icon: <Clock className="h-10 w-10 text-cyan-500" />,
    title: "99.9% Uptime Guarantee",
    description: "Our redundant systems and continuous monitoring ensure your server remains operational when you need it most."
  },
  {
    icon: <Server className="h-10 w-10 text-indigo-500" />,
    title: "Dedicated Resources",
    description: "No resource sharing means consistent performance without the fluctuations common to shared hosting environments."
  },
];

// Use Cases Section
const usesCases = [
  {
    icon: <MonitorSmartphone className="h-12 w-12 text-purple-600 mb-4" />,
    title: "Social Media Management",
    description: "Run multiple social media accounts and tools simultaneously for efficient management of client profiles.",
    benefits: ["Run multiple instances", "Manage multiple accounts", "Access geo-restricted features", "Automated posting tools"]
  },
  {
    icon: <Code className="h-12 w-12 text-amber-500 mb-4" />,
    title: "Development & Testing",
    description: "Create isolated environments for software development and testing with full control over configurations.",
    benefits: ["Clean isolated environments", "Cross-platform testing", "Run resource-intensive IDEs", "Collaborate seamlessly"]
  },
  {
    icon: <Video className="h-12 w-12 text-green-500 mb-4" />,
    title: "Content Creation",
    description: "Edit videos, create graphics, and render animations with dedicated resources for optimal performance.",
    benefits: ["Run editing software", "Faster rendering times", "Access from anywhere", "No hardware limitations"]
  },
  {
    icon: <Users className="h-12 w-12 text-blue-500 mb-4" />,
    title: "Remote Work Teams",
    description: "Provide secure remote access to company resources and tools for distributed teams.",
    benefits: ["Secure data access", "Standardized environment", "Central management", "Easy onboarding"]
  },
];

// Testimonials
const testimonials = [
  {
    name: "Michael R.",
    role: "Software Developer",
    content: "These RDP servers are perfect for development work. The performance is excellent and I can run multiple Android emulators without any lag."
  },
  {
    name: "Sarah K.",
    role: "Digital Marketer",
    content: "I've tried several RDP providers and this is by far the most reliable. The uptime is excellent and customer support is always responsive."
  },
  {
    name: "David T.",
    role: "Data Scientist",
    content: "The computing power is impressive. I run resource-intensive data processing tasks without any issues. Highly recommended!"
  },
];

// Frequently Asked Questions
const faqs = [
  {
    question: "What exactly is an RDP (Remote Desktop Protocol)?",
    answer: "RDP (Remote Desktop Protocol) is a Microsoft protocol that provides users with a graphical interface to connect to another computer over a network connection. Our RDP service gives you full access to a Windows server with dedicated resources, allowing you to run applications as if you were using a local computer."
  },
  {
    question: "Can I install my own software on the RDP?",
    answer: "Yes! You have full administrator access to your RDP server, which means you can install any compatible software you need. This includes productivity tools, development environments, specialized applications, and much more."
  },
  {
    question: "How do I connect to my RDP server?",
    answer: "You can connect to your RDP server using the built-in Remote Desktop Connection app on Windows. For Mac, you can use Microsoft Remote Desktop. For mobile devices, there are several RDP client apps available. We provide detailed connection instructions after purchase."
  },
  {
    question: "Can I run Android emulators like Bluestacks?",
    answer: "Yes, all our RDP plans support Android emulators including Bluestacks, NoxPlayer, and others. The Premium and Business plans are especially optimized for running these resource-intensive applications smoothly."
  },
  {
    question: "What happens if I need more resources later?",
    answer: "You can easily upgrade your RDP plan at any time. If you need more RAM, CPU, or storage, you can switch to a higher tier plan. Your data will be preserved during the upgrade process."
  }
];

const VpsPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [filteredRdps, setFilteredRdps] = useState(rdpData);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRdp, setSelectedRdp] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  const navigate = useNavigate();

  // Animation variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter RDPs by selected country
  useEffect(() => {
    if (selectedCountry === 'ALL') {
      setFilteredRdps(rdpData);
    } else {
      setFilteredRdps(rdpData.filter(rdp => rdp.countryCode === selectedCountry));
    }
  }, [selectedCountry]);

  // Handle country selection
  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  // Handle RDP selection for payment
  const handleSelectRdp = (rdp) => {
    setSelectedRdp(rdp);
    setIsPaymentOpen(true);
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${SERVER_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        toast.success('Your message has been sent successfully!');
        setContactForm({ name: '', email: '', message: '' });
        setIsContactOpen(false);
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle contact form input changes
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <motion.div 
      className="pb-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section with Prominent Contact Button */}
      <motion.div 
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-amber-400 p-8 mb-8 text-white"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <Server className="h-8 w-8 mr-3" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-purple-300 bg-clip-text text-transparent">Windows Server RDP</h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl mb-4">
            High-performance Windows Server Remote Desktop Protocol (RDP) with full administrative access.
            Perfect for running resource-intensive applications and supporting Android emulators.
          </p>
          
          <div className="prose prose-invert max-w-2xl opacity-85 mb-6">
            <p>
              Remote Desktop Protocol (RDP) gives you full access to a dedicated Windows server from anywhere in the world. 
              Unlike shared hosting or VPS solutions, our RDP services provide isolated resources exclusively for your use.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-5">
            <Button 
              onClick={() => setIsContactOpen(true)} 
              className="bg-gradient-to-r from-amber-400 to-purple-500 hover:from-amber-500 hover:to-purple-600 text-white font-medium shadow-xl shadow-purple-500/20"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => document.getElementById('rdp-plans').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/10"
            >
              View RDP Plans
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* What is RDP? Section */}
      <motion.div className="mb-16 max-w-6xl mx-auto px-4" variants={itemVariants}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent inline-block">
            What is a Remote Desktop Protocol (RDP)?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Remote Desktop Protocol (RDP) is a proprietary protocol developed by Microsoft that provides users with a graphical interface to connect to another computer over a network connection.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              With our RDP service, you get access to a fully-functional Windows environment running in our secure data centers. This means you can run Windows applications remotely from any device with an internet connection - whether it's a Mac, Linux machine, Chromebook, tablet, or smartphone.
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded-r">
              <h4 className="font-semibold text-amber-800 dark:text-amber-300">Why use our RDP service?</h4>
              <ul className="list-disc list-inside text-sm text-amber-700 dark:text-amber-400 mt-2">
                <li>Access Windows-only software from any device</li>
                <li>Run resource-intensive applications without hardware limitations</li>
                <li>Secure environment isolated from your local machine</li>
                <li>Get a dedicated IP address from your chosen country</li>
                <li>Perfect for development, testing, and automation tasks</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-purple-800 dark:text-purple-300">Popular Uses for Our RDP Services</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow mr-3">
                  <MonitorSmartphone className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Social Media Management</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Run multiple accounts securely with dedicated resources.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow mr-3">
                  <LucideDatabase className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Data Processing & Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Process large datasets without taxing your local machine.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow mr-3">
                  <Code className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Software Development</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create consistent development environments for your team.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow mr-3">
                  <Gift className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Special Bonus!</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">All plans come with pre-installed Bluestacks and other useful tools!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Server Benefits Section */}
      <motion.div className="mb-16" variants={itemVariants}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
            Why Choose Our RDP Servers?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serverBenefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Use Cases Section with Detailed Information */}
      <motion.div className="mb-16 bg-gradient-to-r from-purple-50 to-amber-50 dark:from-purple-900/20 dark:to-amber-900/20 py-12" variants={itemVariants}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
            Powerful RDP Use Cases
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Discover how our RDP solutions solve real-world challenges and enhance productivity across various fields and applications
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {usesCases.map((useCase, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center md:items-start">
                  {useCase.icon}
                  <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{useCase.description}</p>
                
                <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Key Benefits:</h4>
                <ul className="space-y-1">
                  {useCase.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Country Selection */}
      <motion.div className="mb-8 max-w-6xl mx-auto px-4" variants={itemVariants} id="rdp-plans">
        <div className="flex items-center mb-4">
          <Globe className="h-5 w-5 mr-2 text-purple-600" />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">Select Server Location</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountryChange(country.code)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCountry === country.code 
                ? 'bg-gradient-to-r from-purple-600 to-amber-400 text-white shadow-lg' 
                : 'bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
            >
              {country.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* RDP Cards Grid */}
      <motion.div variants={itemVariants} className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(6).fill(0).map((_, index) => (
              <Card key={index} className="overflow-hidden border border-gray-200">
                <CardHeader className="p-0">
                  <Skeleton className="h-32 w-full" />
                </CardHeader>
                <CardContent className="p-6">
                  <Skeleton className="h-7 w-2/3 mb-3" />
                  <Skeleton className="h-5 w-1/2 mb-6" />
                  
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center mb-2">
                      <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full rounded-md" />
                </CardFooter>
              </Card>
            ))
          ) : (
            // Actual RDP cards
            filteredRdps.map((rdp) => (
              <motion.div 
                key={rdp.id}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="h-full"
                layout
              >
                <Card className="h-full overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader className={`p-6 bg-gradient-to-r ${rdp.color} text-white relative`}>
                    {rdp.bestSeller && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-lg">
                          BEST SELLER
                        </div>
                      </div>
                    )}
                    <CardTitle className="text-xl mb-2">{rdp.name}</CardTitle>
                    <CardDescription className="text-white/80">
                      {rdp.country} Region
                    </CardDescription>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">${rdp.price}</span>
                      <span className="text-white/80 ml-1">/month</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-3 text-gray-700">Features:</h4>
                    <ul className="space-y-2">
                      {rdp.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                      <li className="flex items-start pt-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-amber-700 text-sm">
                          Supports Bluestacks & Android emulators
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      onClick={() => handleSelectRdp(rdp)}
                    >
                      Select Plan
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div className="mt-16 mb-12 max-w-6xl mx-auto px-4" variants={itemVariants}>
        <h2 className="text-center text-2xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
          What Our Customers Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-4 flex">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-gray-600 dark:text-gray-300 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div className="mt-16 mb-12 max-w-6xl mx-auto px-4" variants={itemVariants}>
        <h2 className="text-center text-2xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`mb-4 border-b border-gray-200 dark:border-gray-700 pb-4 ${index === 0 ? 'border-t pt-4' : ''}`}
            >
              <button
                className="flex justify-between items-center w-full text-left font-medium"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <ChevronRight className={`h-5 w-5 transition-transform ${expandedFaq === index ? 'transform rotate-90' : ''}`} />
              </button>
              
              {expandedFaq === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-600 dark:text-gray-400"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features Comparison */}
      <motion.div className="mt-16 mb-12 max-w-6xl mx-auto px-4" variants={itemVariants}>
        <h2 className="text-center text-2xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
          Technical Specifications
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-100 dark:bg-purple-900/30">
                <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700">Feature</th>
                <th className="p-4 text-center border-b border-gray-200 dark:border-gray-700">Standard</th>
                <th className="p-4 text-center border-b border-gray-200 dark:border-gray-700">Premium</th>
                <th className="p-4 text-center border-b border-gray-200 dark:border-gray-700">Business</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-medium">CPU</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">2 vCPUs</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">4 vCPUs</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">8 vCPUs</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-medium">RAM</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">4 GB</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">8 GB</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">16 GB</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-medium">Storage</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">80 GB SSD</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">120 GB SSD</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">250 GB SSD</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-medium">Bandwidth</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">2 TB</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">3 TB</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">5 TB</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-medium">OS</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">Windows Server 2019</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">Windows Server 2022</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">Windows Server 2022</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-medium">Guaranteed Uptime</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">99.5%</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">99.9%</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">99.99%</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-medium">Support</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">Email Only</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">Email & Chat</td>
                <td className="p-4 text-center border-b border-gray-200 dark:border-gray-700">Priority Support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Get Started Now CTA */}
      <motion.div 
        className="mt-16 mb-16 bg-gradient-to-r from-purple-600 via-purple-500 to-amber-400 rounded-xl py-12 px-6 max-w-6xl mx-auto text-white text-center"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Select one of our RDP plans above or contact us for a custom configuration tailored to your specific needs.
          Our team is ready to help you find the perfect solution.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={() => document.getElementById('rdp-plans').scrollIntoView({ behavior: 'smooth' })} 
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 font-medium px-8"
          >
            View Plans
          </Button>
          <Button 
            onClick={() => setIsContactOpen(true)} 
            variant="outline"
            size="lg"
            className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium px-8"
          >
            Contact Support
          </Button>
        </div>
      </motion.div>

      {/* Bottom Contact Button */}
      <motion.div 
        className="mt-16 text-center max-w-6xl mx-auto px-4"
        variants={itemVariants}
      >
        <p className="text-lg mb-4">Have questions or need a custom configuration?</p>
        <Button 
          onClick={() => setIsContactOpen(true)} 
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-amber-400 hover:from-purple-700 hover:to-amber-500 text-white font-medium px-8 py-6 h-auto shadow-xl shadow-purple-500/20"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Contact Our Support Team
        </Button>
      </motion.div>

      {/* Payment Dialog - Center modal */}
      <Sheet open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <SheetContent side="center" className="max-w-md rounded-xl overflow-auto max-h-[90vh]">
          <SheetHeader>
            <SheetTitle className="text-xl bg-gradient-to-r from-purple-600 to-amber-400 bg-clip-text text-transparent">Complete Your Purchase</SheetTitle>
            <SheetDescription>
              {selectedRdp && (
                <div className="mb-2">
                  You're purchasing {selectedRdp.name} - {selectedRdp.country} (${selectedRdp.price}/month)
                </div>
              )}
            </SheetDescription>
          </SheetHeader>
          
          {selectedRdp && (
            <div className="mt-6">
              <div className="bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-lg mb-2">Important Information</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  After payment, please allow up to <strong>30 minutes</strong> for your server to be configured.
                  Login credentials will be sent to your registered email address.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <Test 
                  amount={selectedRdp.price} 
                  isp="ExactConnect" 
                  proxyId={selectedRdp.id}
                  countryCode={selectedRdp.countryCode}
                  rating="premium"
                  proxyState={false}
                />
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Contact Support Sheet */}
      <Sheet open={isContactOpen} onOpenChange={setIsContactOpen}>
        <SheetContent side="center" className="max-w-md rounded-xl overflow-auto max-h-[90vh]">
          <SheetHeader>
            <SheetTitle className="text-xl bg-gradient-to-r from-purple-600 to-amber-400 bg-clip-text text-transparent">Contact Support</SheetTitle>
            <SheetDescription>
              Need help with your RDP setup or have questions? Send us a message.
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleContactSubmit} className="space-y-4 mt-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text"
                id="name"
                name="name"
                required
                value={contactForm.name}
                onChange={handleContactChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email"
                id="email"
                name="email"
                required
                value={contactForm.email}
                onChange={handleContactChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                id="message"
                name="message"
                required
                value={contactForm.message}
                onChange={handleContactChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="How can we help you?"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-amber-400 hover:from-purple-700 hover:to-amber-500 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};

export default VpsPage;