import React from "react";
import { FaBars } from "react-icons/fa";

const NGOHeader = ({ toggleSidebar }) => {
  return (
    <header className="w-full bg-[#212121] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <button
        onClick={toggleSidebar}
        className="text-2xl md:hidden hover:text-[#FF7043]"
      >
        <FaBars />
      </button>
      <h1 className="text-xl font-bold">Welcome, NGO</h1>
    </header>
  );
};

export default NGOHeader;
