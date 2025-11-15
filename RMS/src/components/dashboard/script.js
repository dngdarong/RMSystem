// --- Chart Data ---
        const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // --- 1. Monthly Income Chart ---
        const monthlyIncomeCtx = document.getElementById('monthlyIncomeChart').getContext('2d');
        const monthlyIncomeChart = new Chart(monthlyIncomeCtx, {
            type: 'line',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: 'Monthly Income ($)',
                    data: [12000, 15500, 14000, 18000, 20500, 16000, 17000, 19000, 21000, 22000, 18500, 23000],
                    borderColor: '#10b981', // Accent color
                    backgroundColor: '#10b98140',
                    tension: 0.4,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: false },
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: false, grid: { color: 'rgba(0,0,0,0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });

        // --- 2. New Tenant Registrations Chart ---
        const newTenantCtx = document.getElementById('newTenantChart').getContext('2d');
        const newTenantChart = new Chart(newTenantCtx, {
            type: 'bar',
            data: {
                labels: monthLabels,
                datasets: [{ 
                    label: 'New Tenants', 
                    data: [2, 3, 1, 4, 5, 3, 4, 2, 3, 6, 4, 5], 
                    backgroundColor: '#3b82f6', // Primary light color
                    borderRadius: 6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: false },
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: 'rgba(0,0,0,0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });

        // --- 3. Property Availability Chart (Doughnut) ---
        const propertyAvailabilityCtx = document.getElementById('propertyAvailabilityChart').getContext('2d');
        const propertyAvailabilityChart = new Chart(propertyAvailabilityCtx, {
            type: 'doughnut',
            data: {
                labels: ['Available', 'Rented', 'Maintenance'],
                datasets: [{ 
                    data: [5, 20, 3], // Example Data
                    backgroundColor: ['#10b981', '#1e3a8a', '#f59e0b'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Property Status Breakdown', font: { size: 14 } },
                    legend: { position: 'bottom' }
                }
            }
        });

        // --- 4. Occupancy Rate Chart (Bar) ---
        const occupancyRateCtx = document.getElementById('occupancyRateChart').getContext('2d');
        const occupancyRateChart = new Chart(occupancyRateCtx, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Occupancy Rate (%)',
                    data: [85, 92, 95, 90], 
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#1e3a8a',
                        '#f59e0b'
                    ],
                    borderRadius: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: false },
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: 'rgba(0,0,0,0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });

        
        // --- Utility Function (Placeholder) ---
        function alertMessage(type, message) {
            console.log(`[${type.toUpperCase()}] ${message}`);
            // Using window.alert as a simple placeholder for UI feedback
            window.alert(message);
        }

        // Toggle sidebar visibility on mobile
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }

        // Logout function placeholder
        function logOut() {
            document.body.innerHTML = '<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100"><h1 class="text-3xl font-bold text-primary-dark mb-4">Logging Out...</h1><p class="text-gray-600 w-full text-center">You have been securely logged out. Redirecting to login...</p></div>';
            console.log("Logout function triggered.");
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to login page after logout
            }, 2000);
        }