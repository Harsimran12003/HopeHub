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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Persist sidebar state for desktops only
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      // mobile behavior
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      const newState = !isOpen;
      setIsOpen(newState);
      localStorage.setItem("ngoSidebarOpen", newState);
    }
  };

  // 🧠 Close sidebar when window resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <>
      {/* 🌐 Desktop Sidebar */}
      <div
        className={`hidden md:flex h-screen bg-[#00ACC1] text-white shadow-lg transition-all duration-300 ease-in-out sticky top-0
        ${isOpen ? "w-64" : "w-16"} flex-col relative z-50`}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            {isOpen && (
              <>
                <img
                  src="/logo.png"
                  alt="logo"
                  className="h-[50px] w-[50px] rounded"
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
        <nav className="mt-6 flex-1 overflow-y-auto relative">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index} className="relative group">
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

                  {/* Tooltip for collapsed sidebar */}
                  {!isOpen && (
                    <span
                      className="absolute left-16 top-1/2 -translate-y-1/2 bg-[#212121] text-white text-xs 
                      px-3 py-1 rounded-md shadow-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                      transition-all duration-200 z-[9999] whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0"
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

      {/* 📱 Mobile Navbar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-[100]">
        <button
          onClick={toggleSidebar}
          className="bg-[#00ACC1] text-white p-3 rounded-full shadow-md hover:bg-[#008C9E] transition-all"
        >
          <FaBars />
        </button>
      </div>

      {/* 📱 Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
          ></div>

          {/* Drawer */}
          <div
            className="fixed top-0 left-0 w-64 h-full bg-[#00ACC1] text-white shadow-xl z-[99] flex flex-col animate-slideIn"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="h-[45px] w-[45px] rounded"
                />
                <span className="font-bold text-lg">HopeHub</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl hover:text-[#FF7043]"
              >
                ✕
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav className="mt-6 flex-1 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={index}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-5 py-3 rounded-md transition cursor-pointer
                        ${
                          isActive
                            ? "bg-[#028c9f] font-semibold"
                            : "hover:bg-[#028c9f]"
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </>
      )}

      {/* Slide-in Animation */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0.5; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-in-out;
          }
        `}
      </style>
    </>
  );
};

export default NGOSidebar;
