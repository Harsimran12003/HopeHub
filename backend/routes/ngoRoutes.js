import express from "express";
import { addNGO, getAllNGOs, getNGOProfile,  updateNGOProfile, updateNGO, deleteNGO, getNGOById } from "../controllers/ngoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", addNGO);  // Add new NGO
router.get("/", getAllNGOs); // Get all NGOs
router.get("/profile", protect,  getNGOProfile);
router.put("/profile",  protect, updateNGOProfile);

router.put("/:id", updateNGO);       
router.delete("/:id", deleteNGO);   
router.get("/:id", getNGOById); 

export default router;
