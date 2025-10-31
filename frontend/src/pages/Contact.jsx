import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCommentDots, FaUsers } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [hoverButton, setHoverButton] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("https://formspree.io/f/mldpgvlw", {
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
    <div className="flex min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#FFF8E1] to-[#FFE0B2]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">


        <div className="flex flex-col items-center justify-center flex-1 px-6 py-10">
          <div className="max-w-2xl w-full bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-8 relative">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#00ACC1] drop-shadow-sm">
              Contact <span className="text-[#FF7043]">Hope Hub</span>
            </h2>

            <form onSubmit={sendEmail} className="space-y-5">
              {/* Name */}
              <div className="flex items-center gap-3">
                <FaUser className="text-[#00ACC1] text-lg" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition"
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#00ACC1] text-lg" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition"
                />
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#00ACC1] text-lg" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition"
                />
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#00ACC1] text-lg" />
                <input
                  type="text"
                  name="location"
                  placeholder="Your City / Location"
                  className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition"
                />
              </div>

              {/* Role */}
              <div className="flex items-center gap-3">
                <FaUsers className="text-[#00ACC1] text-lg" />
                <select
                  name="role"
                  required
                  className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition cursor-pointer"
                >
                  <option value="">You are...</option>
                  <option value="Member">Member</option>
                  <option value="Donor">Donor</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex items-start gap-3">
                <FaCommentDots className="text-[#00ACC1] text-lg mt-3" />
                <textarea
                  name="message"
                  placeholder="Your Message..."
                  required
                  className="flex-1 p-3 rounded-xl border border-gray-300 bg-white/70 focus:ring-2 focus:ring-[#00ACC1] outline-none transition min-h-[120px]"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-xl text-white font-semibold text-lg shadow-md transition-all ${
                    hoverButton
                      ? "bg-[#00ACC1] scale-105 shadow-lg"
                      : "bg-gradient-to-r from-[#00ACC1] to-[#FF7043]"
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
    </div>
  );
};

export default Contact;
