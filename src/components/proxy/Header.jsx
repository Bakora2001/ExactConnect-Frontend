import { useState, useMemo } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import countryList from 'react-select-country-list'; // Library for getting country data
import countryFlag from '../../services/countryFlag'; // Function for getting flags from ISO codes

const Header = ({ darkMode, proxies }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredProxies, setFilteredProxies] = useState([]);
console.log(filteredProxies);
  // Generate the country list dynamically
  const countries = useMemo(() => {
    const list = countryList().getData(); // Get all countries with name and ISO codes
    return list.map((country, index) => ({
      id: index, // Use index as unique key
      name: country.label, // Country name
      code: country.value, // ISO 3166-1 alpha-2 code
    }));
  }, []);

  // Split countries into two groups: visible and "More" (for dropdown)
  const visibleCountries = countries.slice(0, 6); // First 6 countries
  const dropdownCountries = countries.slice(6); // Rest in dropdown

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false); // Close dropdown after selection

    // Filter proxies based on selected country code
    const filtered = proxies.filter(proxy => proxy.loc.cc === country.code);
    setFilteredProxies(filtered);
  };

  return (
    <div
      className={`px-3 py-2 md:px-12 ${
        darkMode
          ? 'bg-[#131312] text-white'
          : 'bg-white text-black border-b border-gray-300'
      }`}
    >
      {/* Title */}
      <h1 className="text-2xl font-bold mb-3">Countries</h1>

      {/* Country Buttons */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        {visibleCountries.map((country) => (
          <button
            key={country.id}
            onClick={() => handleCountrySelect(country)}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full border ${
              selectedCountry?.code === country.code
                ? 'bg-blue-100 text-blue-600 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300'
            } hover:bg-blue-100 transition`}
            aria-label={`Select country ${country.name}`}
          >
            <span>{countryFlag(country.code)}</span>
            <span>{country.name}</span>
          </button>
        ))}

        {/* "More" Dropdown */}
        {dropdownCountries.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 transition"
              aria-expanded={showDropdown}
              aria-label="More countries"
            >
              More <IoChevronDown />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-md z-10">
                {dropdownCountries.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => handleCountrySelect(country)}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    aria-label={`Select country ${country.name}`}
                  >
                    <span>{countryFlag(country.code)}</span>
                    <span>{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Display selected country's proxies */}
      {selectedCountry && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">
            Proxies for {selectedCountry.name}
          </h2>
          {filteredProxies.length > 0 ? (
            <ul className="list-disc pl-5">
              {filteredProxies.map((proxy, index) => (
                <li key={proxy.id} className="text-sm text-gray-700">
                  {proxy.ip}:{proxy.port}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No proxies available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
