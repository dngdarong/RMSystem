import React from 'react';

function SearchBar({ searchTerm, onSearchChange, filterStatus, onFilterChange }) {
  return (
    <div className="bg-white p-2 rounded-xl shadow-lg mb-6">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        {/* Search Input Field */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={onSearchChange}
            className="block w-full pl-10 pr-3 py-3 border-none focus:outline-none focus:ring-0 bg-transparent placeholder-gray-500 sm:text-sm"
            placeholder="Search by name or address..."
          />
        </div>

        {/* Vertical Divider (desktop) */}
        <div className="hidden sm:block h-6 border-l border-gray-300 mx-2"></div>
        
        {/* Horizontal Divider (mobile) */}
        <div className="block sm:hidden w-full border-t border-gray-200 my-1"></div>

        {/* Filter Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            id="status"
            name="status"
            value={filterStatus}
            onChange={onFilterChange}
            className="block w-full sm:w-auto pl-3 pr-10 py-3 text-base border-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 sm:text-sm rounded-md"
          >
            <option value="">Filter by Status</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;