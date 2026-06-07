import express from "express";

import {
  addFuelLog,
  getFuelLogs,
  getFuelLogById,
  updateFuelLog,
  deleteFuelLog,
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

router.get(
  "/fuel/:id",
  protect,
  admin,
  getFuelLogById
);

router.put(
  "/fuel/:id",
  protect,
  admin,
  updateFuelLog
);

router.delete(
  "/fuel/:id",
  protect,
  admin,
  deleteFuelLog
);

export default router;