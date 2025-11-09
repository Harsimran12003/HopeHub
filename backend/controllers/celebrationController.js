import Celebration from "../models/Celebration.js";

// ➤ Create Celebration Request
export const createCelebration = async (req, res) => {
  try {
    const celebration = await Celebration.create(req.body);
    res.status(201).json(celebration);
  } catch (error) {
    console.error("Error creating celebration:", error);
    res.status(500).json({ message: "Failed to create celebration" });
  }
};

// ➤ Get All Requests (For NGO Dashboard)
export const getAllCelebrations = async (req, res) => {
  try {
    const celebrations = await Celebration.find().sort({ createdAt: -1 });
    res.status(200).json(celebrations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch celebrations" });
  }
};

// ➤ Update Status (Approve / Reject)
export const updateCelebrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Celebration.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};
