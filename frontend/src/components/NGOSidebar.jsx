import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaHome,
  FaGift,
  FaTruck,
  FaHistory,
  FaBirthdayCake,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const NGOSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("ngoSidebarOpen") === "true"
  );

  // 💾 Persist sidebar state
  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("ngoSidebarOpen", newState);
  };

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/ngo/dashboard" },
    { icon: <FaGift />, label: "Donation Requests", path: "/ngo/donations" },
    { icon: <FaBirthdayCake />, label: "Celebration Requests", path: "/ngo/celebrations" },
    { icon: <FaTruck />, label: "Scheduled Pickups", path: "/ngo/pickups" },
    { icon: <FaHistory />, label: "Donation History", path: "/ngo/history" },
    { icon: <FaUsers />, label: "Profile Settings", path: "/ngo/profile" },
    { icon: <FaSignOutAlt />, label: "Logout", path: "/" },
  ];

  return (
    <div
      className={`h-screen bg-[#00ACC1] text-white shadow-lg transition-all duration-300 ease-in-out sticky top-0
      ${isOpen ? "w-64" : "w-16"} flex flex-col relative z-50`}
    >
      {/* Top Section with Logo + Hamburger */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          {isOpen && (
            <>
              <img
                src="/logo.png"
                alt="logo"
                className="h-[60px] w-[60px] rounded"
              />
              <span className="text-white font-bold text-xl">HopeHub</span>
            </>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="text-xl hover:text-[#FF7043] cursor-pointer"
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <FaBars />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-6 flex-1 overflow-y-auto overflow-x-visible relative">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index} className="relative group overflow-visible">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition cursor-pointer
                    ${
                      isActive
                        ? "bg-[#028c9f] font-semibold"
                        : "hover:bg-[#028c9f]"
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isOpen && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>

                {/* Custom Tooltip (now visible) */}
                {!isOpen && (
                  <span
                    className="absolute left-16 top-1/2 -translate-y-1/2 bg-[#212121] text-white text-xs 
                    px-3 py-1 rounded-md shadow-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                    transition-all duration-200 z-[9999] whitespace-nowrap pointer-events-none
                    translate-x-2 group-hover:translate-x-0"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NGOSidebar;
