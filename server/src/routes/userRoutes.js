import express from "express";

import protect from "../middleware/authMiddleware.js";
import { profile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, profile);

export default router;