import Donation from "../models/Donation.js";
import NGO from "../models/NGO.js";
import User from "../models/User.js";


export const createDonation = async (req, res) => {
  try {
    const ngoId = req.params.ngoId || req.body.ngoId;
    const {
      
      name,
      email,
      contactNumber,
      pickupAddress,
      preferredDate,
      preferredTime,
      message,
      items
    } = req.body;

    // Basic validation
    if (!name || !email || !contactNumber || !pickupAddress || !preferredDate || !preferredTime || !items)
      return res.status(400).json({ message: "Missing required fields" });

    // Ensure NGO exists
    const ngo = await NGO.findById(ngoId);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    // Normalize items to array of {itemName, quantity}
    const itemsArray = Array.isArray(items) ? items : JSON.parse(items || "[]");
    if (!itemsArray.length) return res.status(400).json({ message: "At least one donation item is required" });

    const donationData = {
      ngoId: ngoId,
      name,
      email,
      contactNumber,
      pickupAddress,
      preferredDate,
      preferredTime,
      message,
      items: itemsArray
    };
    if (req.user && req.user._id) donationData.user = req.user._id;

    const donation = new Donation(donationData);
    await donation.save();

    return res.status(201).json({ success: true, message: "Donation request created", donation });
  } catch (error) {
    console.error("createDonation error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findById(id).populate("ngo", "name address contactNumber").populate("user", "fullName email");
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    res.json(donation);
  } catch (error) {
    console.error("getDonationById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("ngoId", "name").sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error("getAllDonations error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getDonationsByNGO = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const donations = await Donation.find({ ngoId }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error("getDonationsByNGO error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, pickupPerson } = req.body;

    const donation = await Donation.findById(id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    if (status) donation.status = status;
    if (pickupPerson !== undefined) donation.pickupPerson = pickupPerson;

    await donation.save();
    res.json({ success: true, message: "Donation updated", donation });
  } catch (error) {
    console.error("updateDonationStatus error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findById(id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    await donation.remove();
    res.json({ success: true, message: "Donation deleted" });
  } catch (error) {
    console.error("deleteDonation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserDonations = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const donations = await Donation.find({ email: user.email })
      .populate("ngoId", "name")
      .sort({ createdAt: -1 });

    if (!donations.length)
      return res.status(404).json({ message: "No donations found for this user" });

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching user donations:", error);
    res.status(500).json({ message: "Failed to fetch donations" });
  }
};
