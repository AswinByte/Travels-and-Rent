import express from "express";

import upload
from "../../middleware/uploadMiddleware.js";

import {
  addVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
  markMaintenance,
  searchVehicles,
  getVehicleById
}
from "../../controllers/admin/vehicleController.js";

import {
  protect
}
from "../../middleware/authMiddleware.js";

import {
  admin
}
from "../../middleware/adminMiddleware.js";

const router =
  express.Router();

// Add Vehicle
router.post(
  "/",
  protect,
  admin,
  (req, res, next) => {
    next();
  },
  upload.single("image"),
  addVehicle
);

// Update Vehicle
router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateVehicle
);

// Delete Vehicle
router.delete(
  "/:id",
  protect,
  admin,
  deleteVehicle
);

// Maintenance
router.put(
  "/:id/maintenance",
  protect,
  admin,
  markMaintenance
);

// Public Vehicles
router.get(
  "/",
  getVehicles
);

// Search
router.get(
  "/search",
  searchVehicles
);

// Single Vehicle
router.get(
  "/:id",
  protect,
  admin,
  getVehicleById
);

export default router;