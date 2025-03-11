import Header from './Header';
import FilterButton from './FilterButton';

const ProxyHeader = ({
  darkMode,
  toggleFilterModal,
  fetchProxies,
  setSelectedCountry,
}) => (
  <div
    className={` fixed z-10 w-full max-w-screen-2xl mx-auto  border-b flex items-center justify-between ${
      darkMode
        ? 'bg-[#0c0b08] text-white border-gray-700'
        : 'bg-white text-gray-800 shadow-lg'
    } `}
  >
    <Header
      darkMode={darkMode}
      fetchProxies={fetchProxies}
      setSelectedCountry={setSelectedCountry}
    />

    <button className={` mt-6  px-4 py-3  gap-3 text-black `}>
      <FilterButton toggleFilterModal={toggleFilterModal} />
    </button>
  </div>
);

export default ProxyHeader;
