import express from "express";

import {
  addVehicle,
getVehicles,
updateVehicle,
deleteVehicle,
markMaintenance,
searchVehicles
} from "../../controllers/admin/vehicleController.js";

import { protect } from "../../middleware/authMiddleware.js";
import { admin } from "../../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Only
router.post("/", protect, admin, addVehicle);

router.delete("/:id", protect, admin, deleteVehicle);
router.put(
  "/:id",
  protect,
  admin,
  updateVehicle
);

router.put(
  "/:id/maintenance",
  protect,
  admin,
  markMaintenance
);
// Public
router.get("/", getVehicles);
router.get(
  "/search",
  searchVehicles
);
export default router;