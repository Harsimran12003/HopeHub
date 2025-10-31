import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const PickupSchedulePage = () => {
  const dummyRequests = [
    { id: 1, ngo: "Sunshine Foundation", items: "Food, Clothes", date: "2025-10-05" },
    { id: 2, ngo: "Hope for All", items: "Stationary, Toys", date: "2025-10-07" },
    { id: 3, ngo: "Smile NGO", items: "Clothes, Books", date: "2025-10-09" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#FFF8E1] to-[#FFE0B2]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
      

        <div className="flex-1 p-8 mt-6">
          <h1 className="text-3xl font-bold text-center text-[#00ACC1] mb-10 drop-shadow-sm">
            🚚 Pickup Schedule
          </h1>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {dummyRequests.map((req) => (
              <div
                key={req.id}
                className="relative bg-white/70 backdrop-blur-md border border-white/40 
                rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 
                hover:-translate-y-1"
              >
                <div className="absolute top-3 right-3 bg-[#00ACC1] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  Pending
                </div>

                <h3 className="text-lg font-semibold text-[#00ACC1] mb-2">
                  {req.ngo}
                </h3>
                <p className="text-gray-700 mb-1">
                  <strong>Items:</strong> {req.items}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Date:</strong> {req.date}
                </p>

                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00ACC1] to-[#FF7043] 
                    text-white text-sm font-semibold shadow-md hover:opacity-90 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupSchedulePage;
