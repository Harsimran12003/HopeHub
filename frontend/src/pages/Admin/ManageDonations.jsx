import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ManageDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/donations`);
        setDonations(res.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const filteredDonations = donations.filter(
    (d) =>
      d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.ngoId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredDonations.map((d) => ({
        Donor: d.name,
        Email: d.email,
        Contact: d.contactNumber,
        Address: d.pickupAddress,
        NGO: d.ngoId?.name || "N/A",
        Items: d.items?.map((i) => `${i.itemName} (${i.quantity})`).join(", "),
        Status: d.status,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Donations");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Donations.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(16);
    doc.text("Donation Report", 14, 15);

    const tableData = filteredDonations.map((d) => [
      d.name,
      d.email,
      d.contactNumber,
      d.pickupAddress,
      d.ngoId?.name || "N/A",
      d.items?.map((i) => `${i.itemName} (${i.quantity})`).join(", "),
      d.status,
    ]);

    autoTable(doc, {
      startY: 25,
      head: [["Donor", "Email", "Contact", "Address", "NGO", "Items", "Status"]],
      body: tableData,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [0, 172, 193] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save("Donations.pdf");
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Donor", "Email", "Contact", "Address", "NGO", "Items", "Status"],
      ...filteredDonations.map((d) => [
        d.name,
        d.email,
        d.contactNumber,
        d.pickupAddress,
        d.ngoId?.name || "N/A",
        d.items?.map((i) => `${i.itemName} (${i.quantity})`).join(", "),
        d.status,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Donations.csv");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="md:block">
        <AdminSidebar currentView="donations" onViewChange={() => {}} />
      </div>

      <div className="flex-1 md:ml-[250px] p-4 sm:p-6 lg:p-8 transition-all">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center md:text-left">
          Donation Management
        </h1>

        {/* Search + Export Buttons */}
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="🔍 Search by donor or NGO name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
          />

          <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3">
            <button
              onClick={exportToPDF}
              className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow text-sm sm:text-base"
            >
              📄 PDF
            </button>
            <button
              onClick={exportToExcel}
              className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow text-sm sm:text-base"
            >
              📊 Excel
            </button>
            <button
              onClick={exportToCSV}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow text-sm sm:text-base"
            >
              📑 CSV
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
          {loading ? (
            <div className="text-center py-6 text-gray-500 italic">
              Loading donations...
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="text-center py-6 text-gray-500 italic">
              No matching donations found.
            </div>
          ) : (
            <table className="min-w-full text-sm sm:text-base border-collapse">
              <thead className="bg-[#00ACC1] text-white">
                <tr>
                  <th className="py-3 px-4 text-left whitespace-nowrap">Donor</th>
                  <th className="py-3 px-4 text-left whitespace-nowrap">Email</th>
                  <th className="py-3 px-4 text-left whitespace-nowrap">Contact</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">NGO</th>
                  <th className="py-3 px-4 text-left">Items</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((d, index) => (
                  <tr
                    key={d._id}
                    className={`border-b hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {d.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{d.email}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {d.contactNumber}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{d.pickupAddress}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {d.ngoId?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {d.items?.map((item, i) => (
                        <div key={i}>
                          {item.itemName} ({item.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                          d.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : d.status === "Approved"
                            ? "bg-blue-100 text-blue-700"
                            : d.status === "Scheduled"
                            ? "bg-purple-100 text-purple-700"
                            : d.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageDonations;
