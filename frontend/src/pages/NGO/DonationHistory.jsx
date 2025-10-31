import React, { useState } from "react";
import NGOSidebar from "../../components/NGOSidebar";

const DonationHistory = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [donorFilter, setDonorFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const history = [
    { id: 1, donor: "Rahul Sharma", item: "Clothes", quantity: "15 pcs", date: "2025-08-20", status: "Completed" },
    { id: 2, donor: "Sneha Gupta", item: "Cooked Meals", quantity: "30 plates", date: "2025-09-05", status: "Completed" },
    { id: 3, donor: "Amit Verma", item: "Books", quantity: "20 books", date: "2025-09-12", status: "Completed" },
    { id: 4, donor: "Priya Mehta", item: "Toys", quantity: "10 sets", date: "2025-09-15", status: "Completed" },
  ];

  // Filtered history
  const filteredHistory = history.filter((donation) => {
    const matchesDonor = donation.donor.toLowerCase().includes(donorFilter.toLowerCase());
    const matchesMonth = monthFilter
      ? new Date(donation.date).getMonth() + 1 === parseInt(monthFilter)
      : true;
    return matchesDonor && matchesMonth;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <NGOSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Donation History</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by donor"
            value={donorFilter}
            onChange={(e) => setDonorFilter(e.target.value)}
            className="border rounded px-3 py-2 w-1/3"
          />
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="border rounded px-3 py-2 w-1/3"
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-[#00ACC1] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Donor</th>
                <th className="px-4 py-3 text-left">Item</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((donation) => (
                  <tr key={donation.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{donation.donor}</td>
                    <td className="px-4 py-3">{donation.item}</td>
                    <td className="px-4 py-3">{donation.quantity}</td>
                    <td className="px-4 py-3">{donation.date}</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                    No donations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
