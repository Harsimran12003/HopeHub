import React, { useEffect, useState } from "react";
import NGOSidebar from "../../components/NGOSidebar";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DonationRequests = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch donation requests from DB
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/donations`);
        const filtered = res.data.filter((d) => d.status !== "Completed");
        setRequests(filtered);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/donations/${id}/status`, { status: newStatus });
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update donation status.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading donation requests...
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <NGOSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
        <div
  className="flex justify-between items-center mb-4 
             mt-2 sm:mt-0 px-4 sm:px-0
             md:ml-0" // ensures desktop alignment
>
  <h1
    className="text-xl sm:text-2xl font-bold text-[#212121]
               pl-14 md:pl-0" // adds space for hamburger on mobile
  >
    Donation Requests
  </h1>
</div>

        {requests.length === 0 ? (
          <div className="text-center text-gray-600">
            No donation requests found.
          </div>
        ) : (
          <>
            {/* Table for larger screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-[#00ACC1] text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Donor</th>
                    <th className="px-6 py-3 text-left">Items</th>
                    <th className="px-6 py-3 text-left">Pickup Date</th>
                    <th className="px-6 py-3 text-left">Pickup Address</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-3">
                        <div className="font-semibold">{req.name}</div>
                        <div className="text-sm text-gray-600">{req.email}</div>
                        <div className="text-sm text-gray-600">{req.contactNumber}</div>
                      </td>
                      <td className="px-6 py-3">
                        {req.items && req.items.length > 0 ? (
                          <ul className="list-disc pl-4 text-sm text-gray-700">
                            {req.items.map((item, index) => (
                              <li key={index}>
                                {item.itemName} ({item.quantity})
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-6 py-3">
                        {req.preferredDate} <br />
                        <span className="text-sm text-gray-600">{req.preferredTime}</span>
                      </td>
                      <td className="px-6 py-3">{req.pickupAddress}</td>
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
                          {req.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        {req.status === "Approved" ? (
                          <span className="text-green-600 font-semibold text-sm">Approved</span>
                        ) : req.status === "Rejected" ? (
                          <span className="text-red-600 font-semibold text-sm">Rejected</span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStatusChange(req._id, "Approved")}
                              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(req._id, "Rejected")}
                              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card layout for mobile screens */}
            <div className="md:hidden space-y-4">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
                >
                  <h2 className="font-bold text-lg text-[#212121] mb-2">{req.name}</h2>
                  <p className="text-sm text-gray-600">{req.email}</p>
                  <p className="text-sm text-gray-600 mb-2">{req.contactNumber}</p>

                  <div className="text-sm text-gray-700 mb-2">
                    <strong>Items:</strong>{" "}
                    {req.items && req.items.length > 0
                      ? req.items.map((item, i) => (
                          <span key={i}>
                            {item.itemName} ({item.quantity}){i < req.items.length - 1 ? ", " : ""}
                          </span>
                        ))
                      : "—"}
                  </div>

                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Pickup:</strong> {req.preferredDate} ({req.preferredTime})
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Address:</strong> {req.pickupAddress}
                  </p>

                  <p className="text-sm mt-2">
                    <strong>Status: </strong>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status || "Pending"}
                    </span>
                  </p>

                  <div className="flex gap-2 mt-3">
                    {req.status === "Approved" ? (
                      <span className="text-green-600 font-semibold text-sm">Approved</span>
                    ) : req.status === "Rejected" ? (
                      <span className="text-red-600 font-semibold text-sm">Rejected</span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStatusChange(req._id, "Approved")}
                          className="flex-1 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(req._id, "Rejected")}
                          className="flex-1 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonationRequests;
