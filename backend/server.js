  import express from "express";
  import dotenv from "dotenv";
  import cors from "cors";
  import path from "path";
  import userRoutes from "./routes/userRoutes.js";
  import ngoRoutes from "./routes/ngoRoutes.js";
  import donationRoutes from "./routes/donationRoutes.js";
  import celebrationRoutes from "./routes/celebrationRoutes.js";
  import adminRoutes from "./routes/adminRoutes.js";
  import connectDB from "./config/db.js";
  import { notFound, errorHandler } from "./middlewares/errorHandler.js";
  import { fileURLToPath } from "url";

  dotenv.config();

  const PORT = process.env.PORT || 5000;
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error("Please provide MONGO_URI in .env");
    process.exit(1);
  }

  await connectDB(MONGO_URI);

  const app = express();

  // middlewares
  app.use(cors("*"));
  app.use(express.json()); // for application/json
  app.use(express.urlencoded({ extended: true })); // for form submissions

  // static folder for uploaded images
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // routes
  app.use("/api/users", userRoutes);
  app.use("/api/ngos", ngoRoutes);
  app.use("/api/donations", donationRoutes);
  app.use("/api/celebrations", celebrationRoutes);
  app.use("/api/admin", adminRoutes);

  // health
  app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
