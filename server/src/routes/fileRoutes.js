import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  (req, res) => {
    res.json({
      success: true,
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        url: `http://localhost:5000/uploads/${req.file.filename}`,
      },
    });
  }
);

export default router;