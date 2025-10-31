import React from "react";

const NGODetail = ({ ngo, onClose }) => {
  if (!ngo) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Background Blur */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-transparent"
        onClick={onClose}
      ></div>

      {/* Side Panel */}
      <div className="relative w-full sm:w-[400px] bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slide-in">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-[#FF7043] text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* NGO Image */}
        <img
          src={ngo.image}
          alt={ngo.name}
          className="w-full h-48 object-cover rounded-xl mb-6"
        />

        {/* NGO Info */}
        <h2 className="text-2xl font-bold text-[#00ACC1]">{ngo.name}</h2>
        <p className="text-gray-600 text-sm">{ngo.location}</p>
        <p className="mt-4 text-gray-800">
          <span className="font-semibold">Needs:</span> {ngo.need}
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          {ngo.description ||
            "This NGO is dedicated to helping underprivileged communities by providing essential resources, food, and education. Your support can bring real change."}
        </p>

        {/* Donate Button */}
        <button className="mt-6 w-full px-4 py-2 bg-[#FF7043] text-white rounded-lg font-medium hover:bg-[#00ACC1] transition cursor-pointer">
          Donate Now
        </button>
      </div>

      {/* Slide Animation */}
      <style>
        {`
          @keyframes slide-in {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default NGODetail;
