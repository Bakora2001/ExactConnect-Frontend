import React, { useState, useEffect } from 'react';
import { X, Clock, MapPin, Wifi, Server, Shield, CreditCard, RefreshCw } from 'lucide-react';
import Test from '../../../components/payment/Test';

const ProxyDetails = ({ rowData, setSelectedRow, darkMode = false }) => {
  // Safe display of values - convert objects to strings if needed
  const safeDisplay = (value) => {
    if (value === null || value === undefined) return 'Unknown';
    if (typeof value === 'object') return JSON.stringify(value);
    return value;
  };
  
  // Only daily plan as requested
  const dailyPlan = {
    price: rowData?.price || rowData?.priceShrC || 1.99,
    interval: '/day',
    discount: 0
  };

  const [isOpen, setIsOpen] = useState(true);
  const [paymentOpen, setPaymentOpen] = useState(false);

  // Add animation effect when opening
  useEffect(() => {
    if (rowData) {
      setIsOpen(true);
    }
  }, [rowData]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedRow(null), 200); // Wait for animation to complete
  };

  const handlePaymentOpen = () => {
    setPaymentOpen(true);
  };

  if (!rowData) return null;

  return (
    <>
      {/* Fixed overlay with blur effect */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      {/* Modal Dialog - Adjusted size with no scrolling needed */}
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
        <div className="sm:max-w-[700px] w-full mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95">
          {/* Header with softer golden-purple gradient */}
          <div className="bg-gradient-to-r from-[#e6c77e] to-[#9b87f5] text-white py-3 px-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Proxy Details</h3>
              <button 
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-white/80 text-sm">{rowData.ip || 'IP Not Available'}</p>
          </div>
          
          <div className="p-5">
            <div className="space-y-3">
              {/* Grid layout with 2 columns to save vertical space */}
              <div className="grid grid-cols-2 gap-3">
                {/* Basic Information */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-3 rounded-lg shadow-sm`}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>IP Address</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{safeDisplay(rowData.ip || 'Not available')}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Region</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{safeDisplay(rowData.loc?.regionName || rowData.loc?.reg || 'Unknown')}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>City</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{safeDisplay(rowData.loc?.city || 'Unknown')}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>ZIP</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{safeDisplay(rowData.loc?.zip || 'Unknown')}</p>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-amber-50'} p-3 rounded-lg shadow-sm`}>
                  <h4 className={`text-xs font-medium ${darkMode ? 'text-amber-300' : 'text-amber-800'} mb-2 flex items-center`}>
                    <MapPin className="mr-1" size={14} /> Location
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Country</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>
                        {rowData.loc?.country || rowData.loc?.cc || 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>ISP</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{safeDisplay(rowData.loc?.isp || 'Unknown')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Connection Information */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-purple-50'} p-3 rounded-lg shadow-sm`}>
                  <h4 className={`text-xs font-medium ${darkMode ? 'text-purple-300' : 'text-purple-800'} mb-2 flex items-center`}>
                    <Wifi className="mr-1" size={14} /> Connection
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Type</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{safeDisplay(rowData.conn || 'Wifi')}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ping</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{safeDisplay(rowData.ping || '25')} ms</p>
                    </div>
                  </div>
                </div>
                
                {/* Technical Information */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-3 rounded-lg shadow-sm`}>
                  <h4 className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'} mb-2 flex items-center`}>
                    <Server className="mr-1" size={14} /> Technical
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Protocol</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>SOCKS5/HTTPS</p>
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Type</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>Private</p>
                    </div>
                  </div>
                </div>

                {/* Features - Status card */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-green-50'} p-3 rounded-lg shadow-sm`}>
                  <h4 className={`text-xs font-medium ${darkMode ? 'text-green-300' : 'text-green-800'} mb-2 flex items-center`}>
                    <Shield className="mr-1" size={14} /> Status
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rating</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{safeDisplay(rowData.rating || rowData.stars || 0)}/5</p>
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>${safeDisplay(rowData.priceShrC || rowData.price || '1.99')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Plan - Enhanced with golden-purple theme */}
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-200'} border rounded-lg p-3 shadow-sm mt-1`}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <CreditCard className="mr-2" size={16} />
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Daily Plan
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ${dailyPlan.price.toFixed(2)}
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} ml-1 font-normal`}>
                        {dailyPlan.interval}
                      </span>
                    </div>
                  </div>
                </div>

                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center mb-3`}>
                  <Clock className="mr-1" size={14} />
                  24 hours access
                </p>

                <div className="flex gap-3">
                  <button 
                    onClick={handlePaymentOpen}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-[#d9b86c] to-[#9b87f5] hover:from-[#c4a660] hover:to-[#8a78d8] text-white font-medium rounded-md transition-colors text-sm"
                  >
                    Purchase Proxy
                  </button>
                  
                  <button className={`py-2 px-4 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} font-medium rounded-md transition-colors text-sm flex items-center justify-center`}>
                    <RefreshCw className="mr-1" size={14} /> Renewal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {paymentOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPaymentOpen(false)}
          />
          <div className="sm:max-w-[550px] w-full mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden relative z-10" style={{ maxHeight: 'calc(100vh - 180px)', margin: '90px auto' }}>
            <div className="bg-gradient-to-r from-[#d9b86c] to-[#9b87f5] p-4 text-white">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Payment Methods</h3>
                <button 
                  onClick={() => setPaymentOpen(false)}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <Test 
              amount={dailyPlan.price}
              isp={rowData.loc?.isp}
              proxyId={rowData.id}
              countryCode={rowData.loc?.cc}
              rating={rowData.rating || rowData.stars}
              proxyState={rowData.leases?.worn}
              onClose={() => setPaymentOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProxyDetails;





// //Component to more details about a proxy
// import { Link } from 'react-router-dom';

// function ProxyDetails({ rowData, setSelectedRow }) {
//   // console.log(rowData);
//   return (
//     <div className="fixed inset-0 z-50 flex">
//       <div className="w-[350px] p-6 text-white bg-[#1f1f1e] h-full shadow-lg">
//         <button
//           onClick={() => setSelectedRow(null)}
//           className="absolute text-xl text-gray-400 hover:text-gray-300 top-4 right-4"
//         >
//           ×
//         </button>
//         <h2 className="mb-4 text-xl font-bold">Proxy Details</h2>
//         <div className="space-y-2 text-sm text-gray-400">
//           <p>
//             <strong>IP:</strong> {rowData.ip}
//           </p>
//           <p>
//             <strong>Country:</strong> {rowData.loc.cc}
//           </p>
//           <p>
//             <strong>Region:</strong> {rowData.loc.reg}
//           </p>
//           <p>
//             <strong>City:</strong> {rowData.loc.city}
//           </p>
//           <p>
//             <strong>ZIP:</strong> {rowData.loc.zip}
//           </p>
//           <p>
//             <strong>Rating:</strong> {rowData.stars}
//           </p>
//           <p>
//             <strong>ISP:</strong> {rowData.loc.isp}
//           </p>
//           <p>
//             <strong>Clean:</strong> {rowData.clean ? 'Yes' : 'No'}
//           </p>
//           <p>
//             <strong>Shared:</strong> {rowData.shared}
//           </p>
//           <p>
//             <strong>Connections:</strong> {rowData.conn}
//           </p>
//           <p>
//             <strong>New:</strong> {rowData.new ? 'Yes' : 'No'}
//           </p>
//           <p>
//             <strong>Price:</strong> $ {rowData.priceShrC}
//           </p>
//         </div>
//         <Link
//           to="/checkout/mpesa"
//           state={{
//             amount: rowData.priceShrC,
//             isp: rowData.loc.isp,
            
//             proxyId: rowData.id,
//             countryCode: rowData.loc.cc,
//             rating: rowData.stars,
//             proxyState: rowData.leases.worn,
//           }}
//         >
//           <button className="w-full px-4 py-2 mt-6 text-white bg-[#7e22ce] rounded-lg hover:bg-[#5c1ca1] transition">
//             Purchase proxy
//           </button>
//         </Link>
//       </div>
//       <div
//         className="flex-1 bg-black bg-opacity-50"
//         onClick={() => setSelectedRow(null)}
//       ></div>
//     </div>
//   );
// }







// import React, { useState } from 'react';
// import { X, Clock, MapPin, Wifi, Server, Shield, CreditCard, RefreshCw } from 'lucide-react';
// import Test from '../../../components/payment/Test';

// const ProxyDetails = ({ rowData, setSelectedRow }) => {
//   // Safe display of values - convert objects to strings if needed
//   const safeDisplay = (value) => {
//     if (value === null || value === undefined) return 'Unknown';
//     if (typeof value === 'object') return JSON.stringify(value);
//     return value;
//   };
  
//   // Only daily plan as requested
//   const dailyPlan = {
//     price: rowData.price || rowData.priceShrC || 1.99,
//     interval: '/day',
//     discount: 0
//   };

//   const [paymentOpen, setPaymentOpen] = useState(false);

//   return (
//     <div className="fixed right-0 bottom-0 top-[240px] w-[300px] sm:w-72 bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-20 overflow-y-auto transition-transform transform">
//       <div className="sticky top-0 bg-gray-800 text-white py-3 px-4 flex justify-between items-center">
//         <h3 className="text-sm font-bold">Proxy Details</h3>
//         <button 
//           onClick={() => setSelectedRow(null)}
//           className="p-1 rounded-full hover:bg-gray-700 transition-colors"
//         >
//           <X size={18} />
//         </button>
//       </div>
      
//       <div className="p-3">
//         <div className="space-y-4 text-xs">
//           {/* Basic Information */}
//           <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">IP</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{safeDisplay(rowData.ip || 'Not available')}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Region</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{safeDisplay(rowData.loc?.regionName || rowData.loc?.reg || 'Unknown')}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">City</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{safeDisplay(rowData.loc?.city || 'Unknown')}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">ZIP</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{safeDisplay(rowData.loc?.zip || 'Unknown')}</p>
//               </div>
//             </div>
//           </div>

//           {/* Location Information */}
//           <div className="bg-purple-50 dark:bg-gray-800 p-3 rounded-lg">
//             <h4 className="text-xs font-medium text-purple-800 dark:text-purple-300 mb-2 flex items-center">
//               <MapPin className="mr-1" size={14} /> Location
//             </h4>
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Country</p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {rowData.loc?.country || rowData.loc?.cc || 'Unknown'}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">ISP</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{safeDisplay(rowData.loc?.isp || 'Unknown')}</p>
//               </div>
//             </div>
//           </div>

//           {/* Connection Information */}
//           <div className="bg-blue-50 dark:bg-gray-800 p-3 rounded-lg">
//             <h4 className="text-xs font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
//               <Wifi className="mr-1" size={14} /> Connection
//             </h4>
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{safeDisplay(rowData.conn || 'Wifi')}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Ping</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{safeDisplay(rowData.ping || '25')} ms</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Connection</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{safeDisplay(rowData.type || 'Wifi')}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">New</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{safeDisplay(rowData.new ? 'Yes' : 'No')}</p>
//               </div>
//             </div>
//           </div>

//           {/* Technical Information */}
//           <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
//             <h4 className="text-xs font-medium text-gray-800 dark:text-gray-300 mb-2 flex items-center">
//               <Server className="mr-1" size={14} /> Technical Details
//             </h4>
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Protocol</p>
//                 <p className="font-medium text-gray-900 dark:text-white">SOCKS5/HTTPS</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
//                 <p className="font-medium text-gray-900 dark:text-white">Private</p>
//               </div>
//             </div>
//           </div>

//           {/* Features */}
//           <div className="bg-green-50 dark:bg-gray-800 p-3 rounded-lg">
//             <h4 className="text-xs font-medium text-green-800 dark:text-green-300 mb-2 flex items-center">
//               <Shield className="mr-1" size={14} /> Status
//             </h4>
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{safeDisplay(rowData.rating || rowData.stars || 0)}/5</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
//                 <p className="font-medium text-gray-900 dark:text-white">${safeDisplay(rowData.priceShrC || rowData.price || '1.99')}</p>
//               </div>
//             </div>
//           </div>

//           {/* Pricing Plan - Only Daily */}
//           <div className="mt-3">
//             <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2 flex items-center">
//               <CreditCard className="mr-1" size={14} /> Pricing Plan
//             </h4>

//             <div className="bg-white dark:bg-gray-800 border border-purple-200 dark:border-gray-700 rounded-lg p-3">
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h5 className="font-medium text-sm text-gray-900 dark:text-white">
//                     Daily Plan
//                   </h5>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
//                     <Clock className="mr-1" size={10} />
//                     24 hours
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-base font-bold text-gray-900 dark:text-white">
//                     ${dailyPlan.price.toFixed(2)}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     {dailyPlan.interval}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <button 
//                   onClick={() => setPaymentOpen(true)}
//                   className="flex-1 w-full py-2 px-3 bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-medium rounded-md transition-colors text-xs"
//                 >
//                   Purchase Proxy
//                 </button>
                
//                 <button className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors text-xs flex items-center">
//                   <RefreshCw className="mr-1" size={12} /> Renewal
//                 </button>
//               </div>
              
//               {paymentOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                   <div className="bg-white rounded-lg w-full max-w-md">
//                     <Test 
//                       amount={dailyPlan.price.toFixed(2)}
//                       isp={rowData.loc?.isp}
//                       proxyId={rowData.id}
//                       countryCode={rowData.loc?.cc}
//                       rating={rowData.rating || rowData.stars}
//                       proxyState={rowData.leases?.worn}
//                       onClose={() => setPaymentOpen(false)}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProxyDetails;