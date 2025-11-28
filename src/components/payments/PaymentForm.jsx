// src/components/PaymentForm.jsx
import { useState, useEffect } from "react";

function PaymentForm({ payment, onSave }) {
  const [tenantName, setTenantName] = useState("");
  const [property, setProperty] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Paid");

  useEffect(() => {
    if (payment) {
      setTenantName(payment.tenantName || "");
      setProperty(payment.property || ""); // Changed to string input
      setAmount(payment.amount || "");
      setMonth(payment.month || "");
      setDate(payment.date || "");
      setStatus(payment.status || "Paid"); // Fixed: Was setting to "Paid,Pending..."
    } else {
      clearFields();
    }
  }, [payment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ tenantName, property, amount, month, date, status });
  };

  const clearFields = () => {
    setTenantName("");
    setProperty("");
    setAmount("");
    setMonth("");
    setDate("");
    setStatus("Paid");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {/* Property Name */}
      <div>
        <label className="block text-sm font-medium">Property Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          placeholder="e.g. House A, Apt 101"
          required
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium">Amount Paid ($)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Payment Month</label>
          <input
            type="month" 
            className="w-full border p-2 rounded"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date Received</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-teal-600 text-white p-2 rounded mt-4 hover:bg-teal-700"
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

export default PaymentForm;