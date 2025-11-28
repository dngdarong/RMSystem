// src/pages/Payments.jsx
import { useState, useEffect } from 'react';
import PaymentHeader from '../components/payments/PaymentHeader';
import FiltersSection from '../components/payments/FiltersSection';
import PaymentForm from '../components/payments/PaymentForm';
import PaymentTable from '../components/payments/PaymentTable';
import Pagination from '../components/paginations/Pagination';
import Drawer from '../components/Drawer';

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
  const itemsPerPage = 10;

  // 4. DRAWER & FORM STATE (FIXED: Added these missing states)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  // --- HANDLERS ---

  const openDrawer = () => setIsDrawerOpen(true);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingPayment(null); // Clear editing state when closing
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setMonthFilter("");
    setStatusFilter("");
    setCurrentPage(1); 
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this payment record?")){
      setPayments(prev => prev.filter(p => p.id !== id));
      // Go back a page if we delete the last item on the current page
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // FIXED: Connect to state
  const handleEdit = (item) => {
    setEditingPayment(item);
    openDrawer();
  };

  // FIXED: Connect to state
  const handleAdd = () => {
    setEditingPayment(null); // Ensure we are in "Add" mode
    openDrawer();
  };

  // FIXED: Added Logic to save data
  const handleSavePayment = (paymentData) => {
    if (editingPayment) {
      // Update existing payment
      setPayments((prev) =>
        prev.map((p) => (p.id === editingPayment.id ? { ...p, ...paymentData } : p))
      );
    } else {
      // Add new payment
      const newPayment = { id: Date.now(), ...paymentData };
      setPayments((prev) => [newPayment, ...prev]);
    }
    closeDrawer();
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
        onDelete={handleDelete} 
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
    </div>
  );
}

export default Payments;