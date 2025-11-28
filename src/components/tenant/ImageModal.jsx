// src/components/ImageModal.jsx
import React from "react";

function ImageModal({ imageUrl, fullName, phone, currentRental,createdAt, onClose }) {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-lg w-full mx-4 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50 shrink-0">
          <h3 className="text-lg font-semibold text-gray-700">Tenant ID Viewer</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-0">
          
          {/* Image Container */}
          <div className="bg-gray-100 p-4 flex justify-center border-b border-gray-200">
            <img
              src={imageUrl}
              alt="ID Card Preview"
              className="max-h-[50vh] w-auto object-contain rounded shadow-sm bg-white"
            />
          </div>

          {/* Text Details Section */}
          <div className="p-6 bg-white">
            <h4 className="text-sm uppercase tracking-wide text-gray-500 font-bold mb-4">Tenant Details</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-400">Full Name</label>
                <p className="text-lg font-semibold text-gray-900">{fullName || "N/A"}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-400">Phone Number</label>
                <p className="text-base font-medium text-teal-600">{phone || "N/A"}</p>
              </div>

              {/* Joined Date */}
              <div>
                <label className="block text-xs font-medium text-gray-400">Joined Date</label>
                <p className="text-base font-medium text-teal-600">{createdAt ? new Date(createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"}</p>
              </div>

              {/* Current Rental */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-400">Current Rental Property</label>
                <div className="flex items-center gap-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                    <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 13.125c0-1.036.84-1.875 1.875-1.875h5.25a1.875 1.875 0 0 1 1.875 1.875v6.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 19.875v-6.75Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-gray-800">{currentRental || "N/A"}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 text-right shrink-0 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;