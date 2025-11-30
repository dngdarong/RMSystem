import jsPDF from "jspdf";

export const generateContractPDF = (contract) => {
  // 1. Create new PDF instance
  const doc = new jsPDF();

  // --- CONFIGURATION ---
  const margin = 20;
  let cursorY = 20; // Tracks the vertical position
  const lineHeight = 10;
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Helper to center text
  const centerText = (text, y) => {
    const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  // --- 1. HEADER ---
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  centerText("RESIDENTIAL LEASE AGREEMENT", cursorY);
  cursorY += 15;

  doc.setFontSize(12);
  doc.setFont("times", "normal");
  centerText(`Date: ${new Date().toLocaleDateString()}`, cursorY);
  cursorY += 20;

  // --- 2. PARTIES ---
  doc.setFont("times", "bold");
  doc.text("1. PARTIES", margin, cursorY);
  cursorY += 8;

  doc.setFont("times", "normal");
  const partiesText = `This Agreement is made between the Landlord (Admin/Management) and the Tenant, ${contract.tenantName}.`;
  
  // splitTextToSize wraps text automatically within margins
  const wrappedParties = doc.splitTextToSize(partiesText, pageWidth - (margin * 2));
  doc.text(wrappedParties, margin, cursorY);
  cursorY += (wrappedParties.length * 7) + 5;

  // --- 3. PROPERTY ---
  doc.setFont("times", "bold");
  doc.text("2. PROPERTY", margin, cursorY);
  cursorY += 8;

  doc.setFont("times", "normal");
  doc.text(`The Landlord agrees to rent to the Tenant the property located at:`, margin, cursorY);
  cursorY += 7;
  doc.setFont("times", "bold");
  doc.text(`${contract.property}`, margin + 10, cursorY); // Indented
  cursorY += 15;

  // --- 4. TERM ---
  doc.setFont("times", "bold");
  doc.text("3. TERM", margin, cursorY);
  cursorY += 8;

  doc.setFont("times", "normal");
  const startDate = new Date(contract.startDate).toLocaleDateString();
  const endDate = new Date(contract.endDate).toLocaleDateString();
  const termText = `This lease shall begin on ${startDate} and end on ${endDate}.`;
  doc.text(termText, margin, cursorY);
  cursorY += 15;

  // --- 5. RENT ---
  doc.setFont("times", "bold");
  doc.text("4. RENT", margin, cursorY);
  cursorY += 8;

  doc.setFont("times", "normal");
  doc.text(`The Tenant agrees to pay a monthly rent of $${contract.rentAmount}.`, margin, cursorY);
  cursorY += 7;
  doc.text(`Payment Status: ${contract.status}`, margin, cursorY);
  cursorY += 20;

  // --- 6. STANDARD CLAUSE ---
  doc.setFont("times", "bold");
  doc.text("5. AGREEMENT", margin, cursorY);
  cursorY += 8;
  doc.setFont("times", "normal");
  const legalText = "The Tenant agrees to keep the premises in good condition and comply with all rules and regulations of the building. The Landlord reserves the right to inspect the property with prior notice.";
  const wrappedLegal = doc.splitTextToSize(legalText, pageWidth - (margin * 2));
  doc.text(wrappedLegal, margin, cursorY);
  cursorY += 40; // Add big gap for signatures

  // --- 7. SIGNATURES ---
  doc.setLineWidth(0.5);
  
  // Landlord Line
  doc.line(margin, cursorY, margin + 70, cursorY);
  doc.text("Landlord Signature", margin, cursorY + 5);

  // Tenant Line
  doc.line(pageWidth - margin - 70, cursorY, pageWidth - margin, cursorY);
  doc.text("Tenant Signature", pageWidth - margin - 70, cursorY + 5);

  // --- SAVE ---
  doc.save(`${contract.tenantName.replace(/\s+/g, '_')}_Contract.pdf`);
};