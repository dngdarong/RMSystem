import React from "react";

function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Success!", 
  message = "Operation completed successfully.", 
  buttonText = "Great!" 
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm transform transition-all scale-100 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Icon Circle */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 animate-bounce-short">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
          className="w-full px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-lg transition-colors shadow-md shadow-teal-200"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;