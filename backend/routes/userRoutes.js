// routes/userRoutes.js
import express from "express";
import { register, loginUser, getUserProfile, getAllUsers, deleteUser } from "../controllers/userController.js";
import { uploadSingle } from "../middlewares/upload.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/users/register

router.post("/register", uploadSingle.single("profilePhoto"), register);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);


export default router;
