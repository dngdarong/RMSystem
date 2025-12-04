// src/components/payments/FiltersSection.jsx
import React from 'react';

function FiltersSection({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusesChange, 
  priorityFilter, 
  onPriorityChange, 
  onClear 
}) {
  return (
    <div className="filter-controls bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Filter by Property/Tenant"
        className="col-span-2 md:col-span-1 p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150 outline-none"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Status Filter */}
      <select
        className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150 outline-none"
        value={statusFilter}
        onChange={(e) => onStatusesChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {/* Priority Filter */}
      <select
        className="p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150 outline-none"
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
      >
        <option value="">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Clear Button */}
      <button
        onClick={onClear}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default FiltersSection;