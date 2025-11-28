import { useState, useEffect } from 'react';
import Header from '../components/tenant/Header';
import SearchBar from '../components/tenant/SearchBar';
import Table from '../components/tenant/Table'; // Updated import name
import Drawer from '../components/Drawer';
import TenantForm from '../components/tenant/TenantForm';
import Pagination from '../components/paginations/Pagination';

function Tenants() {
  // Mock Data
  const [tenants, setTenants] = useState([
    { 
      id: 1,
      fullName: "John Doe",
      phone: "123-456-7890",
      currentRental: "House A",
      paymentStatus: "Paid",
      idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
      createdAt: "2023-10-24T10:30:00.000Z"
    },
    { 
      id: 2,
      fullName: "Jane Smith",
      phone: "987-654-3210",
      currentRental: "Villa B",
      paymentStatus: "Pending",
      idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
      createdAt: "2023-11-01T14:15:00.000Z" 
    },
    { 
      id: 3,
      fullName: "Alice Johnson",
      phone: "555-123-4567",
      currentRental: "Apartment C",
      paymentStatus: "Overdue",
      idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
      createdAt: "2023-11-10T09:45:00.000Z"
    },
    // Added extra data to demonstrate pagination
    { id: 4,
       fullName: "Bob Brown",
        phone: "111-222-3333",
         currentRental: "Condo D",
          paymentStatus: "Paid",
           idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
            createdAt: "2023-11-15T11:20:00.000Z"
           },
    { 
      id: 5,
       fullName: "Charlie Davis",
        phone: "444-555-6666",
         currentRental: "House E",
          paymentStatus: "Paid",
           idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
            createdAt: "2023-11-20T16:05:00.000Z"
           },
    { 
      id: 6,
       fullName: "Diana Evans",
        phone: "777-888-9999",
         currentRental: "Villa F",
          paymentStatus: "Pending",
           idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
           createdAt: "2023-10-24T10:30:00.000Z"
           },
    { 
      id: 7,
      fullName: "John Doe",
      phone: "123-456-7890",
      currentRental: "House A",
      paymentStatus: "Paid",
      idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
      createdAt: "2023-10-24T10:30:00.000Z"
    },
    { 
      id: 8,
      fullName: "Jane Smith",
      phone: "987-654-3210",
      currentRental: "Villa B",
      paymentStatus: "Pending",
      idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
      createdAt: "2023-11-01T14:15:00.000Z" 
    },
    { 
      id: 9,
      fullName: "Alice Johnson",
      phone: "555-123-4567",
      currentRental: "Apartment C",
      paymentStatus: "Overdue",
      idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
      createdAt: "2023-10-24T10:30:00.000Z" 
    },
    // Added extra data to demonstrate pagination
    { id: 10,
       fullName: "Bob Brown",
        phone: "111-222-3333",
         currentRental: "Condo D",
          paymentStatus: "Paid",
           idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
           createdAt: "2023-10-24T10:30:00.000Z"
           },
    { 
      id: 11,
       fullName: "Charlie Davis",
        phone: "444-555-6666",
         currentRental: "House E",
          paymentStatus: "Paid",
           idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
           createdAt: "2023-10-24T10:30:00.000Z"
           },
    { 
      id: 12,
       fullName: "Diana Evans",
        phone: "777-888-9999",
         currentRental: "Villa F",
          paymentStatus: "Pending",
           idCard: "https://www.nyc.gov/assets/idnyc/images/content/card/Sample-IDNYC-Card.png",
           createdAt: "2023-10-24T10:30:00.000Z"
           },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);

  // Search/Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Change this number to show more/less rows

  // --- HANDLERS ---

  const openDrawer = () => setIsDrawerOpen(true);
  
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingTenant(null);
  };

  const handleSaveTenant = (tenantData) => {
    // IMAGE HANDLING: 
    // If the user uploaded a new file (Object), we must convert it to a URL to display it in the table.
    // In a real app, you would upload to a server here and get a URL back.
    let processedIdCard = tenantData.idCard;
    if (tenantData.idCard instanceof File) {
      processedIdCard = URL.createObjectURL(tenantData.idCard);
    }

    const finalTenantData = { ...tenantData, idCard: processedIdCard };

    if (editingTenant) {
      // Update existing
      setTenants((prev) =>
        prev.map((t) => (t.id === editingTenant.id ? { ...t, ...finalTenantData } : t))
      );
    } else {
      // Add new
      const newTenant = { id: Date.now(), ...finalTenantData, createdAt: new Date().toISOString() };
      setTenants((prev) => [newTenant, ...prev]); // Add to top of list
    }
    closeDrawer();
  };

  const handleDeleteTenant = (id) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      setTenants((prev) => prev.filter((t) => t.id !== id));
      // If we delete the last item on a page, go back one page
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleEditTenant = (tenant) => {
    setEditingTenant(tenant);
    setIsDrawerOpen(true);
  };

  // --- FILTERING LOGIC ---
  const filteredTenants = tenants.filter((t) => {
    const matchesSearch = t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.currentRental.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? t.paymentStatus === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Reset to page 1 if search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTenants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);

  return (
    <div className="p-4 space-y-4">
      <Header onOpenDrawer={openDrawer} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterStatus={filterStatus}
        onFilterChange={(e) => setFilterStatus(e.target.value)}
      />

      {/* Pass only currentItems to table, not the full list */}
      <Table
        tenants={currentItems}
        onEdit={handleEditTenant}
        onDelete={handleDeleteTenant}
      />

      {/* Only show pagination if we have data */}
      {filteredTenants.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingTenant ? "Edit Tenant" : "Add Tenant"}
      >
        <TenantForm tenant={editingTenant} onSave={handleSaveTenant} />
      </Drawer>
    </div>
  );
}

export default Tenants;