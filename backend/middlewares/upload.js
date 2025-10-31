import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");

// ensure uploads directory exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // accept images only
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed."), false);
  }
  cb(null, true);
};

export const uploadSingle = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});
