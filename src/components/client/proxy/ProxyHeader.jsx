import Header from './Header';
import FilterButton from './FilterButton';

const ProxyHeader = ({
  darkMode,
  toggleFilterModal,
  fetchProxies,
  setSelectedCountry,
}) => (
  <div className="fixed z-10  border-b border-gray-700  justify-between sm:my-0 sm:items-center w-full ">
    <div
      className={`   ${
        darkMode ? 'bg-black text-white' : 'bg-white text-gray-800 '
      }`}
    >
      <Header
        darkMode={darkMode}
        fetchProxies={fetchProxies}
        setSelectedCountry={setSelectedCountry}
      />

      {/* Filter button */}
      <div className=" bg-[#131312] flex justify-end">
        <button
          className={`flex items-center gap-3 text-white px-3 py-3 ${darkMode?'bg-[#131312]':''}`}
        >
          <FilterButton
            toggleFilterModal={toggleFilterModal}
            className="text-white p-3 "
          />
        </button>
      </div>
    </div>
  </div>
);

export default ProxyHeader;
