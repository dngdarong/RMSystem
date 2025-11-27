import { useState, useEffect } from "react";

function TenantForm({ tenant, onSave }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentRental, setCurrentRental] = useState("");
  const [idCard, setIdCard] = useState(null); // Initialize as null
  const [paymentStatus, setPaymentStatus] = useState("Paid");

  useEffect(() => {
    if (tenant) {
      setFullName(tenant.fullName || "");
      setPhone(tenant.phone || "");
      setCurrentRental(tenant.currentRental || "");
      // idCard might be a URL string from DB
      setIdCard(tenant.idCard || null); 
      setPaymentStatus(tenant.paymentStatus || "Paid");
    } else {
      clearFields();
    }
  }, [tenant]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ fullName, phone, currentRental, idCard, paymentStatus });
  };

  const clearFields = () => {
    setFullName("");
    setPhone("");
    setCurrentRental("");
    setIdCard(null);
    setPaymentStatus("Paid");
  };

  // Helper to get image source for preview
  const getImagePreview = () => {
    if (!idCard) return null;
    // If it's a string (URL from DB), use it. If it's a File (new upload), create object URL.
    return typeof idCard === "string" ? idCard : URL.createObjectURL(idCard);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          className="w-full border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="000-000-0000"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Current Rental</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={currentRental}
          onChange={(e) => setCurrentRental(e.target.value)}
          placeholder="Enter current rental"
          required
        />
      </div>

      {/* --- FIXED ID CARD UPLOAD SECTION --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ID Card</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden">
            
            {idCard ? (
              // PREVIEW MODE: Show the image if it exists
              <div className="w-full h-full flex flex-col items-center justify-center">
                 <img 
                   src={getImagePreview()} 
                   alt="ID Preview" 
                   className="h-32 object-contain mb-1" 
                 />
                 <p className="text-xs text-gray-500 bg-white px-2 py-1 rounded shadow">
                    Click to change image
                 </p>
              </div>
            ) : (
              // UPLOAD MODE: Show the icon and text
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg 
                  className="w-8 h-8 mb-4 text-gray-500" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 20 16"
                >
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
              </div>
            )}

            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setIdCard(e.target.files[0]);
                }
              }}
              // Only require input if idCard state is null/empty
              required={!idCard}
            />
          </label>
        </div>
      </div>
      {/* ---------------------------------- */}

      <div>
        <label className="block text-sm font-medium">Payment Status</label>
        <select
          className="w-full border p-2 rounded"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          required
        >
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-teal-600 text-white p-2 rounded mt-4"
        >
          Save
        </button>
        <button
          type="button"
          className="flex-1 bg-gray-300 text-gray-700 p-2 rounded mt-4 hover:bg-gray-400"
          onClick={clearFields}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default TenantForm;