import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


export const fetchNGOProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${API_URL}/api/ngos/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.ngo || res.data;
};


export const updateNGOProfile = async (details) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const payload = {
    ...details,
    events: Array.isArray(details.events)
      ? details.events
      : details.events
          .split(",")
          .map((ev) => ev.trim())
          .filter((ev) => ev !== ""),
  };

  const res = await axios.put(`${API_URL}/api/ngos/profile`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.updatedNgo || res.data.ngo || res.data;
};
