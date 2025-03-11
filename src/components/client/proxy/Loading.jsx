//Component which handles the loading
import React from 'react';
import { DatabaseZap } from 'lucide-react';

function Loading({ loading, filteredProxies, error, darkMode }) {
  return (
    <div>
      {loading ? (
        <div className="mt-48 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={` p-6 border rounded-lg shadow-lg bg-gray-200 dark:bg-[#131312] animate-pulse ${
                darkMode ? 'border-gray-700' : 'border-gray-100'
              }`}
            >
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
              <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">Error: {error}</div>
      ) : filteredProxies.length === 0 ? (
        <div className="flex mt-48 flex-col items-center justify-center py-20 dark:text-white">
          <DatabaseZap className="h-10 w-10" />
          <p>No proxies found.</p>
        </div>
      ) : null}
    </div>
  );
}

export default Loading;
