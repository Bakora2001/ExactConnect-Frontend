// This component renders the proxies in cards
import Wifi from '../../icons/Wifi';
import Cell from '../../icons/Cell';
import { MapPin, Globe, DollarSign } from "lucide-react";


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
        <div className={`
            ${darkMode
            ? 'bg-[#131312] border-b '
            : 'bg-gradient-to-r from-gray-200/60 to-gray-300/40'}
            py-2.5 px-4 
          `}>
          <div className="flex items-center justify-between">
            <h2
              className={`
                text-sm font-medium 
                ${darkMode ? 'text-white' : 'text-black'}
              `}
            >
              IP Address:
            </h2>
            <span
              className={`
                font-medium text-sm 
                ${darkMode ? 'text-white' : 'text-black'}
              `}
            >
              {proxy.ip}
            </span>
          </div>
        </div>

        {/* Proxy Information */}
        <div className="p-3 space-y-2">
          {/* Location Information */}
          <div className="space-y-2">
            {/* Country Info */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <img
                  src={`https://flagsapi.com/${proxy.loc.cc}/flat/64.png`}
                  className="w-5 h-3.5 rounded-sm shadow-sm"
                />
                <span
                  className={`
            text-sm 
            ${darkMode ? 'text-slate-400' : 'text-gray-600'}
          `}
                >
                  Country:
                </span>
              </div>
              <span
                className={`
          text-sm font-medium 
          ${darkMode ? 'text-slate-200' : 'text-gray-800'}
        `}
              >
                {proxy.loc.cc}
              </span>
            </div>

            {/* City Info */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-purple-700" />
                <span
                  className={`
            text-sm 
            ${darkMode ? 'text-slate-400' : 'text-gray-600'}
          `}
                >
                  City:
                </span>
              </div>
              <span
                className={`
          text-sm font-medium 
          ${darkMode ? 'text-slate-200' : 'text-gray-800'}
        `}
              >
                {proxy.loc.city}
              </span>
            </div>

            {/* ISP Info */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-purple-700" />
                <span
                  className={`
            text-sm 
            ${darkMode ? 'text-slate-400' : 'text-gray-600'}
          `}
                >
                  ISP:
                </span>
              </div>
              <span
                className={`
          text-sm font-medium text-right max-w-[70%]
          ${darkMode ? 'text-slate-200' : 'text-gray-800'}
        `}
              >
                {proxy.loc.isp}
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-purple-700" />
                <span
                  className={`
            text-sm 
            ${darkMode ? 'text-slate-400' : 'text-gray-600'}
          `}
                >
                  Price:
                </span>
              </div>
              <span
                className={`
          text-sm font-medium 
          ${darkMode ? 'text-slate-200' : 'text-gray-800'}
        `}
              >
                {proxy.priceShrc}
              </span>
            </div>
          </div>
          <div
            className={`
      grid grid-cols-3 gap-2 pt-2 mt-1 
      ${darkMode ? 'border-t border-slate-700' : 'border-t border-gray-300'}
    `}
          >
            <div className="flex flex-col items-center py-2 justify-between space-y-2">
              <span
                className={`
          text-xs mb-1 
          ${darkMode ? 'text-slate-400' : 'text-gray-600'}
        `}
              >
                Connection
              </span>
              <div className="text-purple-700">
                {proxy.conn === 'cell' ? <Cell /> : <Wifi />}
              </div>
            </div>

            <div className="flex flex-col items-center py-2">
              <span
                className={`
          text-xs mb-1 
          ${darkMode ? 'text-slate-400' : 'text-gray-600'}
        `}
              >
                Stars
              </span>
              <span
                className={`
          text-sm font-medium 
          ${darkMode ? 'text-slate-200' : 'text-gray-800'}
        `}
              >
                {proxy.stars}
              </span>
            </div>

            <div className="flex flex-col items-center py-2">
              <span
                className={`
          text-xs mb-1 
          ${darkMode ? 'text-slate-400' : 'text-gray-600'}
        `}
              >
                Speed
              </span>
              <span
                className={`
          text-sm font-medium 
          ${darkMode ? 'text-slate-200' : 'text-gray-800'}
        `}
              >
                {proxy.speed?.speed
                  ? (proxy.speed.speed / 1000000).toFixed(2) + ' Mbps'
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProxyCard;
