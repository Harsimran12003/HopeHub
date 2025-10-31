import jwt from "jsonwebtoken";
import User from "../models/User.js";
import NGO from "../models/NGO.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user;
      if (decoded.role === "ngo") {
        user = await NGO.findById(decoded.id).select("-password");
      } else {
        user = await User.findById(decoded.id).select("-password");
      }

      if (!user) {
        return res.status(401).json({ message: "Account not found" });
      }

      req.user = user;
      req.role = decoded.role;
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
