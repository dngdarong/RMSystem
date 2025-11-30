// src/components/contracts/ContractDetailsModal.jsx
import React, { useState } from "react";
import { generateContractPDF } from "../../utils/generateContract";

function ContractDetailsModal({ contract, onClose }) {
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' or 'conditions'

  if (!contract) return null;

  // Helper to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full mx-4 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- 1. HEADER --- */}
        <div className="bg-teal-700 px-6 py-4 flex justify-between items-center shrink-0">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            Contract Details
          </h3>
          <button onClick={onClose} className="text-teal-200 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* --- 2. TABS --- */}
        <div className="flex border-b border-gray-200 bg-gray-50 shrink-0">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
              activeTab === "dashboard"
                ? "border-b-2 border-teal-600 text-teal-700 bg-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab("conditions")}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
              activeTab === "conditions"
                ? "border-b-2 border-teal-600 text-teal-700 bg-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            Terms & Conditions
          </button>
        </div>

        {/* --- 3. SCROLLABLE CONTENT --- */}
        <div className="p-6 overflow-y-auto">
          
          {/* === TAB 1: DASHBOARD === */}
          {activeTab === "dashboard" && (
            <div className="animate-fade-in">
              {/* Tenant Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-2xl font-bold">
                  {contract.tenantName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Tenant Name</p>
                  <h2 className="text-2xl font-bold text-gray-800">{contract.tenantName}</h2>
                  <span className={`inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    contract.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${contract.status === "Active" ? "bg-green-500" : "bg-gray-500"}`}></span>
                    {contract.status}
                  </span>
                </div>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-6">
                {/* Property */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs text-gray-400 font-bold uppercase block mb-1">Property / Room</label>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span className="font-medium text-lg">{contract.property}</span>
                  </div>
                </div>

                {/* Contract Type */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs text-gray-400 font-bold uppercase block mb-1">Type</label>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="font-medium">Residential Lease</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <label className="text-xs text-gray-400 font-bold uppercase block mb-2">Duration</label>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-xs text-gray-500">Start Date</span>
                      <span className="font-semibold text-gray-800">{formatDate(contract.startDate)}</span>
                    </div>
                    <div className="h-px flex-1 mx-4 bg-gray-300 relative">
                       <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-gray-50 px-2 text-xs text-gray-400">TO</div>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-gray-500">End Date</span>
                      <span className="font-semibold text-gray-800">{formatDate(contract.endDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Financials */}
                <div className="col-span-2">
                  <label className="text-xs text-gray-400 font-bold uppercase block mb-1">Financials</label>
                  <div className="flex justify-between items-center bg-teal-50 p-4 rounded-lg border border-teal-100">
                    <span className="text-teal-800 font-medium">Monthly Rent</span>
                    <span className="text-2xl font-bold text-teal-700">${contract.rentAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === TAB 2: CONDITIONS === */}
          {activeTab === "conditions" && (
            <div className="animate-fade-in space-y-6 text-gray-700 text-sm leading-relaxed">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                 <h4 className="font-bold text-gray-900 mb-2 border-b pb-1">1. PARTIES</h4>
                 <p>This Residential Lease Agreement is entered into between the <strong>Landlord</strong> and the Tenant <strong>{contract.tenantName}</strong>.</p>
              </div>

              <div>
                 <h4 className="font-bold text-gray-900 mb-1">2. PROPERTY</h4>
                 <p>The Landlord agrees to rent to the Tenant the property described as: <strong>{contract.property}</strong>.</p>
              </div>

              <div>
                 <h4 className="font-bold text-gray-900 mb-1">3. TERM</h4>
                 <p>The lease begins on <strong>{formatDate(contract.startDate)}</strong> and ends on <strong>{formatDate(contract.endDate)}</strong>.</p>
              </div>

              <div>
                 <h4 className="font-bold text-gray-900 mb-1">4. RENT</h4>
                 <p>The Tenant agrees to pay the Landlord <strong>${contract.rentAmount}</strong> per month.</p>
              </div>

              <div>
                 <h4 className="font-bold text-gray-900 mb-1">5. STANDARD CONDITIONS</h4>
                 <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>The Tenant shall maintain the premises in a clean and sanitary condition.</li>
                    <li>No pets are allowed without prior written consent.</li>
                    <li>The Tenant shall not sublease the property without permission.</li>
                    <li>The Landlord reserves the right to inspect the property with 24 hours notice.</li>
                 </ul>
              </div>
            </div>
          )}
        </div>

        {/* --- 4. FOOTER --- */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm"
          >
            Close
          </button>
          
          <button
            onClick={() => generateContractPDF(contract)}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors shadow-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContractDetailsModal;