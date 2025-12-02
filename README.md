# 🏠 Rental Management System (Admin Dashboard)

A modern, responsive web application built with **React** and **Vite** for managing rental properties, tenants, lease contracts, and payment records. Designed for landlords and property managers to streamline their administrative tasks.

## 🚀 Features

* **📊 Dashboard:** Overview of total properties, tenants, and financial summaries.
* **🏢 Properties:** Add, edit, delete, and list rental units (Apartments, Houses, etc.).
* **👥 Tenants:** Manage tenant profiles, contact info, and upload/view ID cards.
* **📝 Contracts:** Create lease agreements, view terms, and **generate/download PDF contracts**.
* **💰 Payments:** Track rent payments, filter by status (Paid, Pending, Overdue), and date.
* **🔔 Notifications:** System alerts and updates.
* **📱 Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile devices.

## 🛠️ Tech Stack

* **Framework:** [React.js](https://reactjs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** Tailwind CSS
* **PDF Generation:** jsPDF
* **Icons:** Heroicons / SVG
* **Routing:** React Router (implied)

## 📂 Project Structure

```text
RENTAL-MANAGEMENT-SYSTEM
├── node_modules/       # Dependencies
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # Reusable UI components
│   │   ├── contracts/  # Contract tables, forms, modals
│   │   ├── dashboard/  # Dashboard widgets
│   │   ├── notifications/
│   │   ├── paginations/# Shared pagination component
│   │   ├── payments/   # Payment tracking components
│   │   ├── properties/ # Property management components
│   │   ├── tenant/     # Tenant forms and tables
│   │   ├── Drawer.jsx  # Slide-out sidebar for forms
│   │   ├── Layout.jsx  # Main page layout wrapper
│   │   └── Sidebar.jsx # Navigation sidebar
│   ├── pages/          # Main view pages (Tenants, Payments, etc.)
│   ├── utils/          # Helper functions (e.g., PDF generator)
│   ├── App.jsx         # Main application entry
│   └── main.jsx        # DOM rendering
├── .gitignore
├── eslint.config.js    # Linting configuration
├── index.html          # HTML entry point
├── package.json        # Project metadata and dependencies
├── vite.config.js      # Vite configuration
└── README.md           # Documentation