// src/components/payments/PaymentRow.jsx
import React from "react";

function PaymentRow({ item, index, onEdit, onDelete }) {
  
  // Helper to format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) return dateString; 
    
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Index */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {index + 1}
      </td>
      
      {/* Tenant Name */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {item.tenantName}
      </td>
      
      {/* Property */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.property || item.Property}
      </td>
      
      {/* Amount Paid */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-teal-600">
        ${item.amount || item.AmountPaid}
      </td>
      
      {/* Payment Month */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {item.month || item.PaymentMonth}
      </td>
      
      {/* Date Received */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(item.date || item.DateReceived)}
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            (item.status || item.paymentStatus) === "Paid"
              ? "bg-green-100 text-green-800"
              : (item.status || item.paymentStatus) === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status || item.paymentStatus}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
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

export default PaymentRow;