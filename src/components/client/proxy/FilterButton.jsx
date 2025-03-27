import PropTypes from "prop-types"; // Import PropTypes
import { IoFilterOutline } from "react-icons/io5";

const FilterButton = ({ toggleFilterModal }) => (
  <div
    className={`flex items-center gap-2 px-5 py-3 text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all dark:bg-[#0c0b08] dark:border-gray-700 border`}
    onClick={toggleFilterModal}
  >
    <IoFilterOutline size={20} />
    <span className="sm:inline-block">Filter</span>
  </div>
);

// Add prop validation
FilterButton.propTypes = {
  toggleFilterModal: PropTypes.func,
};

export default FilterButton;
