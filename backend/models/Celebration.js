// models/Celebration.js
import mongoose from "mongoose";

const celebrationSchema = new mongoose.Schema({
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  occasion: { type: String, required: true },
  celebrationType: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Celebration", celebrationSchema);
