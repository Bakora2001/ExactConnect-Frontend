// import { useState } from 'react';
// import { CreditCard, AlertCircle, Plus, Wallet, Clock, Shield, ChevronRight } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// const VccPage = () => {
//   const [rotated, setRotated] = useState(false);

//   const features = [
//     {
//       icon: <Shield className="h-5 w-5" />,
//       title: "Enhanced Security",
//       description: "Protect your purchases with temporary virtual cards that keep your main account secure."
//     },
//     {
//       icon: <Clock className="h-5 w-5" />,
//       title: "Instant Issuance",
//       description: "Create new cards in seconds whenever you need them for online transactions."
//     },
//     {
//       icon: <Wallet className="h-5 w-5" />,
//       title: "Flexible Limits",
//       description: "Set custom spending limits for each card to maintain control over your budget."
//     }
//   ];

//   return (
//     <div className="animate-fade-in space-y-8">
//       {/* Header Section */}
//       <div className="bg-gradient-to-br from-exactconnect-900 via-exactconnect-700 to-exactconnect-600 p-8 rounded-2xl shadow-lg">
//         <div className="flex flex-col md:flex-row md:items-center justify-between">
//           <div className="space-y-4 mb-6 md:mb-0">
//             <h1 className="text-3xl md:text-4xl font-bold text-blue">Virtual Credit Cards</h1>
//             <p className="text-white/90 max-w-md">
//               Secure, flexible, and convenient digital payment solutions for all your online transactions.
//             </p>
//           </div>
//           <div className="flex items-center px-6 py-3 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 hover:bg-white/30 transition-all cursor-not-allowed">
//             <Plus className="h-5 w-5 text-white mr-2" />
//             <span className="text-white font-medium">Create New Card</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Card Preview Section */}
//         <div className="lg:col-span-2">
//           <Card className="shadow-md border-exactconnect-100/40 overflow-hidden h-full">
//             <CardHeader className="bg-gradient-to-r from-exactconnect-100/40 to-transparent">
//               <CardTitle className="text-vcc-dark flex items-center gap-2">
//                 <CreditCard className="h-5 w-5 text-exactconnect-600" />
//                 Card Preview
//               </CardTitle>
//               <CardDescription className="text-gray-600">
//                 Click the card to view the front and back
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="max-w-md mx-auto">
//                 <div 
//                   className={`relative w-full aspect-[85/53] rounded-xl shadow-xl transition-all duration-700 transform hover:shadow-2xl cursor-pointer animate-float ${rotated ? 'rotate-y-180' : ''}`}
//                   style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
//                   onClick={() => setRotated(!rotated)}
//                 >
//                   {/* Front of the card */}
//                   <div 
//                     className={`absolute inset-0 w-full h-full rounded-xl p-6 flex flex-col justify-between bg-gradient-to-br from-exactconnect-900 via-exactconnect-700 to-exactconnect-600 text-white backface-hidden ${rotated ? 'opacity-0' : 'opacity-100'}`}
//                     style={{ 
//                       backfaceVisibility: 'hidden', 
//                       transition: 'opacity 0.2s ease-out',
//                       boxShadow: '0 8px 24px rgba(110, 89, 165, 0.25)'
//                     }}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="flex flex-col">
//                         <span className="text-sm uppercase tracking-wider text-white/90">Virtual Card</span>
//                         <span className="text-lg font-semibold tracking-wider mt-1 text-white">EXACTCONNECT</span>
//                       </div>
//                       <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded opacity-90"></div>
//                     </div>
                    
//                     <div className="space-y-4">
//                       <div className="flex flex-col">
//                         <span className="text-xs uppercase tracking-wider text-white/90">Card Number</span>
//                         <div className="flex items-center">
//                           <span className="text-lg tracking-widest mt-1 font-mono text-white">**** **** **** 1234</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between">
//                         <div className="flex flex-col">
//                           <span className="text-xs uppercase tracking-wider text-white/90">Card Holder</span>
//                           <span className="text-sm tracking-wide mt-1 text-white">JOHN DOE</span>
//                         </div>
                        
