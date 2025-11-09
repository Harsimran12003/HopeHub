import NGO from "../models/NGO.js";
import bcrypt from "bcryptjs";

// Add new NGO
export const addNGO = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      contactNumber,
      bio,
      logo,
      categories,
      timings,
      events,
    } = req.body;

    // Check duplicate email
    const existingNGO = await NGO.findOne({ email });
    if (existingNGO)
      return res.status(400).json({ message: "NGO already exists with this email." });

    const newNGO = new NGO({
      name,
      email,
      password, // will be hashed automatically via pre('save')
      address,
      contactNumber,
      bio,
      logo,
      categories,
      timings,
      events,
    });

    await newNGO.save();

    res.status(201).json({ message: "NGO added successfully!", ngo: newNGO });
  } catch (error) {
    console.error("Error adding NGO:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all NGOs
export const getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find().select("-password");
    res.status(200).json(ngos);
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    res.status(500).json({ message: "Error fetching NGOs" });
  }
};

// 👤 Get logged-in NGO profile
export const getNGOProfile = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.user._id || req.user.id).select("-password");

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.status(200).json({
      success: true,
      ngo: {
        id: ngo._id,
        name: ngo.name,
        email: ngo.email,
        address: ngo.address,
        contactNumber: ngo.contactNumber,
        bio: ngo.bio,
        logo: ngo.logo,
        categories: ngo.categories,
        timings: ngo.timings,
        events: ngo.events,
      },
    });
  } catch (error) {
    console.error("Error fetching NGO profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update NGO profile (for logged-in NGO)
export const updateNGOProfile = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.user.id);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    const fields = [
      "name",
      "email",
      "address",
      "contactNumber",
      "bio",
      "timings",
      "logo",
      "categories",
      "events",
    ];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) ngo[field] = req.body[field];
    });

    const updatedNGO = await ngo.save();
    res.json(updatedNGO);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating NGO profile" });
  }
};

// Admin — Update NGO by ID
export const updateNGO = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if NGO exists
    const ngo = await NGO.findById(id);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    // Update only allowed fields
    const updatableFields = [
      "name",
      "email",
      "address",
      "contactNumber",
      "bio",
      "logo",
      "timings",
      "categories",
      "events",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) ngo[field] = req.body[field];
    });

    const updatedNGO = await ngo.save();
    res.status(200).json({ message: "NGO updated successfully", updatedNGO });
  } catch (error) {
    console.error("Error updating NGO:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Admin — Delete NGO by ID
export const deleteNGO = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await NGO.findById(id);

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    await NGO.findByIdAndDelete(id);
    res.status(200).json({ message: "NGO deleted successfully" });
  } catch (error) {
    console.error("Error deleting NGO:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getNGOById = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await NGO.findById(id).select("-password");

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.status(200).json(ngo);
  } catch (error) {
    console.error("Error fetching NGO by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

