// src/components/TenantTable.jsx
import React, { useState } from "react";
import TenantRow from "./TenantRow";
import ImageModal from "./ImageModal";

function TenantTable({ tenants = [], onEdit, onDelete }) {
  const [selectedTenantForImage, setSelectedTenantForImage] = useState(null);
  const safeTenants = Array.isArray(tenants) ? tenants : [];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-teal-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Current Rental</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Joined Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID Card</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Payment Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {safeTenants.length > 0 ? (
              safeTenants.map((item, index) => (
                <TenantRow
                  key={item.id || index}
                  index={index}
                  item={item}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onViewImage={() => setSelectedTenantForImage(item)} // Pass the state setter down
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No tenants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reusable Image Modal Component */}
      <ImageModal
        imageUrl={selectedTenantForImage?.idCard} // Access property safely with ?.
        fullName={selectedTenantForImage?.fullName}
        phone={selectedTenantForImage?.phone}
        currentRental={selectedTenantForImage?.currentRental}
        createdAt={selectedTenantForImage?.createdAt}
        onClose={() => setSelectedTenantForImage(null)}
      />
    </div>
  );
}

export default TenantTable;