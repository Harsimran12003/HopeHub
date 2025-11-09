import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHandsHelping,
  FaGift,
  FaUsers,
  FaCogs,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = ({ currentView, onViewChange }) => {
  const location = useLocation();

  // ✅ Remember open/close state using localStorage
  const [isOpen, setIsOpen] = useState(() => {
    const savedState = localStorage.getItem("adminSidebarOpen");
    return savedState ? savedState === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("adminSidebarOpen", isOpen);
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const navItems = [
    { id: "dashboard", name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { id: "ngos", name: "Manage NGOs", path: "/admin/ngos", icon: <FaHandsHelping /> },
    { id: "donations", name: "Manage Donations", path: "/admin/donations", icon: <FaGift /> },
    { id: "users", name: "Manage Users", path: "/admin/users", icon: <FaUsers /> },
    { id: "settings", name: "Admin Settings", path: "/admin/settings", icon: <FaCogs /> },
  ];

  return (
    <>
      {/* ---- Always visible toggle button (for all screen sizes) ---- */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 text-white bg-[#00ACC1] p-2 rounded-md shadow-md hover:bg-[#028c9f] transition duration-300`}
      >
        {isOpen ? <FaBars size={20} /> : <FaBars size={20} />}
      </button>

      {/* ---- Sidebar ---- */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155]
          text-gray-100 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0 w-[260px]" : "-translate-x-full md:w-[80px]"}
        `}
      >
        {/* ---- Logo Section ---- */}
        <div>
          <div className="text-center border-b border-gray-700 py-6 flex flex-col items-center">
            <img
              src="/logo.png"
              alt="HopeHub Logo"
              className={`transition-all duration-300 drop-shadow-lg ${
                isOpen ? "h-16 w-auto mb-2" : "h-10 mb-0"
              }`}
            />
            {isOpen && (
              <h1 className="text-xl font-bold text-[#00ACC1] tracking-wide">
                HopeHub Admin
              </h1>
            )}
          </div>

          {/* ---- Navigation ---- */}
          <nav className="mt-6 flex flex-col">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  to={item.path}
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    if (window.innerWidth < 768) setIsOpen(false); // close on small screens
                  }}
                  className={`flex items-center gap-3 px-6 py-3 text-[15px] font-medium transition-all duration-300 relative
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#00ACC1] to-[#FF7043] text-white shadow-md"
                        : "text-gray-300 hover:bg-white/10 hover:text-[#00ACC1]"
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ---- Logout ---- */}
        <div className="border-t border-gray-700 p-5">
          <Link
            to="/"
            className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition-all duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            {isOpen && <span>Logout</span>}
          </Link>
        </div>
      </div>

      {/* ---- Overlay (for mobile view only) ---- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
