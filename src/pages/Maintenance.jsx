
import { useState } from 'react';
import MaintenanceHeader from '../components/maintenance/MaintenanceHeader';
import FiltersSection from '../components/maintenance/FiltersSection';
 function Maintenance() {
  // const [stats, setStats] = useState({
  //   properties: 0,
  //   tenants: 0,
  //   vacancies: 0,
  //   monthlyIncome: 0,
  // });



  return (
    <div>
      <MaintenanceHeader onOpenDrawer={() => {}} />
      <FiltersSection
        searchTerm=""
        onSearchChange={() => {}}
        statusFilter=""
        onStatusesChange={() => {}}
        priorityFilter=""
        onPriorityChange={() => {}}
        onClear={() => {}}
      />
      
    </div>
  );
}

export default Maintenance;