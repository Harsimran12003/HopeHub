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

  if (loading) return <div className="p-10 text-lg">Loading...</div>;
  return (
    <div className="flex min-h-screen bg-gray-100">
      <NGOSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 p-6 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          {/* Header with Edit/Save Buttons */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Profile Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#00ACC1] text-white rounded hover:bg-[#028c9f] cursor-pointer"
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Logo Preview at Top */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={
                  logoPreview ||
                  "https://via.placeholder.com/120?text=No+Logo"
                }
                alt="NGO Logo"
                className="w-28 h-28 object-cover rounded-full border-2 border-gray-300 shadow-md"
              />
              {isEditing && (
                <label
                  htmlFor="logo-upload"
                  className="absolute bottom-0 right-0 bg-[#00ACC1] text-white p-1.5 rounded-full cursor-pointer hover:bg-[#028c9f]"
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

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "address", "contactNumber", "timings"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize">
                    {field}
                  </label>
                  {isEditing ? (
                    
                    field === "contactNumber" ? (
                      <input
                        type="tel"
                        name={field}
                        value={details[field] || ""}
                        onChange={(e) => {
                          const digits = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                          setDetails({ ...details, [e.target.name]: digits });
                        }}
                        inputMode="numeric"
                        pattern="\d{10}"
                        maxLength={10}
                        placeholder="Enter 10-digit contact number"
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
                    <p className="p-2 bg-gray-50 rounded">
                      {details[field] || "-"}
                    </p>
                  )}
                </div>
              )
            )}

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={details.bio || ""}
                  onChange={(e) =>
                    setDetails({ ...details, [e.target.name]: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded whitespace-pre-line">
                  {details.bio || "-"}
                </p>
              )}
            </div>

            {/* Categories */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Accepted Categories
              </label>
              <div className="flex flex-wrap gap-4">
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
            <div className="md:col-span-2">
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
                  className="border p-2 rounded w-full"
                  placeholder="Comma-separated list (e.g., Blood Donation Camp, Fundraiser)"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">
                  {details.events?.length
                    ? details.events.join(", ")
                    : "-"}
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