//                         <div className="flex flex-col">
//                           <span className="text-xs uppercase tracking-wider text-white/90">Expires</span>
//                           <span className="text-sm tracking-wide mt-1 text-white">04/25</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Back of the card */}
//                   <div 
//                     className={`absolute inset-0 w-full h-full rounded-xl flex flex-col bg-gradient-to-br from-vcc-dark/95 via-vcc-dark/90 to-vcc-dark/85 text-white backface-hidden rotate-y-180 ${rotated ? 'opacity-100' : 'opacity-0'}`}
//                     style={{ 
//                       backfaceVisibility: 'hidden', 
//                       transform: 'rotateY(180deg)', 
//                       transition: 'opacity 0.2s ease-out',
//                       boxShadow: '0 8px 24px rgba(26, 31, 44, 0.3)'
//                     }}
//                   >
//                     <div className="w-full h-12 bg-black mt-5"></div>
                    
//                     <div className="px-6 mt-4 flex flex-col">
//                       <div className="flex justify-end items-center mb-4">
//                         <div className="w-9/12 h-10 bg-white bg-opacity-90 rounded flex items-center justify-end px-4">
//                           <span className="text-gray-800 font-mono text-sm">123</span>
//                         </div>
//                       </div>
                      
//                       <div className="mt-auto mb-6 text-xs text-white/90 text-center">
//                         <p>This card is issued by ExactConnect. For customer service, please visit exactconnect.com</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Features Section */}
//         <div className="lg:col-span-1">
//           <Card className="shadow-md border-exactconnect-100/40 h-full">
//             <CardHeader className="bg-gradient-to-r from-exactconnect-100/40 to-transparent">
//               <CardTitle className="text-vcc-dark">Card Benefits</CardTitle>
//               <CardDescription className="text-gray-600">
//                 Why our virtual cards are the perfect solution
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-6">
//               <ul className="space-y-4">
//                 {features.map((feature, index) => (
//                   <li key={index} className="flex p-3 rounded-lg hover:bg-exactconnect-100/20 transition-colors">
//                     <div className="w-10 h-10 rounded-full bg-exactconnect-600/20 flex items-center justify-center mr-4 text-exactconnect-600">
//                       {feature.icon}
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-exactconnect-900">{feature.title}</h3>
//                       <p className="text-sm text-gray-600">{feature.description}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
        
//       {/* Coming Soon Section */}
//       <Card className="shadow-md border-exactconnect-100/40 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-exactconnect-100/30 to-transparent pointer-events-none"></div>
//         <CardContent className="p-8">
//           <div className="flex flex-col items-center justify-center text-center space-y-4">
//             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-exactconnect-900 to-exactconnect-600 flex items-center justify-center text-white mb-4 shadow-lg animate-pulse">
//               <CreditCard className="h-10 w-10" />
//             </div>
//             <h2 className="text-2xl font-bold text-exactconnect-900 mb-2">VCC Management Suite Coming Soon</h2>
//             <p className="text-gray-600 max-w-2xl">
//               We're building a comprehensive virtual card management system. Soon, you'll be able to create, fund, and manage multiple VCC cards from this dashboard, with complete control over spending limits and security features.
//             </p>
            
//             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
//               <div className="p-4 rounded-lg border border-exactconnect-100 bg-white/60 flex flex-col items-center text-center">
//                 <div className="w-12 h-12 rounded-full bg-exactconnect-100 flex items-center justify-center mb-3 text-exactconnect-600">
//                   <Plus className="h-5 w-5" />
//                 </div>
//                 <h3 className="font-medium text-exactconnect-900">Card Creation</h3>
//                 <p className="text-sm text-gray-600">Create cards with custom limits and expiration dates</p>
//               </div>
              
