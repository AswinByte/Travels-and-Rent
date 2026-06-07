import express from "express";

import {
  addDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  getAvailableDrivers,
} from "../../controllers/admin/driverController.js";

import { protect } from "../../middleware/authMiddleware.js";
import { admin } from "../../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, addDriver);

router.get("/", protect, admin, getDrivers);

router.get(
  "/available",
  protect,
  admin,
  getAvailableDrivers
);

router.get(
  "/:id",
  protect,
  admin,
  getDriverById
);

router.put(
  "/:id",
  protect,
  admin,
  updateDriver
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteDriver
);

export default router;