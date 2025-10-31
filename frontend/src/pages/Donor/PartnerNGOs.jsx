import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import NGODetail from "./NGODetail";

const PartnerNGOs = () => {
  const [selectedNGO, setSelectedNGO] = useState(null);

  // Dummy NGO data
  const ngos = [
    {
      id: 1,
      name: "Helping Hands Foundation",
      location: "New Delhi, India",
      need: "Clothes, Food, Stationery",
      image: "https://source.unsplash.com/400x250/?charity,volunteer",
    },
    {
      id: 2,
      name: "Food for All",
      location: "Mumbai, India",
      need: "Cooked Meals, Groceries",
      image: "https://source.unsplash.com/400x250/?food,donation",
    },
    {
      id: 3,
      name: "Care & Share Trust",
      location: "Bangalore, India",
      need: "Books, Furniture, Clothes",
      image: "https://source.unsplash.com/400x250/?community,help",
    },
    {
      id: 4,
      name: "Hope Foundation",
      location: "Chennai, India",
      need: "Medicines, Blankets",
      image: "https://source.unsplash.com/400x250/?healthcare,ngo",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F5F5] min-h-screen py-12 px-6">
        <h1 className="text-3xl font-bold text-center text-[#212121] mb-10">
          Our Partner NGOs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {ngos.map((ngo) => (
            <div
              key={ngo.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              {/* NGO Image */}
              <img
                src={ngo.image}
                alt={ngo.name}
                className="h-48 w-full object-cover"
              />

              {/* NGO Info */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#00ACC1]">
                  {ngo.name}
                </h2>
                <p className="text-sm text-gray-600">{ngo.location}</p>
                <p className="mt-3 text-gray-800">
                  <span className="font-medium">Needs:</span> {ngo.need}
                </p>

                {/* View More Button */}
                <button
                  className="mt-4 w-full px-4 py-2 bg-[#FF7043] text-white rounded-lg hover:bg-[#00ACC1] transition font-medium cursor-pointer"
                  onClick={() => setSelectedNGO(ngo)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NGO Detail Side Pane */}
      <NGODetail ngo={selectedNGO} onClose={() => setSelectedNGO(null)} />
    </>
  );
};

export default PartnerNGOs;
