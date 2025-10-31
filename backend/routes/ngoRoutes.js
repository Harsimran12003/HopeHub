import express from "express";
import { addNGO, getAllNGOs, getNGOProfile,  updateNGOProfile, updateNGO, deleteNGO } from "../controllers/ngoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", addNGO);  // Add new NGO
router.get("/", getAllNGOs); // Get all NGOs
router.get("/profile", protect,  getNGOProfile);
router.put("/profile",  protect, updateNGOProfile);

router.put("/:id", updateNGO);       
router.delete("/:id", deleteNGO);    

export default router;
