import React from "react";

function Header({ onOpenDrawer }) {
  return (
    <header className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-teal-700">Tenants Management</h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-600 hidden sm:block">
          Welcome, <strong className="text-teal-700">Admin User!</strong>
        </span>

        {/* Button triggers drawer */}
        <button
          onClick={onOpenDrawer}
          className="bg-teal-700 hover:bg-teal-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
          Add Tenant
        </button>
      </div>
    </header>
  );
}

export default Header;
