import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import { fetchAllNGOs } from "../../services/ngoService";

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
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-[#00ACC1]">
        Loading NGOs...
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white overflow-hidden">
      {/* Sidebar  */}
      <div className=" md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="relative text-center py-10 sm:py-12 bg-gradient-to-r from-[#00ACC1] to-[#FF7043] text-white shadow-lg rounded-b-3xl px-4 sm:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 tracking-wide flex flex-col sm:flex-row justify-center items-center gap-3">
            <FaHandHoldingHeart className="text-white text-4xl" />
            Donate: Act of Kindness
          </h1>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[3px] bg-gradient-to-r from-[#00ACC1] via-white to-[#FF7043] rounded-full opacity-80"></div>
        </div>

        {/* NGO Donation Cards */}
        <div className="flex-1 px-5 sm:px-8 md:px-10 py-10 bg-[#FAFAFA]">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold text-[#00ACC1] mb-10">
            Our Partner NGOs 🌍
          </h2>

          {/* Responsive Grid Layout */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 animate-fadeInUp">
            {ngos.map((ngo) => (
              <div
                key={ngo._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* NGO Logo/Image */}
                <div className="relative">
                  <img
                    src={ngo.logo || "https://via.placeholder.com/400x200?text=NGO+Logo"}
                    alt={ngo.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* NGO Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#00ACC1] mb-2 truncate">
                    {ngo.name}
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {ngo.bio?.substring(0, 100) ||
                      ngo.description?.substring(0, 100) ||
                      "No description available."}
                  </p>

                  {/* Requirements */}
                  {ngo.requirements?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {ngo.requirements.map((req, idx) => (
                        <div
                          key={idx}
                          className="bg-[#E0F7FA] text-[#00796B] border border-[#00ACC1]/40 text-xs font-medium px-3 py-1 rounded-full"
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
                            className="bg-[#FFF3E0] text-[#E65100] border border-[#FF7043]/40 text-xs font-medium px-3 py-1 rounded-full"
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
                      className="px-2 py-2 text-sm sm:text-base font-semibold rounded-lg bg-[#00ACC1] text-white hover:bg-[#008C9E] transition-all"
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
