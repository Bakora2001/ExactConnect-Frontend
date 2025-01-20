import { IoFilterOutline } from 'react-icons/io5';

const FilterButton = ({ toggleFilterModal }) => (
  <button
    onClick={toggleFilterModal}
    className="flex items-center justify-center gap-2 px-5 py-3 text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
  >
    <IoFilterOutline size={20} />
    <span className="hidden sm:inline-block">Filter</span>
  </button>
);

export default FilterButton;
