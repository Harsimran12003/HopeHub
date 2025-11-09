import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const createDonation = async (donationData) => {
  const response = await axios.post(`${API_URL}/api/donations`, donationData);
  return response.data;
};

export const getApprovedDonations = async () => {
  const res = await axios.get(`${API_URL}/api/donations`);
  return res.data.filter((d) => d.status === "Approved" || d.status === "Scheduled");
};

export const getAllDonations = async () => {
  const response = await axios.get(`${API_URL}/api/donations`);
  return response.data;
};

export const updateDonationStatus = async (id, updateData) => {
  const res = await axios.put(`${API_URL}/api/donations/${id}/status`, updateData);
  return res.data;
};
