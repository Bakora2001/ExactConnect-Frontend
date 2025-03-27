import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  setCurrentPage,
  loading,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile && currentPage < totalPages - 1) {
    return (
      <div className="flex justify-center mb-2">
        <button
          className={`px-4 py-3 rounded-lg shadow-md transition flex items-center gap-2 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#7e22ce] dark:bg-[#131312] text-white hover:bg-[#6b21a8] dark:border-gray-700 border'
          }`}
          onClick={handleNextPage}
          disabled={loading}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {loading ? 'Loading...' : 'Show more'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
      <button
        className="px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-600 transition disabled:opacity-50"
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
      >
        <ChevronLeft />
      </button>

      {/* Pagination Numbers */}
      {Array.from({ length: totalPages }, (_, index) => {
        if (
          index === 0 || // First Page
          index === totalPages - 1 || // Last Page
          (index >= currentPage - 2 && index <= currentPage + 2) // Nearby Pages
        ) {
          return (
            <button
              key={index}
              className={`px-4 py-2 ${
                index === currentPage
                  ? 'bg-[#7e22ce] text-white'
                  : 'bg-gray-700 text-white'
              } rounded-md shadow-md hover:bg-gray-600 transition`}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          );
        }

        if (
          index === currentPage - 3 || // Ellipsis before current page
          index === currentPage + 3 // Ellipsis after current page
        ) {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-gray-500 select-none"
            >
              ...
            </span>
          );
        }

        return null;
      })}

      <button
        className="px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-600 transition disabled:opacity-50"
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Pagination;
