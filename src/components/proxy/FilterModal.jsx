import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterModal = ({ onApplyFilters, onClose }) => {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    activityType: '',
    status: '',
    keyword: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (date, name) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: date,
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Filter</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        {/* Date Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <div className="flex gap-2">
            <DatePicker
              selected={filters.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              placeholderText="From"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <DatePicker
              selected={filters.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              placeholderText="To"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>

        {/* Activity Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Activity Type</label>
          <select
            name="activityType"
            value={filters.activityType}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">All</option>
            <option value="Time Charge">Time Charge</option>
            <option value="Data Usage">Data Usage</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Canceled">Canceled</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Keyword Search */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Keyword Search</label>
          <input
            type="text"
            name="keyword"
            value={filters.keyword}
            onChange={handleFilterChange}
            placeholder="Search"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
