
import { useState } from 'react';
import MaintenanceHeader from '../components/maintenance/MaintenanceHeader';

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
    </div>
  );
}

export default Maintenance;