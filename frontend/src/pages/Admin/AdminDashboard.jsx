import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem("adminSidebarOpen");
    return savedState ? savedState === "true" : true;
  });

  // Listen for sidebar changes (when user toggles it)
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem("adminSidebarOpen");
      if (saved !== null) setIsSidebarOpen(saved === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      {/* ---- Main Content ---- */}
<div
  className={`
    flex-1 p-6 md:p-10 transition-all duration-300 
    ${isSidebarOpen ? "md:ml-[260px]" : "md:ml-[80px]"} 
    ml-0 pt-16 md:pt-10
  `}
>
  <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#00ACC1] text-center md:text-left">
    Welcome to HopeHub 🌿
  </h1>

        <p className="text-gray-700 mb-8 text-base md:text-lg text-center md:text-left">
          “A platform where compassion meets action.”  
          <br />
          <span className="text-gray-600 text-sm md:text-base">
            Empowering NGOs, connecting hearts, and building a brighter tomorrow.
          </span>
        </p>

        {/* About HopeHub */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100 mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
            About HopeHub 💫
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            HopeHub is a simple, unified platform designed to bridge the gap between
            NGOs and donors. Our goal is to make giving effortless, transparent, and
            impactful. From collecting essentials to organizing community drives,
            HopeHub aims to nurture a cycle of kindness that reaches those in need.
          </p>
          <p className="mt-4 text-gray-600 italic text-sm md:text-base">
            “The smallest act of kindness is worth more than the grandest intention.”
            — Oscar Wilde
          </p>
        </div>

        {/* Inspiration Section */}
        <div className="bg-[#00ACC1]/10 p-6 md:p-8 rounded-xl border-l-4 border-[#00ACC1] mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-[#00ACC1]">
            Daily Inspiration ✨
          </h2>
          <p className="text-gray-700 italic text-sm md:text-base">
            “No one has ever become poor by giving.” — Anne Frank
          </p>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Remember, every effort you make through HopeHub helps light up someone’s life. 💙
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default AdminDashboard;
