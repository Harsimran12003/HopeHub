import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading users...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (hidden on small screens) */}
      <div className="md:block">
        <AdminSidebar currentView="users" onViewChange={() => {}} />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-[250px] p-4 sm:p-6 lg:p-8 transition-all">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center md:text-left">
          User / Donor Management
        </h1>

        {/* Header Section */}
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg sm:text-xl font-medium text-gray-700">
            Registered Users
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="🔍 Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
            />
            <div className="text-sm text-gray-500">
              Total:{" "}
              <span className="font-semibold text-[#00ACC1]">
                {filteredUsers.length}
              </span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base border-collapse">
            <thead className="bg-[#00ACC1] text-white">
              <tr>
                <th className="py-3 px-4 text-left whitespace-nowrap">Profile</th>
                <th className="py-3 px-4 text-left whitespace-nowrap">Name</th>
                <th className="py-3 px-4 text-left whitespace-nowrap">Email</th>
                <th className="py-3 px-4 text-left whitespace-nowrap">Registered On</th>
                <th className="py-3 px-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4">
                    {user.profilePhoto ? (
                      <img
                        src={`http://localhost:5000/${user.profilePhoto}`}
                        alt={user.fullName}
                        className="w-10 h-10 rounded-full object-cover border mx-auto sm:mx-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold mx-auto sm:mx-0">
                        {user.fullName?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {user.fullName}
                  </td>
                  <td className="py-3 px-4 text-gray-600 break-all">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center sm:text-left">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-6 text-gray-500 italic">
              No users found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
