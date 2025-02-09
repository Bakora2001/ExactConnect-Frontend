import Header from './Header';
import FilterButton from './FilterButton';

const ProxyHeader = ({ darkMode, toggleFilterModal, fetchProxies,setSelectedCountry }) => (
  <>
    <div
      className={`   ${darkMode
          ? 'bg-[#131312] text-white'
          : 'bg-white text-gray-800 shadow-md'
        }`}
    >
      <Header darkMode={darkMode} fetchProxies={fetchProxies} setSelectedCountry={setSelectedCountry}/>
    </div>
    {/* Filter button */}
    <div className="flex items-center gap-4 justify-end w-full">
      <button className="flex items-center gap-3 text-white px-6 py-3 transition-all duration-300">
        <FilterButton
          toggleFilterModal={toggleFilterModal}
          className="text-white p-3 transition-all duration-300 focus:ring-4 focus:ring-gray-500"
        />
      </button>
    </div>

  </>
);

export default ProxyHeader;
