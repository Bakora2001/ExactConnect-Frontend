import { useState } from 'react';
import Select from 'react-select';

const FilterModal = ({
  filters,
  countryDetails,
  handleFilterChange,
  toggleFilterModal,
  applyFilters, // <-- Call fetchProxies when applying filters
  resetFilters, // <-- Reset all selected filters
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

  // Custom Styles for React-Select
  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: darkMode ? '#1f1f1f' : '#ccc',
      borderColor: darkMode ? '#131312' : '#ccc',
      color: darkMode ? '#fff' : '#000',
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: darkMode ? '#1f1f1f' : '#fff',
      color: darkMode ? '#fff' : '#000',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: darkMode ? '#fff' : '#000',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        darkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'
      }`}
    >
      <div
        className={`${
          darkMode ? 'bg-[#131312] border border-gray-700' : 'bg-white'
        } p-6 rounded-lg w-full max-w-md mx-4 overflow-y-auto hide-scrollbar`}
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Filter</h2>
          <button
            onClick={toggleFilterModal}
            className={`text-2xl ${
              darkMode
                ? 'text-gray-700 hover:text-gray-200'
                : 'text-gray-500 hover:text-gray-700'
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
                (option) => option.value === filters.regions
              )}
              onChange={(selected) =>
                handleFilterChange({
                  target: { name: 'regionName', value: selected?.value || '' },
                })
              }
              styles={selectStyles}
              placeholder="Select Region"
              isClearable
            />
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <Select
              name="city"
              options={uniqueCities}
              value={uniqueCities.find(
                (option) => option.value === filters.cities
              )}
              onChange={(selected) =>
                handleFilterChange({
                  target: { name: 'city', value: selected?.value || '' },
                })
              }
              styles={selectStyles}
              placeholder="Select City"
              isClearable
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
                  target: { name: 'isp', value: selected?.value || '' },
                })
              }
              styles={selectStyles}
              placeholder="Select ISP"
              isClearable
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
                ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
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

export default FilterModal;
