import React from "react";

function ContractHeader({ onOpenDrawer }) {
  return (
    <header className="bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-teal-700 w-full sm:w-auto text-center sm:text-left">
        Contract Management
      </h1>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
        <span className="text-gray-600 hidden sm:block text-sm">
          Welcome, <strong className="text-teal-700">Admin!</strong>
        </span>

        {/* Add Button */}
        <button
          onClick={onOpenDrawer}
          className="bg-teal-700 hover:bg-teal-500 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto shadow-md transition-all active:scale-95"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
          New Contract
        </button>
      </div>
    </header>
  );
}

export default ContractHeader;