import express from "express";

import {
  addPackage,
  getPackages,
  updatePackage,
  deletePackage,
} from "../../controllers/admin/packageController.js";

import { protect }
from "../../middleware/authMiddleware.js";

import { admin }
from "../../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Protected
router.post(
  "/",
  protect,
  admin,
  addPackage
);

router.put(
  "/:id",
  protect,
  admin,
  updatePackage
);

router.delete(
  "/:id",
  protect,
  admin,
  deletePackage
);

// Public
router.get("/", getPackages);

export default router;