//               <div className="p-4 rounded-lg border border-exactconnect-100 bg-white/60 flex flex-col items-center text-center">
//                 <div className="w-12 h-12 rounded-full bg-exactconnect-100 flex items-center justify-center mb-3 text-exactconnect-600">
//                   <Wallet className="h-5 w-5" />
//                 </div>
//                 <h3 className="font-medium text-exactconnect-900">Instant Funding</h3>
//                 <p className="text-sm text-gray-600">Fund your cards instantly from your account balance</p>
//               </div>
              
//               <div className="p-4 rounded-lg border border-exactconnect-100 bg-white/60 flex flex-col items-center text-center">
//                 <div className="w-12 h-12 rounded-full bg-exactconnect-100 flex items-center justify-center mb-3 text-exactconnect-600">
//                   <Shield className="h-5 w-5" />
//                 </div>
//                 <h3 className="font-medium text-exactconnect-900">Security Controls</h3>
//                 <p className="text-sm text-gray-600">Lock, unlock, or delete cards with a single click</p>
//               </div>
//             </div>
            
//             <div className="mt-6 flex items-center p-5 bg-gradient-to-r from-amber-50 to-amber-100/50 text-amber-800 rounded-lg border border-amber-200">
//               <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0 text-amber-600" />
//               <span className="text-amber-700">Our development team is working hard to bring you these features soon. Stay tuned for updates!</span>
//             </div>
            
//             <button className="mt-6 group inline-flex items-center px-4 py-2 bg-exactconnect-900 text-white rounded-lg hover:bg-exactconnect-600 transition-colors cursor-not-allowed opacity-80">
//               Join the waiting list
//               <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default VccPage;

