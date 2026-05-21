import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  verifyOtp,
  resetPassword
} from "../../controllers/user/authController.js";

import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

// Protected Route
router.get("/profile", protect, getProfile);

router.post("/forgot-password", forgotPassword);

router.post(
  "/verify-otp",
  verifyOtp
);
router.post("/reset-password", resetPassword);


export default router;