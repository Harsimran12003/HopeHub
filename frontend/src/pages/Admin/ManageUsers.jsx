import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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



const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    setUsers((prev) => prev.filter((user) => user._id !== id)); // remove from UI
  } catch (err) {
    console.error("Error deleting user:", err);
    alert("Failed to delete user. Please try again.");
  }
};


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
      {/* Sidebar */}
      <AdminSidebar currentView="users" onViewChange={() => {}} />

      {/* Main Content */}
      <div className="flex-1 ml-[250px] p-8 transition-all">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          User / Donor Management 
        </h1>

        {/* Header Card */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-700">Registered Users</h2>
          <div className="text-sm text-gray-500">
            Total Users:{" "}
            <span className="font-semibold text-[#00ACC1]">{users.length}</span>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-[#00ACC1] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Profile</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Registered On</th>
               
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
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
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                        {user.fullName?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {user.fullName}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                 
                  <td className="py-3 px-4 flex gap-2">
  <button
    onClick={() => handleDelete(user._id)}
    className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
  >
    Delete
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="text-center py-6 text-gray-500 italic">
              No registered users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
