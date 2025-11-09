import express from "express";
import {
  createDonation,
  getDonationById,
  getAllDonations,
  getDonationsByNGO,
  updateDonationStatus,
  deleteDonation,
  getUserDonations,
} from "../controllers/donationController.js";

import { protect } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.get("/user/:userId", getUserDonations);
router.post("/", createDonation);

router.get("/ngo/:ngoId", getDonationsByNGO); 
router.get("/", getAllDonations);
router.put("/:id/status", updateDonationStatus);
router.get("/:id", getDonationById);



export default router;
