
import { useState } from 'react';


 function Card() {
  // const [stats, setStats] = useState({
  //   properties: 0,
  //   tenants: 0,
  //   vacancies: 0,
  //   monthlyIncome: 0,
  // });



  return (
         <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            <div class="card bg-white p-5 rounded-xl shadow-xl transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02]">
                <p class="text-sm text-gray-500 font-semibold mb-1">Total Properties</p>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-accent-color">24</h2>
                <span class="text-xs text-gray-400 mt-2 block">100% Occupied</span>
            </div>

            <div class="card bg-white p-5 rounded-xl shadow-xl transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02]">
                <p class="text-sm text-gray-500 font-semibold mb-1">Total Tenants</p>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-primary-dark">58</h2>
                <span class="text-xs text-gray-400 mt-2 block">2 New this month</span>
            </div>

            <div class="card bg-white p-5 rounded-xl shadow-xl transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02]">
                <p class="text-sm text-gray-500 font-semibold mb-1">Monthly Income</p>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-accent-color">$12,400</h2>
                <span class="text-xs text-gray-400 mt-2 block">+5% from last month</span>
            </div>

            <div class="card bg-white p-5 rounded-xl shadow-xl transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02]">
                <p class="text-sm text-gray-500 font-semibold mb-1">Pending Maintenance</p>
                <h2 class="text-3xl sm:text-4xl font-extrabold text-red-500">5</h2>
                <span class="text-xs text-gray-400 mt-2 block">3 High Priority</span>
            </div>
        </div>
  );
}

export default Card;