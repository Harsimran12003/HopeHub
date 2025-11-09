import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/AdminSidebar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Reports = () => {
  const [admin, setAdmin] = useState(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Fetch admin profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/profile`);
      setAdmin(res.data);
      setEmail(res.data.email);
    } catch (err) {
      console.error("Error fetching admin profile:", err);
      toast.error("Failed to load admin profile");
    }
  };

  // Update email
  const handleUpdateEmail = async () => {
    try {
      await axios.put(`${API_URL}/api/admin/profile`, { email });
      toast.success("Email updated successfully");
      fetchProfile();
    } catch (err) {
      console.error("Error updating email:", err);
      toast.error("Failed to update email");
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast.warning("Password must be at least 6 characters long");
      return;
    }
    try {
      await axios.put(`${API_URL}/api/admin/change-password`, { newPassword });
      toast.success("Password changed successfully");
      setNewPassword("");
    } catch (err) {
      console.error("Error changing password:", err);
      toast.error("Failed to change password");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="md:w-64 w-full md:fixed md:h-full">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-6 sm:p-8 transition-all">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
          Admin Profile
        </h1>

        {admin ? (
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 max-w-lg mx-auto md:mx-0 w-full">
            {/* Email Update Section */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
              />
              <button
                onClick={handleUpdateEmail}
                className="mt-3 bg-teal-500 text-white w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-teal-600 transition text-sm sm:text-base"
              >
                Update Email
              </button>
            </div>

            {/* Password Change Section */}
            <div className="mt-6">
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
              />
              <button
                onClick={handleChangePassword}
                className="mt-3 bg-blue-500 text-white w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
              >
                Change Password
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            Loading admin data...
          </p>
        )}
      </div>
    </div>
  );
};

export default Reports;
