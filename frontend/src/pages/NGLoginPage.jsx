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

  // Admin login check
  if (email === "admin@gmail.com" && password === "admin123") {
    const adminData = {
      fullName: "Admin",
      email: "admin@gmail.com",
      role: "admin",
    };
    localStorage.setItem("userInfo", JSON.stringify(adminData));
    navigate("/admin/dashboard");
    return;
  }

  try {
    
    const userData = await loginUser(email, password);
    localStorage.setItem("userInfo", JSON.stringify(userData));
    if (userData.token) {
    localStorage.setItem("token", userData.token); 
    }
    if (userData.role) {
      localStorage.setItem("role", userData.role); 
    }

    if (userData.role === "ngo") {
      navigate("/ngo/dashboard");
    } else {
      navigate("/home");
    }
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
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.1)] p-8">
          <h2 className="text-3xl font-extrabold text-center mb-7 text-[#00ACC1]">
            Welcome Back 👋
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-[#00ACC1]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-[#00ACC1]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00ACC1] to-[#FF7043] shadow-lg cursor-pointer "
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-700">
            New to Hope Hub?{" "}
            <Link to="/register" className="text-[#FF7043] font-semibold underline cursor-pointer">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NGLoginPage;
