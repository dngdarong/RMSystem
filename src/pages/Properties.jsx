import { useState, useEffect } from "react";
import Header from "../components/properties/PropertiesHeader";
import Drawer from "../components/Drawer";
import SearchBar from "../components/properties/SearchBar";
import Table from "../components/properties/Table";
import PropertyForm from "../components/properties/PropertyForm";
import Pagination from "../components/paginations/Pagination";

// 1. IMPORT MODALS
import AlertModal from '../components/AlertModal';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

function Properties() {
  // Mock Data
  const [properties, setProperties] = useState([
    { id: "TUD-001",  name: "House A", type: "House", size: 120, price: 50000, status: "Available" },
    { id: "TUD-002",  name: "Villa B", type: "Villa", size: 300, price: 150000, status: "Rented" },
    { id: "TUD-003",  name: "Apartment C", type: "Apartment", size: 80, price: 30000, status: "Maintenance" },
    { id: "TUD-004",  name: "Condo D", type: "Condo", size: 95, price: 45000, status: "Available" },
    { id: "TUD-005",  name: "Studio E", type: "Studio", size: 40, price: 20000, status: "Available" },
    { id: "TUD-006",  name: "Penthouse F", type: "Apartment", size: 200, price: 250000, status: "Rented" },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Search/filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 2. MODAL STATES
  const [alertOpen, setAlertOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // --- HANDLERS ---

  const openDrawer = () => setIsDrawerOpen(true);
  
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingProperty(null);
  };

  const handleSaveProperty = (propertyData) => {
    // 3. VALIDATION
    if (!propertyData.name || !propertyData.type || !propertyData.price) {
        setErrorMessage("Property Name, Type, and Price are required.");
        setShowError(true);
        return;
    }

    if (editingProperty) {
      setProperties((prev) =>
        prev.map((p) => (p.id === editingProperty.id ? { ...p, ...propertyData } : p))
      );
    } else {
      const newProperty = { id: Date.now(), ...propertyData };
      setProperties((prev) => [newProperty, ...prev]); // Add to top
    }
    
    closeDrawer();
    setShowSuccess(true); // Trigger Success
  };

  // 4. DELETE LOGIC
  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setAlertOpen(true);
  };

  const confirmDelete = () => {
    setProperties((prev) => prev.filter((p) => p.id !== idToDelete));
    
    // Pagination fix: go back if deleting last item on page
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setIsDrawerOpen(true);
  };

  // --- FILTERING LOGIC ---
  const filteredProperties = properties.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? p.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  return (
    <div className="p-4 space-y-4">
      <Header onOpenDrawer={openDrawer} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterStatus={filterStatus}
        onFilterChange={(e) => setFilterStatus(e.target.value)}
      />

      <Table
        properties={currentItems} // Pass sliced items
        onEdit={handleEditProperty}
        onDelete={handleDeleteClick} // Use new click handler
      />

      {filteredProperties.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingProperty ? "Edit Property" : "Add Property"}
      >
        <PropertyForm property={editingProperty} onSave={handleSaveProperty} />
      </Drawer>

      {/* --- RENDER MODALS --- */}

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Property?"
        message="Are you sure you want to remove this property? This action cannot be undone."
        confirmText="Yes, Delete"
        type="danger"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Success!"
        message="Property details have been saved successfully."
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

export default Properties;