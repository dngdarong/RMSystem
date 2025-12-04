// src/pages/Payments.jsx
import { useState, useEffect } from 'react';
import PaymentHeader from '../components/payments/PaymentHeader';
import FiltersSection from '../components/payments/FiltersSection';
import PaymentForm from '../components/payments/PaymentForm';
import PaymentTable from '../components/payments/PaymentTable';
import Pagination from '../components/paginations/Pagination';
import Drawer from '../components/Drawer';

// 1. IMPORT MODALS
import AlertModal from '../components/AlertModal';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

function Payments() {
  // 1. DATA STATE (Mock Data)
  const [payments, setPayments] = useState([
    { id: 1, tenantName: "John Doe", property: "House A", amount: 500, month: "2023-10", date: "2023-10-01", status: "Paid" },
    { id: 2, tenantName: "Jane Smith", property: "Villa B", amount: 1200, month: "2023-10", date: "2023-10-03", status: "Pending" },
    { id: 3, tenantName: "Alice Johnson", property: "Apartment C", amount: 850, month: "2023-09", date: "2023-09-28", status: "Overdue" },
    { id: 4, tenantName: "Bob Brown", property: "Condo D", amount: 600, month: "2023-09", date: "2023-09-01", status: "Paid" },
    { id: 5, tenantName: "Charlie Davis", property: "House E", amount: 950, month: "2023-08", date: "2023-08-15", status: "Paid" },
    { id: 6, tenantName: "Diana Evans", property: "Villa F", amount: 1100, month: "2023-08", date: "2023-08-20", status: "Pending" },
  ]);

  // 2. FILTER STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // 3. PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set to 5 to easily test pagination

  // 4. DRAWER & FORM STATE
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  // 5. MODAL STATES
  const [alertOpen, setAlertOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // --- HANDLERS ---

  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingPayment(null);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setMonthFilter("");
    setStatusFilter("");
    setCurrentPage(1); 
  };

  // --- DELETE LOGIC (UPDATED) ---
  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setAlertOpen(true); // Open Alert Modal instead of window.confirm
  };

  const confirmDelete = () => {
    setPayments(prev => prev.filter(p => p.id !== idToDelete));
    
    // Go back a page if we delete the last item on the current page
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (item) => {
    setEditingPayment(item);
    openDrawer();
  };

  const handleAdd = () => {
    setEditingPayment(null);
    openDrawer();
  };

  // --- SAVE LOGIC (UPDATED) ---
  const handleSavePayment = (paymentData) => {
    // 1. Validation
    if (!paymentData.tenantName || !paymentData.amount) {
        setErrorMessage("Tenant Name and Amount are required.");
        setShowError(true); // Trigger Error Modal
        return;
    }

    // 2. Save Data
    if (editingPayment) {
      setPayments((prev) =>
        prev.map((p) => (p.id === editingPayment.id ? { ...p, ...paymentData } : p))
      );
    } else {
      const newPayment = { id: Date.now(), ...paymentData };
      setPayments((prev) => [newPayment, ...prev]);
    }
    
    // 3. Cleanup & Success Feedback
    closeDrawer();
    setShowSuccess(true); // Trigger Success Modal
  };

  // --- FILTERING LOGIC ---
  const filteredPayments = payments.filter((item) => {
    const matchesSearch = 
      item.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.property.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMonth = monthFilter ? item.month === monthFilter : true;
    const matchesStatus = statusFilter ? item.status === statusFilter : true;

    return matchesSearch && matchesMonth && matchesStatus;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, monthFilter, statusFilter]);

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  return (
    <div className="p-4 space-y-4">
      <PaymentHeader onOpenDrawer={handleAdd} />
      
      <FiltersSection 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        monthFilter={monthFilter}
        onMonthChange={setMonthFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onClear={handleClearFilters}
      />
      
      <PaymentTable 
        payments={currentItems} 
        onEdit={handleEdit} 
        onDelete={handleDeleteClick} // Use new click handler
      />
      
      {filteredPayments.length > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      )}

      {/* DRAWER COMPONENT */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingPayment ? "Edit Payment" : "Add Payment"}
      >
        <PaymentForm payment={editingPayment} onSave={handleSavePayment} />
      </Drawer>

      {/* --- RENDER MODALS --- */}

      {/* Alert Modal for Deletion Confirmation */}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Payment?"
        message="Are you sure you want to delete this payment record? This action cannot be undone."
        confirmText="Yes, Delete"
        type="danger"
      />

      {/* Success Modal for Save Confirmation */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Success!"
        message="Payment record saved successfully."
      />

      {/* Error Modal for Validation Failures */}
      <ErrorModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Validation Error"
        message={errorMessage}
        buttonText="Okay, I'll fix it"
      />
    </div>
  );
}

export default Payments;