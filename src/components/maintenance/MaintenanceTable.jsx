import React from "react";
import MaintenanceRow from "./MaintenanceRow";

function MaintenanceTable({ requests = [], onEdit, onDelete }) {
  const safeRequests = Array.isArray(requests) ? requests : [];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-teal-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tenant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Issue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {safeRequests.length > 0 ? (
              safeRequests.map((item, index) => (
                <MaintenanceRow 
                  key={item.id} 
                  index={index} 
                  item={item} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                />
              ))
            ) : (
              <tr><td colSpan="8" className="px-6 py-8 text-center text-gray-500">No maintenance requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenanceTable;