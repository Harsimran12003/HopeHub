import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHandsHelping,
  FaGift,
  FaUsers,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: "dashboard", name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { id: "ngos", name: "Manage NGOs", path: "/admin/ngos", icon: <FaHandsHelping /> },
    { id: "donations", name: "Manage Donations", path: "/admin/donations", icon: <FaGift /> },
    { id: "users", name: "Manage Users", path: "/admin/users", icon: <FaUsers /> },
    { id: "settings", name: "Admin Settings", path: "/admin/settings", icon: <FaCogs /> },
  ];

  return (
    <div className="w-[260px] h-screen fixed top-0 left-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-gray-100 shadow-2xl flex flex-col justify-between transition-all duration-300">
      
      {/* ---- Logo Section ---- */}
      <div>
        <div className="text-center border-b border-gray-700 py-6">
          <img
            src="/logo.png"
            alt="HopeHub Logo"
            className="mx-auto h-16 w-auto mb-2 drop-shadow-lg"
          />
          <h1 className="text-xl font-bold text-[#00ACC1] tracking-wide">HopeHub Admin</h1>
        </div>

        {/* ---- Navigation ---- */}
        <nav className="mt-6 flex flex-col">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <Link
                to={item.path}
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center gap-3 px-6 py-3 text-[15px] font-medium transition-all duration-300 relative
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#00ACC1] to-[#FF7043] text-white shadow-md"
                      : "text-gray-300 hover:bg-white/10 hover:text-[#00ACC1]"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ---- Logout Section ---- */}
      <div className="border-t border-gray-700 p-5">
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition-all duration-200"
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
