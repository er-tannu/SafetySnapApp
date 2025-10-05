import Image from "../models/Image.js";
import crypto from "crypto";
import fs from "fs";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileBuffer = fs.readFileSync(req.file.path);
    const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    // check for duplicates
    const existing = await Image.findOne({ detections_hash: hash });
    if (existing)
      return res.json({ id: existing._id, message: "Duplicate image" });

    // mock detection results
    const detections = [
      {
        label: "Helmet",
        confidence: 0.95,
        bbox: { x: 0.1, y: 0.2, width: 0.3, height: 0.4 }
      },
      {
        label: "Vest",
        confidence: 0.89,
        bbox: { x: 0.5, y: 0.3, width: 0.2, height: 0.5 }
      }
    ];

    const newImage = await Image.create({
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      detections,
      detections_hash: hash
    });

    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const { label, from, to, limit = 10, offset = 0 } = req.query;
    let query = {};
    if (label) query["detections.label"] = label;
    if (from && to)
      query.uploadedAt = { $gte: new Date(from), $lte: new Date(to) };

    const images = await Image.find(query)
      .skip(Number(offset))
      .limit(Number(limit))
      .sort({ uploadedAt: -1 });

    res.json({ items: images, next_offset: Number(offset) + images.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Not found" });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLabels = async (req, res) => {
  try {
    const labels = await Image.distinct("detections.label");
    res.json(labels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
