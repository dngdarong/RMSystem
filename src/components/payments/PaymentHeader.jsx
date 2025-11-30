import React from "react";

function PaymentHeader({ onOpenDrawer }) {
  return (
    <header className="bg-white shadow-lg rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
      
      {/* Title: Centered on mobile, Left on desktop */}
      <h1 className="text-xl sm:text-2xl font-bold text-blue-700 text-center sm:text-left">
        Payments Management
      </h1>

      {/* Button Container: Full width on mobile, Auto on desktop */}
      <div className="w-full sm:w-auto flex justify-center sm:justify-end">
        
        {/* Button: Full width on mobile for easy tapping */}
        <button
          onClick={onOpenDrawer}
          className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
          </svg>
          Record Payment
        </button>
      </div>
    </header>
  );
}

export default PaymentHeader;