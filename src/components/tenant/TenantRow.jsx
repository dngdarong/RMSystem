// src/components/TenantRow.jsx
import React from "react";

function TenantRow({ item, index, onEdit, onDelete, onViewImage }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.fullName}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.currentRental}</td>

      {/* ID Card Cell */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-teal-600">
        {item.idCard ? (
          <div className="flex items-center gap-2">
            
            <button
              type="button"
              onClick={() => onViewImage(item.idCard)}
              className="text-gray-500 hover:text-teal-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              title="View Full ID"
            >
              <img
              className="h-10 w-16 object-cover rounded border border-gray-200 cursor-pointer"
              src={item.idCard}
              alt="Thumbnail"
            />
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg> */}
            </button>
          </div>
        ) : (
          <span className="text-gray-400 text-xs">No Image</span>
        )}
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.paymentStatus === "Paid"
              ? "bg-green-100 text-green-800"
              : item.paymentStatus === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.paymentStatus}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
        <button className="text-indigo-600 hover:text-indigo-900" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button className="text-red-600 hover:text-red-900" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TenantRow;