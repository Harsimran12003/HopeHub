import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const PickupSchedulePage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDonations = async () => {
      if (!userId || userId === "null" || userId === "undefined") {
        console.warn("No valid user ID found in localStorage, skipping fetch.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/donations/user/${userId}`
        );
        setDonations(res.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-[#00ACC1] text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#FFF8E1] to-[#FFE0B2]">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Navbar */}
      <div className="block md:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <div className="flex-1 px-4 sm:px-6 md:px-8 py-8 mt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#00ACC1] mb-8 drop-shadow-sm">
            🚚 Pickup Schedule
          </h1>

          {donations.length === 0 ? (
            <p className="text-center text-gray-600 text-sm sm:text-base">
              No donations found.
            </p>
          ) : (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {donations.map((req) => (
                <div
                  key={req._id}
                  className="relative bg-white/80 backdrop-blur-md border border-white/40 
                    rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition-all duration-300 
                    hover:-translate-y-1 text-sm sm:text-base"
                >
                  {/* Status Tag */}
                  <div
                    className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
                      req.status === "Completed"
                        ? "bg-green-500 text-white"
                        : req.status === "Scheduled"
                        ? "bg-yellow-500 text-white"
                        : "bg-[#00ACC1] text-white"
                    }`}
                  >
                    {req.status}
                  </div>

                  {/* Donation Info */}
                  <h3 className="text-lg font-semibold text-[#00ACC1] mb-2">
                    {req.ngoId?.name || "Unknown NGO"}
                  </h3>

                  <p className="text-gray-700 mb-1">
                    <strong>Items:</strong>{" "}
                  </p>
                  {req.items && req.items.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700 mb-2">
                      {req.items.map((item, index) => (
                        <li key={item._id || index}>
                          {item.itemName} – Quantity: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 mb-2">—</p>
                  )}

                  <p className="text-gray-700 mb-1">
                    <strong>Date:</strong>{" "}
                    {req.preferredDate
                      ? req.preferredDate.slice(0, 10)
                      : "Not Scheduled"}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Time:</strong>{" "}
                    {req.preferredTime || "Not Scheduled"}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Pickup Person:</strong>{" "}
                    {req.pickupPerson?.name ||
                      req.pickupPerson ||
                      "Not Assigned"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickupSchedulePage;
