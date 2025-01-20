import Header from './Header';
import FilterButton from './FilterButton';

const ProxyHeader = ({ darkMode, toggleFilterModal, fetchProxies }) => (
  <div
    className={`flex items-center justify-between px-4 py-3 md:px-12 ${
      darkMode ? 'bg-[#131312] text-white' : 'bg-white text-gray-800 shadow-md'
    }`}
  >
    <Header darkMode={darkMode} fetchProxies={fetchProxies} />
    <FilterButton toggleFilterModal={toggleFilterModal} />
  </div>
);

export default ProxyHeader;
