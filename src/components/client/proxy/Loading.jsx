// //Component which handles the loading
// import React from 'react';
// import { DatabaseZap } from 'lucide-react';

// function Loading({ loading, filteredProxies, error, darkMode }) {
//   return (
//     <div>
//       {loading ? (
//         <div className="mt-48 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
//           {Array.from({ length: 8 }).map((_, index) => (
//             <div
//               key={index}
//               className={` p-6 border rounded-lg shadow-lg bg-gray-200 dark:bg-[#131312] animate-pulse ${
//                 darkMode ? 'border-gray-700' : 'border-gray-100'
//               }`}
//             >
//               <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
//               <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
//               <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
//             </div>
//           ))}
//         </div>
//       ) : error ? (
//         <div className="text-red-600 text-center">Error: {error}</div>
//       ) : filteredProxies.length === 0 ? (
//         <div className="flex mt-48 flex-col items-center justify-center py-20 dark:text-white">
//           <DatabaseZap className="h-10 w-10" />
//           <p>No proxies found.</p>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// export default Loading;


import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const Loading = ({ loading, error, darkMode, filteredProxies }) => {
  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center p-12 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 border-4 border-t-[#9b87f5] border-r-[#D6BCFA] border-b-[#7E69AB] border-l-[#E5DEFF] rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-medium">Loading proxies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 mx-4 my-4 rounded-lg ${darkMode ? 'bg-red-900/20 text-red-200 border border-red-800' : 'bg-red-50 text-red-600 border border-red-200'}`}>
        <FiAlertCircle size={40} className="mb-2" />
        <h3 className="text-lg font-semibold mb-1">Error Loading Proxies</h3>
        <p>{error?.message || "Failed to load proxies. Please try again later."}</p>
      </div>
    );
  }

  if (filteredProxies?.length === 0 && !loading) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 mx-4 my-4 rounded-lg ${darkMode ? 'bg-gray-800/50 text-gray-300 border border-gray-700' : 'bg-purple-50 text-gray-600 border border-purple-200'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold mb-1">No Proxies Found</h3>
        <p className="text-center">Try adjusting your filters or selecting a different country.</p>
      </div>
    );
  }

  return null;
};

export default Loading;
