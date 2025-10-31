import React, { useState } from "react";
import NGOSidebar from "../../components/NGOSidebar";

const CelebrationRequests = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  // State for requests
  const [requests, setRequests] = useState([
    { id: 1, name: "Dinesh Kumar", event: "Birthday", date: "2025-10-15", status: "Pending" },
    { id: 2, name: "Ramesh Sharma", event: "Anniversary", date: "2025-10-20", status: "Approved" },
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
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Celebration Requests</h1>
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-[#00ACC1] text-white">
            <tr>
              <th className="py-2 px-4 text-left">Requester</th>
              <th className="py-2 px-4 text-left">Event</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-t hover:bg-gray-50 transition">
                <td className="py-2 px-4">{req.name}</td>
                <td className="py-2 px-4">{req.event}</td>
                <td className="py-2 px-4">{req.date}</td>
                <td className="py-2 px-4">
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
                <td className="py-2 px-4 flex gap-2">
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
  );
};

export default CelebrationRequests;
