import express from "express";

import {
  getAllBookings,
  getBookingById,
  confirmBooking,
  cancelBooking,
  completeBooking,
  verifyPayment,
  rejectPayment,
  filterBookings,
  deleteBooking,
  assignDriver,
  updateBooking,
} from "../../controllers/admin/bookingController.js";

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
router.put(
  "/:id/reject-payment",
  protect,
  admin,
  rejectPayment
);
router.get(
  "/:id",
  protect,
  admin,
  getBookingById
);
router.put(
  "/:id",
  protect,
  admin,
  updateBooking
);
router.delete(
  "/:id",
  protect,
  admin,
  deleteBooking
);

export default router;