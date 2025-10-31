import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ngoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    bio: { type: String, default: "" },
    logo: { type: String, default: "" }, // Image URL

    // Categories of goods they accept or provide
    categories: {
      food: { type: Boolean, default: false },
      clothes: { type: Boolean, default: false },
      stationary: { type: Boolean, default: false },
      otherGoods: { type: Boolean, default: false },
    },

    timings: { type: String, default: "" },
    events: [String], 

    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ngoSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

ngoSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("NGO", ngoSchema);
