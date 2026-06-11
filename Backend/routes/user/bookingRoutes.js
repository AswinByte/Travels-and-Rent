import express from "express";
import upload from "../../middleware/uploadMiddleware.js";
import {
  createBooking,
  getMyBookings,
  getBookingById,
  uploadPaymentScreenshot,
  createRentalBooking,
  createPackageBooking
} from "../../controllers/user/bookingController.js";

import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// User Protected Routes
router.post("/", protect, createBooking);

router.get("/my-bookings", protect, getMyBookings);

router.get("/:id", protect, getBookingById);

router.post(
  "/:id/upload-payment",
  protect,
  upload.single("screenshot"),
  uploadPaymentScreenshot
);

router.post(
  "/rental",
  protect,
  upload.single("screenshot"),
  createRentalBooking
);

router.post(
  "/package",
  protect,
  upload.single("screenshot"),
  createPackageBooking
);

export default router;