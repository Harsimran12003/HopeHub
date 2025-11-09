import React, { useState, useEffect } from "react";
import axios from "axios";
import NGOSidebar from "../../components/NGOSidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DonationHistory = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [donorFilter, setDonorFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);
  const ngoId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/donations`);
        const filtered = res.data.filter(
          (d) =>
            (d.ngoId?._id === ngoId || d.assignedNGO === ngoId) &&
            d.status?.trim().toLowerCase() === "completed"
        );
        setDonations(filtered);
        setFilteredDonations(filtered);
      } catch (error) {
        console.error("Error fetching donation history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [ngoId]);

  // ✅ Handle filtering
  useEffect(() => {
    const filtered = donations.filter((donation) => {
      const matchesDonor = donation.name
        ?.toLowerCase()
        .includes(donorFilter.toLowerCase());

      const completionDate =
        donation.completedAt ||
        donation.updatedAt ||
        donation.preferredDate ||
        donation.date;

      const matchesMonth = monthFilter
        ? new Date(completionDate).getMonth() + 1 === parseInt(monthFilter)
        : true;

      return matchesDonor && matchesMonth;
    });

    setFilteredDonations(filtered);
  }, [donorFilter, monthFilter, donations]);

  // ✅ Export as CSV
  const exportToCSV = () => {
    const csvData = filteredDonations.map((donation) => ({
      Donor: donation.name,
      Email: donation.email,
      Contact: donation.contactNumber,
      Items: donation.items?.map((i) => `${i.itemName} (${i.quantity})`).join(", "),
      Pickup_Address: donation.pickupAddress,
      Completed_Date: donation.completedAt
        ? new Date(donation.completedAt).toLocaleDateString()
        : "—",
      Status: "Completed",
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Donation_History.csv";
    link.click();
  };

  // ✅ Export as Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredDonations.map((donation) => ({
        Donor: donation.name,
        Email: donation.email,
        Contact: donation.contactNumber,
        Items: donation.items
          ?.map((i) => `${i.itemName} (${i.quantity})`)
          .join(", "),
        Pickup_Address: donation.pickupAddress,
        Completed_Date: donation.completedAt
          ? new Date(donation.completedAt).toLocaleDateString()
          : "—",
        Status: "Completed",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Donations");
    XLSX.writeFile(wb, "Donation_History.xlsx");
  };

  // ✅ Export as PDF
const exportToPDF = () => {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });

  doc.setFontSize(14);
  doc.text("Donation History Report", 40, 40);

  const tableData = filteredDonations.map((d) => [
    d.name || "—",
    d.email || "—",
    d.contactNumber || "—",
    d.items?.map((i) => `${i.itemName} (${i.quantity})`).join(", ") || "—",
    d.pickupAddress || "—",
    d.completedAt ? new Date(d.completedAt).toLocaleDateString() : "—",
    "Completed",
  ]);

  autoTable(doc, {
    startY: 60,
    head: [
      [
        "Donor",
        "Email",
        "Contact",
        "Items",
        "Pickup Address",
        "Completed Date",
        "Status",
      ],
    ],
    body: tableData,
    styles: {
      fontSize: 8,
      cellPadding: 4,
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: [0, 172, 193],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });

  doc.save("Donation_History.pdf");
};

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading donation history...
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <NGOSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-[#212121] mb-6 text-center md:text-left">
          Donation History
        </h1>

        {/* Filters + Export Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="text"
              placeholder="Search by donor name..."
              value={donorFilter}
              onChange={(e) => setDonorFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 text-sm sm:text-base"
            />
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-48 text-sm sm:text-base"
            >
              <option value="">All Months</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((m, i) => (
                <option key={i + 1} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm sm:text-base transition"
            >
              Export CSV
            </button>
            <button
              onClick={exportToExcel}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm sm:text-base transition"
            >
              Export Excel
            </button>
            <button
              onClick={exportToPDF}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm sm:text-base transition"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Table */}
        {filteredDonations.length === 0 ? (
          <div className="text-center text-gray-600">
            No completed donations found for your NGO.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full text-xs sm:text-sm md:text-base">
              <thead className="bg-[#00ACC1] text-white">
                <tr>
                  <th className="px-2 sm:px-4 md:px-6 py-3 text-left">Donor</th>
                  <th className="px-2 sm:px-4 md:px-6 py-3 text-left">Items</th>
                  <th className="px-2 sm:px-4 md:px-6 py-3 text-left">Pickup Address</th>
                  <th className="px-2 sm:px-4 md:px-6 py-3 text-left">Completed Date</th>
                  <th className="px-2 sm:px-4 md:px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation) => {
                  const completionDate =
                    donation.completedAt ||
                    donation.updatedAt ||
                    donation.preferredDate ||
                    donation.date;

                  return (
                    <tr
                      key={donation._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* Donor Info */}
                      <td className="px-2 sm:px-4 md:px-6 py-3 align-top">
                        <div className="font-semibold text-gray-800">{donation.name}</div>
                        <div className="text-gray-600 text-xs sm:text-sm">
                          {donation.email}
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm">
                          {donation.contactNumber}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="px-2 sm:px-4 md:px-6 py-3 align-top">
                        {donation.items?.length ? (
                          <ul className="list-disc pl-4 text-xs sm:text-sm text-gray-700">
                            {donation.items.map((item, idx) => (
                              <li key={idx}>
                                {item.itemName} ({item.quantity})
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "—"
                        )}
                      </td>

                      {/* Pickup Address */}
                      <td className="px-2 sm:px-4 md:px-6 py-3 text-gray-700 break-words">
                        {donation.pickupAddress || "—"}
                      </td>

                      {/* Completed Date */}
                      <td className="px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                        {completionDate
                          ? new Date(completionDate).toLocaleDateString()
                          : "—"}
                      </td>

                      {/* Status */}
                      <td className="px-2 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          Completed
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationHistory;
