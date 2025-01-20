import Header from './Header';
import FilterButton from './FilterButton';

const ProxyHeader = ({ darkMode, toggleFilterModal,proxies }) => (
  <div className="flex items-center justify-between px-3 py-2 md:px-12">
    {/* <Header darkMode={darkMode} proxies={proxies} /> */}
    <FilterButton toggleFilterModal={toggleFilterModal} />
  </div>
);

export default ProxyHeader;
