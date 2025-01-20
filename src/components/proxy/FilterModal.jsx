//Filter component to handle filtering the data
const FilterModal = ({
  filters,handleFilterChange,toggleFilterModal
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold">Filter</h2>
      <button
        onClick={toggleFilterModal}
        className="text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Price</label>
      <input
        type="number"
        name="price"
        value={filters.price}
        onChange={handleFilterChange}
        placeholder="Max price"
        className="border border-gray-300 rounded-md p-2 w-full"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Location</label>
      <input
        type="text"
        name="location"
        value={filters.location}
        onChange={handleFilterChange}
        placeholder="Location"
        className="border border-gray-300 rounded-md p-2 w-full"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">ISP</label>
      <input
        type="text"
        name="isp"
        value={filters.isp}
        onChange={handleFilterChange}
        placeholder="ISP"
        className="border border-gray-300 rounded-md p-2 w-full"
      />
    </div>
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={toggleFilterModal}
        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        Reset
      </button>
      <button
        onClick={toggleFilterModal}
        className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
      >
        Apply Now
      </button>
    </div>
  </div>
</div> 
)
export default FilterModal