import { useState } from 'react';
import { CreditCard, AlertCircle, Wallet, Clock, Shield, ChevronRight, Link } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const VccPage = () => {
  const [rotated, setRotated] = useState(false);

  const features = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Enhanced Security",
      description: "Protect your purchases with temporary virtual cards that keep your main account secure."
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Instant Issuance",
      description: "Create new cards in seconds whenever you need them for online transactions."
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      title: "Flexible Limits",
      description: "Set custom spending limits for each card to maintain control over your budget."
    }
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header Section - Enhanced with gold/purple color scheme */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-700 to-amber-500 p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="space-y-4 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Virtual Credit Cards</h1>
            <p className="text-white/90 max-w-md">
              Secure, flexible, and convenient digital payment solutions for all your online services.
            </p>
          </div>
          <div className="flex items-center px-6 py-3 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 hover:bg-white/30 transition-all cursor-not-allowed">
            <Link className="h-5 w-5 text-white mr-2" />
            <span className="text-white font-medium">Create New Card</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card Preview Section - Reduced golden background, more purplish */}
        <div className="lg:col-span-2">
          <Card className="shadow-md border-amber-200 overflow-hidden h-full">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-50">
              <CardTitle className="text-purple-900 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-amber-600" />
                Card Preview
              </CardTitle>
              <CardDescription className="text-gray-600">
                Click the card to view the front and back
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="max-w-md mx-auto">
                <div 
                  className={`relative w-full aspect-[85/53] rounded-xl shadow-xl transition-all duration-700 transform hover:shadow-2xl cursor-pointer ${rotated ? 'rotate-y-180' : ''}`}
                  style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                  onClick={() => setRotated(!rotated)}
                >
                  {/* Front of the card - Enhanced gold/purple gradient */}
                  <div 
                    className={`absolute inset-0 w-full h-full rounded-xl p-6 flex flex-col justify-between bg-gradient-to-br from-purple-800 via-purple-600 to-amber-500 text-white ${rotated ? 'opacity-0' : 'opacity-100'}`}
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      transition: 'opacity 0.2s ease-out',
                      boxShadow: '0 8px 24px rgba(110, 89, 165, 0.25)'
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-sm uppercase tracking-wider text-white/90">Virtual Card</span>
                        <span className="text-lg font-semibold tracking-wider mt-1 text-white">EXACTCONNECT</span>
                      </div>
                      <div className="w-12 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded opacity-90"></div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-white/90">Card Number</span>
                        <div className="flex items-center">
                          <span className="text-lg tracking-widest mt-1 font-mono text-white">**** **** **** 1234</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs uppercase tracking-wider text-white/90">Card Holder</span>
                          <span className="text-sm tracking-wide mt-1 text-white">JOHN DOE</span>
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-xs uppercase tracking-wider text-white/90">Expires</span>
                          <span className="text-sm tracking-wide mt-1 text-white">04/25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of the card */}
                  <div 
                    className={`absolute inset-0 w-full h-full rounded-xl flex flex-col bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/85 text-white ${rotated ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      transform: 'rotateY(180deg)', 
                      transition: 'opacity 0.2s ease-out',
                      boxShadow: '0 8px 24px rgba(26, 31, 44, 0.3)'
                    }}
                  >
                    <div className="w-full h-12 bg-black mt-5"></div>
                    
                    <div className="px-6 mt-4 flex flex-col">
                      <div className="flex justify-end items-center mb-4">
                        <div className="w-9/12 h-10 bg-white bg-opacity-90 rounded flex items-center justify-end px-4">
                          <span className="text-gray-800 font-mono text-sm">123</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto mb-6 text-xs text-white/90 text-center">
                        <p>This card is issued by ExactConnect. For customer service, please visit exactconnect.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Services Section - More purplish with less gold */}
        <div className="lg:col-span-1">
          <Card className="shadow-md border-purple-200 h-full bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-100/70 to-purple-50">
              <CardTitle className="text-purple-900">Payment Services Integration</CardTitle>
              <CardDescription className="text-gray-700">
                Link your VCC with online payment systems
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-purple-800">
                  Connect your VCC with your favorite online services. Perfect for subscriptions with PayPal, AWS, Google Cloud, and more.
                </p>
                
                <ul className="space-y-2 text-sm text-purple-700 list-disc pl-5">
                  <li>PayPal integration</li>
                  <li>AWS & Google Cloud billing</li>
                  <li>Subscription management</li>
                  <li>Online service payments</li>
                </ul>
                
                <div className="pt-4">
                  <button className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-medium rounded-md transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
        
      {/* Coming Soon Section - Subtle theme */}
      <Card className="shadow-md border-purple-100/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-transparent pointer-events-none"></div>
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-900 to-amber-500 flex items-center justify-center text-white mb-4 shadow-lg animate-pulse">
              <CreditCard className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-purple-900 mb-2">VCC Management Suite Coming Soon</h2>
            <p className="text-gray-600 max-w-2xl">
              We're building a comprehensive virtual card management system. Soon, you'll be able to create, fund, and manage multiple VCC cards from this dashboard, with complete control over spending limits and security features.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
              <div className="p-4 rounded-lg border border-purple-100 bg-white/60 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-100 flex items-center justify-center mb-3 text-purple-600">
                  <Link className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-purple-900">Service Integration</h3>
                <p className="text-sm text-gray-600">Link with cloud services and online payment platforms</p>
              </div>
              
              <div className="p-4 rounded-lg border border-purple-100 bg-white/60 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-100 flex items-center justify-center mb-3 text-purple-600">
                  <Wallet className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-purple-900">Instant Funding</h3>
                <p className="text-sm text-gray-600">Fund your cards instantly from your account balance</p>
              </div>
              
              <div className="p-4 rounded-lg border border-purple-100 bg-white/60 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-100 flex items-center justify-center mb-3 text-purple-600">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-purple-900">Security Controls</h3>
                <p className="text-sm text-gray-600">Lock, unlock, or delete cards with a single click</p>
              </div>
            </div>
            
            <div className="mt-6 flex items-center p-5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 rounded-lg border border-purple-200">
              <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0 text-purple-600" />
              <span className="text-purple-700">Our development team is working hard to bring you these features soon. Stay tuned for updates!</span>
            </div>
            
            <button className="mt-6 group inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 transition-colors cursor-not-allowed opacity-80">
              Join the waiting list
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VccPage;