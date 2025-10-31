import asyncHandler from "express-async-handler";
import { createUser } from "../services/userService.js";
import User from "../models/User.js";
import NGO from "../models/NGO.js";
import jwt from "jsonwebtoken";
import {generateToken} from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res) => {
  // form fields will be in req.body; file in req.file
  const { fullName, email, password, confirmPassword, occupation, address, pincode } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("Please provide fullName, email and password");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  // profile photo url (if uploaded)
  const profilePhotoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  const user = await createUser({
    fullName,
    email,
    password,
    occupation,
    address,
    pincode,
    profilePhotoUrl
  });

  res.status(201).json({ message: "User registered", user });
});


export const loginUser = async (req, res) => {
  
  const { email, password } = req.body;

  try {
    let account = await User.findOne({ email });
    let role = "user";

    if (!account) {
      account = await NGO.findOne({ email });
      role = "ngo";
    }

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(account._id, role);

    res.json({
      _id: account._id,
      name: account.name,
      email: account.email,
      role,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//  Get current user profile
export const getUserProfile = async (req, res) => {
  try {
    // req.user is set by protect middleware (User or NGO)
    const user = await User.findById(req.user._id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    // send consistent object
    res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePhotoUrl: user.profilePhotoUrl || null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};
