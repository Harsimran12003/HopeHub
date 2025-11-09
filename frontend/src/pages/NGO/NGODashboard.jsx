import React, { useState, useEffect } from "react";
import axios from "axios";
import NGOSidebar from "../../components/NGOSidebar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const NGODashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [ngoData, setNgoData] = useState({
    name: "NGO",
    logo: "",
    tagline: "Empowering communities, changing lives.",
    contactNumber: "N/A",
    email: "contact@ngo.org",
    address: "City, Country",
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const quotes = [
    "“The best way to find yourself is to lose yourself in the service of others.” – Mahatma Gandhi",
    "“No one has ever become poor by giving.” – Anne Frank",
    "“Alone we can do so little; together we can do so much.” – Helen Keller",
    "“It’s not how much we give, but how much love we put into giving.” – Mother Teresa",
    "“The smallest act of kindness is worth more than the grandest intention.” – Oscar Wilde",
  ];
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  useEffect(() => {
    const fetchNGOProfile = async () => {
      let token = null;
      try {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
          const parsed = JSON.parse(stored);
          token = parsed?.token || parsed?.data?.token || null;
        }
      } catch (err) {}

      if (!token) token = localStorage.getItem("token");
      if (!token) {
        console.warn("No auth token found.");
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/ngos/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        const ngo = data?.ngo || data;
        setNgoData({
          name: ngo?.name || "NGO",
          logo: ngo?.logo || "/default-logo.png",
          tagline: ngo?.tagline || "Committed to making a difference.",
          contactNumber: ngo?.contactNumber || "N/A",
          email: ngo?.email || "contact@ngo.org",
          address: ngo?.address || "Your City, Country",
        });
      } catch (error) {
        console.error("Error fetching NGO profile:", error);
      }
    };

    fetchNGOProfile();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="md:block">
        <NGOSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out p-4 sm:p-6 overflow-y-auto">
        {/* Header for small screens */}
        <div className="flex md:hidden items-center justify-between mb-6 w-full">
          <button
            onClick={toggleSidebar}
            className="text-white bg-[#00ACC1] p-2 rounded-md shadow-md hover:bg-[#0095A8] transition"
          >
 
          </button>

          <h1 className="text-lg sm:text-xl font-bold text-[#212121] text-right flex-1 ml-4">
            Welcome, {ngoData.name} 👋
          </h1>
        </div>

        {/* Welcome Header for Desktop */}
        <h1 className="hidden md:block text-3xl font-bold text-[#212121] mb-6">
          Welcome back, {ngoData.name} 👋
        </h1>

        {/* NGO Profile Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={ngoData.logo || "/default-logo.png"}
            alt="NGO Logo"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-teal-400"
          />
          <div className="text-center sm:text-left">
            <p className="text-gray-600 mb-3 text-sm sm:text-base">
              {ngoData.tagline}
            </p>

            {/* Additional NGO Info */}
            <div className="space-y-1 text-gray-700 text-sm sm:text-base">
              <p>
                <span className="font-medium">📜 Contact:</span>{" "}
                {ngoData.contactNumber}
              </p>
              <p>
                <span className="font-medium">📧 Email:</span> {ngoData.email}
              </p>
              <p>
                <span className="font-medium">📍 Address:</span>{" "}
                {ngoData.address}
              </p>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl shadow-lg p-6 sm:p-10 text-center mb-8 transition-all duration-700">
          <p className="text-base sm:text-lg md:text-xl font-semibold max-w-2xl mx-auto leading-relaxed">
            {quotes[currentQuote]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
