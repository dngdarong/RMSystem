import React from "react";

function MaintenanceRow({ item, index, onEdit, onDelete }) {
  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.property}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tenantName}</td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={item.issue}>{item.issue}</td>
      
      {/* Priority Badge */}
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.priority === "High" ? "bg-red-100 text-red-800" :
            item.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
            "bg-blue-100 text-blue-800"
        }`}>
          {item.priority}
        </span>
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.status === "Completed" ? "bg-green-100 text-green-800" :
            item.status === "In Progress" ? "bg-purple-100 text-purple-800" :
            "bg-gray-100 text-gray-800"
        }`}>
          {item.status}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.dateReported)}</td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
        <button className="text-indigo-600 hover:text-indigo-900" onClick={() => onEdit(item)}>Edit</button>
        <button className="text-red-600 hover:text-red-900" onClick={() => onDelete(item.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default MaintenanceRow;