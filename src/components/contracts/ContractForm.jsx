import { useState, useEffect } from "react";

function ContractForm({ contract, onSave }) {
  const [tenantName, setTenantName] = useState("");
  const [property, setProperty] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (contract) {
      setTenantName(contract.tenantName || "");
      setProperty(contract.property || "");
      setStartDate(contract.startDate || "");
      setEndDate(contract.endDate || "");
      setRentAmount(contract.rentAmount || "");
      setStatus(contract.status || "Active");
    } else {
      clearFields();
    }
  }, [contract]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ tenantName, property, startDate, endDate, rentAmount, status });
  };

  const clearFields = () => {
    setTenantName("");
    setProperty("");
    setStartDate("");
    setEndDate("");
    setRentAmount("");
    setStatus("Active");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Tenant Name</label>
        <input type="text" className="w-full border p-2 rounded" value={tenantName} onChange={(e) => setTenantName(e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-medium">Property</label>
        <input type="text" className="w-full border p-2 rounded" value={property} onChange={(e) => setProperty(e.target.value)} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input type="date" className="w-full border p-2 rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input type="date" className="w-full border p-2 rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Monthly Rent ($)</label>
        <input type="number" className="w-full border p-2 rounded" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} required />
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select className="w-full border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Expiring Soon">Expiring Soon</option>
          <option value="Expired">Expired</option>
          <option value="Terminated">Terminated</option>
        </select>
      </div>

      <div className="flex gap-2 mt-6">
        <button type="submit" className="flex-1 bg-teal-600 text-white p-2 rounded hover:bg-teal-700">Save</button>
        <button type="button" className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400" onClick={clearFields}>Clear</button>
      </div>
    </form>
  );
}

export default ContractForm;