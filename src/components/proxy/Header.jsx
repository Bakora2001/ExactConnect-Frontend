//The header component of the proxy
import { IoFilterOutline } from 'react-icons/io5';

const Header = ({darkMode,toggleFilterModal}) => (
  <div className={`flex items-center justify-between px-3 py-2 md:px-12 ${darkMode ? 'bg-[#131312] text-white' : 'bg-white text-black border border-gray-300'}`}>
     <div>
      <h1 className="text-3xl font-bold">Shop Proxies</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Here's a list of proxies. Just tap to buy.
      </p>
    </div>
    <button
      onClick={toggleFilterModal}
      className="flex items-center justify-center gap-2 px-5 py-3 text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
    >
      <IoFilterOutline size={20} />
      <span className="hidden sm:inline-block">Filter</span>
    </button>
  </div>
)
export default Header