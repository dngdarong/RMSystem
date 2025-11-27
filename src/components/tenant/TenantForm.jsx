import { useState, useEffect } from "react";

function PropertyForm({ property, onSave }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");

  useEffect(() => {
    if (property) {
      setName(property.name || "");
      setType(property.type || "");
      setSize(property.size || "");
      setPrice(property.price || "");
      setStatus(property.status || "Available");
    } else {
      clearFields();
    }
  }, [property]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, type, size, price, status });
  };

  const clearFields = () => {
    setName("");
    setType("");
    setSize("");
    setPrice("");
    setStatus("Available");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Property Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter property name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Type</label>
        <select
          className="w-full border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="" disabled>Select property type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Size (m²)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Enter property size"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Price ($)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
          <option value="Maintenance">Maintenance</option>
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

export default PropertyForm;