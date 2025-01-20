// This component renders the proxies in cards
import Wifi from '../icons/Wifi';
import Cell from '../icons/Cell';

// import countryFlag from '../../services/countryFlag';
// console.log(countryFlag());
const ProxyCard = ({
  filteredProxies,
  darkMode,
  selectedRow,
  handleRowClick,
}) => (
  <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4">
    {filteredProxies.map((proxy, index) => (
      <div
        key={proxy.id}
        className={`${
          darkMode
            ? 'bg-[#131312] text-white border border-white'
            : 'bg-white text-black border border-gray-300'
        } p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform ${
          index === selectedRow
            ? 'scale-105 border-[#7265c4]'
            : 'border-transparent'
        } cursor-pointer`}
        onClick={() => handleRowClick(index, proxy)}
      >
        {/* Proxy Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold truncate">{proxy.ip}</h2>
        </div>

        {/* Proxy Information */}
        <div
          className={`space-y-2 text-sm ${
            darkMode ? 'text-white' : 'text-black'
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p>Location</p>
              <div className="flex items-center gap-2">
                <img
                  src={`https://flagsapi.com/${proxy.loc.cc}/flat/64.png`}
                  // alt={proxy.loc.cc}
                  className="w-6 h-4 rounded-sm shadow-md"
                />
                <p className="font-semibold">{proxy.loc.cc}</p>
              </div>
            </div>
            <div>
              <p>City</p>
              <p className="font-semibold">{proxy.loc.city}</p>
            </div>
            <div>
              <p>ISP</p>
              <p className="font-semibold">{proxy.loc.isp}</p>
            </div>
          </div>
        </div>

        {/* Proxy Stats */}
        <div className="space-y-2 text-gray-400 items-center flex justify-between">
          <div>
            <p>Conn</p>
            <div
              className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}
            >
              {proxy.conn === 'cell' ? <Cell /> : <Wifi />}
            </div>
          </div>
          <div>
            <p>Stars</p>
            <span
              className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}
            >
              {proxy.stars}
            </span>
          </div>
          <div>
            <p>Speed</p>
            <span
              className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}
            >
              {proxy.speed?.speed
                ? (proxy.speed.speed / 1000000).toFixed(2) + ' Mbps'
                : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProxyCard;
