import React from "react";

function Header({ onOpenDrawer }) {
  return (
    <header className="bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      
      {/* Title: Centered on mobile, Left-aligned on desktop */}
      <h1 className="text-xl sm:text-2xl font-bold text-teal-700 w-full sm:w-auto text-center sm:text-left">
        Property Management
      </h1>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
        {/* Welcome message: Hidden on very small screens to save space, visible on tablet/desktop */}
        <span className="text-gray-600 hidden sm:block text-sm">
          Welcome, <strong className="text-teal-700">Admin User!</strong>
        </span>

        {/* Button: Full width on mobile, Auto width on desktop */}
        <button
          onClick={onOpenDrawer}
          className="bg-teal-700 hover:bg-teal-500 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto shadow-md transition-all active:scale-95"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
          Add Property
        </button>
      </div>
    </header>
  );
}

export default Header;