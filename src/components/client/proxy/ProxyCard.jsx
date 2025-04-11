// // This component renders the proxies in cards

// import { MapPin, Wifi, Globe, DollarSign, Signal, Star } from 'lucide-react';

// const ProxyCard = ({
//   filteredProxies,
//   darkMode,
//   selectedRow,
//   handleRowClick,
// }) => (
//   <div className="mt-28 w-full px-4 sm:px-6 lg:px-8 py-12">
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {filteredProxies.map((proxy, index) => (
//         <div
//           key={proxy.id}
//           className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform border ${
//             darkMode
//               ? 'border-gray-700 bg-[#0c0b08]'
//               : 'border-gray-100 bg-white'
//           } ${
//             index === selectedRow ? 'scale-105 border-purple-400 shadow-lg' : ''
//           } cursor-pointer`}
//           onClick={() => handleRowClick(index, proxy)}
//         >
//           {/* Proxy Header */}
//           <div className="p-4 pb-2 flex flex-row items-center justify-between bg-muted/40 rounded-t-lg">
//             <div className="flex items-center gap-2">
//               <h1 className="font-mono text-sm font-medium ">{proxy.ip}</h1>
//             </div>
//             <button
//               className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
//                 proxy.conn === 'cell'
//                   ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300'
//                   : 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300'
//               }`}
//             >
//               {proxy.conn === 'cell' ? (
//                 <Signal className="h-3.5 w-3.5 mr-1" />
//               ) : (
//                 <Wifi className="h-3.5 w-3.5 mr-1" />
//               )}
//               {proxy.conn === 'cell' ? 'Cellular' : 'WiFi'}
//             </button>
//           </div>

//           {/* Proxy Details */}
//           <div className="p-4 pt-3">
//             <div className="space-y-3">
//               {/* Location Information */}
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <img
//                       src={`https://flagsapi.com/${proxy.loc.cc}/flat/64.png`}
//                       className="w-5 h-3.5 rounded-sm shadow-sm"
//                       alt={`${proxy.loc.cc} flag`}
//                     />
//                     <span className="text-sm text-muted-foreground">
//                       Country:
//                     </span>
//                   </div>
//                   <span className="text-sm font-medium">{proxy.loc.cc}</span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <MapPin size={14} className="text-primary" />
//                     <span className="text-sm text-muted-foreground">City:</span>
//                   </div>
//                   <span className="text-sm font-medium">{proxy.loc.city}</span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Globe size={14} className="text-primary" />
//                     <span className="text-sm text-muted-foreground">ISP:</span>
//                   </div>
//                   <span
//                     className="text-sm font-medium truncate max-w-[60%]"
//                     title={proxy.loc.isp}
//                   >
//                     {proxy.loc.isp}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <DollarSign size={14} className="text-primary" />
//                     <span className="text-md font-bold text-muted-foreground ">
//                       Price:
//                     </span>
//                   </div>
//                   <span className=" font-bold  text-purple-600">
//                     $
//                     {proxy?.priceShrC !== null
//                       ? proxy?.priceShrC
//                       : proxy?.priceExcC}
//                   </span>
//                 </div>
//               </div>

//               {/* Stats Section */}
//               <div className="grid grid-cols-2 gap-2 pt-3 mt-1 border-t dark:border-gray-700">
//                 <div className="flex items-center gap-2 py-1">
//                   <div className="flex items-center gap-1 text-amber-500">
//                     <Star className="h-3.5 w-3.5 fill-amber-500" />
//                     <span className="text-sm font-medium">{proxy.stars}</span>
//                   </div>
//                   <span className="text-xs text-muted-foreground">Rating</span>
//                 </div>

//                 <div className="flex items-center justify-end gap-1 py-1">
//                   <span className="text-sm font-medium">
//                     {proxy.speed?.speed
//                       ? (proxy.speed.speed / 1000000).toFixed(2) + ' Mbps'
//                       : 'N/A'}
//                   </span>
//                   <span className="text-xs text-muted-foreground">Speed</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default ProxyCard;



import React, { useState } from 'react';
import { FiStar, FiWifi, FiSmartphone } from 'react-icons/fi';

const ProxyCard = ({ filteredProxies, darkMode, selectedRow, handleRowClick }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to data
  const getSortedProxies = () => {
    if (!sortConfig.key) return filteredProxies;
    
    return [...filteredProxies].sort((a, b) => {
      // Handle nested properties
      let aValue = sortConfig.key.includes('.') ? 
        sortConfig.key.split('.').reduce((obj, key) => obj?.[key], a) : 
        a[sortConfig.key];
      
      let bValue = sortConfig.key.includes('.') ? 
        sortConfig.key.split('.').reduce((obj, key) => obj?.[key], b) : 
        b[sortConfig.key];
      
      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'ascending' ? 
          aValue.localeCompare(bValue) : 
          bValue.localeCompare(aValue);
      }
      
      // Handle numeric comparison
      if (sortConfig.direction === 'ascending') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FiStar key={i} className="fill-[#9b87f5] text-[#9b87f5]" />);
      } else {
        stars.push(<FiStar key={i} className="text-gray-400" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  const getConnectionIcon = (type) => {
    if (type?.toLowerCase().includes('cell')) {
      return <FiSmartphone className="mr-1 text-orange-500" />;
    }
    return <FiWifi className="mr-1 text-blue-500" />;
  };

  // Safe display of speed value
  const displaySpeed = (speed) => {
    if (typeof speed === 'object') return '100 Mbps';
    if (!speed) return '100 Mbps';
    return `${speed} Mbps`;
  };

  return (
    <div className={`p-2 mx-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-[#f8f5ff] text-gray-700'} text-xs`}>
              <th className="px-2 py-1.5 text-left font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('loc.city')}>
                City {getSortIndicator('loc.city')}
              </th>
              <th className="px-2 py-1.5 text-left font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('loc.isp')}>
                ISP {getSortIndicator('loc.isp')}
              </th>
              <th className="px-2 py-1.5 text-left font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('conn')}>
                Conn {getSortIndicator('conn')}
              </th>
              <th className="px-2 py-1.5 text-left font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('speed')}>
                Speed {getSortIndicator('speed')}
              </th>
              <th className="px-2 py-1.5 text-left font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('rating')}>
                Rating {getSortIndicator('rating')}
              </th>
              <th className="px-2 py-1.5 text-left font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('price')}>
                Price {getSortIndicator('price')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getSortedProxies().map((proxy, index) => (
              <tr 
                key={index}
                onClick={() => handleRowClick(index, proxy)}
                className={`text-xs ${
                  selectedRow === index 
                    ? darkMode 
                      ? 'bg-purple-900/30 border-l-4 border-purple-500' 
                      : 'bg-purple-50 border-l-4 border-purple-500'
                    : darkMode 
                      ? 'hover:bg-gray-800' 
                      : 'hover:bg-purple-50'
                } cursor-pointer transition-colors`}
              >
                <td className="px-2 py-1.5 whitespace-nowrap">
                  {proxy.loc?.city || 'Unknown'}
                </td>
                <td className="px-2 py-1.5 whitespace-nowrap">
                  {proxy.loc?.isp || 'Unknown'}
                </td>
                <td className="px-2 py-1.5 whitespace-nowrap">
                  <div className="flex items-center">
                    {getConnectionIcon(proxy.conn)}
                    <span>{proxy.conn || 'Unknown'}</span>
                  </div>
                </td>
                <td className="px-2 py-1.5 whitespace-nowrap">
                  {displaySpeed(proxy.speed)}
                </td>
                <td className="px-2 py-1.5 whitespace-nowrap">
                  {getRatingStars(proxy.rating || proxy.stars || 0)}
                </td>
                <td className="px-2 py-1.5 whitespace-nowrap">
                  <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    ${(proxy.price || proxy.priceShrC || 0).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">/mo</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProxyCard;