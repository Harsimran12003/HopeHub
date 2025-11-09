import express from "express";
import { getProfile, updateProfile, changePassword } from "../controllers/adminController.js";

const router = express.Router();

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/change-password", changePassword);

export default router;
