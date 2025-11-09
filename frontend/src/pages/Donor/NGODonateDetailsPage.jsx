import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { createDonation } from "../../services/donationService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const NGODonateDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    pickupAddress: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    items: [{ itemName: "", quantity: "" }],
  });

  // Fetch NGO details
  useEffect(() => {
    const fetchNGODetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/ngos/${id}`);
        setNgo(res.data);
      } catch (error) {
        console.error("Error fetching NGO details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNGODetails();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleItemChange = (index, e) => {
    const newItems = [...formData.items];
    newItems[index][e.target.name] = e.target.value;
    setFormData({ ...formData, items: newItems });
  };

  const addNewItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemName: "", quantity: "" }],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData, ngoId: id };
      await createDonation(dataToSend);
      alert("Pickup request sent successfully!");
      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        pickupAddress: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
        items: [{ itemName: "", quantity: "" }],
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Failed to send donation request.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-[#00ACC1]">
        Loading NGO details...
      </div>
    );

  if (!ngo)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        NGO not found
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f5f5f5]">
      {/* Sidebar  */}
      <div className=" md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00ACC1] break-words">
            {ngo.name}
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00ACC1] text-white px-4 sm:px-5 py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            Schedule Pickup
          </button>
        </div>

        {/* NGO Info Card */}
        <div className="flex flex-col lg:flex-row gap-6 bg-white p-5 rounded-2xl shadow-lg">
          {/* Image */}
          <img
            src={ngo.logo || "https://via.placeholder.com/400x250?text=NGO+Logo"}
            alt={ngo.name}
            className="w-full lg:w-[400px] h-[250px] object-cover rounded-xl"
          />

          {/* Info */}
          <div className="flex-1">
            <p className="text-gray-700 mb-3">{ngo.bio || ngo.description}</p>

            {/* Contact Info */}
            <div className="bg-[#E0F7FA] p-4 rounded-xl mb-4 text-sm">
              <h3 className="text-[#0077b6] font-bold mb-2">Contact Information</h3>
              <p><strong>Email:</strong> {ngo.email}</p>
              <p><strong>Contact:</strong> {ngo.contactNumber}</p>
              <p><strong>Address:</strong> {ngo.address}</p>
            </div>

            {/* Categories */}
            <div className="bg-[#E0F7FA] p-4 rounded-xl mb-4 text-sm">
              <h3 className="text-[#0077b6] font-bold mb-2">Required Items</h3>
              {ngo.categories ? (
                <div className="flex flex-wrap gap-2">
                  {ngo.categories.food && (
                    <span className="bg-[#00ACC1] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Food
                    </span>
                  )}
                  {ngo.categories.clothes && (
                    <span className="bg-[#00ACC1] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Clothes
                    </span>
                  )}
                  {ngo.categories.stationary && (
                    <span className="bg-[#00ACC1] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Stationary
                    </span>
                  )}
                  {ngo.categories.otherGoods && (
                    <span className="bg-[#00ACC1] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Other Goods
                    </span>
                  )}
                  {!ngo.categories.food &&
                    !ngo.categories.clothes &&
                    !ngo.categories.stationary &&
                    !ngo.categories.otherGoods && (
                      <p className="text-gray-600 italic">No categories listed</p>
                    )}
                </div>
              ) : (
                <p className="text-gray-600 italic">No categories listed</p>
              )}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-[#26c6da] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 shadow-md"
        >
          ← Back
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 px-2 sm:px-0">
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-[95%] sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-center text-[#00ACC1] mb-4">
                Send Pickup Request
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d{0,10}$/.test(val)) {
                      setFormData({ ...formData, contactNumber: val });
                    }
                  }}
                  placeholder="Contact Number"
                  required
                  className="border rounded-lg px-3 py-2 text-sm"
                />

                {/* Items */}
                <label className="font-semibold text-sm mt-1">Items to Donate</label>
                {formData.items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2 items-center">
                    <input
                      type="text"
                      name="itemName"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder="Item name"
                      className="border rounded-lg px-3 py-2 flex-1 text-sm"
                      required
                    />
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder="Qty"
                      min="1"
                      className="border rounded-lg px-3 py-2 w-full sm:w-24 text-sm"
                      required
                    />
                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-500 text-lg font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addNewItem}
                  className="text-[#00ACC1] text-sm font-semibold mt-1 hover:underline"
                >
                  + Add Another Item
                </button>

                <textarea
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Pickup Address"
                  rows="2"
                  required
                  className="border rounded-lg px-3 py-2 text-sm resize-none"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 flex-1 text-sm"
                    required
                  />
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 flex-1 text-sm"
                    required
                  />
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional details..."
                  className="border rounded-lg px-3 py-2 text-sm resize-none"
                  rows="3"
                />

                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-[#00ACC1] text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NGODonateDetailsPage;
