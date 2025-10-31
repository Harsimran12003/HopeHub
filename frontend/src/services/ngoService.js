import axios from "axios";

const API_URL = "http://localhost:5000/api/ngos";

// Add new NGO
export const addNGO = async (ngoData) => {
  try {
    const response = await axios.post(API_URL, ngoData);
    return response.data;
  } catch (error) {
    console.error("Error adding NGO:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch all NGOs
export const fetchNGOs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching NGOs:", error.response?.data || error.message);
    throw error;
  }
};


export const updateNGOById = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};

export const deleteNGOById = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};


//  Fetch all NGOs from database
export const fetchAllNGOs = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching NGOs:", error.response?.data || error.message);
    throw error;
  }
};