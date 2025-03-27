import { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";

const FilterModal = ({
  filters,
  countryDetails,
  handleFilterChange,
  toggleFilterModal,
  applyFilters,
  resetFilters,
  darkMode,
}) => {
  //States
  const formatOptions = (items) =>
    items.map((item) => ({ value: item, label: item }));
  const uniqueRegions = formatOptions(
    [...new Set(countryDetails.regions || [])].sort()
  );

  const uniqueCities = formatOptions(
    [...new Set(countryDetails.cities || [])].sort()
  );

  const uniqueISPs = formatOptions(
    [...new Set(countryDetails.isps || [])].sort()
  );
  //Lazy loading cities
  const [displayedOptions, setDisplayedOptions] = useState(
    uniqueCities.slice(0, 50)
  );

  const [, setSearchQuery] = useState("");

  const [loadingRegions, setLoadingRegions] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingISPs, setLoadingISPs] = useState(false);

  const handleLoadMore = () => {
    setDisplayedOptions((prev) => {
      const nextItems = uniqueCities.slice(prev.length, prev.length + 50);
      console.log("Next Items:", nextItems); // Debugging
      return [...prev, ...nextItems];
    });
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);

    if (inputValue.length > 0) {
      //Search in the full dataset,not just the loaded ones
      const filtered = uniqueCities.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setDisplayedOptions(filtered.slice(0, 50));
    } else {
      // Reset back to lazy-loading when no search query
      setDisplayedOptions(uniqueCities.slice(0, 50));
    }
  };
  const handleDropdownClick = (filterType) => {
    if (filterType === "region") {
      setLoadingRegions(true);
      setTimeout(() => setLoadingRegions(false), 1000);
    }
    if (filterType === "city") {
      setLoadingCities(true);
      setTimeout(() => setLoadingCities(false), 1000);
    }
    if (filterType === "isp") {
      setLoadingISPs(true);
      setTimeout(() => setLoadingISPs(false), 1000);
    }
  };

  // Custom Styles for React-Select
  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: darkMode ? "#0c0b08" : "#ccc",
      borderColor: darkMode ? "#1f1f1f" : "#ccc",
      color: darkMode ? "#fff" : "#000",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: darkMode ? "#0c0b08" : "#fff",
      color: darkMode ? "#fff" : "#000",
      overflow: "hidden", // Prevents scrollbar from appearing
    }),
    menuList: (styles) => ({
      ...styles,
      padding: 0,
      "::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: darkMode ? "#fff" : "#000",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        darkMode ? " backdrop-blur-sm" : "bg-[#0c0b08] bg-opacity-50"
      }`}
    >
      <div
        className={`${
          darkMode ? "bg-[#0c0b08] border border-gray-700" : "bg-white"
        } p-6 rounded-lg w-full max-w-md mx-4 overflow-y-auto hide-scrollbar`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Filter</h2>
          <button
            onClick={toggleFilterModal}
            className={`text-2xl ${
              darkMode
                ? "text-gray-700 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            } transition duration-300 `}
          >
            ×
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-4 ">
          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Region</label>
            <Select
              name="regionName"
              options={uniqueRegions}
              value={uniqueRegions.find(
                (option) => option.value === filters.regionName
              )}
              onChange={(selected) =>
                handleFilterChange({
                  target: { name: "regionName", value: selected?.value || "" },
                })
              }
              styles={selectStyles}
              placeholder="Search and Select Region"
              isClearable
              onMenuOpen={() => handleDropdownClick("region")}
              isLoading={
                loadingRegions && <FaSpinner className="animate-spin" />
              }
            />
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <Select
              name="city"
              options={displayedOptions}
              onMenuScrollToBottom={() => {
                console.log("Scrolling detected!");
                if (uniqueCities.length > displayedOptions.length) {
                  handleLoadMore();
                }
              }}
              value={uniqueCities.find(
                (option) => option.value === filters.city
              )}
              onChange={(selected) =>
                handleFilterChange({
                  target: { name: "city", value: selected?.value || "" },
                })
              }
              styles={selectStyles}
              placeholder="Search and Select City"
              isClearable
              onMenuOpen={() => handleDropdownClick("city")}
              onInputChange={handleInputChange}
              noOptionsMessage={() =>
                displayedOptions.length < uniqueCities.length ? (
                  <FaSpinner className="animate-spin flex  items-center justify-center" />
                ) : (
                  "No cities found"
                )
              }
              isLoading={
                loadingCities && <FaSpinner className="animate-spin" />
              }
            />
          </div>

          {/* ISP Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">ISP</label>
            <Select
              name="isp"
              options={uniqueISPs}
              value={uniqueISPs.find((option) => option.value === filters.isp)}
              onChange={(selected) =>
                handleFilterChange({
                  target: { name: "isp", value: selected?.value || "" },
                })
              }
              styles={selectStyles}
              placeholder="Search and Select ISP"
              isClearable
              onMenuOpen={() => handleDropdownClick("isp")}
              noOptionsMessage={() => "No Isps Found"}
              isLoading={loadingISPs && <FaSpinner className="animate-spin" />}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={() => {
              resetFilters();
              toggleFilterModal();
            }}
            className={`px-5 py-2 text-sm font-medium ${
              darkMode
                ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                : "text-gray-700 bg-gray-200 hover:bg-gray-300"
            } rounded-md transition duration-300`}
          >
            Reset
          </button>
          <button
            onClick={() => {
              applyFilters();
              toggleFilterModal();
            }}
            className="px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};
FilterModal.propTypes = {
  filters: PropTypes.shape({
    regionName: PropTypes.string,
    city: PropTypes.string,
    isp: PropTypes.string,
  }).isRequired,
  countryDetails: PropTypes.shape({
    regions: PropTypes.arrayOf(PropTypes.string),
    cities: PropTypes.arrayOf(PropTypes.string),
    isps: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  toggleFilterModal: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default FilterModal;
