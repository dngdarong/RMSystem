import React from 'react';

  function ChartsGrid() {

  
return(
  <div className="main-content flex-1 p-4 md:p-8 lg:p-10">
  <div class="charts-grid grid grid-cols-1 md:grid-cols-2 gap-6">

            
            <div class="bg-white p-6 rounded-xl shadow-xl">
                <h3 class="text-lg font-semibold text-primary-dark mb-4 border-b pb-2">Monthly Income Trend</h3>
                <div class="w-full h-80">
                    <canvas id="monthlyIncomeChart"></canvas>
                </div>
            </div>

            
            <div class="bg-white p-6 rounded-xl shadow-xl">
                <h3 class="text-lg font-semibold text-primary-dark mb-4 border-b pb-2">New Tenant Registrations</h3>
                <div class="w-full h-80">
                    <canvas id="newTenantChart"></canvas>
                </div>
            </div>

            
            <div class="bg-white p-6 rounded-xl shadow-xl md:col-span-1">
                <h3 class="text-lg font-semibold text-primary-dark mb-4 border-b pb-2">Property Availability</h3>
                <div class="w-2/3 mx-auto h-80">
                    <canvas id="propertyAvailabilityChart"></canvas>
                </div>
            </div>

            
            <div class="bg-white p-6 rounded-xl shadow-xl md:col-span-1">
                <h3 class="text-lg font-semibold text-primary-dark mb-4 border-b pb-2">Occupancy Rate</h3>
                <div class="w-full h-80">
                    <canvas id="occupancyRateChart"></canvas>
                </div>
            </div>
        </div>
        </div>
);
}
export default ChartsGrid;