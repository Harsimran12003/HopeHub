import React, { useState, useEffect } from "react";
import NGOSidebar from "../../components/NGOSidebar";
import { fetchNGOProfile, updateNGOProfile } from "../../services/ngoProfileService";

const ProfileSettings = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchNGOProfile();
        setDetails(data);
        if (data.logo) setLogoPreview(data.logo);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setDetails({ ...details, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const updated = await updateNGOProfile(details);
      setDetails(updated);
      alert("✅ Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("❌ Error updating profile");
    }
  };

  if (loading)
    return <div className="p-10 text-lg text-center">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <NGOSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Profile Information
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto px-4 py-2 bg-[#00ACC1] text-white rounded hover:bg-[#028c9f] transition"
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSave}
                  className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={logoPreview || "https://via.placeholder.com/120?text=No+Logo"}
                alt="NGO Logo"
                className="w-24 sm:w-28 h-24 sm:h-28 object-cover rounded-full border-2 border-gray-300 shadow-md"
              />
              {isEditing && (
                <label
                  htmlFor="logo-upload"
                  className="absolute bottom-0 right-0 bg-[#00ACC1] text-white p-2 rounded-full cursor-pointer hover:bg-[#028c9f]"
                >
                  📷
                </label>
              )}
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                disabled={!isEditing}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Logo</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["name", "email", "address", "contactNumber", "timings"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize mb-1">
                  {field}
                </label>
                {isEditing ? (
                  field === "contactNumber" ? (
                    <input
                      type="tel"
                      name={field}
                      value={details[field] || ""}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setDetails({ ...details, [e.target.name]: digits });
                      }}
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter contact number"
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={details[field] || ""}
                      onChange={(e) =>
                        setDetails({ ...details, [e.target.name]: e.target.value })
                      }
                      className="border p-2 rounded w-full"
                    />
                  )
                ) : (
                  <p className="p-2 bg-gray-50 rounded break-words">
                    {details[field] || "-"}
                  </p>
                )}
              </div>
            ))}

            {/* Bio */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={details.bio || ""}
                  onChange={(e) =>
                    setDetails({ ...details, [e.target.name]: e.target.value })
                  }
                  className="border p-2 rounded w-full h-24"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded whitespace-pre-line">
                  {details.bio || "-"}
                </p>
              )}
            </div>

            {/* Categories */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Accepted Categories
              </label>
              <div className="flex flex-wrap gap-3">
                {Object.keys(details.categories || {}).map((cat) => (
                  <label key={cat} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      disabled={!isEditing}
                      checked={details.categories?.[cat] || false}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          categories: {
                            ...details.categories,
                            [cat]: e.target.checked,
                          },
                        })
                      }
                    />
                    <span className="capitalize">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-2">Events</label>
              {isEditing ? (
                <textarea
                  name="events"
                  value={details.events?.join(", ") || ""}
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      events: e.target.value.split(",").map((ev) => ev.trim()),
                    })
                  }
                  className="border p-2 rounded w-full h-20"
                  placeholder="Comma-separated list (e.g., Blood Donation Camp, Fundraiser)"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">
                  {details.events?.length ? details.events.join(", ") : "-"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
