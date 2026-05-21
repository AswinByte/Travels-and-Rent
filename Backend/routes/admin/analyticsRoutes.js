import express from "express";

import {
  getDashboardAnalytics,
} from "../../controllers/admin/analyticsController.js";

import { protect }
from "../../middleware/authMiddleware.js";

import { admin }
from "../../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardAnalytics
);

export default router;