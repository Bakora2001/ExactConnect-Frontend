import Header from './Header';
import FilterButton from './FilterButton';
import { IoChevronDown,IoFilter } from 'react-icons/io5';

const ProxyHeader = ({ darkMode, toggleFilterModal, fetchProxies }) => (
  <>
    <div className={`px-4 py-3 md:px-12 ${
    darkMode ? 'bg-[#131312] text-white' : 'bg-white text-gray-800 shadow-md'
  }`} >
  <Header darkMode={darkMode} fetchProxies={fetchProxies} />
</div>
<div
  className="fixed z-50 bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 md:relative md:bottom-auto md:left-auto md:translate-x-0"
>
  <button 
    className="flex items-center gap-3 text-white  px-6 py-3 shadow-lg transition-all duration-300 hover:bg-gray-800 focus:ring-4 focus:ring-gray-500"
  >
    
    
    <FilterButton 
    toggleFilterModal={toggleFilterModal} 
    className="bg-gray-900 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:bg-gray-800 focus:ring-4 focus:ring-gray-500"
  />
   
  </button>

  
</div>

  </>
  

);

export default ProxyHeader;
