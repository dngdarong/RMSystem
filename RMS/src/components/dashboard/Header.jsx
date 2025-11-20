import React from 'react';

function Header({ title = '', username = '', lastLogin = '' }) {
  return (
    <header class="main-header bg-white shadow-lg rounded-xl p-4 flex items-center justify-between mb-8">
                <div class="flex items-center">
                    
                    {/* <button id="menu-button" class="menu-button text-primary-dark mr-4 lg:hidden" onclick="toggleSidebar()">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button> */}
                    <h1 class="text-2xl sm:text-3xl font-extrabold text-primary-dark">Dashboard Overview</h1>
                </div>
                
                <div class="flex items-center space-x-3 sm:space-x-4 text-sm sm:text-base">
                    
                    <span class="text-gray-700 font-medium hidden sm:block">Welcome, <strong class="text-primary-dark">Admin User!</strong></span>
                                        
                    <a href="notifications.html" class="relative text-gray-500 hover:text-primary-dark p-2 rounded-full transition duration-150">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 5.71 6 8.368 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        
                        <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    </a>
                </div>
            </header>
  );
}

export default Header;
