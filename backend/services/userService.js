// services/userService.js
import User from "../models/User.js";

export const createUser = async (userData) => {
  const { fullName, email, password, occupation, address, pincode, profilePhotoUrl } = userData;

  // check existing
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error("User with this email already exists");
    err.status = 409;
    throw err;
  }

  
  const user = new User({
    fullName,
    email,
    password,
    occupation,
    address,
    pincode,
    profilePhotoUrl
  });

  await user.save();

  // exclude password on return
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};
