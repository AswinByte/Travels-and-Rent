import express from "express";

import {
  addFuelLog,
  getFuelLogs,
} from "../../controllers/admin/fleetController.js";

import { protect }
from "../../middleware/authMiddleware.js";

import { admin }
from "../../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Protected
router.post(
  "/fuel",
  protect,
  admin,
  addFuelLog
);

router.get(
  "/fuel",
  protect,
  admin,
  getFuelLogs
);

export default router;