import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCommentDots } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const Contact = () => {
  const [hoverButton, setHoverButton] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("https://formspree.io/f/xgvpgndr", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      alert("Message sent successfully!");
      e.target.reset();
    } else {
      alert("Failed to send message, please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#FFF8E1] to-[#FFE0B2]">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Navbar for mobile */}
      <div className="block md:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 py-10 w-full">
        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[#00ACC1] drop-shadow-sm">
            Contact <span className="text-[#FF7043]">Hope Hub</span>
          </h2>

          <form onSubmit={sendEmail} className="space-y-4 sm:space-y-5">
            {/* Name */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <FaUser className="text-[#00ACC1] text-lg mt-3 sm:mt-0" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition w-full"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <FaEnvelope className="text-[#00ACC1] text-lg mt-3 sm:mt-0" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition w-full"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <FaPhone className="text-[#00ACC1] text-lg mt-3 sm:mt-0" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition w-full"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <FaMapMarkerAlt className="text-[#00ACC1] text-lg mt-3 sm:mt-0" />
              <input
                type="text"
                name="location"
                placeholder="Your City / Location"
                className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition w-full"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col sm:flex-row items-start sm:items-start gap-3">
              <FaCommentDots className="text-[#00ACC1] text-lg mt-3 sm:mt-0" />
              <textarea
                name="message"
                placeholder="Your Message..."
                required
                className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition w-full min-h-[120px]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4 sm:mt-6">
              <button
                type="submit"
                className={`px-6 py-3 rounded-xl text-white font-semibold text-lg shadow-md transition-all transform ${
                  hoverButton
                    ? "bg-[#00ACC1] scale-105 shadow-lg"
                    : "bg-[#00ACC1] scale-100"
                }`}
                onMouseEnter={() => setHoverButton(true)}
                onMouseLeave={() => setHoverButton(false)}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
