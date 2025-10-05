import express from "express";
import multer from "multer";
import {
  uploadImage,
  getImages,
  getImageById,
  deleteImage,
  getLabels
} from "../controllers/imageController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// API routes
router.post("/", upload.single("file"), uploadImage);
router.get("/", getImages);
router.get("/labels", getLabels);
router.get("/:id", getImageById);
router.delete("/:id", deleteImage);

export default router;
