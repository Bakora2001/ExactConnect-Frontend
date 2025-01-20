//Component which has the pagination logic

const Pagination = ({
  currentPage, totalPages, handlePreviousPage,handleNextPage,setCurrentPage
}) => (
  <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            Previous
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
            className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
)

export default Pagination