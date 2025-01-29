import { IoFilterOutline } from 'react-icons/io5';

const FilterButton = ({ toggleFilterModal }) => (
  <div
    className="flex items-center justify-center gap-2 px-5 py-3 text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
    onClick={toggleFilterModal}
  >
    <IoFilterOutline size={20} />
    <span className="sm:inline-block">Filter</span>
  </div>
);

export default FilterButton;
