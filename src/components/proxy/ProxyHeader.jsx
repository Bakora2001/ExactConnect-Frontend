import Header from './Header';
import FilterButton from './FilterButton';

const ProxyHeader = ({
  darkMode,
  toggleFilterModal,
  fetchProxies,
  setSelectedCountry,
}) => (
  <div
    className={` custom-class fixed z-10 w-full border-b  flex  justify-between ${
      darkMode
        ? 'bg-[#131312] text-white border-gray-700'
        : 'bg-white text-gray-800 shadow-lg'
    } `}
  >
    <Header
      darkMode={darkMode}
      fetchProxies={fetchProxies}
      setSelectedCountry={setSelectedCountry}
    />

    <button className={`mt-6 px-4 py-3  gap-3 text-black `}>
      <FilterButton toggleFilterModal={toggleFilterModal} />
    </button>
  </div>
);

export default ProxyHeader;
