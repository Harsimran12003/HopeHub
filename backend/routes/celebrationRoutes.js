import express from "express";
import {
  createCelebration,
  getAllCelebrations,
  updateCelebrationStatus
} from "../controllers/celebrationController.js";

const router = express.Router();

router.post("/", createCelebration);
router.get("/", getAllCelebrations);
router.put("/:id/status", updateCelebrationStatus);

export default router;
