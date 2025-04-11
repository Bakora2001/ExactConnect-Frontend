// //Component which has the pagination logic

// const Pagination = ({
//   currentPage,
//   totalPages,
//   handlePreviousPage,
//   handleNextPage,
//   setCurrentPage,
// }) => (
//   <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
//     <button
//       className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
//       onClick={handlePreviousPage}
//       disabled={currentPage === 0}
//     >
//       Previous
//     </button>

//     {/* Pagination Numbers */}
//     {Array.from({ length: totalPages }, (_, index) => {
//       if (
//         index === 0 || // First Page
//         index === totalPages - 1 || // Last Page
//         (index >= currentPage - 2 && index <= currentPage + 2) // Nearby Pages
//       ) {
//         return (
//           <button
//             key={index}
//             className={`px-4 py-2 ${index === currentPage
//                 ? 'bg-[#7e22ce] text-white'
//                 : 'bg-gray-700 text-white'
//               } rounded-md shadow-md hover:bg-gray-600 transition`}
//             onClick={() => setCurrentPage(index)}
//           >
//             {index + 1}
//           </button>
//         );
//       }

//       if (
//         index === currentPage - 3 || // Ellipsis before current page
//         index === currentPage + 3 // Ellipsis after current page
//       ) {
//         return (
//           <span
//             key={`ellipsis-${index}`}
//             className="px-2 text-gray-500 select-none"
//           >
//             ...
//           </span>
//         );
//       }

//       return null;
//     })}

//     <button
//       className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
//       onClick={handleNextPage}
//       disabled={currentPage === totalPages - 1}
//     >
//       Next
//     </button>
//   </div>
// );

// export default Pagination;

import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  handlePreviousPage, 
  handleNextPage, 
  setCurrentPage 
}) => {
  // Calculate page range to display
  const getPageNumbers = () => {
    const pageRange = 2; // Number of pages to show before and after current
    const pages = [];
    
    // Always show first page
    pages.push(0);
    
    let startPage = Math.max(1, currentPage - pageRange);
    let endPage = Math.min(totalPages - 1, currentPage + pageRange);
    
    // Add ellipsis after first page if needed
    if (startPage > 1) {
      pages.push('...');
    }
    
    // Add page numbers between start and end
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 2) {
      pages.push('...');
    }
    
    // Always show last page if there are multiple pages
    if (totalPages > 1) {
      pages.push(totalPages - 1);
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center py-6">
      <div className="flex items-center space-x-1">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`p-2 rounded-md ${
            currentPage === 0
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-purple-100 dark:hover:bg-gray-800'
          } transition-colors`}
        >
          <FiChevronLeft className="text-[#7E69AB]" size={20} />
        </button>
        
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            className={`
              h-10 w-10 flex items-center justify-center rounded-md font-medium
              ${
                page === currentPage
                  ? 'bg-[#9b87f5] text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-800'
              }
              ${
                page === '...'
                  ? 'cursor-default'
                  : 'cursor-pointer'
              }
              transition-colors
            `}
            disabled={page === '...'}
          >
            {page === '...' ? '...' : page + 1}
          </button>
        ))}
        
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`p-2 rounded-md ${
            currentPage === totalPages - 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-purple-100 dark:hover:bg-gray-800'
          } transition-colors`}
        >
          <FiChevronRight className="text-[#7E69AB]" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;