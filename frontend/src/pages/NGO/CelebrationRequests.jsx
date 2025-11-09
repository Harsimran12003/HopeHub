import React, { useState, useEffect } from "react";
import axios from "axios";
import NGOSidebar from "../../components/NGOSidebar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CelebrationRequests = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/celebrations`);
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching celebration requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`${API_URL}/api/celebrations/${id}/status`, {
        status: newStatus,
      });
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: res.data.status } : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading celebration requests...
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F5F5F5]">
      <NGOSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center md:text-left">
          Celebration Requests
        </h1>

        {/* ✅ Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md text-sm sm:text-base border border-gray-200">
            <thead className="bg-[#00ACC1] text-white">
              <tr className="text-left">
                <th className="py-3 px-2 sm:px-4">Requester Info</th>
                <th className="py-3 px-2 sm:px-4">Celebration Details</th>
                <th className="py-3 px-2 sm:px-4">Message</th>
                <th className="py-3 px-2 sm:px-4">Status</th>
                <th className="py-3 px-2 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-t hover:bg-gray-50 transition text-gray-800"
                >
                  {/* Requester Info */}
                  <td className="py-3 px-2 sm:px-4 align-top">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{req.name}</span>
                      <span className="text-gray-600 text-xs sm:text-sm break-all">
                        {req.email}
                      </span>
                      <span className="text-gray-600 text-xs sm:text-sm break-all">
                        {req.contactNumber}
                      </span>
                    </div>
                  </td>

                  {/* Celebration Details */}
                  <td className="py-3 px-2 sm:px-4 align-top">
                    <div className="flex flex-col gap-1 text-xs sm:text-sm">
                      <span>
                        <strong>Occasion:</strong> {req.occasion}
                      </span>
                      <span>
                        <strong>Type:</strong> {req.celebrationType}
                      </span>
                      <span>
                        <strong>Date:</strong> {req.preferredDate}
                      </span>
                      <span>
                        <strong>Time:</strong> {req.preferredTime}
                      </span>
                    </div>
                  </td>

                  {/* Message */}
                  <td
                    className="py-3 px-2 sm:px-4 align-top max-w-[150px] sm:max-w-xs truncate"
                    title={req.message}
                  >
                    {req.message}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-2 sm:px-4 align-top">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
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

                  {/* Actions */}
                  <td className="py-3 px-2 sm:px-4 flex flex-col sm:flex-row gap-2 sm:items-center">
                    <button
                      onClick={() => handleStatusChange(req._id, "Approved")}
                      className="px-2 sm:px-3 py-1 bg-green-500 text-white text-xs sm:text-sm rounded hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(req._id, "Rejected")}
                      className="px-2 sm:px-3 py-1 bg-red-500 text-white text-xs sm:text-sm rounded hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Requests */}
        {requests.length === 0 && (
          <p className="text-center text-gray-600 mt-4">
            No celebration requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CelebrationRequests;
