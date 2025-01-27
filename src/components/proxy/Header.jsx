import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import countryList from 'react-select-country-list';
import countryFlag from '../../services/countryFlag';

const Header = ({ darkMode, fetchProxies }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleCountries, setVisibleCountries] = useState([]);
  const [dropdownCountries, setDropdownCountries] = useState([]);
  const dropdownRef = useRef(null);

  const countries = useMemo(
    () =>
      countryList()
        .getData()
        .map((country, index) => ({
          id: index,
          name: country.label,
          code: country.value,
        })),
    []
  );

  useEffect(() => {
    const updateVisibleCountries = () => {
      if (window.innerWidth < 768) {
        setVisibleCountries(countries.slice(0, 1));
        setDropdownCountries(countries.slice(1));
      } else {
        setVisibleCountries(countries.slice(0, 6));
        setDropdownCountries(countries.slice(6));
      }
    };
    updateVisibleCountries();
    window.addEventListener('resize', updateVisibleCountries);
    return () => window.removeEventListener('resize', updateVisibleCountries);
  }, [countries]);

  const handleCountrySelect = useCallback(
    async (country) => {
      setSelectedCountry(country);
      setShowDropdown(false);
      try {
        await fetchProxies(0, country.code);
      } catch (error) {
        console.error('Failed to fetch country proxies:', error);
      }
    },
    [fetchProxies]
  );

  const handleClickOutside = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown, handleClickOutside]);

  return (
    <div className={`px-4 py-3 md:px-8 rounded-lg`}>
      <h1
        className={`text-2xl ${darkMode ? 'text-white' : 'text-black'
          }font-semibold `}
      >
        Select Country
      </h1>
      <div
        className={`flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 ${darkMode ? 'bg-[#131312]' : 'bg-white'
          }`}
      >
        {visibleCountries.map((country) => (
          <CountryButton
            key={country.id}
            country={country}
            selectedCountry={selectedCountry}
            handleCountrySelect={handleCountrySelect}
          />
        ))}

        {dropdownCountries.length > 0 && (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 text-sm  rounded-full border  ${darkMode
                  ? 'bg-[#131312] text-white border-gray-700 hover:bg-gray-100 hover:text-black'
                  : 'bg-white text-black border-gray-400'
                }   transition-all duration-300`}
              aria-expanded={showDropdown}
              aria-haspopup="true"
            >
              More <IoChevronDown />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 max-w-[250px] bg-white border border-gray-300 rounded-md shadow-md z-40 max-h-[300px] overflow-y-auto">
                {dropdownCountries.map((country) => (
                  <CountryDropdownItem
                    key={country.id}
                    country={country}
                    handleCountrySelect={handleCountrySelect}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CountryButton = ({ country, selectedCountry, handleCountrySelect }) => (
  <button
    onClick={() => handleCountrySelect(country)}
<<<<<<< HEAD
    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
      selectedCountry?.code === country.code
        ? 'bg-purple-600 text-white border-purple-700 shadow-md'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-400'
    }`}
=======
    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition-all duration-300 ${selectedCountry?.code === country.code
        ? 'bg-purple-600 text-white border-purple-700 shadow-md'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-purple-400'
      } `}
>>>>>>> ft-Auth
    aria-label={`Select country ${country.name}`}
  >
    <span>{countryFlag(country.code)}</span>
    <span className="truncate max-w-[150px]">
      {' '}
      {/* Truncate and limit the width */}
      {country.name}
    </span>
  </button>
);

const CountryDropdownItem = ({ country, handleCountrySelect }) => (
  <button
    onClick={() => handleCountrySelect(country)}
    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-300"
    aria-label={`Select country ${country.name}`}
  >
    <span>{countryFlag(country.code)}</span>
    <span className="truncate max-w-[100px]">
      {' '}
      {/* Truncate and limit the width */}
      {country.name}
    </span>
  </button>
);

export default Header;
