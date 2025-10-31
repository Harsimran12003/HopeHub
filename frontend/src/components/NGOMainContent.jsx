import React from "react";

const NGOMainContent = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#212121] mb-4">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-[#00ACC1]">
          <h3 className="text-lg font-semibold text-[#212121]">Total Donations</h3>
          <p className="text-3xl font-bold text-[#00ACC1]">120</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-[#FF7043]">
          <h3 className="text-lg font-semibold text-[#212121]">Volunteers</h3>
          <p className="text-3xl font-bold text-[#FF7043]">45</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-[#212121]">
          <h3 className="text-lg font-semibold text-[#212121]">Pending Requests</h3>
          <p className="text-3xl font-bold text-[#212121]">8</p>
        </div>
      </div>

      {/* Section for Donations List */}
      <div className="mt-8 bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#212121] mb-4">Recent Donations</h3>
        <ul className="space-y-3">
          <li className="flex justify-between text-gray-700">
            <span>Food Packages</span>
            <span className="text-[#00ACC1]">✔ Delivered</span>
          </li>
          <li className="flex justify-between text-gray-700">
            <span>Winter Clothes</span>
            <span className="text-[#FF7043]">Pending</span>
          </li>
          <li className="flex justify-between text-gray-700">
            <span>Stationery</span>
            <span className="text-[#00ACC1]">✔ Delivered</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NGOMainContent;
