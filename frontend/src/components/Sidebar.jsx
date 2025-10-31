import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaHandsHelping,
  FaCalendarAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaPhoneAlt,
  FaGift,
  FaHandHoldingHeart,
  FaTruck,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Sidebar = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const [openServices, setOpenServices] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "Hope Hero",
    profilePhoto: "",
  });

  // 🧩 Fetch current user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      let token = null;
      try {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
          const parsed = JSON.parse(stored);
          token = parsed?.token || parsed?.data?.token || null;
        }
      } catch (e) {}

      if (!token) token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found in localStorage");
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data.user || res.data;
        setUserData({
          fullName: user.fullName || user.name || "Hope Hero",
          profilePhoto: user.profilePhotoUrl || user.profilePhoto || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // 💾 Save sidebar state in localStorage
  const handleToggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen transition-all duration-300 shadow-xl
          ${isCollapsed ? "w-20" : "w-64"}
          bg-gradient-to-b from-[#00ACC1] via-[#26C6DA] to-[#4DD0E1]
          backdrop-blur-md bg-opacity-90 border-r border-white/20 flex flex-col justify-between`}
      >
        {/* Scrollable content wrapper */}
        <div className="flex flex-col h-full">
          {/* Toggle */}
          <div
            className="flex justify-end p-4 cursor-pointer text-white"
            onClick={handleToggleSidebar}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <FaBars size={22} />
          </div>

          {/* Profile Section */}
          <div className="text-center px-2 mb-4">
            <div className="flex justify-center mb-2">
              {userData.profilePhoto ? (
                <img
                  src={
                    userData.profilePhoto.startsWith("http")
                      ? userData.profilePhoto
                      : `${API_URL}${userData.profilePhoto.startsWith("/") ? "" : "/"}${userData.profilePhoto}`
                  }
                  alt="User"
                  className={`rounded-full object-cover border-2 border-white shadow-md transition-all duration-300 ${
                    isCollapsed ? "w-10 h-10" : "w-16 h-16"
                  }`}
                />
              ) : (
                <FaUserCircle
                  size={isCollapsed ? 40 : 60}
                  className="text-white/90 transition-all duration-300"
                />
              )}
            </div>
            {!isCollapsed && (
              <p className="text-white font-semibold text-base truncate">
                Welcome, {userData.fullName} 🌟
              </p>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 px-2 text-white pb-6">
            <SidebarLink
              to="/home"
              icon={<FaHome />}
              text="Home"
              collapsed={isCollapsed}
            />
            <SidebarLink
              to="/about"
              icon={<FaInfoCircle />}
              text="About"
              collapsed={isCollapsed}
            />
            <SidebarLink
              to="/how-it-works"
              icon={<FaHandsHelping />}
              text="How It Works"
              collapsed={isCollapsed}
            />

            {/* Services */}
            <div
              onClick={() => setOpenServices(!openServices)}
              title="Services"
              className={`flex items-center gap-3 px-5 py-2.5 rounded-lg cursor-pointer transition-all duration-200 
              hover:bg-white/20 ${openServices ? "bg-white/25" : ""}`}
            >
              <FaGift />
              {!isCollapsed && <span className="font-medium">Services ▾</span>}
            </div>

            {openServices && !isCollapsed && (
              <div className="flex flex-col ml-8 mt-1 space-y-2 text-sm">
                <SidebarSublink
                  to="/celebrations"
                  icon={<FaCalendarAlt />}
                  text="Celebrations"
                />
                <SidebarSublink
                  to="/donate"
                  icon={<FaHandHoldingHeart />}
                  text="Donate"
                />
              </div>
            )}

            <SidebarLink
              to="/pickup-schedule"
              icon={<FaTruck />}
              text="Pickup Schedule"
              collapsed={isCollapsed}
            />
            <SidebarLink
              to="/contact"
              icon={<FaPhoneAlt />}
              text="Contact"
              collapsed={isCollapsed}
            />
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-white/20 p-4">
          <Link
            to="/"
            title="Logout"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-white font-semibold hover:bg-white/25 transition-all duration-200"
          >
            <FaSignOutAlt /> {!isCollapsed && <span>Logout</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 p-6 flex-1 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

/* Reusable Links */
const SidebarLink = ({ to, icon, text, collapsed }) => (
  <Link
    to={to}
    title={collapsed ? text : ""}
    className={`flex items-center gap-3 px-5 py-2.5 rounded-lg text-white transition-all duration-200 hover:bg-white/20
      ${collapsed ? "justify-center" : "justify-start"}`}
  >
    {icon}
    {!collapsed && <span className="font-medium">{text}</span>}
  </Link>
);

const SidebarSublink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/90 hover:bg-white/20 transition-all duration-200"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Sidebar;
