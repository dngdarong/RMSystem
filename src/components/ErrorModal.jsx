import React from "react";

function ErrorModal({ 
  isOpen, 
  onClose, 
  title = "Operation Failed", 
  message = "Something went wrong. Please try again.", 
  buttonText = "Try Again" 
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-sm transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm transform transition-all scale-100 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Icon Circle (Red) */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 text-red-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Title & Message */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-500 mb-8">
          {message}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg transition-colors shadow-md shadow-red-200"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;