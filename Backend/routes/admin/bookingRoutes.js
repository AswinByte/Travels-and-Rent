import express from "express";

import {
  getAllBookings,
  confirmBooking,
  cancelBooking,
  completeBooking,
  verifyPayment,
  filterBookings
} from "../../controllers/admin/bookingController.js";

import { assignDriver } from "../../controllers/admin/bookingController.js";

import { protect } from "../../middleware/authMiddleware.js";
import { admin } from "../../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Protected Routes
router.get("/", protect, admin, getAllBookings);
router.get(
  "/filter",
  protect,
  admin,
  filterBookings
);
router.put("/:id/confirm", protect, admin, confirmBooking);

router.put("/:id/cancel", protect, admin, cancelBooking);

router.put("/:id/complete", protect, admin, completeBooking);

router.put(
  "/:id/assign-driver",
  protect,
  admin,
  assignDriver
);
  
router.put(
  "/:id/verify-payment",
  protect,
  admin,
  verifyPayment
);

export default router;