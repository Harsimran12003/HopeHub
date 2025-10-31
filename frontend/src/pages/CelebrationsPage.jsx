import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { fetchAllNGOs } from "../services/ngoService";

const CelebrationsPage = () => {
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
      <div className="flex justify-center items-center h-screen text-lg">
        Loading NGOs...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#FFF8E1] to-[#FFE0B2] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="relative text-center py-14 bg-gradient-to-r from-[#00ACC1] to-[#FF7043] text-white shadow-lg rounded-b-3xl">
          <h1 className="text-4xl font-bold mb-3 tracking-wide">
            Celebrate with Hope Hub 
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
            Join hands with our trusted NGOs to spread joy and kindness across
            communities. Every small effort can make a big impact!
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[3px] bg-gradient-to-r from-[#00ACC1] via-white to-[#FF7043] rounded-full opacity-80"></div>
        </div>

        {/* NGO Cards Section */}
        <div className="flex-1 p-10">
          <h2 className="text-center text-2xl font-semibold text-[#00ACC1] mb-8">
            Our Partner NGOs 🌍
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fadeInUp">
            {ngos.map((ngo) => (
              <div
                key={ngo._id}
                className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.05] hover:shadow-[0_10px_25px_rgba(0,172,193,0.3)]"
              >
                {/* NGO Image */}
                <div className="relative">
                  <img
                    src={ngo.logo || "https://via.placeholder.com/400x200?text=NGO+Logo"}
                    alt={ngo.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* NGO Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#00ACC1] mb-2">
                    {ngo.name}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {ngo.bio?.substring(0, 90) ||
                      ngo.description?.substring(0, 90) ||
                      "No description available."}
                    ...
                  </p>

                  {/* Events Section */}
                  {ngo.events && ngo.events.length > 0 && (
                    <div className="mb-4">

                      <div className="flex flex-wrap gap-2">
                        {ngo.events.map((event, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-r from-[#FF7043] to-[#00ACC1] text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm"
                          >
                            {event.name || event.title || event}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Link
                      to={`/celebrations/${ngo._id}`}
                      className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#00ACC1] to-[#FF7043] text-white shadow-md hover:opacity-90 hover:shadow-lg transition-all"
                    >
                      See Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation */}
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

export default CelebrationsPage;
