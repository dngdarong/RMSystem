// src/components/Layout.jsx
import Sidebar from './Sidebar';
import { useState } from 'react';


function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-layout flex flex-col sm:flex-row">
      <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Page content: stacks under sidebar on small screens, sits beside on sm+ */}
      <main className=" app-container flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen">
        {/* mobile hamburger (visible on phones) */}
        <div className="sm:hidden">
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="p-2 m-2 rounded-md bg-gray-400 text-black cursor-pointer"
          >
            {/* simple hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}

export default Layout;