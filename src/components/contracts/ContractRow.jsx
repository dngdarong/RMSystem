import React from "react";

function ContractRow({ item, index, onEdit, onDelete, onView }) {
  
  // Helper to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.tenantName}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.property}</td>
      
      {/* Date Range */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(item.startDate)} <span className="text-gray-400">to</span> {formatDate(item.endDate)}
      </td>

      {/* Rent Amount */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-teal-600">
        ${item.rentAmount}
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.status === "Active" ? "bg-green-100 text-green-800" :
            item.status === "Expiring Soon" ? "bg-yellow-100 text-yellow-800" :
            item.status === "Expired" ? "bg-red-100 text-red-800" :
            "bg-gray-100 text-gray-800"
          }`}
        >
          {item.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
        {/* NEW VIEW BUTTON */}
        <button 
          className="text-gray-500 hover:text-gray-900" 
          onClick={() => onView(item)}
          title="View Details"
        >
          View
        </button>

        <button 
          className="text-indigo-600 hover:text-indigo-900" 
          onClick={() => onEdit(item)}
        >
          Edit
        </button>
        
        <button 
          className="text-red-600 hover:text-red-900" 
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ContractRow;