import { useState } from 'react';
import ContractHeader from '../components/contracts/ContractHeader';
import ContractFilters from '../components/contracts/ContractFilters';
import ContractRow from '../components/contracts/ContractRow';
import ContractForm from '../components/contracts/ContractForm';
import ContractDetailsModal from '../components/contracts/ContractDetailsModal';
import Pagination from '../components/paginations/Pagination';
import Drawer from '../components/Drawer';
import AlertModal from '../components/AlertModal';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

function Contracts() {
  // 1. DATA STATE (Mock Data)
  const [contracts, setContracts] = useState([
    { id: 1, tenantName: "John Doe", property: "House A", startDate: "2023-01-01", endDate: "2023-12-31", rentAmount: 500, status: "Active" },
    { id: 2, tenantName: "Jane Smith", property: "Villa B", startDate: "2022-06-01", endDate: "2023-06-01", rentAmount: 1200, status: "Expired" },
    { id: 3, tenantName: "Alice Johnson", property: "Apt C", startDate: "2023-03-15", endDate: "2024-03-15", rentAmount: 850, status: "Active" },
    { id: 4, tenantName: "Bob Brown", property: "Condo D", startDate: "2023-11-01", endDate: "2023-11-30", rentAmount: 600, status: "Expiring Soon" },
  ]);

  // 2. FILTER & PAGINATION STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [viewingContract, setViewingContract] = useState(null);

  // ALERT MODAL STATE
  const [alertOpen, setAlertOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  
  // SUCCESS / ERROR MODAL STATE
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 3. DRAWER STATE
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingContract, setEditingContract] = useState(null);

  // --- HANDLERS ---
  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  const handleView = (contract) => {
    setViewingContract(contract);
  };

  const handleEdit = (item) => {
    setEditingContract(item);
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    setEditingContract(null);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (id) => {
    setIdToDelete(id); 
    setAlertOpen(true); 
  };

  // --- FIXED DELETE FUNCTION ---
  const confirmDelete = () => {
    // FIX: Changed setRequests to setContracts
    setContracts(prev => prev.filter(c => c.id !== idToDelete));
  };

  const handleSave = (data) => {
    // Example Error Handling Check
    if(!data.tenantName || !data.property) {
        setErrorMessage("Tenant Name and Property are required.");
        setShowError(true);
        return;
    }

    if (editingContract) {
      setContracts(prev => prev.map(c => c.id === editingContract.id ? { ...c, ...data } : c));
    } else {
      setContracts(prev => [{ id: Date.now(), ...data }, ...prev]);
    }
    setIsDrawerOpen(false);
    setShowSuccess(true);
  };

  // --- LOGIC ---
  const filteredContracts = contracts.filter(c => {
    const matchesSearch = c.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContracts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);

  return (
    <div className="p-4 space-y-4">
      <ContractHeader onOpenDrawer={handleAdd} />
      
      <ContractFilters 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        statusFilter={statusFilter} 
        onStatusChange={setStatusFilter} 
        onClear={handleClearFilters} 
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-900">
              <tr>
                {["#", "Tenant", "Property", "Duration", "Rent", "Status", "Actions"].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <ContractRow 
                    key={item.id} 
                    index={index + indexOfFirstItem} 
                    item={item} 
                    onEdit={handleEdit} 
                    onDelete={handleDeleteClick} 
                    onView={handleView}
                  />
                ))
              ) : (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No contracts found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={editingContract ? "Edit Contract" : "New Contract"}>
        <ContractForm contract={editingContract} onSave={handleSave} />
      </Drawer>

      <ContractDetailsModal 
        contract={viewingContract} 
        onClose={() => setViewingContract(null)} 
      />

      {/* Alert Modal for Deletion Confirmation */}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Contract?"
        message="Are you sure you want to remove this contract? This action cannot be undone."
        confirmText="Yes, Delete"
        type="danger"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Contract Saved!"
        message="The contract details have been successfully updated."
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Validation Error"
        message={errorMessage}
        buttonText="Fix It"
      />
    </div>
  );
}

export default Contracts;