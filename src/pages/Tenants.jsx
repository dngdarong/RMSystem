
import { useState } from 'react';
import Header from '../components/tenant/Header';
import SearchBar from '../components/tenant/SearchBar';
import Table from '../components/tenant/Table';
import Drawer from '../components/Drawer';
import TenantForm from '../components/tenant/TenantForm';
import Pagination from '../components/paginations/Pagination';

 function Tenants() {
  const [tenants, setTenants] = useState([
    { id: 1,  name: "House A", type: "House", size: 120, price: 50000, status: "Available" },
    { id: 2,  name: "Villa B", type: "Villa", size: 300, price: 150000, status: "Rented" },
    { id: 3,  name: "Apartment C", type: "Apartment", size: 80, price: 30000, status: "Maintenance" },
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);

  // Search/filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingTenant(null);
  };

  const handleSaveTenant = (tenant) => {
    if (editingTenant) {
      setTenants((prev) =>
        prev.map((t) => (t.id === editingTenant.id ? { ...t, ...tenant } : t))
      );
    } else {
      const newTenant = { id: Date.now(), ...tenant };
      setTenants((prev) => [...prev, newTenant]);
    }
    closeDrawer();
  };

  const handleDeleteTenant = (id) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      setTenants((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleEditTenant = (tenant) => {
    setEditingTenant(tenant);
    setIsDrawerOpen(true);
  };

  // Filter tenants based on search and status
  const filteredTenants = tenants.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? t.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4">
      <Header onOpenDrawer={openDrawer} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterStatus={filterStatus}
        onFilterChange={(e) => setFilterStatus(e.target.value)}
      />

      <Table
        properties={filteredTenants}
        onEdit={handleEditTenant}
        onDelete={handleDeleteTenant}
      />

      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log("Change to page:", page)}
      />

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
