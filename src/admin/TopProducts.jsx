// src/admin/TopProducts.jsx
import React from 'react';

const TopProducts = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg min-h-[646px] relative">
      <h2 className="text-xl font-semibold text-white">Top Products</h2>
      <p className="text-gray-400 mb-8">Best selling products</p>
      <div className="flex justify-center items-center my-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-700 rounded-full w-24 h-24"></div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 w-20 h-20 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 3h-1a2 2 0 0 0-2 2v1H9V5a2 2 0 0 0-2-2H6"></path>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-6 right-6">
        <a href="#" className="text-red-500 flex items-center">
          View all <i className="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>
  );
};

export default TopProducts;
