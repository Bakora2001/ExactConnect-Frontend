import Header from './Header';
import FilterButton from './FilterButton';
import PropTypes from 'prop-types';

const ProxyHeader = ({
  darkMode,
  toggleFilterModal,
  fetchProxies,
  setSelectedCountry,
}) => (
  <div
    className={` fixed z-10  w-full px-4 sm:px-6 lg:px-12  flex space-y-5 mb-5 space-x-4   border-b  ${
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

    <div className="">
      <button className={` px-4 py-3  gap-3 text-black `}>
        <FilterButton toggleFilterModal={toggleFilterModal} />
      </button>
    </div>
  </div>
);

ProxyHeader.propTypes = {
  darkMode: PropTypes.bool,
  fetchProxies: PropTypes.func,
  toggleFilterModal: PropTypes.func,
  setSelectedCountry: PropTypes.func,
};
export default ProxyHeader;
