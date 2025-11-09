// controllers/adminController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Get Admin Profile
export const getProfile = async (req, res) => {
  try {
    const admin = await User.findOne({ email: "admin@gmail.com" }).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Admin Email
export const updateProfile = async (req, res) => {
  try {
    const { email } = req.body;

    let admin = await User.findOne({ email: "admin@gmail.com" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.email = email || admin.email;
    await admin.save();

    res.json({ message: "Profile updated successfully", admin });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Change Admin Password
export const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    let admin = await User.findOne({ email: "admin@gmail.com" });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing admin password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
