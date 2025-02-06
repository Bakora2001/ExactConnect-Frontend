// This component renders the proxies in cards
import Wifi from '../icons/Wifi';
import Cell from '../icons/Cell';
import { FiDollarSign } from "react-icons/fi";
import React from 'react';

// import countryFlag from '../../services/countryFlag';
// console.log(countryFlag());
const ProxyCard = ({
  filteredProxies,
  darkMode,
  selectedRow,
  handleRowClick,
}) => (
  <div
    className={`w-full grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4`}
  >
    {filteredProxies.map((proxy, index) => (
      <div
        key={proxy.id}
        className={`p-6 rounded-lg shadow-lg hover:shadow-lg transition-transform transform border ${darkMode ? 'border-gray-700' : 'border-gray-100'
          } ${index === selectedRow ? 'scale-105 border-purple-400' : ''
          } cursor-pointer`}
        onClick={() => handleRowClick(index, proxy)}
      >
        {/* Proxy Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold truncate">{proxy.ip}</h2>
          <span className="flex items-center text-purple-600 font-semibold">
            <FiDollarSign className="h-5 w-5" />
            {proxy.priceShrC}
          </span>
        </div>

        {/* Proxy Information */}
        <div
          className={`space-y-2 text-sm ${darkMode ? 'text-white' : 'text-black'
            }`}
        >
          <div className="flex justify-between items-center">
            <div className="w-1/3">
              <p>Location</p>
              <div className="flex items-center gap-2">
                <img
                  src={`https://flagsapi.com/${proxy.loc.cc}/flat/64.png`}
                  className="w-6 h-4 rounded-sm shadow-md"
                />
                <p className="font-semibold truncate">{proxy.loc.cc}</p>
              </div>
            </div>
            <div className="w-1/3">
              <p>City</p>
              <p className="font-semibold truncate">{proxy.loc.city}</p>{' '}
              {/* Added truncate here */}
            </div>
            <div className="w-1/3">
              <p>ISP</p>
              <p className="font-semibold truncate">{proxy.loc.isp}</p>{' '}
              {/* Added truncate here */}
            </div>
          </div>
        </div>

        {/* Proxy Stats */}
        <div
          className={`space-y-2 ${darkMode ? 'text-white' : 'text-black'
            } items-center flex justify-between`}
        >
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

export default React.memo(ProxyCard);
