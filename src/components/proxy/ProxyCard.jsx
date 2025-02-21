// This component renders the proxies in cards
import Wifi from '../icons/Wifi';
import Cell from '../icons/Cell';
import { MapPin, Globe, DollarSign } from 'lucide-react';
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
  className={`w-full grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
>
  {(filteredProxies || []).map((proxy, index) => (
    <div
      key={proxy.id}
      className={`
        p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform border
        ${darkMode ? 'border-gray-700 bg-[#010100]' : 'border-gray-100 bg-white'}
        ${index === selectedRow ? 'scale-105 border-purple-400' : ''}
        cursor-pointer
      `}
      onClick={() => handleRowClick(index, proxy)}
    >
      {/* Proxy Header */}
      <div
        className={`
          ${darkMode ? 'bg-[#131313]' : 'bg-gray-50'}
          py-3 px-4 rounded-t-lg
        `}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`
              text-sm font-semibold
              ${darkMode ? 'text-white' : 'text-gray-900'}
            `}
          >
            IP Address:
          </h2>
          <span
            className={`
              text-sm font-medium
              ${darkMode ? 'text-slate-300' : 'text-gray-700'}
            `}
          >
            {proxy.ip}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-3">
        {/* Location Information */}
        <div className="space-y-3">
          {/* Country Info */}
          <div className="flex items-center justify-between">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-purple-600" />
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-purple-600" />
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

          {/* Price Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign size={14} className="text-purple-600" />
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
              {proxy?.priceExcC !== null
                ? proxy?.priceExcC
                : proxy?.priceShrC}
            </span>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`
            grid grid-cols-3 gap-3 pt-3 mt-3
            ${darkMode ? 'border-t border-slate-700' : 'border-t border-gray-200'}
          `}
        >
          <div className="flex flex-col items-center">
            <span
              className={`
                text-xs mb-1
                ${darkMode ? 'text-slate-400' : 'text-gray-600'}
              `}
            >
              Connection
            </span>
            <div className="text-purple-600">
              {proxy.conn === 'cell' ? <Cell /> : <Wifi />}
            </div>
          </div>

          <div className="flex flex-col items-center">
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

          <div className="flex flex-col items-center">
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
