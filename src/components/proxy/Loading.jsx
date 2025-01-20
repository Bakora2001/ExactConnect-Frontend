//Component which handles the loading
import React from 'react'

function Loading({loading,filteredProxies,error}) {
  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <div className="w-20 h-20 border-4 border-t-[#7e22ce] border-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-400">Loading proxies...</p>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">Error: {error}</div>
      ) : filteredProxies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mb-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a7 7 0 00-7 7v4.586l-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293h10.172l1.293 1.293a1 1 0 001.414-1.414l-1.293-1.293V9a7 7 0 00-7-7zm-2 8a1 1 0 112 0 1 1 0 01-2 0zm4 0a1 1 0 112 0 1 1 0 01-2 0z" />
          </svg>
          <p>No proxies found.</p>
        </div>
      ) : null}
    </div>
  )
}

export default Loading