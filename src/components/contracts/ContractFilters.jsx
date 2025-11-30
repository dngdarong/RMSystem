import React from 'react';

function ContractFilters({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusChange, 
  onClear 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Tenant or Property..."
        className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition outline-none"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Status Filter */}
      <select
        className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition outline-none"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">Filter by Status</option>
        <option value="Active">Active</option>
        <option value="Expiring Soon">Expiring Soon</option>
        <option value="Expired">Expired</option>
        <option value="Terminated">Terminated</option>
      </select>

      {/* Clear Button */}
      <button
        onClick={onClear}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default ContractFilters;