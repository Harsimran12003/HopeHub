import React, { useState, useEffect } from "react";
import axios from "axios";
import NGOSidebar from "../../components/NGOSidebar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const NGODashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [ngoName, setNgoName] = useState("NGO"); // default
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
      // 1) robust token retrieval: try userInfo first, then token
      let token = null;
      try {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
          const parsed = JSON.parse(stored);
          token = parsed?.token || parsed?.data?.token || null;
        }
      } catch (err) {
        // ignore JSON parse error
      }
      // fallback to older key if present
      if (!token) token = localStorage.getItem("token");

      if (!token) {
        // no token -> nothing to do
        console.warn("No auth token found in localStorage (userInfo/token).");
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/ngos/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Log full response for debugging
        console.log("NGO profile response:", res.data);

        // handle multiple possible shapes:
        //  - { name: 'X', ... }
        //  - { ngo: { name: 'X', ... } }
        //  - { success: true, ngo: { ... } }
        const data = res.data;
        const name =
          data?.name ||
          data?.ngo?.name ||
          data?.ngo?.data?.name || // defensive
          (Array.isArray(data) ? data[0]?.name : undefined);

        setNgoName(name || "NGO");
      } catch (error) {
        console.error("Error fetching NGO profile:", error);
        setNgoName("NGO");
      }
    };

    fetchNGOProfile();
  }, []);

  const activities = [
    { id: 1, activity: "Approved donation request from Rahul Sharma", date: "2025-09-25" },
    { id: 2, activity: "Celebration request for Sarah Lee’s anniversary", date: "2025-09-24" },
    { id: 3, activity: "Added new required item: Blankets", date: "2025-09-22" },
    { id: 4, activity: "Profile details updated", date: "2025-09-20" },
  ];

  return (
    <div className="flex h-screen">
      <NGOSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out p-6">
        <h1 className="text-3xl font-bold text-[#212121] mb-6">
          Welcome back, {ngoName} 👋
        </h1>

        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl shadow-lg p-10 flex items-center justify-center h-22 text-center mb-8 transition-all duration-700">
          <p className="text-xl md:text-xl font-semibold max-w-2xl">
            {quotes[currentQuote]}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-[#212121] mb-4">
            Recent Activities
          </h2>
          <ul className="space-y-3">
            {activities.map((act) => (
              <li key={act.id} className="border-b last:border-none pb-2 text-gray-700">
                <span className="font-medium">{act.activity}</span>
                <div className="text-sm text-gray-500">{act.date}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
