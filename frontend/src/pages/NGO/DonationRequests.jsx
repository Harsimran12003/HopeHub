import React, { useState } from "react";
import NGOSidebar from "../../components/NGOSidebar"; 

const DonationRequests = () => {
  const [isOpen, setIsOpen] = useState(true); 
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Dummy Data
  const [requests, setRequests] = useState([
    {
      id: 1,
      donor: "Rahul Sharma",
      item: "Clothes",
      quantity: "10 pcs",
      pickupDate: "2025-09-30",
      status: "Pending",
    },
    {
      id: 2,
      donor: "Neha Gupta",
      item: "Cooked Meals",
      quantity: "20 plates",
      pickupDate: "2025-10-02",
      status: "Pending",
    },
    {
      id: 3,
      donor: "Amit Verma",
      item: "Books",
      quantity: "15 books",
      pickupDate: "2025-10-05",
      status: "Approved",
    },
  ]);

  // Handle status update
  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <NGOSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-[#212121] mb-6">
          Donation Requests
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-[#00ACC1] text-white">
              <tr>
                <th className="px-6 py-3 text-left">Donor</th>
                <th className="px-6 py-3 text-left">Item</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Pickup Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{req.donor}</td>
                  <td className="px-6 py-3">{req.item}</td>
                  <td className="px-6 py-3">{req.quantity}</td>
                  <td className="px-6 py-3">{req.pickupDate}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => handleStatusChange(req.id, "Approved")}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(req.id, "Rejected")}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;
