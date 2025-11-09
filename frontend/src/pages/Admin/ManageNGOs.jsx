import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import {
  addNGO,
  fetchNGOs,
  updateNGOById,
  deleteNGOById,
} from "../../services/ngoService";

const ManageNGOs = () => {
  const [ngos, setNGOs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedNGO, setSelectedNGO] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    loadNGOs();
  }, []);

  const loadNGOs = async () => {
    try {
      const data = await fetchNGOs();
      setNGOs(data);
    } catch (error) {
      console.error("Error fetching NGOs:", error);
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode && selectedNGO) {
        await updateNGOById(selectedNGO._id, formData);
        alert("NGO updated successfully!");
      } else {
        await addNGO({
          ...formData,
          contactNumber: "9999999999",
          bio: "Helping communities grow.",
          categories: {
            food: true,
            clothes: false,
            stationary: false,
            otherGoods: false,
          },
          timings: "9 AM - 6 PM",
          events: ["Charity Drive"],
          logo: "",
        });
        alert("NGO added successfully!");
      }

      setFormData({ name: "", email: "", password: "", address: "" });
      setEditMode(false);
      setSelectedNGO(null);
      toggleModal();
      loadNGOs();
    } catch (error) {
      alert("❌ Error saving NGO");
      console.error(error);
    }
  };

  const handleEdit = (ngo) => {
    setFormData({
      name: ngo.name,
      email: ngo.email,
      password: "",
      address: ngo.address,
    });
    setSelectedNGO(ngo);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this NGO?")) {
      try {
        await deleteNGOById(id);
        alert("NGO deleted successfully!");
        loadNGOs();
      } catch (error) {
        alert("❌ Error deleting NGO");
        console.error(error);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar currentView="ngos" onViewChange={() => {}} />

      {/* Main Section */}
      <div className="flex-1 p-5 md:p-8 transition-all duration-300 md:ml-[250px] ml-0 pt-16 md:pt-10">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#00ACC1] mb-4 text-center md:text-left">
          NGO Management
        </h1>

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-5 rounded-xl shadow-md border border-gray-100 gap-4">
          <h2 className="text-lg md:text-xl font-medium text-gray-700 text-center sm:text-left">
            All Registered NGOs
          </h2>
          <button
            onClick={() => {
              setFormData({ name: "", email: "", password: "", address: "" });
              setEditMode(false);
              setShowModal(true);
            }}
            className="w-full sm:w-auto bg-[#00ACC1] hover:bg-[#0095A8] text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
          >
            + Add New NGO
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-[#00ACC1] text-white">
              <tr>
                <th className="py-3 px-4 text-left whitespace-nowrap">NGO Name</th>
                <th className="py-3 px-4 text-left whitespace-nowrap">Address</th>
                <th className="py-3 px-4 text-left whitespace-nowrap">Contact</th>
                <th className="py-3 px-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ngos.map((ngo, index) => (
                <tr
                  key={ngo._id}
                  className={`border-b hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-gray-700">{ngo.name}</td>
                  <td className="py-3 px-4 text-gray-600">{ngo.address || "N/A"}</td>
                  <td className="py-3 px-4 text-gray-600">{ngo.contactNumber || "N/A"}</td>
                  <td className="py-3 px-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(ngo)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ngo._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {ngos.length === 0 && (
            <div className="text-center py-6 text-gray-500 italic">
              No NGOs available.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <h2 className="text-xl md:text-2xl font-semibold text-[#00ACC1] text-center mb-4">
              {editMode ? "Edit NGO" : "Add New NGO"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter NGO name"
                className="w-full p-3 border border-gray-300 rounded-md text-sm md:text-base"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
                className="w-full p-3 border border-gray-300 rounded-md text-sm md:text-base"
              />

              {!editMode && (
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"
                  className="w-full p-3 border border-gray-300 rounded-md text-sm md:text-base"
                />
              )}

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Enter address"
                className="w-full p-3 border border-gray-300 rounded-md text-sm md:text-base"
              ></textarea>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#00ACC1] hover:bg-[#0097a7] text-white px-5 py-2 rounded-md transition"
                >
                  {editMode ? "Update NGO" : "Add NGO"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNGOs;
