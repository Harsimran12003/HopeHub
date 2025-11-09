import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginUser } from "../services/userService";

const NGLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Admin login shortcut
    if (email === "admin@gmail.com" && password === "admin123") {
      const adminData = {
        fullName: "Admin",
        email: "admin@gmail.com",
        role: "admin",
      };
      localStorage.setItem("userInfo", JSON.stringify(adminData));
      localStorage.setItem("userId", adminData._id);
      navigate("/admin/dashboard");
      return;
    }

    try {
      const userData = await loginUser(email, password);
      localStorage.setItem("userInfo", JSON.stringify(userData));

      if (userData._id) localStorage.setItem("userId", userData._id);
      if (userData.token) localStorage.setItem("token", userData.token);
      if (userData.role) localStorage.setItem("role", userData.role);

      if (userData.role === "ngo") navigate("/ngo/dashboard");
      else navigate("/home");
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div
      className="w-full min-h-screen font-sans bg-gradient-to-br from-[#E0F7FA] via-[#FFF8E1] to-[#FFE0B2]"
      style={{ paddingTop: "90px" }}
    >
      <Navbar />

      {/* === Center Container === */}
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-md bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.1)] p-6 sm:p-8">
          {/* === Heading === */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 sm:mb-7 text-[#00ACC1]">
            Welcome Back 👋
          </h2>

          {/* === Login Form === */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-[#00ACC1] text-sm sm:text-base" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00ACC1] focus:outline-none transition"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-[#00ACC1] text-sm sm:text-base" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-16 py-2.5 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00ACC1] focus:outline-none transition"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#D84315] text-xs sm:text-sm font-semibold cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 mt-2 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00ACC1] to-[#FF7043] shadow-lg hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <p className="text-xs sm:text-sm text-center mt-4 text-gray-700">
            New to Hope Hub?{" "}
            <Link
              to="/register"
              className="text-[#FF7043] font-semibold underline cursor-pointer"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NGLoginPage;
