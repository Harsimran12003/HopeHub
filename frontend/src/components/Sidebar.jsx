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
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Sidebar = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const [openServices, setOpenServices] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "Hope Hero",
    profilePhoto: "",
  });

  // Handle resizing
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user info
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let token =
          JSON.parse(localStorage.getItem("userInfo"))?.token ||
          localStorage.getItem("token");

        if (!token) return;
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

  const handleToggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex">
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300 shadow-xl
          ${
            isMobile
              ? `bg-gradient-to-b from-[#00ACC1] via-[#26C6DA] to-[#4DD0E1]
                 w-64 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`
              : `${isCollapsed ? "w-20" : "w-64"} bg-gradient-to-b from-[#00ACC1] via-[#26C6DA] to-[#4DD0E1]`
          }
          backdrop-blur-md bg-opacity-90 border-r border-white/20 flex flex-col justify-between`}
      >
        {/* Scrollable content wrapper */}
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Toggle (Desktop + Mobile Close) */}
          <div
            className="flex justify-between items-center p-4 text-white"
          >
            <FaBars
              size={22}
              className={`cursor-pointer ${isMobile ? "hidden" : "block"}`}
              onClick={handleToggleSidebar}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            />
            {isMobile && (
              <FaTimes
                size={22}
                className="cursor-pointer"
                onClick={() => setMobileOpen(false)}
              />
            )}
          </div>

          {/* Profile */}
          <div className="text-center px-2 mb-4">
            <div className="flex justify-center mb-2">
              {userData.profilePhoto ? (
                <img
                  src={
                    userData.profilePhoto.startsWith("http")
                      ? userData.profilePhoto
                      : `${API_URL}${
                          userData.profilePhoto.startsWith("/") ? "" : "/"
                        }${userData.profilePhoto}`
                  }
                  alt="User"
                  className={`rounded-full object-cover border-2 border-white shadow-md transition-all duration-300 ${
                    isCollapsed && !isMobile ? "w-10 h-10" : "w-16 h-16"
                  }`}
                />
              ) : (
                <FaUserCircle
                  size={isCollapsed && !isMobile ? 40 : 60}
                  className="text-white/90 transition-all duration-300"
                />
              )}
            </div>
            {!isCollapsed && !isMobile && (
              <p className="text-white font-semibold text-base truncate">
                Welcome, {userData.fullName} 🌟
              </p>
            )}
            {isMobile && (
              <p className="text-white font-semibold text-base truncate">
                {userData.fullName}
              </p>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 px-2 text-white pb-6">
            <SidebarLink
              to="/home"
              icon={<FaHome />}
              text="Home"
              collapsed={isCollapsed && !isMobile}
            />
            <SidebarLink
              to="/about"
              icon={<FaInfoCircle />}
              text="About"
              collapsed={isCollapsed && !isMobile}
            />
            <SidebarLink
              to="/how-it-works"
              icon={<FaHandsHelping />}
              text="How It Works"
              collapsed={isCollapsed && !isMobile}
            />

            {/* Services */}
            <div
              onClick={() => setOpenServices(!openServices)}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-lg cursor-pointer transition-all duration-200 
              hover:bg-white/20 ${openServices ? "bg-white/25" : ""}`}
            >
              <FaGift />
              {(!isCollapsed || isMobile) && (
                <span className="font-medium">Services ▾</span>
              )}
            </div>

            {openServices && (!isCollapsed || isMobile) && (
              <div className="flex flex-col ml-8 mt-1 space-y-2 text-sm">
                <SidebarSublink
                  to="/donate"
                  icon={<FaHandHoldingHeart />}
                  text="Donate"
                />
                <SidebarSublink
                  to="/celebrations"
                  icon={<FaCalendarAlt />}
                  text="Celebrations"
                />
              </div>
            )}

            <SidebarLink
              to="/pickup-schedule"
              icon={<FaTruck />}
              text="Pickup Schedule"
              collapsed={isCollapsed && !isMobile}
            />
            <SidebarLink
              to="/contact"
              icon={<FaPhoneAlt />}
              text="Contact"
              collapsed={isCollapsed && !isMobile}
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
            <FaSignOutAlt /> {(!isCollapsed || isMobile) && <span>Logout</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 p-6 flex-1 ${
          isMobile ? "ml-0" : isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={toggleMobileSidebar}
            className="p-3 mb-4 rounded-lg bg-[#00ACC1] text-white shadow-md"
          >
            <FaBars />
          </button>
        )}
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
