import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerUser } from "../services/userService";
import { FaLock, FaEnvelope, FaUser } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    address: "",
    pincode: "",
    profilePhoto: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser(formData);
      alert(`✅ ${response.message}`);
      navigate("/login");
    } catch (err) {
      alert(`❌ ${err.message || "Registration failed!"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen font-sans bg-gradient-to-br from-[#E0F7FA] via-[#FFF8E1] to-[#FFE0B2]"
      style={{ paddingTop: "90px" }}
    >
      <Navbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.1)] p-8">
          <h2 className="text-3xl font-extrabold text-center mb-7 text-[#00ACC1]">
            Create Your Account 
          </h2>

          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={
                  preview ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#00ACC1]"
              />
              <label
                htmlFor="profilePhoto"
                className="absolute bottom-0 right-0 bg-[#00ACC1] text-white rounded-full p-2 cursor-pointer hover:bg-[#0097a7] transition"
                title="Upload photo"
              >
                📷
              </label>
              <input
                id="profilePhoto"
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-[#00ACC1]" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-[#00ACC1]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-[#00ACC1]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-xl text-sm"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#D84315] text-xs font-semibold cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-[#00ACC1]" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-xl text-sm"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#D84315] text-xs font-semibold cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Occupation */}
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Occupation"
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm"
            />

            {/* Address */}
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              rows="3"
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm"
            ></textarea>

            {/* Pincode */}
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              required
              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-2 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00ACC1] to-[#FF7043] shadow-lg cursor-pointer ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-700">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#FF7043] font-semibold underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
