import { useState, useEffect } from "react";

function MaintenanceForm({ request, onSave }) {
  const [property, setProperty] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending");
  const [dateReported, setDateReported] = useState("");

  // Populate form if editing an existing request
  useEffect(() => {
    if (request) {
      setProperty(request.property || "");
      setTenantName(request.tenantName || "");
      setIssue(request.issue || "");
      setPriority(request.priority || "Low");
      setStatus(request.status || "Pending");
      setDateReported(request.dateReported || "");
    } else {
      clearFields();
    }
  }, [request]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ property, tenantName, issue, priority, status, dateReported });
  };

  const clearFields = () => {
    setProperty("");
    setTenantName("");
    setIssue("");
    setPriority("Low");
    setStatus("Pending");
    // Default to today's date for new requests
    setDateReported(new Date().toISOString().split('T')[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Property Name */}
      <div>
        <label className="block text-sm font-medium">Property Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          placeholder="e.g. Apartment 4B"
          required
        />
      </div>

      {/* Tenant Name */}
      <div>
        <label className="block text-sm font-medium">Tenant Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}
          placeholder="Enter tenant name"
          required
        />
      </div>

      {/* Issue Description */}
      <div>
        <label className="block text-sm font-medium">Issue Description</label>
        <textarea
          className="w-full border p-2 rounded h-24 resize-none"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Describe the maintenance issue..."
          required
        />
      </div>

      {/* Priority & Date Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select
            className="w-full border p-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Date Reported</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={dateReported}
            onChange={(e) => setDateReported(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-6">
        <button
          type="submit"
          className="flex-1 bg-teal-600 text-white p-2 rounded mt-4 hover:bg-teal-700"
        >
          Save Request
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

export default MaintenanceForm;