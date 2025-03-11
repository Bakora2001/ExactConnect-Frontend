// This component renders the proxies in cards

import { MapPin, Wifi, Globe, DollarSign, Signal, Star } from 'lucide-react';

const ProxyCard = ({
  filteredProxies,
  darkMode,
  selectedRow,
  handleRowClick,
}) => (
  <div className="mt-28 w-full px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProxies.map((proxy, index) => (
        <div
          key={proxy.id}
          className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform border ${
            darkMode
              ? 'border-gray-700 bg-[#0c0b08]'
              : 'border-gray-100 bg-white'
          } ${
            index === selectedRow ? 'scale-105 border-purple-400 shadow-lg' : ''
          } cursor-pointer`}
          onClick={() => handleRowClick(index, proxy)}
        >
          {/* Proxy Header */}
          <div className="p-4 pb-2 flex flex-row items-center justify-between bg-muted/40 rounded-t-lg">
            <div className="flex items-center gap-2">
              <h1 className="font-mono text-sm font-medium ">{proxy.ip}</h1>
            </div>
            <button
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                proxy.conn === 'cell'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300'
              }`}
            >
              {proxy.conn === 'cell' ? (
                <Signal className="h-3.5 w-3.5 mr-1" />
              ) : (
                <Wifi className="h-3.5 w-3.5 mr-1" />
              )}
              {proxy.conn === 'cell' ? 'Cellular' : 'WiFi'}
            </button>
          </div>

          {/* Proxy Details */}
          <div className="p-4 pt-3">
            <div className="space-y-3">
              {/* Location Information */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://flagsapi.com/${proxy.loc.cc}/flat/64.png`}
                      className="w-5 h-3.5 rounded-sm shadow-sm"
                      alt={`${proxy.loc.cc} flag`}
                    />
                    <span className="text-sm text-muted-foreground">
                      Country:
                    </span>
                  </div>
                  <span className="text-sm font-medium">{proxy.loc.cc}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary" />
                    <span className="text-sm text-muted-foreground">City:</span>
                  </div>
                  <span className="text-sm font-medium">{proxy.loc.city}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-primary" />
                    <span className="text-sm text-muted-foreground">ISP:</span>
                  </div>
                  <span
                    className="text-sm font-medium truncate max-w-[60%]"
                    title={proxy.loc.isp}
                  >
                    {proxy.loc.isp}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-primary" />
                    <span className="text-sm text-muted-foreground ">
                      Price:
                    </span>
                  </div>
                  <span className=" font-bold  text-purple-600">
                    $
                    {proxy?.priceExcC !== null
                      ? proxy?.priceExcC
                      : proxy?.priceShrC}
                  </span>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 gap-2 pt-3 mt-1 border-t dark:border-gray-700">
                <div className="flex items-center gap-2 py-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span className="text-sm font-medium">{proxy.stars}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Rating</span>
                </div>

                <div className="flex items-center justify-end gap-1 py-1">
                  <span className="text-sm font-medium">
                    {proxy.speed?.speed
                      ? (proxy.speed.speed / 1000000).toFixed(2) + ' Mbps'
                      : 'N/A'}
                  </span>
                  <span className="text-xs text-muted-foreground">Speed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProxyCard;
