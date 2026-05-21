import express from "express";

import {
  addDriver,
  getDrivers,
} from "../../controllers/admin/driverController.js";

import { protect } from "../../middleware/authMiddleware.js";
import { admin } from "../../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Protected
router.post("/", protect, admin, addDriver);

router.get("/", protect, admin, getDrivers);

export default router;