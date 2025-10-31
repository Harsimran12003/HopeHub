import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { fetchAllNGOs } from "../services/ngoService";

const DonatePage = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNGOs = async () => {
      try {
        const data = await fetchAllNGOs();
        setNgos(data);
      } catch (err) {
        console.error("Error loading NGOs:", err);
      } finally {
        setLoading(false);
      }
    };
    loadNGOs();
  }, []);

  if (loading)
    return <div className="flex justify-center items-center h-screen text-lg">Loading NGOs...</div>;

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="relative text-center py-14 bg-gradient-to-r from-[#00ACC1] to-[#FF7043] text-white shadow-lg rounded-b-3xl">
          <h1 className="text-4xl font-bold mb-3 tracking-wide flex justify-center items-center gap-3">
            <FaHandHoldingHeart className="text-white text-4xl" />
            Donate: Act of Kindness
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
            Empower change by donating essentials to trusted NGOs. Every small contribution creates a ripple of hope.
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[3px] bg-gradient-to-r from-[#00ACC1] via-white to-[#FF7043] rounded-full opacity-80"></div>
        </div>

        {/* NGO Donation Cards */}
        <div className="flex-1 p-10">
          <h2 className="text-center text-2xl font-semibold text-[#00ACC1] mb-8">
            Our Partner NGOs 🌍
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fadeInUp">
            {ngos.map((ngo) => (
              <div
                key={ngo._id}
                className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_10px_25px_rgba(0,172,193,0.3)]"
              >
                {/* NGO Logo/Image */}
                <div className="relative">
                  <img
                    src={ngo.logo || "https://via.placeholder.com/400x200?text=NGO+Logo"}
                    alt={ngo.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* NGO Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#00ACC1] mb-2">{ngo.name}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {ngo.bio?.substring(0, 100) || ngo.description?.substring(0, 100) || "No description available."}
                    
                  </p>

                  {/* Requirements */}
{ngo.requirements?.length > 0 && (
  <div className="flex flex-wrap gap-2 mb-4">
    {ngo.requirements.map((req, idx) => (
      <div
        key={idx}
        className="bg-gradient-to-r from-[#00ACC1] to-[#FF7043] text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm"
      >
        {req.item}
      </div>
    ))}
  </div>
)}

{/* Categories */}
{ngo.categories && (
  <div className="flex flex-wrap gap-2 mb-4">
    {Object.entries(ngo.categories)
      .filter(([_, value]) => value === true)
      .map(([key]) => (
        <div
          key={key}
          className="bg-gradient-to-r from-[#FF7043] to-[#00ACC1] text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm"
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </div>
      ))}
  </div>
)}


                  {/* Details Button */}
                  <div className="flex justify-end">
                    <Link
                      to={`/donate/${ngo._id}`}
                      className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#00ACC1] to-[#FF7043] text-white shadow-md hover:opacity-90 hover:shadow-lg transition-all"
                    >
                      See NGO Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fade-in Animation */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default DonatePage;
