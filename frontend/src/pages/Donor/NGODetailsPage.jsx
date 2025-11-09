import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

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
    occasion: "",
    celebrationType: "",
  });

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading NGO details...
      </div>
    );

  if (!ngo)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        NGO not found
      </div>
    );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, ngoId: id };
      const res = await axios.post(`${API_URL}/api/celebrations`, payload);
      alert("🎉 Celebration request sent successfully!");
      console.log("Saved celebration:", res.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting celebration request:", error);
      alert("Failed to submit request. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* Sidebar (collapsible or fixed depending on your layout) */}
      <Sidebar />

      <div className="flex-1 p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00ACC1] text-center sm:text-left">
            {ngo.name}
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00ACC1] text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition-all cursor-pointer w-full sm:w-auto"
          >
            Make Celebration Request
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 bg-white p-6 rounded-2xl shadow-lg">
          {/* NGO Image */}
          <img
            src={ngo.logo || "https://via.placeholder.com/400x250?text=NGO+Logo"}
            alt={ngo.name}
            className="w-full lg:w-[400px] h-[250px] object-cover rounded-xl shadow-md"
          />

          {/* NGO Info */}
          <div className="flex-1 space-y-4">
            <p className="text-gray-700 leading-relaxed">{ngo.bio || ngo.description}</p>

            <div className="bg-[#E0F7FA] p-4 rounded-xl text-sm">
              <h3 className="text-[#0077b6] font-bold mb-2">
                Contact Information
              </h3>
              <p><strong>Email:</strong> {ngo.email || "Not provided"}</p>
              <p><strong>Contact:</strong> {ngo.contactNumber || "Not available"}</p>
              <p><strong>Address:</strong> {ngo.address || "Not available"}</p>
              <p><strong>Timings:</strong> {ngo.timings || "Not specified"}</p>
            </div>

            {/* Events Section */}
            {ngo.events?.length > 0 && (
              <div>
                <h3 className="font-bold text-[#0077b6] mb-2">Events</h3>
                <div className="flex flex-wrap gap-2">
                  {ngo.events.map((event, idx) => (
                    <div
                      key={idx}
                      className="bg-[#00ACC1] text-white px-3 py-1 rounded-lg text-sm font-medium"
                    >
                      {event.name || event}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-[#26c6da] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 shadow-md cursor-pointer"
        >
          ← Back to Donate
        </button>

        {/* Celebration Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 px-3">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-center text-[#00ACC1] mb-4">
                Make a Celebration Request
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {[
                  { label: "Your Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Contact Number", name: "contactNumber", type: "text" },
                  { label: "Occasion", name: "occasion", type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="font-semibold text-sm">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="border rounded-lg px-3 py-2 w-full"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                ))}

                {/* Celebration Type */}
                <div>
                  <label className="font-semibold text-sm">Type of Celebration</label>
                  <select
                    name="celebrationType"
                    value={formData.celebrationType}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-3 py-2 w-full"
                  >
                    <option value="">Select Type</option>
                    <option value="Meal Donation">Meal Donation</option>
                    <option value="Gift Distribution">Gift Distribution</option>
                    <option value="Entertainment Activity">
                      Entertainment Activity
                    </option>
                    <option value="Health Camp">Health Camp</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Celebration Address */}
                <div>
                  <label className="font-semibold text-sm">Celebration Address</label>
                  <textarea
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    placeholder="Enter the address where the celebration will be held"
                    className="border rounded-lg px-3 py-2 resize-none w-full"
                    rows="2"
                    required
                  />
                </div>

                {/* Date & Time */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="font-semibold text-sm">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="border rounded-lg px-3 py-2 w-full"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="font-semibold text-sm">Preferred Time</label>
                    <input
                      type="time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="border rounded-lg px-3 py-2 w-full"
                      required
                    />
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="font-semibold text-sm">Additional Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any extra details (special requests, themes, etc.)"
                    className="border rounded-lg px-3 py-2 resize-none w-full"
                    rows="3"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4 gap-3">
                  <button
                    type="submit"
                    className="bg-[#00ACC1] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 cursor-pointer w-full sm:w-auto"
                  >
                    Send Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 cursor-pointer w-full sm:w-auto"
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
