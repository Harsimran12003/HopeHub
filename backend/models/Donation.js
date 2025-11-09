import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
    contactNumber: String,
    pickupAddress: String,
    preferredDate: String,
    preferredTime: String,
    message: String,
    items: [
      {
        itemName: String,
        quantity: String,
      },
    ],
    pickupPerson: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Scheduled", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
