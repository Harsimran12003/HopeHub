// src/services/userService.js
import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api/users"; 

// Register new user
export const registerUser = async (data) => {
  try {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("occupation", data.occupation);
    formData.append("address", data.address);
    formData.append("pincode", data.pincode);
    if (data.profilePhoto) formData.append("profilePhoto", data.profilePhoto);

    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Server error");
    return json;
  } catch (err) {
    console.error("Register Error:", err);
    throw err;
  }
};


export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return data; // includes role
};