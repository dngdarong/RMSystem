import { Link } from "react-router-dom";

function Sidebar({ isOpen = false, onClose = () => {} }) {
  const mobileClasses = isOpen ? 'fixed inset-0 z-40 flex' : 'hidden sm:flex';

  return (
    <div className={`${mobileClasses} flex flex-col gap-4 p-4 bg-gray-800 text-white sm:h-screen w-full sm:w-48`}>
      {/* mobile close button */}
      {isOpen && (
        <div className="sm:hidden absolute top-4 right-4 z-50">
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="p-2 rounded-md bg-gray-900 text-white cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6">RMS</h2>
      </div>
        <Link
          to="/"
          className="text-white font-semibold p-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/users"
          className="text-white font-semibold p-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Users
        </Link>
        <Link
          to="/units"
          className="text-white font-semibold p-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Units
        </Link>
        <Link
          to="/tenants"
          className="text-white font-semibold p-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Tenants
        </Link>
        <Link
          to="/maintenance"
          className="text-white font-semibold p-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Maintenance
        </Link>
        <Link
          to="/payments"
          className="text-white font-semibold p-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Payments
        </Link>
        <Link
          to="/reports"
          className="text-white font-semibold p-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Reports
        </Link>
        <Link
          to="/myprofile"
          className="text-white font-semibold p-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          My Profile
        </Link>
        <div className=" border-t pt-4 mt-auto w-full">
          <button className="button text-white font-semibold p-2 rounded-md hover:bg-gray-700 bg-gray-900 transition-colors w-full">
             Logout
          </button>
        </div>
      </div>
    );
  }

  export default Sidebar;